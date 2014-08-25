window.onload = function(){
    'use strict';
    var dims       = getViewportDimensions();
    var width      = dims.width;
    var height     = dims.height;
    var container  = getSVG('container', dims, 'body');

    function init() {
        var MAX_PIE  = 6;
        var data     = randomHierarchical(rando(30) + 1, rando(10), width, 5);
        var pie      = d3.layout.pie()(d3.range(MAX_PIE));
        var diagonal = d3.svg.diagonal();
        var pack     = d3.layout.pack()
        .padding(4)
        .size([width, height]);
        var color    = d3.scale.linear().range(['red', 'orange']);
        var nodes    = pack.nodes(data);
        var links    = pack.links(nodes);
        var arc      = d3.svg.arc();

        color.domain([0, MAX_PIE]);

        container
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('transform', function(d){
            return translation(d.x, d.y);
        })
        .selectAll('.arc')
        .data(pie)
        .enter()
        .append('path')
        .attr('fill', function(d, i){
            return color(i);
        })
        .attr('d', function(d){
            arc.innerRadius((d.value + 1) * 2);
            arc.outerRadius((d.value + 1) * 10);
            return arc(d);
        })
        .attr('opacity', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('opacity', function(d, i){
            // make opacity "stepped"
            return ((i * 0.1) / 4) + 0.1;
        });

        container.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('fill', function(d, i){
            if(!d.parent) return 'none';
            return i % 2 === 0 ? 'orange' : '#ccc';
        })
        .attr('opacity', 0.1)
        .attr('cx', function(d){return d.x;})
        .attr('cy', function(d){return d.y;})
        .attr('r', 1)
        .transition()
        .delay(function(d, i){return i * 10;})
        .attr('r', function(d){return d.r;});
    }

    init();
};
