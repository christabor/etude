var juxtapose = (function(){
    var dims;
    var canvas;
    var height;
    var width;
    var ctx;

    function Turtle(x, y, type) {
        var self = this;
        var time = 0;
        var increment = 20;
        var directions = ['up', 'down', 'left', 'right'];
        var prevx = x;
        var prevy = y;
        this.direction = 'up';
        this.draw = function(){
            ctx.beginPath();
            ctx.moveTo(x, y);
            if(self.direction === 'up') {
                y = y + time;
            } else if(self.direction === 'left') {
                x = x - time;
            } else if(self.direction === 'right') {
                x = x + time;
            } else {
                // down
                y = y - time;
            }

            // reset when against edges
            if(x <= 0 || x >= width) {
                x = width / 2;
            }
            if(y <= 0 || y >= height) {
                y = height / 2;
            }
            ctx.lineWidth = rando(20);
            if(type === 'curve') {
                ctx.strokeStyle = 'rgba(255, 10, 100, 0.2)';
                ctx.quadraticCurveTo(x, y, prevx, prevy, x, y);
            } else {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            requestAnimationFrame(self.draw);
            self.direction = randomArrayValue(directions);
            time += 0.1;
        };
    }

    function init() {
        dims   = getDocumentDimensions();
        canvas = document.getElementById('canvas');
        height = dims.height;
        width  = dims.width;
        ctx    = canvas.getContext('2d');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        var turtle1 = new Turtle(width / 2, height / 2, 'straight');
        turtle1.draw();
        var turtle2 = new Turtle(width / 2, height / 2, 'curve');
        turtle2.draw();
    }

    return {
        'init': init
    };
})();

window.onload = juxtapose.init;
