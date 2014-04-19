var motion = (function(){
    var dims         = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var increment   = 2;
    var padding     = 10;
    var MAX         = 10;

    function Traveler(x, y) {
        var self    = this;
        this.curx   = x || rando(width);
        this.cury   = y || rando(height);
        this.points = [];
        this.size   = 2;
        this.color  = randomColor(255, 0.7);

        this.render = function() {
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

            // randomly walk
            if(rando(padding) > 5) {
                self.curx += increment;
            } else {
                self.curx -= increment;
            }
            if(rando(padding) > 5) {
                self.cury += increment;
            } else {
                self.cury -= increment;
            }

            // push points for reference
            self.points.push({
                x: self.curx,
                y: self.cury
            });

            // add block
            ctx.fillStyle = self.color;
            ctx.fillRect(self.curx, self.cury, self.size, self.size);
        };
        this.animate = function() {
            // use RAF to constantly aniamte efficiently
            requestAnimationFrame(self.animate);
            self.render();
        };
    }

    function init() {
        bootstrapCanvas(null, false);
        for(var i = 0; i <= MAX; i++) {
            var traveler = new Traveler();
            traveler.animate();
        }
    }

    return {
        init: init
    };

})();

window.onload = motion.init;
