var voro = (function(){
    'use strict';
    var scale            = 1;
    var dims             = getViewportDimensions();
    var width            = dims.width * scale;
    var height           = dims.height * scale;
    var svg              = d3.select('body').append('svg')
    var colorScale       = d3.scale.linear().domain([0, height]).range(['black', 'white'])
    var activeColorScale = d3.scale.linear().domain([height, 0]).range(['purple', 'yellow'])
    var path;
    var voronoi;
    var vertices;

    function addBlobs() {
        svg.attr('width', width).attr('height', height);
        // Originally based on: http://bl.ocks.org/mbostock/4060366
        vertices = d3.range(20).map(function(d) {
            return [rando(width), rando(height)];
        });
        voronoi = d3.geom.voronoi()
        .clipExtent([[0, 0], [width, height]]);
        svg.on('mousemove', function() {
            vertices[0] = d3.mouse(this);
            redraw();
        });
        path = svg.append('g').selectAll('path');
        redraw();
    }

    function polygon(d) {
        return 'M' + d.join('L') + 'Z';
    }

    function redraw() {
        path = path.data(voronoi(vertices), polygon);
        path.exit().remove();
        path.enter().append('path')
        .attr('d', polygon)
        .style('fill', function(d, i){
            var val = d[0][1];
            // make the active (first) a different color.
            return i === 0 ? activeColorScale(val) : colorScale(val);
        });
        path.order();
        // create "sub-fragments" by adding a new point at the
        // last known mouse position.
        vertices.push([vertices[0][0], vertices[0][1]]);
    }

    return {
        'init': addBlobs
    };
})();

window.onload = voro.init;
