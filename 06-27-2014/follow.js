var follow = (function(){
    'use strict';

    var _dims = getViewportDimensions();
    var height = _dims.height;
    var width = _dims.width;
    var RADIUS = 10;
    var dims = {'w': width, 'h': height};
    var MAX = 300;
    var colorScale = d3.scale.linear()
    .domain(d3.range(5).map(function(d){return d * 100;}))
    .range(['red', 'purple', 'green', 'orange', 'blue'])
    .clamp(true);
    var cont = getSVG('lines', dims, 'body');

    function init() {
        var group = cont.append('g');
        var i = 0;
        cont.style('background-color', '#000');
        cont.on('mousemove', function(){
            // reset colors
            if(i >= MAX) { i = 0;}
            group.append('circle')
            .attr('r', 0)
            .transition()
            .delay(i)
            .attr('cx', d3.event.x)
            .attr('cy', d3.event.y)
            .attr('r', RADIUS)
            .attr('fill', colorScale(i));
            i += 1;

            cont.style('background-color', colorScale(i));
        });

    }

    return {
        'init': init
    };

})();

window.onload = follow.init;
