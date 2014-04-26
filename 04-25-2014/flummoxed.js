var dendr = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var last_neuron = null;

    function Neuron(x, y) {
        var distance = 10;
        var self = this;
        var size = 10;
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
        };
        this.dendriteTo = function(neuron) {
            ctx.fillStyle = 'none';
            ctx.strokeStyle = randomColor(255);

            ctx.moveTo(neuron.x, neuron.y);
            ctx.quadraticCurveTo(self.x * 2, self.y * 2, self.x, self.y);

            ctx.moveTo(neuron.x, neuron.y);
            ctx.quadraticCurveTo(self.x * 1.8, self.y * 1.8, self.x, self.y);

            ctx.moveTo(neuron.x, neuron.y);
            ctx.quadraticCurveTo(self.x * 1.5, self.y * 1.5, self.x, self.y);
            ctx.stroke();
        };
        self.draw();
    }

    function init() {
        bootstrapCanvas(null, false);
        document.onclick = function(e) {
            var neuron = new Neuron(e.x, e.y);
            if(last_neuron) {
                neuron.dendriteTo(last_neuron);
            }
            last_neuron = neuron;
        };
    }

    return {
        'init': init
    };

})();

window.onload = dendr.init;
