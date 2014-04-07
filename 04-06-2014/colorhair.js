var zagg = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var max         = 30;
    var speed       = 10;
    var DELAY       = 500;
    var globalx     = 0;
    var globaly     = 0;

    function Thing() {
        var self = this;
        this.x = rando(width);
        this.y = rando(height);
        this.color = randomColor(this.x / 4 + this.y / 4);
        this.points = [];
        if(this.length >= max) {
            this.reset();
        }
        this.seed = function() {
            for(var i = 0; i <= max; i++) {
                this.points.push([this.x + i + globalx, this.y + rando(i) + globaly]);
            }
        };
        this.animate = function() {
            var len = this.points.length;
            for(var i = 0; i <= len; i++) {
                if(this.points[i - 4] && this.points[i + 4]) {
                    ctx.strokeStyle = self.color;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.points[i][0], this.points[i][1]);
                    ctx.lineTo(this.points[i + 1][0], this.points[i + 1][1]);
                    ctx.rotate(i);
                    ctx.moveTo(this.x, this.y);
                    ctx.stroke();
                }
            }
        };
        this.reset = function() {
            self.points = [[rando(width), rando(height)]];
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);
            ctx.fill();
        };
        this.init = function() {
            self.seed();
            self.animate();
        };
    }

    function addOne() {
        var thing = new Thing();
        thing.init();
    }

    function clear() {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
    }

    function setMouse(event) {
        globalx = event.x / 2;
        globaly = event.y / 2;
        animateAll();
    }

    function animateAll() {
        for (var i = 0; i < max; i++) {
            (function(i){
                setTimeout(addOne, i + 10);
            })(i);
        }
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onmousemove = setMouse;
        window.onmousedown = clear;
        animateAll();
    }

    return {
        'init': init
    };

})();

window.onload = zagg.init;
