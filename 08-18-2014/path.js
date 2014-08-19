window.onload = function(){
    'use strict';
    var dims       = getViewportDimensions();
    var width      = dims.width;
    var height     = dims.height;
    var elements   = [];
    var container  = getSVG('container', dims, 'body');
    var path_scale = d3.scale.linear().domain([]).range([]);

    function randomTransformation(d) {
        var is_little = d.path.length < 300;
        // outsource functions for readability
        return rotate(rando(360)) + ', ' + scale(is_little) + ', ' + translation(path_scale(d.path.length), path_scale(d.path.length));
    }

    function rotate(amt) {
        return 'rotate(' + amt + ')';
    }

    function scale(is_little) {
        return 'scale(' + (is_little ? 20 : 2) + ')';
    }

    function init() {
        d3.json('svg.json', function(data){
            // update scale once data is loaded
            path_scale.domain([
                d3.min(data, function(d){return d.path.length;}),
                d3.max(data, function(d){return d.path.length;})
            ])
            .range([-100, -dims.width / 2]);

            // add all path data
            var group = container.append('g');
            group.selectAll('path')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', randomTransformation)
            .append('path')
            .attr('stroke-width', 1)
            .attr('stroke', 'white')
            .transition()
            .delay(function(d, i){return i * 0.3;})
            .attr('stroke', 'black')
            .attr('stroke-width', function(d){
                // only make thick strokes for smaller,
                // less complex elements
                return d.path.length < 300 ? 10 : 0.2;
            })
            .attr('opacity', function(){return rando(10) * 0.1;})
            .attr('fill', 'black')
            .attr('d', function(d){return d.path + 'Z';})
        });
    }

    init();
};
