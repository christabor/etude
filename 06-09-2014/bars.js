var bars = (function(){
    'use strict';
    var margin = 0;
    var dims   = getViewportDimensions();
    var width  = dims.width - margin;
    var height = dims.height - margin;
    var svg    = d3.select('body').append('svg')

    function init() {
        svg.attr('width', width)
        .attr('height', height);
        var BAR_SIZE = 10;
        var radial = d3.svg.line.radial()
            .angle(function(d){return d - Math.PI * 2;})
            .radius(function(d){return d;});
        var colors = ['red', 'blue', 'pink', 'green', 'black', 'yellow', 'purple', 'orange'];
        var colorScale = d3.scale.linear().range([
                randomArrayValue(colors),
                randomArrayValue(colors),
                randomArrayValue(colors),
                randomArrayValue(colors)
            ]).domain([0, width * 0.33, width * 0.66, width]);
        var data = d3.range(1000).map(function(d, i){
            return [rando(width), rando(height)];
        });
        var data_sm = d3.range(100).map(function(d, i){
            return [rando(width), rando(height)];
        });

        svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .transition()
        .delay(function(d, i){return i * 4;})
        .attr('x', function(d){return d[0]})
        .attr('y', 0)
        .attr('fill', function(d){return colorScale(d[0]);})
        .attr('width', function(d){return BAR_SIZE;})
        .attr('height', 0)
        .transition()
        .attr('height', height);
    }

    return {
        'init': init
    };
})();

window.onload = bars.init;
