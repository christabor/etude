var bubblee = (function(){
    'use strict';
    var margin = 0;
    var dims   = getViewportDimensions();
    var width  = dims.width - margin;
    var height = dims.height - margin;
    var svg    = d3.select('body').append('svg')

    function init() {
        svg.attr('width', width)
        .attr('height', height);
        var colors = ['red', 'blue', 'pink', 'green', 'black', 'yellow', 'purple', 'orange'];
        var data = d3.range(1000).map(function(d, i){
            return [rando(width), rando(height)];
        });
        var colorScale = d3.scale.linear().range([
            randomArrayValue(colors),
            randomArrayValue(colors),
            randomArrayValue(colors),
            randomArrayValue(colors)
        ]).domain([0, width * 0.33, width * 0.66, width]);
        var colorScale2 = d3.scale.linear().range([
            randomArrayValue(colors),
            randomArrayValue(colors),
            randomArrayValue(colors),
            randomArrayValue(colors)
        ]).domain([0, width * 0.33, width * 0.66, width]);

        svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'white')
        .transition()
        .delay(function(d, i){return i;})
        .attr('cx', function(d){return d[0];})
        .attr('cy', function(d){return d[1];})
        .attr('fill', function(d){return colorScale(d[0]);})
        .attr('r', function(d){return d[0] * 0.04});

        svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', 'white')
        .transition()
        .delay(function(d, i){return i * 2;})
        .attr('fill', function(d){return colorScale2(d[0]);})
        .attr('x', function(d){return d[0] - d[0] * 0.02 / 2;})
        .attr('y', function(d){return d[1] - d[1] * 0.02 / 2;})
        .attr('width', 4)
        .attr('height', 4);
    }

    return {
        'init': init
    };
})();

window.onload = bubblee.init;
