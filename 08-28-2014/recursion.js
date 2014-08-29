window.onload = function(){
    'use strict';
    var dims        = getViewportDimensions();
    var TRANSITION  = 10;
    var BAR_HEIGHT  = 20;
    var MAX_BARS    = 64;
    var PADDING     = 0;
    var width       = dims.width - PADDING;
    var height      = dims.height - PADDING;
    var colorscale  = d3.scale.linear()
                      .range(['purple', 'green'])
                      .clamp(true);
    var container   = getSVG('container', dims, '#contents');
    var fontscale   = d3.scale.linear()
                      .range([2, 100]);

    function bar(bar_width, x, y, bars, count) {
        if(count <= 0) return;
        var offset = 0.33;
        fontscale.domain([0, width]);
        colorscale.domain([MAX_BARS, 0]);

        var g = container.append('g');
        g.selectAll('.bar')
        .data(d3.range(bars))
        .enter()
        .append('rect')
        .attr('y', y)
        .attr('x', function(d){return d * bar_width + bar_width * offset;})
        .attr('width', bar_width - bar_width * (offset * 2))
        .attr('height', BAR_HEIGHT)
        .attr('opacity', 0)
        .attr('fill', colorscale(bars))
        .transition()
        .delay(function(d){return d * TRANSITION})
        .attr('opacity', 1);

        g.selectAll('.bar-text')
        .data(d3.range(bars))
        .enter()
        .append('text')
        .text(function(d){return Math.round((d * bar_width + bar_width * offset)  * 0.01);})
        .attr('y', y - BAR_HEIGHT / 2)
        .attr('x', function(d){return d * bar_width + (bar_width / 2);})
        .attr('text-anchor', 'middle')
        .attr('font-size', fontscale(bar_width));

        return bar(bar_width / 2, 0, y + BAR_HEIGHT * 4, bars * 2, count - 1);
    }

    function init() {
        bar(width, 0, 100, 1, 10);
    }

    init();
};
