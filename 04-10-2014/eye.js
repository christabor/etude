var subd = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var startx      = width;
    var starty      = rando(height);
    var increment   = 10;
    var max_b4_turn = 50;
    var current     = 0;
    var max         = rando(width / 10);

    function reset() {
        ctx.fillStyle = ctx.strokeStyle = randomColor(255);
        current = 0;
        startx = rando(width);
        starty = rando(height);
    }

    function Eye(x, y) {
        var self = this;
        this.size = 80;
        this.color = randomColor(255);
        this.outer = new fabric.Ellipse({
            rx: self.size * rando(4),
            ry: self.size + self.size / 4,
            left: x,
            top: y,
            fill: randomColor(255),
            selectable: false
        });
        this.addEyelines = function() {
            for (var i = 1; i < 10; i++) {
                canvas.add(new fabric.Rect({
                    top: y,
                    left: x,
                    angle: 360 / i,
                    width: 1,
                    height: self.size * 2,
                    selectable: false,
                    fill: self.color
                }));
            }
        };
        this.pupil = new fabric.Circle({
            radius: self.size,
            left: x,
            top: y,
            fill: randomColor(255),
            selectable: false
        });
        this.pupilinner = new fabric.Circle({
            radius: self.size / 2,
            left: x,
            top: y,
            fill: randomColor(255),
            selectable: false
        });
        this.pupilshine = new fabric.Circle({
            radius: Math.abs(self.size / 4 - (self.size / 2)),
            left: x - self.size / 4,
            top: y - self.size / 2,
            opacity: 0.5,
            fill: randomColor(255),
            selectable: false
        });
        this.pupiltop = new fabric.Circle({
            radius: self.size / 3,
            left: x - self.size / 4,
            top: y - self.size / 2,
            fill: randomColor('red'),
            selectable: false
        });
    }

    function randomSquareIsh(e) {
        var eye = new Eye(e.clientX, e.clientY);
        canvas.add(eye.outer);
        canvas.add(eye.pupil);
        canvas.add(eye.pupilinner);
        canvas.add(eye.pupilshine);
        canvas.add(eye.pupiltop);
        eye.addEyelines();
    }

    function init() {
        bootstrapCanvas(null, true);
        doSomethingABunch(function(){
            randomSquareIsh({
                clientX: rando(width),
                clientY: rando(height)
            });
        }, 30);
        document.onmousemove = randomSquareIsh;
    }

    return {
        init: init
    };

})();
window.onload = subd.init;
