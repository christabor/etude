var web = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var max_steps   = 2;
    var $steps      = document.getElementById('steps');
    var $slider     = document.getElementById('slider');
    var lastpos     = {'x': width / 2, 'y': height / 2};
    var states = [];

    function Arrow(x, y) {
        var self = this;
        var shade = rando(255);
        this.x = x;
        this.y = y;
        this.init = function() {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(' + [shade, shade, shade, 0.3].join(',') + ')';
            ctx.lineWidth = rando(5);
            ctx.moveTo(lastpos.x, lastpos.y);
            ctx.lineTo(self.x, self.y);
            ctx.stroke();
        };
        this.connect = function(connector) {
            ctx.moveTo(self.x, self.y);
            ctx.lineTo(connector.x, connector.y);
            ctx.stroke();
        }
        self.init();
    }

    function init() {
        bootstrapCanvas(null, false);
        $slider.oninput = function(e) {
            log(this.value);
            max_steps = this.value;
            $steps.innerHTML = 'Steps: ' + this.value;
        };
        document.onmousemove = function(e){
            states.push(new Arrow(e.x, e.y));
            if(states[max_steps]) {
                states[states.length - max_steps].connect(states[states.length - 1]);
            }
            lastpos.x = e.x;
            lastpos.y = e.y;
        };
        document.onmousedown = function(e){
            ctx.fillStyle = '#f1f1f1';
            ctx.fillRect(0, 0, width, height);
            states = [];
        };
    }

    return {
        init: init
    };

})();

window.onload = web.init;
