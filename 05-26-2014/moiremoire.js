var moiremoire = (function(){
    var dims;
    var canvas;
    var height;
    var width;
    var ctx;
    var time = 0;

    function radium(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        for(var i = 0; i < time; i++) {
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.lineTo(Math.tan(i) * width, Math.cos(i) * height);
            ctx.lineTo(width, height);
        }
        ctx.closePath();
        if(time > 5000) {
            time = 0;
        }
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = time / 100 + 'px arial';
        ctx.fillText('Moire', x, y);
    }

    function init() {
        dims   = getDocumentDimensions();
        canvas = document.getElementById('canvas');
        height = dims.height;
        width  = dims.width;
        ctx    = canvas.getContext('2d');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        document.onmousemove = function(e){
            radium(rando(height), rando(width));
            radium(e.x, e.y);
            time += 10;
        };
    }

    return {
        'init': init
    };
})();

window.onload = moiremoire.init;
