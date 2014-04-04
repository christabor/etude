var zagg = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var max         = 100;
    var size        = 40;
    var spacing     = 4;

    function lineGroup(x, y) {
        ctx.fillStyle = 'none';
        ctx.beginPath();
        for(var i = 0; i <= max; i += spacing) {
            (function(i){
                setTimeout(function(){
                    ctx.moveTo(x, y);
                    ctx.lineTo(x - i, y + i);
                    ctx.lineTo(x + i, y + i);
                    ctx.lineTo(x + i, y - i);
                    ctx.lineTo(x - i, y - i);
                    ctx.stroke();
                }, i * 4);
            })(i);
        }
    }

    function init() {
        bootstrapCanvas(null, false);
        ctx.clear = function() {
            ctx.fillStyle = 'black';
            this.fillRect(0, 0, width, height);
        };
        ctx.reset = function() {
            ctx.clear();
            current = 0;
        }
        window.onmousedown = function(){exportCanvas(canvas)};
        setInterval(function(){
            canvas.style.backgroundColor = randomColor(40);
            ctx.strokeStyle = randomColor(255);
            var x = rando(width);
            var y = rando(height);
            lineGroup(x, y);
        }, 100);
    }

    return {
        'init': init
    };

})();

window.onload = zagg.init;
