var treebox = (function(){
    'use strict';
    var dims    = getViewportDimensions();
    var width   = dims.width;
    var height  = dims.height;
    var reverse = true;
    var svg     = d3.select('body').append('svg')

    function init() {
        svg.attr('width', width)
        .attr('height', height);
        var max = width / 4;
        var nodes = randomHierarchical(rando(80) + 2, rando(5) + 2, max);

        var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(0.85)
        .radius(function(d) { return d.y; })
        .angle(function(d) { return d.x / 180 * Math.PI; });

        var fontScale = d3.scale.linear()
        .domain([0, width])
        .range([5, 100]);

        var colorScale = d3.scale.linear()
        .domain([0, max / 2, max])
        .range(['#540b80', '#13802f', '#2715d9']);

        var treemap = d3.layout.treemap()
        .size([width, height])
        .nodes(nodes);

        var cells = svg.selectAll('.cells')
        .data(treemap)
        .enter()
        .append('g');

        var boxes = cells.append('rect')
        .attr('x', function(d){return d.x;})
        .attr('y', function(d){return d.y;})
        .attr('width', function(d){return d.dx;})
        .attr('height', function(d){return d.dy;})
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('fill', function(d){return colorScale(d.value);});

        var text = cells.append('text')
        .attr('x', function(d){return d.x + d.dx / 2;})
        .attr('y', function(d){return d.y + d.dy / 2;})
        .attr('font-size', function(d){return fontScale(d.value);})
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .text(function(d){return d.value + ' / ' + d.name;});

        svg.on('mousedown', function(d){
            // animate them puppies
            if(reverse) {
                text.transition().duration(1000)
                .style('fill', 'white')
                .attr('x', function(d){return d.y + d.dy / 2;})
                .attr('y', function(d){return d.x + d.dx / 2;})
                .attr('height', function(d){return d.dx;})
                .attr('width', function(d){return d.dy});

                boxes.transition().duration(1000)
                .attr('x', function(d){return d.y;})
                .attr('y', function(d){return d.x;})
                .attr('height', function(d){return d.dx;})
                .attr('width', function(d){return d.dy});
            } else {
                text.transition().duration(1000)
                .style('fill', 'white')
                .attr('x', function(d){return d.x + d.dx / 2;})
                .attr('y', function(d){return d.y + d.dy / 2;})
                .attr('height', function(d){return d.dy;})
                .attr('width', function(d){return d.dx});

                boxes.transition().duration(1000)
                .attr('x', function(d){return d.x;})
                .attr('y', function(d){return d.y;})
                .attr('height', function(d){return d.dy;})
                .attr('width', function(d){return d.dx});
            }
            reverse = !reverse;
        });
}

return {
    'init': init
};
})();

window.onload = treebox.init;
