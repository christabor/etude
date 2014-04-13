var run = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var MIN_BOUND   = 10;
    var MAX_BOUND   = 100;
    var increment   = 10;
    var current     = 0;
    var max         = 1000;

    function addTrail(e) {
        var opts = {
            fill: 'red',
            top: e.clientY,
            left: e.clientX,
            radius: 4,
            selectable: false
        };
        var marker = new fabric.Circle(opts);
        marker.set('is_marker', true);
        canvas.add(marker);
        opts.radius = 2;
        opts.fill = 'white';
        var marker_sm = new fabric.Circle(opts);
        marker.set('is_marker', true);
        canvas.add(marker_sm);
    }

    function Shape(x, y) {
        var self = this;
        self.base_opts = {
            left: x,
            top: y,
            fill: 'black',
            selectable: false
        };
        this.size = 20;
        this.els = [];

        self.base_opts.rx = self.size;
        self.base_opts.ry = rando(self.size);
        this.els.push(new fabric.Ellipse(self.base_opts));

        self.base_opts.ry = self.size / 2;
        self.base_opts.fill = 'white';
        self.base_opts.ry = rando(self.size / 2);
        this.els.push(new fabric.Ellipse(self.base_opts));

        this.addAll = function() {
            var group = new fabric.Group(self.els, {
                top: y,
                left: x,
                selectable: false
            });
            canvas.add(group);
        };
    }

    function checkDelta(object, mouse) {
        var res = Math.abs(object.top - mouse.clientY);
        if(res < MAX_BOUND && res > MIN_BOUND) {
            return true;
        } else {
            return false;
        }
    }

    function checkCollisions(e) {
        // recalculate all positions away
        $(canvas._objects).each(function(k, object){
            var collision = checkDelta(object, e);
            if(collision && !object.get('is_marker')) {
                if(object.top < height && object.top > 0 && object.left < width && object.left > 0) {
                    object.top += rando(height / 10);
                    object.left += rando(width / 10);
                } else {
                    object.top = rando(height);
                    object.left = rando(width);
                }
            }
        });
        canvas.renderAll();
    }

    function jump(e) {
        var shape1;
        var shape2;
        if(current >= max) {
            current = 0;
            canvas.clear();
        }
        shape1 = new Shape(rando(width), rando(height));
        shape2 = new Shape(rando(width), rando(height));
        shape1.addAll();
        shape2.addAll();
        addTrail(e);
        checkCollisions(e);
    }

    function init() {
        bootstrapCanvas(null, true);
        document.onmousemove = jump;
    }

    return {
        init: init
    };

})();
window.onload = run.init;
