var circentric  = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var size        = 4;
    var states;

    function seed() {
        states = new Uint8Array(width);
        for (var i = 0, len = states.length; i < states.length; i++){
            if(rando(10) > 5) {
                states[i] = rando(width);
            }
            else if(rando(20) > 5) {
                states[i] = i;
            } else {
                states[i] = 10;
            }
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
        window.onmousedown = ctx.reset;
        seed();
        autopilot = setInterval(function(){
            for (var i = 0, len = states.length; i < states.length; i++){
                ctx.fillStyle = rgbString(states[rando(i)],states[i],states[i]);
                if(i * size > width) {
                    ctx.fillRect(i, rando(height), size, size);
                } else {
                    ctx.fillRect(rando(height), i, size, size);
                }
            }
        }, 20);
    }

    return {
        'init': init
    };

})();

window.onload = circentric.init;
