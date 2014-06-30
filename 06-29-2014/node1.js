var node1 = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var MAX_NODES = 30;
    var RADIUS    = 10;
    var PADDING   = 0;

    function init() {
        var container = getSVG('cont', dims, '#container');
        var data = d3.range(MAX_NODES).map(randomCoords);
        var circles;
        var text;
        var edges;
        var line = d3.svg.line()
        .x(function(d){return d[0]})
        .y(function(d){return d[1]});

        data = d3.range(MAX_NODES).map(randomCoords);
        edges = container.selectAll('path');
        circles = container.selectAll('circle');
        text = container.selectAll('text');

        container.on('mousedown', addCircles);

        function randomCoords() {
            return [rando(width - PADDING), rando(height - PADDING)];
        }

        function addCircles() {
            data = d3.range(MAX_NODES).map(randomCoords);

            d3.selectAll('circle').remove();
            d3.selectAll('path').remove();
            d3.selectAll('text').remove();

            edges.data([data])
            .enter()
            .append('path')
            .attr('stroke', '#ccc')
            .attr('d', line)
            .attr('opacity', 0)
            .attr('fill', 'none')
            .transition()
            .attr('stroke-width', 1)
            .delay(data.length * 10)
            .attr('opacity', 1);

            circles.data(data)
            .enter()
            .append('circle')
            .attr('r', 1)
            .attr('stroke-width', 2)
            .attr('stroke', 'red')
            .attr('fill', 'white')
            .attr('cx', rando(width))
            .attr('cy', rando(height))
            .transition()
            .delay(function(d, i){return i * 10;})
            .attr('cx', function(d){return d[0]})
            .attr('cy', function(d){return d[1]})
            .attr('r', RADIUS);


            circles.data(data)
            .enter()
            .append('text')
            .attr('x', rando(width))
            .attr('y', rando(height))
            .attr('text-anchor','middle')
            .attr('font-size', 9)
            .attr('fill', '#999')
            .transition()
            .delay(function(d, i){return i * 20;})
            .attr('x', function(d){return d[0];})
            .attr('y', function(d){return d[1] + RADIUS / 2.8;})
            .text(function(d, i){return i;});
        }

        addCircles();
    }

    return {
        'init': init
    };
})();

window.onload = node1.init;
