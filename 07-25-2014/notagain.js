var notagain = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var container = getSVG('map', dims, 'body');
    var group     = container.append('g');
    var last_pos  = [0, 0];
    var line      = d3.svg.line();

    function init() {
        container.on('mousedown', function(){
            var path_group = container.append('g');
            var data = [
                [d3.event.y, d3.event.x],
                last_pos,
                [last_pos[1], last_pos[0]],
                [d3.event.x, d3.event.y]
            ];
            addNgon(6, d3.event.x, d3.event.y);
            container.selectAll('.foo')
            .data([data])
            .enter()
            .append('path')
            .attr('fill', function(d){
                return randomColor(255);
            })
            .attr('opacity', 0.2)
            .attr('d', line);

            // update after for next cycle
            last_pos = [d3.event.x, d3.event.y];
        });
    }

    function addNgon(index, w, h) {
        var pos    = translation(w, h);
        var ngroup = group.append('g').attr('transform', pos).classed('ngon', true);
        var _ngon  = d3_geometer.nGon(ngroup);
        var ngon   = _ngon(index * 10, rando(10) + 3);

        ngon
        .drawLabels()
        .drawVertices()
        .drawCenterPoint(height, width, true)
        .drawNearAdjacentEdges(null);

        ngroup.attr('opacity', 0)
        .transition()
        .delay(index * 10)
        .attr('opacity', 1);
    }

    return {
        'init': init
    };
})();

window.onload = notagain.init;
