var oscillate = (function() {
    var dims      = getViewportDimensions();
    var h         = dims.height / 1.5;
    var w         = dims.width;
    var scale     = 10;
    var distance  = 1;
    var curr_iter = 10;
    var MAX_ITER  = 400;
    var _flowers  = [];
    var SEED      = 20;

    function init() {
        bootstrapCanvas(null, false, 'canvas');
        canvas_elem.setAttribute('height', h);
        plant();
        bloom();
    }

    function plant() {
        var self = this
        _flowers = [];
        // "Seed data"
        for(var i = 0; i < SEED; i++) {
            var f = new Flower(rando(w), rando(h));
            _flowers.push(f);
        }
    }

    function bloom() {
        if(curr_iter >= MAX_ITER) return false;
        for(var i = 0, len = _flowers.length; i < len; i++) {
            _flowers[i].draw();
        }
        curr_iter += 1;
        requestAnimationFrame(bloom);
    }

    function Flower(x, y) {
        var GROWTH_RATE = 2;
        var self        = this;
        var radius      = 40;
        var pos         = 2;

        this._draw = function(size) {
            var half = size / 2;
            ctx.save();
            for(var i = 1; i < 10; i++) {
                ctx.rotate(i * 36);
                ctx.strokeStyle = 'rgba('+ Math.abs(w / 2 - x) +', 100, 255, 0.1)';
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.quadraticCurveTo(x + pos, y + size + (half), x + size, y + size);
                ctx.stroke();
            }
            ctx.restore();
            pos += GROWTH_RATE;
            if(rando(10) > 5) {
                radius -= 0.5;
            } else {
                radius += 0.5;
            }
        };

        this.draw = function() {
            self._draw(radius);
        };
    }

    return {
        'init': init
    };
})();

window.onload = oscillate.init;
