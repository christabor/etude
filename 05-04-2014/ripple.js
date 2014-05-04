var rapple = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');

    function Star(x, y) {
        var distance = 30;
        var self = this;
        var max_iters = 40;
        this.x = x;
        this.y = y;

        this.circle = function(radius, x, y) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x || self.x, y || self.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        };
        this.drip = function() {
            for(var i = 0; i <= max_iters; i += 1) {
                (function(i){
                    setTimeout(function(){
                        if(i < Math.floor(max_iters / 4)) {
                            ctx.strokeStyle = 'rgba(' + rando(255) + ',' + rando(255) + ', ' + rando(255) + ', 0.2)';
                        } else {
                            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                        }
                        self.circle((i * i * 2) * 0.04, x, y);
                    }, i * 10);
                })(i);
            }
        };
        this.draw = function() {
            self.drip();
        };
        self.draw();
    }

    function reset() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onclick = reset;
        setInterval(function(){
            var d = new Star(rando(width), rando(height));
        }, 100);
    }

    return {
        'ripple': init
    };

})();

window.onload = rapple.ripple;
