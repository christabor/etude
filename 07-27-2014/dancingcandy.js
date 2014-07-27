var candy = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var time      = 0;
    var magnitude = 1;
    var iters     = 10;
    var canvas    = d3.select('body')
                    .append('canvas')
                    .attr('width', width)
                    .attr('height', height);
    var ctx       = canvas.node().getContext('2d');
    var rav       = randomArrayValue;
    var colors    = ['blue', 'red', 'orange', 'green', 'yellow', 'pink'];
    var color     = d3.scale.linear()
                    .domain([0, iters])
                    .range([rav(colors), rav(colors)]);
    var position  = [width / 2, height / 2];
    var tau       = Math.PI * 2;

    function updatePos() {
        position = [d3.event.x, d3.event.y];
    }

    function addShape() {
        var pos;
        for(var i = 0; i <= iters; i++) {
            magnitude = i % 2 === 0 ? magnitude + 1 : magnitude - 1;
            pos = calculateRadialAngle(40, i, magnitude);
            ctx.lineWidth = magnitude / 4;
            ctx.strokeStyle = color(i);
            ctx.beginPath();
            ctx.moveTo(position[0], position[1]);
            ctx.lineTo(position[0] - pos[0], position[1] - pos[1]);
            ctx.lineTo(position[0] + pos[0], position[1] + pos[1]);
            ctx.stroke();
        }

        // leave more "residue" as outer lines
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        clear();
    }

    function clear() {
        // add a subtle "residue" of last drawing
        // inspired by http://bl.ocks.org/mbostock/5397710
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, width, height);
        magnitude = rando(100);
    }

    function resetColors() {
        // periodically reset color domain
        color.range([rav(colors), rav(colors)]);
    }

    function init() {
        canvas.on('mousemove', updatePos);
        d3.timer(addShape);
        setInterval(resetColors, 2000);
    }

    return {
        'init': init
    };
})();

window.onload = candy.init;
