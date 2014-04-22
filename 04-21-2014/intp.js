var intp = (function(){
    var dims         = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var increment   = 2;
    var padding     = 10;
    var MAX         = 10;
    var travelers   = [];
    var global_x    = 0;
    var global_y    = 0;

    function Traveler(x, y) {
        var self    = this;
        this.curx   = x || rando(width);
        this.cury   = y || rando(height)
        this.points = [];
        this.size   = 2;
        this.color  = 'rgba(0, 0, 0, 0.2)';

        this.render = function() {
            // simple.
            if(self.destroyed) return;
            var startx = rando(padding);
            var starty = rando(padding);

            self.curx = global_x;
            if(rando(10) > 5) {
                self.cury += increment;
            } else {
                self.cury -= increment;
            }

            // add block
            ctx.fillStyle = self.color;
            ctx.fillRect(self.curx, self.cury, self.size, self.size);
        };
        this.destroy = function() {
            self.destroyed = true;
        };
        this.animate = function() {
            // use RAF to constantly animate efficiently
            requestAnimationFrame(self.animate);
            self.render();
        };
    }

    function destroyAll() {
        for(var traveler in travelers) {
            travelers[traveler].destroy();
        }
    }

    function reset() {
        destroyAll();
        clearCanvas();
    }

    function textBlock(text, y, shift) {
        var w = 0;
        ctx.fillStyle = 'red';
        if(shift) {
            ctx.font = '22px Georgia';
            w = width / 6;
        } else {
            ctx.font = '14px Georgia';
            w = width / 10;
        }
        ctx.fillText(text, w, y);
    }

    function addAll() {
        textBlock('INTPs are philosophical innovators, fascinated by logical analysis, systems, and design.', 100);
        textBlock('They are preoccupied with theory, and search for the universal law behind everything they see.', 200, true);
        textBlock('They want to understand the unifying themes of life, in all their complexity. INTPs are detached, analytical observers who can seem oblivious to the world around them because they are so deeply absorbed in thought.', 300);
        textBlock('They spend much of their time focused internally: exploring concepts, making connections, and seeking understanding.', 400, true);
        textBlock('To the Architect, life is an ongoing inquiry into the mysteries of the universe.', 500);
        for(var i = 0; i <= 100; i++) {
            var traveler = new Traveler(rando(width), rando(height));
            traveler.animate();
            travelers.push(traveler);
        }
    }

    function init() {
        bootstrapCanvas(null, false);
        addAll();
        document.onmousemove = function(e) {
            global_x = e.x;
            global_y = e.y;
        };
    }

    return {
        'init': init
    };

})();

window.onload = intp.init;
