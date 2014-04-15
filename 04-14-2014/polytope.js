var polytoper = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var overlays    = [];
    var MAX_SIZE    = 100;
    var slider      = document.getElementById('slider');
    var grid        = document.getElementById('grid');

    function Polytope(x, y, sides, size) {
        var group = [];
        var color = randomColor(200);
        canvas.add(new fabric.Text(String(sides), {
            top: y,
            left: x,
            textAlign: 'center',
            fontSize: clamp(size / 12, 12, 100),
            fontFamily: 'Lato',
            selectable: false,
        }));
        for (var i = 1; i <= sides; i++) {
            canvas.add(new fabric.Triangle({
                top: y,
                left: x,
                fill: 'transparent',
                stroke: color,
                strokeWidth: 0.8,
                selectable: false,
                width: size,
                angle: i * (360 / sides)
            }));
        }
    }

    function customPolytope(e) {
        canvas.clear();
        poly = new Polytope(width / 2, height / 2, slider.value, width / 2.2);
    }

    function resetGrid() {
        canvas.clear();
        var poly;
        var padding = 10;
        var offset_y = MAX_SIZE + padding;
        var offset_x = padding;
        for (var i = 1; i <= 30; i++) {
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
            poly = new Polytope(offset_x, offset_y, i, MAX_SIZE);
        }
    }

    function init() {
        bootstrapCanvas(null, true);
        grid.onclick = resetGrid;
        slider.oninput = customPolytope;
        resetGrid();
    }

    return {
        init: init
    };

})();
window.onload = polytoper.init;
