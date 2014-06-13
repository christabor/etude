var gui = (function(){
    'use strict';
    var height = 200;
    var graph_container = d3.select('#graph-bars').append('svg').append('g').attr('height', height);

    function addBarChart() {
        graph_container.selectAll('rect')
        .data(d3.range(50).map(function(d){
            return rando(height / 2) + 40;
        }))
        .enter()
        .append('rect')
        .attr('height', 1)
        .attr('y', height)
        .transition()
        .attr('fill', '#4c88db')
        .duration(function(d, i){return i * 50;})
        .attr('x', function(d, i) { return i * 11; })
        .attr('width', 9)
        .attr('y', function(d) { return d; })
        .attr('height', function(d) { return height - d; });
    }

    function init() {
        addBarChart();
    }

    return {
        'init': init
    };
})();

window.onload = gui.init;
