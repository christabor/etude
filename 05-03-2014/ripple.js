var rapple = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');

    function Ripple(x, y) {
        var distance = 30;
        var self = this;
        this.x = x;
        this.y = y;

        this.circle = function(radius, x, y) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x || self.x, y || self.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        };
        this.drip = function() {
            for(var i = 0; i <= 20; i += 1) {
                (function(i){
                    setTimeout(function(){
                        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (i * 0.02) +')';
                        self.circle((i * i * 2) * 0.04, x, y);
                        self.circle((i * i * 2) * 0.04, y, x);
                        self.circle((i * i * 1) * 0.02, x / 2, y / 2);
                        self.circle((i * i * 1) * 0.02, y / 2, x / 2);
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
        ctx.fillStyle = '#648bbd';
        ctx.fillRect(0, 0, width, height);
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onclick = reset;
        window.onmousemove = function(e) {
            var d = new Ripple(e.x, e.y);
        };
    }

    return {
        'ripple': init
    };

})();

window.onload = rapple.ripple;
