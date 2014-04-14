var subd = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var current     = 0;
    var MAX         = 100;

    function setGradient(){
        var grd = ctx.createLinearGradient(0, 0, width / 2, height / 2);
        grd.addColorStop(0, randomColor(255));
        grd.addColorStop(0.5, randomColor(255));
        grd.addColorStop(1, randomColor(255));
        ctx.fillStyle = grd;
    }

    function checkCount() {
        if(current >= MAX) {
            ctx.clearRect(0, 0, width, height);
            current = 0;
        }
    }

    function Triangle(x, y) {
        var self = this;
        this.x1 = rando(width);
        this.y1 = height;
        this.x2 = rando(width);
        this.y2 = height;
        this.x3 = x;
        this.y3 = y;
        this.drawInner = function() {
            setGradient(self.x1 / 2, self.y3 / 2);
            ctx.beginPath();
            ctx.moveTo(self.x1, self.y1);
            ctx.lineTo(self.x2 / 2, self.y2 / 2);
            ctx.lineTo(self.x3, self.y3);
            ctx.closePath();
            ctx.fill();

            setGradient(self.x1, self.y3);
            ctx.beginPath();
            ctx.moveTo(self.x1, self.y1);
            ctx.lineTo(self.x2 / 2, self.y2 / 2);
            ctx.lineTo(self.x3, self.y3);
            ctx.closePath();
            ctx.fill();
        };
        this.draw = function() {
            setGradient();
            ctx.beginPath();
            ctx.moveTo(self.x1, self.y1);
            ctx.lineTo(self.x2, self.y2);
            ctx.lineTo(self.x3, self.y3);
            ctx.closePath();
            ctx.fill();
            self.drawInner();
        };
    }

    function drawAll(e) {
        checkCount();
        var triangle = new Triangle(e.clientX, e.clientY);
        triangle.draw();
        current += 1;
    }

    function init() {
        bootstrapCanvas(null, false);
        canvas.onmousemove = drawAll;
    }

    return {
        init: init
    };

})();
window.onload = subd.init;
