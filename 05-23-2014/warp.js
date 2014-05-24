var thinger = (function(){
    var dims;
    var canvas;
    var height;
    var width;
    var ctx;
    var time           = 0.1;
    var color_seed     = rando(255);
    var fg             = randomColor(color_seed, 0.3);
    // complementary
    var bg             = randomColor(Math.abs(255 - color_seed), 0.4);
    var tau            = Math.PI * 2;
    var PADDING        = 100;
    var SPEED_INCREASE = 100;
    var acids          = ['A', 'C', 'G', 'T', 'U'];
    var size           = 10;

    function strike() {
        ctx.beginPath();
        ctx.moveTo(0, rando(height));
        ctx.lineTo(width, rando(height));
        ctx.stroke();
    }

    function addBlocks() {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = fg;
        for(var i = 0; i <= width; i++) {
            var diff = (1 / width) * (i / height);
            var y = (1 + Math.sin(diff * time)) * (width - i) / 4;
            var basepair = randomArrayValue(acids) + ' ' + randomArrayValue(acids);

            ctx.fillText(basepair, i, height - y + PADDING);
            ctx.fillText(basepair, i, y +PADDING);

            ctx.fillRect(i, height - y - PADDING, size, size);
            ctx.fillRect(i, y + PADDING, size, size);
        }
        strike();
        time += SPEED_INCREASE;
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
        addBlocks();
    }
    return {
        'init': init
    };
})();

window.onload = thinger.init;
