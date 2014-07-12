// D3 Geometer - a utility library for d3 that allows drawing
// of geometric primitives, labels, connections and more.
// Copyright (c) 2014, Chris Tabor
// All rights reserved.

// Using semantic versioning. http://semver.org/
var d3_geometer = {
    'version': '0.4.0'
};

d3_geometer.utils = {};

d3_geometer.utils.toRadian = function(deg) {
    if(deg > 360) deg = 360;
    // Converts degrees to radians.
    // @param {number} degree - the degrees to convert - up to 360
    if(isNaN(deg)) return deg;
    return deg * (Math.PI / 180);
};

d3_geometer.utils.calculateAngleSum = function(sides) {
    // Calculates the sum of interior angles of a given number of sides
    // @param {number} sides - number of sides to calculate from.
    // http://www.regentsprep.org/Regents/math/geometry/GG3/LPoly1.htm
    return 180 * (sides - 2);
};

d3_geometer.utils.calculateAngles = function(sides, round) {
    // Calculates the angle of a given side,
    // given a number of equal sides.
    // @param {number} sides - number of sides to calculate.
    // @param {boolean} round - whether or not to round the calculation.
    var deg = d3_geometer.utils.calculateAngleSum(sides) / sides;
    return round ? Math.round(deg) : deg;
};

d3_geometer.nGon = function(group) {
    // @param {number} group - A d3 group selection.
    if(!d3) return console.error('d3 library not found :sadface:');

    // d3 style - chainable interfaces.
    var element      = null;
    var _radius      = null;
    var _sides       = null;
    var _coords      = null;
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
    var ARC_I_RADIUS = 10;
    var ARC_O_RADIUS = RADIUS * 4;
    var ANG_OPACITY  = 0.8;
    var ANG_STROKE   = '#689452';
    var ANG_FILL     = '#acf287';
    var line         = d3.svg.line()
    .x(function(d){return d.x;})
    .y(function(d){return d.y;});

    function setupGroups() {
        // A single source to set up parent groups
        // for each type of element.
        var classes = [
            'ngon-labels',
            'ngon-dash-edges',
            'ngon-angles',
            'ngon-vertices',
            'ngon-right-angles'
        ];

        for(var i = 0, len = classes.length; i < len; i ++) {
            group.append('g')
            .attr('class', [GLOBAL_CLASS, classes[i]].join(' '));
        }
    }

    // Inner "parent" function that is **always** returned
    // in each helper function, which allows for chaining.
    function nGon(radius, sides) {
        // @param {number} radius - Size of entire shape
        //  - calculated using the unit circle
        // @param {number} sides - Number of sides.
        group   = group || d3.select('svg').append('g');
        // expose values
        _radius = radius;
        _sides  = sides;
        _coords = nGon.getCoords(radius, sides);
        // Initialize element for later reference
        // This is important!
        element = group.selectAll('.ngon')
        .data([_coords])
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE)
        .attr('fill', FILL)
        .attr('opacity', 1)
        .attr('d', function(d){return line(d) + 'Z';});
        setupGroups();
        return nGon;
    }

    nGon.rotate = function(deg, el) {
        // Rotate a given element.
        // @param {number} deg - the amount, in degrees, to rotate by
        // @param {string} el - the d3 selector (class, tag, etc..) to rotate.
        group.select(el)
        .attr('transform', 'rotate(' + deg + ')');
        return nGon;
    };

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

    nGon.label = function(text, x, y) {
        // Draw a custom label, wherever.
        // @param {string} text - the label text.
        // @param {number} x - x position
        // @param {number} y - y position
        group.select('.ngon-labels')
        .append('text')
        .attr('class', 'custom-label')
        .text(text)
        .attr('x', x || 0)
        .attr('y', y || 0);
        return nGon;
    };

    nGon.drawLabels = function() {
        // Draw some labels on the vertices.
        group.select('.ngon-labels')
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
        group.select('.ngon-vertices')
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

    nGon.drawRightAngle = function(x, y) {
        group.select('.ngon-right-angles')
        .append('rect')
        .attr('class', 'right-angle')
        .attr('x', x)
        .attr('y', y)
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', ANG_STROKE)
        .attr('fill', ANG_FILL)
        .attr('opacity', ANG_OPACITY)
        .attr('width', RADIUS * 3)
        .attr('height', RADIUS * 3);
        return nGon;
    };

    nGon.drawAngle = function(deg, x, y) {
        var _arc = d3.svg.arc()
        .innerRadius(ARC_I_RADIUS)
        .outerRadius(ARC_O_RADIUS)
        .startAngle(0)
        .endAngle(d3_geometer.utils.toRadian(deg));

        group.select('.ngon-angles')
        .append('g')
        .attr('transform', 'translate(' + x + ',' + y +')')
        .append('path')
        .attr('class', 'ngon-angle')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', ANG_STROKE)
        .attr('fill', ANG_FILL)
        .attr('opacity', ANG_OPACITY)
        .attr('d', _arc);

        // add label
        group.select('.ngon-angles')
        .append('text')
        .attr('class', 'ngon-angle-text')
        .attr('x', x + 5)
        .attr('y', y + 20)
        .attr('fill', 'black')
        .attr('font-size', 10)
        .text(Math.abs(deg) + '°');
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

    nGon.drawCenterPoint = function(height, width, use_labels) {
        // Simply draws the center vertex
        // @param {number} height - required height of container
        // @param {number} width - required width of container
        // @param {boolean} use_labels - Add a label to center point
        group.select('.ngon-vertices')
        .append('circle')
        .attr('class', 'center-vertex')
        .attr('r', 0)
        .attr('cx', 0)
        .attr('cy', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', RADIUS);

        if(use_labels) {
            // Draw some labels on the vertices.
            group.select('.ngon-labels')
            .append('text')
            .attr('class', 'center-vertex-label')
            .text(function(d){return 'O1';})
            .attr('x', RADIUS + RADIUS / 2)
            .attr('y', RADIUS);
        }
        return nGon;
    };

    nGon.drawNearAdjacentEdges = function(connections, modulo) {
        // Draws edges directly adjacent + 1 to each vertex.
        // see calculateEdgeOffsets for details.
        // @param {array} connections - A list of custom connections
        //  -must be an array of objects with x and y accessors
        if(!connections) {
            nGon.calculateEdgeOffsets(modulo);
            connections = _connections;
        }
        group.select('.ngon-dash-edges')
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
