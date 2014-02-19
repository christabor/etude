var cycler = (function(){

    function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
    }

    function cycle(event) {
        var offset = 2;
        var total = 1000;
        var max = total + offset;

        for(var i = 1; i <= max; i += offset) {
            $('body').css('background-color', randomColor(i));
            var start_h = event.clientY;
            var start_w = event.clientX;
            log(randomColor(i));
            ctx.beginPath();
            ctx.moveTo(start_w + i * 2, start_h + i * 2);
            ctx.bezierCurveTo(start_w, start_h, start_h, start_w, i * 10, i * 4);
            ctx.strokeStyle = randomColor(i);
            ctx.stroke();
        }
    }

    function init() {
        bootstrapCanvas(null, false);
        canvas.selection = true;
        $('body').on('mousemove', cycle);
        $('body').on('click', clearCanvas);
    }

    return {
        'init': init
    };
})();

$(document).ready(cycler.init);
