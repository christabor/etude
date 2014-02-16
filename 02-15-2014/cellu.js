var Box = function(x, y, width, height) {
    var self = this;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    self.size = self.width * 0.02;
    self.offset = self.size / 2;

    // setup corner points
    this.tl = { x: this.x, y: this.y };
    this.tr = { x: this.x + this.width, y: this.y };
    this.bl = { x: this.x, y: this.y + this.height };
    this.br = { x: this.x + this.width, y: this.y + this.height };
    this.cc = { x: this.x + this.width / 2, y: this.y + this.height / 2 };

    this.setCoords = function(x, y) {
        self.x = x;
        self.y = y;
    }

    this.setDims = function(width, height) {
        self.width = width;
        self.height = height;
    }

    // abstract the nonsense
    this.line = function(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // draws lines from a center point
    // to all vertices supplied
    this.drawSubdivision = function(c1, d1, d2, d3) {
        var size = self.size;
        var offset = self.offset;

        self.line(c1.x, c1.y, d1.x, d1.y);
        self.line(c1.x, c1.y, d2.x, d2.y);
        self.line(c1.x, c1.y, d3.x, d3.y);
    }

    // draw all points and subdivisions
    this.drawPoints = function() {
        var size = self.size;
        var offset = self.offset;

        // setup corner/indicators
        ctx.fillRect(self.tl.x, self.tl.y, size, size);
        ctx.fillRect(self.tr.x - size, self.tr.y, size, size);
        ctx.fillRect(self.bl.x, self.bl.y - size, size, size);
        ctx.fillRect(self.br.x - size, self.br.y - size, size, size);
        ctx.fillRect(self.cc.x - offset, self.cc.y - offset, size, size);

        // setup basic lines
        self.line(self.tl.x, self.tl.y, self.cc.x, self.cc.y);
        self.line(self.tr.x, self.tr.y, self.cc.x, self.cc.y);
        self.line(self.bl.x, self.bl.y, self.cc.x, self.cc.y);
        self.line(self.br.x, self.br.y, self.cc.x, self.cc.y);

        // subdivided
        // CLx = 1/2 * CCx
        // CLy = CCy

        // CRx = CCx + 1/2 * CCx
        // CRy = CCy

        // CTx = CCx
        // CTy = 1/2 * CCy

        // CBx = CCx
        // CBy = 1/2 * CCy

        // setup subdivisions
        self.drawSubdivision({ x: self.cc.x - width / 4, y: self.cc.y }, self.tl, self.bl, self.cc); // CL
        self.drawSubdivision({ x: self.cc.x + width / 4, y: self.cc.y }, self.tr, self.br, self.cc); // CR
        self.drawSubdivision({ x: self.cc.x, y: self.cc.y - height / 4 }, self.tl, self.tr, self.cc); // CT
        self.drawSubdivision({ x: self.cc.x, y: self.cc.y + height / 4 }, self.bl, self.br, self.cc); // CB
    }

    // actually draw the box
    this.draw = function() {
        ctx.strokeRect(self.x, self.y, self.width, self.height);
    }
}

function addRow(y, maxsize) {
    for(var i = 0; i <= width; i += maxsize) {
        var color = randomColor(10);
        var x = new Box(i, y, maxsize, maxsize);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        x.draw();
        x.drawPoints();
    }
}

function addUniform() {
    for(var i = 0; i <= height; i += maxsize) {
        var color = randomColor(10);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        addRow(i, maxsize);
    }
}

function addRandom() {
    doSomethingABunch(function(){
        var temp = new Box(rando(width), rando(width), rando(400), rando(400));
        temp.draw();
        temp.drawPoints();
    }, 100);
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
}

function drawCanvas(active_fn) {
    clearCanvas();
    active_fn();
}

function boxCeption() {
    var max = width;
    var t_width = Math.floor(width / 2);
    var t_height = Math.floor(height / 2);
    for(var i = maxsize; i <= max; i += maxsize) {
        var temp = new Box(t_width, t_height, i, i);
        temp.draw();
        temp.drawPoints();
        t_width = Math.floor(t_width / 2);
        t_height = Math.floor(t_height / 2);
    }
}

function init() {
    bootstrapCanvas(null, false);
    window.maxsize = 100;
    var interval;
    var active_fn;
    var random = $('#random');
    var uniform = $('#uniform');
    var boxception = $('#boxception');

    $('.slider').slider({
        min: 20,
        max: 500,
        slide: function(e, ui) {
            window.maxsize = ui.value;
            drawCanvas(active_fn);
        }
    });
    random.on('click', function() {
        active_fn = addRandom;
        clearInterval(interval);
        interval = setInterval(function() {
            drawCanvas(active_fn)
        }, 500);
    });
    boxception.on('click', function() {
        active_fn = boxCeption;
        drawCanvas(active_fn);
    });
    uniform.on('click', function() {
        active_fn = addUniform;
        clearInterval(interval);
        drawCanvas(active_fn);
    });

    active_fn = addRandom;
    drawCanvas(active_fn);
}

$(document).ready(init);
