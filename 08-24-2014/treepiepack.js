window.onload = function(){
    'use strict';
    var dims       = getViewportDimensions();
    var width      = dims.width;
    var height     = dims.height;
    var container  = getSVG('container', dims, 'body');

    function init() {
        var MAX_PIE  = 4;
        var data     = randomHierarchical(rando(30), 0, width, 5);
        var pie      = d3.layout.pie()(d3.range(MAX_PIE));
        var diagonal = d3.svg.diagonal();
        var pack     = d3.layout.treemap()
                       .padding(4)
                       .size([width, height]);
        var color    = d3.scale.linear().range(['purple', 'red']);
        var nodes    = pack.nodes(data);
        var links    = pack.links(nodes);
        var arc      = d3.svg.arc();
        var color2   = d3.scale.linear().range(['red', 'brown']);

        color.domain([0, MAX_PIE]);
        color2.domain([0, MAX_PIE]);

        container.selectAll('rect')
        .data(nodes)
        .enter()
        .append('rect')
        .attr('stroke', 'none')
        .attr('fill', function(d, i){
            if(!d.parent) return 'none';
            return color2(i);
        })
        .attr('x', function(d){return d.x;})
        .attr('y', function(d){return d.y;})
        .attr('height', function(d){return d.dx;})
        .attr('width', function(d){return d.dy;});

        container
        .selectAll('g')
        .data(nodes)
        .enter()
        .append('g')
        .attr('transform', function(d){return translation(d.x, d.y);})
        .selectAll('.arc')
        .data(pie)
        .enter()
        .append('path')
        .attr('fill', function(d, i){
            return color(i);
        })
        .attr('d', function(d){
            arc.innerRadius(20);
            arc.outerRadius(100);
            return arc(d);
        });

        container
        .selectAll('.circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('opacity', 0.2)
        .attr('fill', 'none')
        .attr('stroke', function(d, i){
            if(!d.parent) return 'none';
            return 'white';
        })
        .attr('cx', function(d){return d.x + d.dx / 2;})
        .attr('cy', function(d){return d.y + d.dy / 2;})
        .attr('r', function(d){return d.size / 10;});
    }

    init();
};
