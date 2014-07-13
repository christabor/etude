var scrollsy = (function(){
    'use strict';

    function init() {
        var MAX        = 10000;
        var pos        = 1;
        var BAR_HEIGHT = 100;
        var COUNT      = 10;
        var dims       = {'width': MAX, 'height': window.innerHeight};
        var el         = getSVG('banner', dims, '#container');
        var interval;

        function addBlocks() {
            // add all blocks once, but with a delay that
            // syncs with scrolling
            el.selectAll('rect')
            .data(d3.range(MAX))
            .enter()
            .append('rect')
            .attr('height', 0)
            .attr('width', 10)
            .attr('fill', 'black')
            .attr('x', function(d, i){return i * 2 + 100;})
            .transition()
            .delay(function(d, i){return i * 15;})
            .attr('fill', function(){return randomColor(255);})
            .attr('y', function(d, i){return rando(dims.height);})
            .attr('height', BAR_HEIGHT);
        }
        d3.timer(function(d){
            // constant scroll
            if(pos >= MAX) return true;
            window.scrollTo(pos, 0);
            pos += 2;
        });

        addBlocks();
    }

    return {
        'init': init
    };
})();

window.onload = scrollsy.init;
