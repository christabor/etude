var drippler = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var blocks      = [];
    var prevx       = 0;
    var prevy       = 0;
    var sx          = 0;
    var sy          = 0;

    function Drop(x, y) {
        var distance = 30;
        var self = this;
        var size = 4;
        this.x = x;
        this.y = y;
        this.color = randomColor(255);

        this.circle = function(radius, x, y) {
            ctx.fillStyle = self.color;
            ctx.beginPath();
            ctx.arc(x || self.x, y || self.y, radius, 0, Math.PI * 2);
            ctx.fill();
        };
        this.drip = function() {
            for(var i = 0; i <= 10; i += 1) {
                (function(i){
                    setTimeout(function(){
                        if(sx > prevx) {
                            self.circle(size + i / 2, self.x, sy + i * 10);
                        } else {
                            self.circle(size + i / 2, self.x, sy - i * 10);
                        }
                    }, i * 20);
                })(i);
            }
            ctx.fillRect(self.x, sy, width, 1);
        };
        this.draw = function() {
            self.circle(size);
            self.drip();
        };
        self.draw();
    }

    function render() {
        var d = new Drop(rando(width), rando(height));
        d.draw();
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function reset() {
        ctx.fillStyle = randomColor(255);
        ctx.fillRect(0, 0, width, height);
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onclick = reset;
        window.onmousemove = function(e) {
            prevx = sx;
            prevy = sy;
            sx = e.x;
            sy = e.y;
        };
        animate();
    }

    return {
        'dropple': init
    };

})();

window.onload = drippler.dropple;
