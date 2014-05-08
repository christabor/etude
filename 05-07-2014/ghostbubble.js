var trail = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var bg_color    = '#183631';
    var canvas_elem = document.querySelector('canvas');

    function GhostCircle(x, y) {
        var self = this;
        var max_iters = 8;
        var total = 0;
        var interval;
        this.els = [];
        this.circle = function(radius, x, y) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();
        };
        this.burst = function(x, y) {
            ctx.lineWidth = 1;
            ctx.fillStyle = 'none';
            for(var i = 0; i <= max_iters; i += 1) {
                (function(i){
                    setTimeout(function(){
                        self.els.push([x, y]);
                        self.circle(i, x, y);
                        total += 1;
                    }, i * 50);
                })(i);
            }
        };
        this.reset = function() {
            clearInterval(interval);
            total = 0;
            self.els = [];
        };
        this.render = function() {
            if(total >= 500) {
                self.reset();
            }
            ctx.strokeStyle = bg_color;
            for(var i = 0, len = self.els.length - 1; i <= len; i++) {
                (function(i){
                    setTimeout(function(){
                        self.circle(i, self.els[i][0], self.els[i][1]);
                        total += 1;
                    }, i * 10);
                })(i);
            }
        }
        this.animate = function() {
            interval = setInterval(self.render, 500);
        };
        this.fizzle = function(x, y) {
            for(var i = max_iters; i >= 0; i--) {
                (function(i){
                    setTimeout(function(){
                        self.els.push([x, y]);
                        ctx.strokeStyle = 'rgba(129, 205, 164, ' + i * 0.02 + ')';
                        self.circle(i * 3, x, y);
                        total += 1;
                    }, i * 10);
                })(i);
            }
        };
        self.fizzle(x, y);
        self.burst(x, y);
        self.animate();
    }

    function reset() {
        ctx.fillStyle = bg_color;
        ctx.fillRect(0, 0, width, height);
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onclick = reset;
        window.onmousemove = function(e) {
            var d = new GhostCircle(e.x, e.y);
        }
    }

    return {
        'init': init
    };

})();

window.onload = trail.init;
