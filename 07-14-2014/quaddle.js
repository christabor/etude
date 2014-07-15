var quaddle = (function(){
    'use strict';

    console.clear();

    function init() {
        var dims = getViewportDimensions();
        var el   = getSVG('banner', dims, '#container');
        var height = dims.height;
        var width = dims.width;
        var group = el.append('g');
        var BAR_HEIGHT = 3;
        var SIZE = 4;
        var MIN_PROXIMITY = 50;
        var MAX_SIZE = 8;
        var distance_scale = d3.scale.linear()
        .domain([0, width / 2])
        .range(['red', 'blue']);

        var data = d3.range(100).map(function(d){
            return [rando(width), rando(height)];
        });

        var quad = d3.geom.quadtree()
        .extent([[-1, -1], [width, height]])(data);

        var tree = group.selectAll('.node')
        .data(collapse(quad))
        .enter()
        .append('rect')
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('x', function(d){return d.x})
        .attr('y', function(d){return d.y})
        .attr('width', function(d){return d.width;})
        .attr('height', function(d){return d.height;});

        d3.range(10).map(function(){
            quad.add(rando(width), rando(height));
        });

        el.on('mousemove', function(d){
            // bastardizing the quad tree
            tree.attr('stroke', function(d){
                return distance_scale(Math.abs(d3.event.x - d.x));
            })
            .attr('width', function(d){
                return Math.abs(d.x - d3.event.x);
            })
            .attr('height', function(d){
                return Math.abs(d.y - d3.event.y);
            });

            quad.add(d3.event.x, d3.event.y);

            quad.visit(function(node, x1, y1, x2, y2){

                if(!node.x || !node.y) return;
                if(node.x === d3.event.x && node.y === d3.event.y) return;
                var dist_x = Math.abs(d3.event.x - node.x);
                var dist_y = Math.abs(d3.event.y - node.y);
                if(dist_x <= MIN_PROXIMITY && dist_y <= MIN_PROXIMITY) {
                    group.append('circle')
                    .attr('cx', node.x)
                    .attr('cy', node.y)
                    .attr('fill', 'white')
                    .attr('r', dist_y / 10);
                }
            });
        });

        function collapse(quadtree) {
            // http://bl.ocks.org/mbostock/4343214
            var nodes = [];
            quadtree.visit(function(node, x1, y1, x2, y2){
                nodes.push({'x': x1, 'y': y1, 'width': x2 - x1, 'height': y2 - y1});
            });
            return nodes;
        }
    }

    return {
        'init': init
    };
})();

window.onload = quaddle.init;
