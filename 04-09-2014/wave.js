var subd = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var startx      = width;
    var starty      = rando(height);
    var increment   = 10;
    var max_b4_turn = 50;
    var current     = 0;
    var max         = rando(width / 10);

    function reset() {
        ctx.fillStyle = ctx.strokeStyle = randomColor(255);
        current = 0;
        startx = rando(width);
        starty = rando(height);
    }

    function randomSquareIsh(e) {
        if(current >= max_b4_turn) {
            reset();
        }
        ctx.beginPath();
        ctx.lineWidth = rando(4);
        ctx.moveTo(startx, starty);
        ctx.lineWidth = 0.3;
        ctx.lineTo(e.x + increment, e.y - increment);
        ctx.lineTo(startx / e.y, starty / e.x);
        ctx.stroke();
        startx += increment;
        starty += increment;
        current += 1;
    }

    function init() {
        bootstrapCanvas(null, false);
        ctx.fillStyle = 'white';
        ctx.lineJoin = 'round';
        ctx.fillRect(0, 0, width, height);
        document.onmousemove = randomSquareIsh;
    }

    return {
        init: init
    };

})();
window.onload = subd.init;
