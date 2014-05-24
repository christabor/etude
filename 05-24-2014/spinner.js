var spin = (function(){
    var dims;
    var canvas;
    var height;
    var width;
    var ctx;
    var rotation   = 0.1;
    var color_seed = rando(255);
    var fg         = randomColor(color_seed, 0.5);
    // complementary
    var bg         = randomColor(Math.abs(255 - color_seed));
    var tau        = Math.PI * 2;
    var size       = 10;
    var mouseX     = 0;
    var mouseY     = 0;

    function circle(x, y, length, radius) {
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.arc(x, y, radius, length, tau);
        ctx.fill();
    }

    function clear() {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
    }

    function addRow(y) {
        var offset = width / size;
        for(var i = 0; i < 10; i++) {
            ctx.fillStyle = fg;
            circle(i * offset, y, 360 / i + rotation, i * 4);
            circle(i * offset, y, 360 / i + rotation - i * 2, i);

            circle(i * offset, y, 360 / i + rotation - i, mouseY / 10);
            circle(i * offset, y, 360 / i + rotation - i, mouseX / 10);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(i * offset, 0, 2, height);
            ctx.fillRect(i * offset, y, width, 2);
            ctx.fill();
        }
    }

    function addBlocks() {
        clear();
        rotation += 0.2;
        var len = (height / size) / 2;
        for(var i = 0; i <= len; i++) {
            addRow(i * 40);
        }
        requestAnimationFrame(addBlocks);
    }

    function init() {
        dims   = getDocumentDimensions();
        canvas = document.getElementById('canvas');
        height = dims.height;
        width  = dims.width;
        ctx    = canvas.getContext('2d');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        document.onmousemove = function(e) {
            mouseX = e.x;
            mouseY = e.y;
        }
        addBlocks();
    }
    return {
        'init': init
    };
})();

window.onload = spin.init;
