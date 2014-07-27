var geoflower = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var range     = 540;
    var time      = 0;
    var interval  = range * 10 + 100;
    var container = getSVG('map', dims, 'body');
    var timer     = container.append('text')
                    .attr('x', 40)
                    .attr('y', 100)
                    .attr('fill', 'rgba(255,255,255,0.2)')
                    .attr('font-size', 100)
                    .text(time);
    var group     = container.append('g')
                    .attr('transform', getCenterTranslation(dims));

    function data() {
        var initial_degree = rando(range);
        return d3.range(range).map(function(i){
            return calculateRadialAngle(initial_degree, i, i);
        });
    }

    function draw() {
        log(time);
        // clear 'canvas'
        group.selectAll('g').remove();
        var circs = group.append('g')
        .selectAll('circle')
        .data(data())
        .enter()
        .append('circle')
        .attr('r', 0)
        .attr('opacity', 0)
        .transition()
        .delay(function(d, i){return i * 10;})
        .attr('r', function(d, i){return i / 10;})
        .attr('stroke', randomColor(255))
        .attr('fill', function(d, i){
            return i % 2 === 0 ? randomColor(255) : 'none';
        })
        .attr('opacity', 0.3)
        .attr()
        .attr('cx', function(d, i){return d[0];})
        .attr('cy', function(d){return d[1]});
        time = 0;
    }

    function runClock() {
        timer.text(time);
        time += 1;
    }

    function init() {
        d3.select('body').on('mousedown', draw);
        // interval is based on animation duration for all elements
        // (10 * i * range)
        setInterval(draw, interval);
        draw();
        // set timer to track the clock visually
        d3.timer(runClock);
    }

    return {
        'init': init
    };
})();

window.onload = geoflower.init;
