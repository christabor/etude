// D3 Geometer - a utility library for d3 that allows drawing
// of geometric primitives, labels, connections and more.
// Copyright (c) 2014, Chris Tabor
// All rights reserved.

// Using semantic versioning. http://semver.org/
var d3_geometer = {
    'version': '0.2.4'
};

d3_geometer.nGon = function(group) {
    // @param {number} group - A d3 group selection.
    if(!d3) return console.error('d3 library not found :sadface:');

    // d3 style - chainable interfaces.
    var element      = null;
    var _radius      = null;
    var GLOBAL_CLASS = 'd3_geometer';
    var _connections = [];
    var tau          = Math.PI * 2;
    var STROKE       = '#b66d48';
    var FILL         = '#f4eae5';
    var STROKE_WIDTH = 3;
    var DOT_SIZE     = 5;
    var RADIUS       = 6;
    var OFFSET       = 50;
    var DASHARRAY    = 5;
    var line         = d3.svg.line()
    .x(function(d){return d.x;})
    .y(function(d){return d.y;});

    // Inner "parent" function that is **always** returned
    // in each helper function, which allows for chaining.
    function nGon(radius, sides) {
        // @param {number} radius - Size of entire shape
        //  - calculated using the unit circle
        // @param {number} sides - Number of sides.
        group = group || d3.select('svg').append('g');
        // expose radius value
        _radius = radius;
        // Initialize element for later reference
        // This is important!
        element = group.selectAll('.ngon')
        .data([nGon.getCoords(radius, sides)])
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE)
        .attr('fill', FILL)
        .attr('opacity', 1)
        .attr('d', function(d){return line(d) + 'Z';});
        return nGon;
    }

    nGon.destroy = function() {
        element.remove();
        // One reason for keeping all elements
        // in a group is that it makes cleanup easier.
        group.selectAll('g').remove();
    };

    nGon.getCoords = function(radius, sides) {
        // Generate the coordinates for
        // each point based on # of sides.
        // @param {number} radius - Size of entire shape
        //  - calculated using the unit circle
        // @param {number} sides - Number of sides.
        return d3.range(sides).map(function(d){
            var cx           = 0;  // center x
            var cy           = 0;  // center y
            var start_angle  = 0;
            var center_angle = tau / sides;
            var curr_angle   = start_angle + (d * center_angle);
            var vx           = Math.round(cx + radius * Math.cos(curr_angle));
            var vy           = Math.round(cy - radius * Math.sin(curr_angle));
            return {
                'label': 'L' + d,
                'x': vx,
                'y': vy
            };
        });
    };

    nGon.drawLabels = function() {
        // Draw some labels on the vertices.
        group.append('g')
        .attr('class', [GLOBAL_CLASS, 'ngon-labels'].join(' '))
        .selectAll('.label')
        .data(element.datum())
        .enter()
        .append('text')
        .text(function(d){return d.label;})
        .attr('x', function(d){return d.x - (RADIUS + RADIUS / 2);})
        .attr('y', function(d){return d.y - (RADIUS + RADIUS / 2);});
        return nGon;
    };

    nGon.drawVertices = function() {
        // Draw vertices for each edge.
        group.append('g')
        .attr('class', [GLOBAL_CLASS, 'ngon-vertices'].join(' '))
        .selectAll('.vertex')
        .data(element.datum())
        .enter()
        .append('circle')
        .attr('r', 0)
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y})
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', RADIUS);
        return nGon;
    };

    nGon.calculateEdgeOffsets = function(modulo) {
        // Calculates all positions for each
        // vertex to connect to - offset by one,
        // since adjacent vertices are already connected
        // @param {number} modulo - A modulo to allow custom numerical offsets.
        var datum = element.datum();
        var len   = datum.length;
        if(len < 3) return;

        function push(inner, sub_index, index) {
            inner.push({'x': datum[index].x, 'y': datum[index].y, 'label': 'C' + index});
            inner.push({'x': datum[len - sub_index].x, 'y': datum[len - sub_index].y, 'label': 'C' + (len - sub_index)});
        }

        // store connections state
        _connections = d3.range(len).map(function(d, i){
            var inner = [];
            for(var j = 1; j < len - 1; j++) {
                if(modulo) {
                    if(j % modulo === 0) {
                        push(inner, j, i);
                    }
                } else {
                    push(inner, j, i);
                }
            }
            return inner;
        });
        return nGon;
    };

    nGon.drawCenterPoint = function(height, width) {
        // Simply draws the center vertex
        group.select('.ngon-vertices')
        .append('circle')
        .attr('class', 'center-vertex')
        .attr('r', 0)
        .attr('cx', 0)
        .attr('cy', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', RADIUS);
        return nGon;
    };

    nGon.drawNearAdjacentEdges = function(connections) {
        // Draws edges directly adjacent + 1 to each vertex.
        // see calculateEdgeOffsets for details.
        // @param {array} connections - A list of custom connections
        //  -must be an array of objects with x and y accessors
        if(!connections) {
            nGon.calculateEdgeOffsets();
            connections = _connections;
        }
        group.append('g')
        .attr('class', [GLOBAL_CLASS, 'ngon-dash-edges'].join(' '))
        .selectAll('.dashed')
        .data(connections)
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', STROKE)
        .attr('fill', 'none')
        .attr('d', line);
        return nGon;
    };

    return nGon;
};
