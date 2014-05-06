var trail = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');

    function Square(x, y) {
        var distance = 30;
        var self = this;
        var max_iters = 10;
        this.x = x;
        this.y = y;
        this.draw = function() {
            ctx.lineWidth = 1;
            for(var i = 0; i <= max_iters; i += 1) {
                (function(i){
                    setTimeout(function(){
                        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                        ctx.strokeRect(x, y, i * i, i * i);
                    }, i * 50);
                })(i);
            }
        };
        self.draw();
    }

    function reset() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onclick = reset;
        window.onmousemove = function(e) {
            var d = new Square(e.x, e.y);
        }
    }

    return {
        'init': init
    };

})();

window.onload = trail.init;
