var hierarchy = (function(){
    'use strict';
    var margin = 0;
    var dims   = getViewportDimensions();
    var width  = dims.width - margin;
    var height = dims.height - margin;
    var svg    = d3.select('body').append('svg')
    var data   = [
        {'name': 'species', 'value': 3},
        {'name': 'genus', 'value': 4},
        {'name': 'family', 'value': 5},
        {'name': 'order', 'value': 6},
        {'name': 'class', 'value': 7},
        {'name': 'phylum', 'value': 8},
        {'name': 'kingdom', 'value': 9},
        {'name': 'life', 'value': 10},
    ];

    function init() {
        svg.attr('width', width)
        .attr('height', height);
        var colors = ['red', 'blue', 'pink', 'green', 'black', 'yellow', 'purple', 'orange'];
        var initial_colors = [
            randomArrayValue(colors),
            randomArrayValue(colors),
            randomArrayValue(colors)];
        var colorScale = d3.scale.linear().range(initial_colors).domain([0, 10]);
        var colorScaleInverse = d3.scale.linear().range(initial_colors).domain([10, 0]);
        var angle = d3.svg.line.radial();
        var sizing = d3.scale.linear().range([width / 2, 0]).domain([0, 10]);

        svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', 'white')
        .attr('height', 1)
        .attr('opacity', 0.3)
        .attr('color', 'white')
        .attr('x', 0)
        .attr('y', 0)
        .transition()
        .delay(function(d, i){return i * 200;})
        .attr('fill', function(d){return colorScale(d.value);})
        .attr('height', function(d){return sizing(d.value) + 100;})
        .attr('width', width);

        svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('letter-spacing', 1)
        .attr('font-size', 4)
        .transition()
        .delay(function(d, i){return i * 200;})
        .attr('fill', 'black')
        .attr('font-size', function(d){return d.value * 4})
        .attr('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('letter-spacing', function(d){return d.value * 5;})
        .attr('y', function(d){return sizing(d.value) + 70;})
        .text(function(d){return d.name.toUpperCase()});
    }

    return {
        'init': init
    };
})();

window.onload = hierarchy.init;
