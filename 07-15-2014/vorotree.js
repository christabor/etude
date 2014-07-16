var vorotree = (function(){
    'use strict';

    function init() {
        var dims          = getViewportDimensions();
        var el            = getSVG('spacegrid', dims, '#container');
        var height        = dims.height;
        var width         = dims.width;
        var group         = el.append('g');
        var BAR_HEIGHT    = 3;
        var SIZE          = 5;
        var MIN_PROXIMITY = 50;
        var MAX_SIZE      = 8;
        var PADDING       = 0;

        var voro = d3.geom.voronoi()
        .clipExtent([[PADDING, PADDING], [width - PADDING, height - PADDING]]);

        var data = d3.range(200).map(function(d){
            return [rando(width), rando(height)];
        });

        var color_scale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d[0];})])
        .range(['#3c0277', 'red']);

        var color_scale_s = d3.scale.linear()
        .domain([0, width])
        .range(['#ffab18', 'yellow']);

        var quad = d3.geom.quadtree()
        .extent([[-1, -1], [width, height]])(data);

        var vnodes = voro(data);
        var tree;
        var force;

        d3.range(10).map(function(){
            quad.add(rando(width), rando(height));
        });

        group.selectAll('path')
        .data(vnodes)
        .enter()
        .append('path')
        .attr('opacity', 0.4)
        .style('fill', function(d, i){return color_scale(i);})
        .attr('d', function(d){return 'M' + d.join('L') + 'Z';});

        var nodes = d3.range(200).map(function(d){
            return {'index': d};
        });

        tree = group.selectAll('.node')
        .data(flattenQuadtree(quad))
        .enter()
        .append('rect')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('opacity', 0.4)
        .attr('fill', 'none')
        .attr('x', function(d){return d.x})
        .attr('y', function(d){return d.y})
        .attr('width', function(d){return d.width;})
        .attr('height', function(d){return d.height;})
        .on('mouseover', function(d){
            triangles.attr('opacity', 0.1)
            circs.attr('opacity', 0.1)
            return tree.attr('opacity', 1);
        })
        .on('mouseout', function(d){
            triangles.attr('opacity', 0.4)
            circs.attr('opacity', 0.4)
            return tree.attr('opacity', 0.4);
        });

        var triangles = group.selectAll('path')
        .data(voro.triangles(data))
        .enter()
        .append('path')
        .attr('stroke-width', 2)
        .attr('stroke', function(d, i){return color_scale_s(i);})
        .style('fill', 'none')
        .attr('d', function(d){return 'M' + d.join('L')  + 'Z';})
        .on('mouseover', function(d){
            tree.attr('opacity', 0.1)
            circs.attr('opacity', 0.1)
            return triangles.attr('opacity', 1);
        })
        .on('mouseout', function(d){
            tree.attr('opacity', 0.4)
            circs.attr('opacity', 0.4)
            return triangles.attr('opacity', 0.4);
        });

        // standard dots
        var circs = group.selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('opacity', 0.4)
        .style('fill', '#fffcb8')
        .attr('transform', function(d){ return 'translate(' + d + ')';})
        .attr('r', SIZE)
        .on('mouseover', function(d){
            d3.select(this).transition().delay(100).attr('r', SIZE * 4);
            triangles.attr('opacity', 0.1);
            tree.attr('opacity', 0.1);
            return circs.attr('opacity', 1);
        })
        .on('mouseout', function(d){
            d3.select(this).transition().delay(100).attr('r', SIZE);
            triangles.attr('opacity', 0.4);
            tree.attr('opacity', 0.4);
            return circs.attr('opacity', 0.4);
        });
    }

    return {
        'init': init
    };
})();

window.onload = vorotree.init;
