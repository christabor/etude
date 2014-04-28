var connector = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var blocks      = [];

    function Block(x, y) {
        var distance = 30;
        var self = this;
        var size = rando(10);
        this.x = x;
        this.y = y;

        this.circle = function(radius) {
            ctx.fillStyle = randomColor(255);
            ctx.beginPath();
            ctx.arc(self.x, self.y, radius, 0, Math.PI * 2);
            ctx.fill();
        };
        this.draw = function() {
            self.circle(size);
            self.circle(size / 2);
            self.circle(size / 4);
        };
        this.connectTo = function(block) {
            ctx.lineWidth = 0.5;
            ctx.fillStyle = 'none';
            ctx.strokeStyle = randomColor(255, 0.2);
            ctx.moveTo(block.x, block.y);
            ctx.lineTo(self.x, self.y);
            ctx.stroke();
        };
        self.draw();
    }

    function render() {
        log('');
        var x = rando(width);
        var y = rando(height);
        var block = new Block(x, y);
        blocks.push(block);
        for(var i = 0; i <= 4; i++) {
            block.connectTo(randomArrayValue(blocks));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function init() {
        bootstrapCanvas(null, false);
        animate();
    }

    return {
        'init': init
    };

})();

window.onload = connector.init;
