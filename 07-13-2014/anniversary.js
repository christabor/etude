var anniversary = (function(){
    'use strict';

    function init() {
        var dims = getViewportDimensions();
        var el   = getSVG('banner', dims, '#container');
        var height = dims.height;
        var width = dims.width;
        var group = el.append('g').attr('transform', 'translate(0, 100)');
        var nodes = d3.range(200).map(function(d){
            return {'index': d};
        });
        var force = d3.layout.force()
        .nodes(nodes)
        .links([])
        .friction(0.9)
        .gravity(0.1)
        .size([width, height / 2])
        .start();

        group.selectAll('.shadows').data(nodes)
        .enter()
        .append('circle')
        .attr('r', 20)
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y})
        .attr('opacity', 0.5)
        .call(force.drag);

        group.selectAll('.loves')
        .data(nodes)
        .enter()
        .append('text')
        .attr('fill', function(d, i){
            return i % 2 === 0 ? 'red' : 'pink';
        })
        .text(function(d, i){
            return i % 2 === 0 ? 'X' : 'O';
        })
        .attr('font-size', 35)
        .call(force.drag);

        force.on('tick', tick);

        function tick() {
            group.selectAll('text')
            .attr('x', function(d){return d.px;})
            .attr('y', function(d){return d.py;});

            // shadows mimick behavor of text
            group.selectAll('circle')
            .attr('cx', function(d){return d.px + 40;})
            .attr('cy', function(d){return d.py + 100;});

            force.start();
        }
    }

    return {
        'init': init
    };
})();

window.onload = anniversary.init;
