// D3 Geometer - a utility library for d3 that allows drawing
// of geometric primitives, labels, connections and more.
// Copyright (c) 2014, Chris Tabor
// All rights reserved.

var d3_geometer = {
    'version': '0.0.1'
};

d3_geometer.nGon = function(group) {
    // d3 style - chainable interfaces.
    var tau          = Math.PI * 2;
    var STROKE       = '#b66d48';
    var FILL         = '#f4eae5';
    var STROKE_WIDTH = 3;
    var DOT_SIZE     = 5;
    var OFFSET       = 50;
    var element      = null;
    var line         = d3.svg.line()
                       .x(function(d){return d.x;})
                       .y(function(d){return d.y;});

    // Inner "parent" function that is **always** returned
    // in each helper function, which allows for chaining.
    function nGon(radius, sides) {
        group = group || d3.select('svg').append('g');
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

    nGon.getCoords = function(radius, sides) {
        // Generate the coordinates for
        // each point based on # of sides.
        return d3.range(sides).map(function(d){
            var cx = 0;  // center x
            var cy = 0;  // center y
            var start_angle = 0;
            var center_angle = tau / sides;
            var curr_angle = start_angle + (d * center_angle);
            var vx = Math.round(cx + radius * Math.cos(curr_angle));
            var vy = Math.round(cy - radius * Math.sin(curr_angle));
            return {
                'label': 'S' + d,
                'x': vx,
                'y': vy
            };
        });
    };

    nGon.drawLabels = function() {
        // Draw some labels on the vertices.
        group.selectAll('.label')
        .data(element.datum())
        .enter()
        .append('text')
        .text(function(d){return 'T'})
        .attr('x', function(d){return d.x - 4;})
        .attr('y', function(d){return d.y - 10;});
        return nGon;
    };

    nGon.drawVertices = function() {
        // Draw vertices for each edge.
        group.selectAll('.vertex')
        .data(element.datum())
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y});
        return nGon;
    };

    nGon.drawConnectingEdges = function() {
        group.selectAll('.dashed')
        .data(element.datum())
        .enter()
        .append('path')
        .attr('stroke-dasharray', 10)
        .attr('stroke-width', STROKE_WIDTH)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('d', line)
        .attr('stroke-dasharray', 6);
        return nGon;
    };

    return nGon;
};
