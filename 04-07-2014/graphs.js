var graph = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var $count      = document.getElementById('count');
    var max         = 2;
    var curr_count  = 4;

    function Graph() {
        var self = this;
        this.x = rando(width);
        this.y = rando(height);
        this.size = 8;
        this.max_edges = curr_count;
        this.distance = rando(width);
        this.color = randomColor(255);
        this.range = randomNumberArray(this.max_edges, this.distance);
        this.addPoint = function(x, y) {
            // slight margin of -2 to offset point
            ctx.fillRect(x - 2, y - 2, self.size, self.size);
            ctx.fill();
        };
        this.addCircle = function(x, y) {
            ctx.arc(x, y, self.size, 0, 2 * Math.PI);
            ctx.fill();
        };
        this.addTextPoint = function(x, y, text) {
            ctx.font = '14px Lato';
            ctx.fillStyle = 'white';
            ctx.fillText(text, x - 2, y - 10);
            ctx.fillStyle = self.color;
        }
        this.addVertex = function(x1, y1, x2, y2, text) {
            ctx.beginPath();
            self.addPoint(x1, y1);
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            self.addPoint(x2, y2);
            self.addTextPoint(x1, y1, text);
            ctx.stroke();
        };
        this.animate = function() {
            // add initial text for whole graph
            ctx.fillStyle = self.color;
            ctx.font = '40px Lato';
            self.addTextPoint('Rad', self.range[0], self.range[0]);
            for(var i = 0; i <= self.range.length; i++) {
                ctx.strokeStyle = ctx.fillStyle = self.color;
                if(i + 3) {
                    self.addVertex(
                        self.range[i],
                        self.range[i + 1],
                        self.range[i + 2],
                        self.range[i + 3],
                        i);
                }
            }
        };
    }

    function addOne() {
        var graph = new Graph();
        graph.animate();
    }

    function clear() {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        curr_count = 4;
        updateCount();
    }

    function addAll() {
        for (var i = 0; i < max; i++) {
            addOne();
        }
    }

    function updateCount() {
        $count.innerHTML = curr_count;
    }

    function beginSizing(e) {
        log(curr_count);
        curr_count += 1;
        updateCount();
    }

    function init() {
        bootstrapCanvas(null, false);
        window.onmousedown = clear;
        window.onmousemove = addAll;
        window.onkeypress = beginSizing;
        addAll();
    }

    return {
        'init': init
    };

})();

window.onload = graph.init;
