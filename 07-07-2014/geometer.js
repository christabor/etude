var geometer = (function(){
    'use strict';
    var dims       = {height: 760, width: 1400}; // ;p
    var height     = dims.height;
    var width      = dims.width;
    var container  = getSVG('map', dims, '#container');
    var group      = container.append('g')
    .attr('transform', 'translate(' + width / 4 + ',0)');
    var line = d3.svg.line()
    .x(function(d){return d.x;})
    .y(function(d){return d.y;});

    var STROKE = '#b66d48';
    var FILL = '#f4eae5';
    var STROKE_WIDTH = 3;
    var DOT_SIZE = 5;

    function init() {
        var OFFSET = 50;
        var data = [
            {'label': 'B', 'x': OFFSET, 'y': OFFSET},
            {'label': 'C', 'x': OFFSET, 'y': height - OFFSET},
            {'label': 'A', 'x': width / 2, 'y': height / 2}
        ];
        var circle_data = [
            {'x': width / 5.57, 'y': height / 2, 'r': width / 7},
            {'x': width / 2.64, 'y': height / 2, 'r': width / 18.2},
            {'x': width / 2.20, 'y': height / 2, 'r': width / 50}
        ];
        var aux_label_data = [
            {'label': 'B1', 'x': width / 3.1, 'y': height / 3},
            {'label': 'B2', 'x': width / 2.3, 'y': height / 2.29},
            {'label': 'C1', 'x': width / 3.1, 'y': height / 1.5},
            {'label': 'C2', 'x': width / 2.3, 'y': height / 1.78},
            {'label': 'O1', 'x': width / 5.5, 'y': height / 2},
            {'label': 'O2', 'x': width / 2.6, 'y': height / 2},
            {'label': 'O2', 'x': width / 2.3, 'y': height / 2, 'nolabel': true},
            {'label': 'H1', 'x': width / 3.1, 'y': height / 2},
            {'label': 'I1', 'x': width / 10, 'y': height / 3.56, 'nomarker': true},
            {'label': 'I2', 'x': width / 2.7, 'y': height / 2.2, 'nomarker': true},
            {'label': 'I3', 'x': width / 2.1, 'y': height / 2, 'nomarker': true}
        ];
        var dashed_line_data = [
            [{'x': data[0].x, 'y': data[0].y}, {'x': width / 5.5, 'y': height / 2}],
            [{'x': data[1].x, 'y': data[1].y}, {'x': width / 5.5, 'y': height / 2}],
            [{'x': data[2].x, 'y': data[2].y}, {'x': width / 5.5, 'y': height / 2}],
        ];
        var vertical_line_data = [
            [{'x': width / 2.3, 'y': OFFSET}, {'x': width / 2.3, 'y': height - OFFSET}],
            [{'x': width / 2.1, 'y': OFFSET}, {'x': width / 2.1, 'y': height - OFFSET}],
            [{'x': width / 3.1, 'y': OFFSET}, {'x': width / 3.1, 'y': height - OFFSET}],
        ];
        var right_angle_data = [
            {'x': width / 3.25, 'y': height / 2.12},
            {'x': width / 2.38, 'y': height / 2.12}
        ];

        group.selectAll('.triangle-outer')
        .data([data])
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE)
        .attr('fill', FILL)
        .attr('d', function(d){return line(d) + 'Z';});

        group.selectAll('.main-circle')
        .data(circle_data)
        .enter()
        .append('circle')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE)
        .attr('fill', FILL)
        .attr('cx', function(d, i){return d.x;})
        .attr('cy', function(d){return d.y;})
        .attr('r', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', function(d){return d.r;});

        // -- line overlays

        //  Dashed lines
        group.selectAll('.dashed')
        .data(dashed_line_data)
        .enter()
        .append('path')
        .attr('stroke-dasharray', 10)
        .attr('stroke-width', STROKE_WIDTH)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('d', line)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('stroke-dasharray', 6);

        //  Vertical lines
        group.selectAll('.vertical')
        .data(vertical_line_data)
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('d', line);

        // labels
        group.selectAll('.dot-label')
        .data(data)
        .enter()
        .append('text')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('fill', 'black')
        .text(function(d){return d.nolabel ? '' : d.label;})
        .attr('x', function(d, i){return d.x - 30;})
        .attr('y', function(d){return d.y - 5;});

        // aux point labels
        group.selectAll('.aux-dot-label')
        .data(aux_label_data)
        .enter()
        .append('text')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('fill', 'black')
        .text(function(d){return d.nolabel ? '' : d.label;})
        .attr('x', function(d, i){return d.x - 30;})
        .attr('y', function(d){return d.y - 5;});

        // right angle indicators
        group.selectAll('.right-square')
        .data(right_angle_data)
        .enter()
        .append('rect')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('opacity', 1)
        .attr('stroke', '#005d00')
        .attr('fill', 'rgba(172, 242, 135, 0.4)')
        .attr('width', DOT_SIZE * 4)
        .attr('height', DOT_SIZE * 4)
        .attr('x', function(d, i){return d.x;})
        .attr('y', function(d){return d.y;});

        // vertices for edges of lines atop primitive shapes
        group.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('fill', 'black')
        .attr('r', 0)
        .attr('cx', function(d, i){return d.x})
        .attr('cy', function(d){return d.y;})
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', DOT_SIZE);

        //  auxiliary vertices
        group.selectAll('.aux-dot')
        .data(aux_label_data)
        .enter()
        .append('circle')
        .attr('stroke', 'white')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('fill', 'black')
        .attr('cx', function(d, i){return d.x})
        .attr('cy', function(d){return d.y;})
        .attr('r', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', function(d){return d.nomarker ? 0 : DOT_SIZE})
    }

    return {
        'init': init
    };
})();

window.onload = geometer.init;
