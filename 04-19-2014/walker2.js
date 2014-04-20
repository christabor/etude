var motion = (function(){
    var dims         = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var increment   = 2;
    var padding     = 10;
    var MAX         = 10;
    var travelers   = [];
    var formulas    = {
        plain: function(size, curx, cury) {
            return size;
        },
        bigbleed: function(size, curx, cury) {
            return size + rando(10) * 0.1;
        },
        tangent: function(size, curx, cury) {
            return Math.tan(curx + cury) * 0.1;
        },
        fatter: function(size, curx, cury) {
            return (curx + cury) * 0.008;
        }
    };
    var current     = formulas.fatter;

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

            // reset points, "wrap" around the screen
            if(self.curx >= width) {
                self.curx = 0;
            } else if(self.curx <= 0) {
                self.curx = width;
            }
            if(self.cury >= height) {
                self.cury = 0;
            } else if(self.cury <= 0) {
                self.cury = height;
            }
            self.size = current(self.size, self.curx, self.cury);

            // randomly walk
            if(startx > starty) {
                self.curx += increment;
            } else {
                self.cury += increment;
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

    function setActive(e) {
        current = formulas[this.getAttribute('id')];
    }

    function addEvent(name) {
        document.getElementById(name).onclick = setActive;
    }

    function init() {
        bootstrapCanvas(null, false);
        var container = document.getElementById('funcs');
        buttonsWithFuncs(container, formulas, setActive, 'btn btn-red btn-block');
        window.onmousemove = function(e) {
            var traveler = new Traveler(e.x, e.y);
            traveler.animate();
            travelers.push(traveler);
        };
        document.onclick = function(){
            reset();
        };
    }

    return {
        init: init
    };

})();

window.onload = motion.init;
