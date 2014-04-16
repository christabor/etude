var polytoper2 = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var MAX_SIZE    = 140;
    var $pathdata    = document.getElementById('pathdata');
    var $triangle   = document.getElementById('triangle');
    var $rect       = document.getElementById('rect');
    var $ellipse    = document.getElementById('ellipse');
    var $path       = document.getElementById('path');
    var $width      = document.getElementById('width');
    var $height     = document.getElementById('height');
    var types       = ['ellipse', 'rect', 'triangle', 'path'];
    var pathvalue   = 0;
    var _width      = MAX_SIZE;
    var _height     = MAX_SIZE;
    var active_type = null;

    function Polytope(x, y, sides, size, type) {
        var group = [];
        var opts  = {
            top: y,
            left: x,
            fill: 'transparent',
            stroke: 'red',
            strokeWidth: 0.8,
            selectable: false,
        };
        canvas.add(new fabric.Text(String(sides), {
            top: y,
            left: x,
            textAlign: 'center',
            fontSize: clamp(size / 12, 12, 100),
            fontFamily: 'Lato',
            selectable: false,
        }));
        for (var i = 1; i <= sides; i++) {
            opts.angle =  i * (360 / sides);
            if(type === 'triangle') {
                opts.width = _width;
                opts.height = _height / 2;
                canvas.add(new fabric.Triangle(opts));
            } else if(type === 'ellipse') {
                opts.rx = _width / 2;
                opts.ry = _height / 4;
                canvas.add(new fabric.Ellipse(opts));
            } else if(type === 'rect') {
                opts.width = _width / 2;
                opts.height = _height / 1.4;
                canvas.add(new fabric.Rect(opts));
            } else if(type === 'path') {
                var data = [
                    'M 0 ',
                    pathvalue,
                    ' L ',
                    _width / 2,
                    _height / 1.2,
                    ' ',
                    pathvalue,
                    ' ',
                    pathvalue / 1.5,
                    ' ',
                    size / 2,
                    size * 1.5
                ].join(' ');
                canvas.add(new fabric.Path(data, opts));
            } else {
                return;
            }
        }
    }

    function resetGrid() {
        canvas.clear();
        var poly;
        var padding = 10;
        var offset_y = MAX_SIZE + padding;
        var offset_x = padding;
        for (var i = 1; i <= 14; i++) {
            // allow for stacking by breaking on overflow, with
            // some padding on all sides for arbitrary "width" parameter
            if(i > 0) {
                if(offset_x + MAX_SIZE * 2 <= width) {
                    offset_x += MAX_SIZE * 1.5;
                } else {
                    offset_x = MAX_SIZE + padding;
                    offset_y += MAX_SIZE + MAX_SIZE / 2;
                }
            }
            poly = new Polytope(offset_x, offset_y, i,
                MAX_SIZE, active_type);
        }
    }

    function addEvents() {
        $triangle.onclick = function() {
            active_type = 'triangle';
            resetGrid();
        };
        $rect.onclick = function() {
            active_type = 'rect';
            resetGrid();
        };
        $path.onclick = function() {
            active_type = 'path';
            resetGrid();
        };
        $ellipse.onclick = function() {
            active_type = 'ellipse';
            resetGrid();
        };
        $pathdata.oninput = function(event) {
            pathvalue = $pathdata.value;
            resetGrid();
        };
        $width.oninput = function(event) {
            _width = $width.value;
            resetGrid();
        };
        $height.oninput = function(event) {
            _height = $height.value;
            resetGrid();
        };
    }

    function init() {
        bootstrapCanvas(null, true);
        active_type = randomArrayValue(types);
        addEvents();
        resetGrid();
    }

    return {
        init: init
    };

})();
window.onload = polytoper2.init;
