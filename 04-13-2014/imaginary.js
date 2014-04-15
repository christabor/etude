var imaginary = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var overlays    = [];

    function addLabel(top, left, text) {
        var label = new fabric.Text(String(text), {
            top: top,
            left: left,
            selectable: false,
            fontFamily: 'Lato',
            fill: 'red',
            fontSize: 20
        });
        addItem(label);
    }

    function addItem(el) {
        overlays.push(el);
        canvas.add(el);
    }

    function setGrid() {
        addCoords({
            line_width: 1,
            fill: 'green',
            text_color: 'rgba(0, 0, 0, 0.6)',
            block_size: 60,
            subgrid: true
        });
    }

    function addLabels() {
        addLabel(height - 50, width / 2 + 25, '-i');
        addLabel(50, width / 2 + 25, 'i');
        addLabel(height / 2, width - 50, '1');
        addLabel(height / 2, 50, '-1');
    }

    function addRotation(num) {
        var shadow = '0 2px 4px rgba(0, 0, 29, 0.7)';
        var top = height / 2;
        var left = width / 2;
        var h = 80;
        var text = new fabric.Text(String(num[1]), {
            top: top - h,
            left: left / 2,
            selectable: false,
            shadow: shadow,
            fontFamily: 'Courier New',
            fill: 'black',
            fontSize: 20
        });
        var el = new fabric.Rect({
            top: top - h / 2,
            left: left,
            selectable: false,
            width: width / 3,
            height: h,
            angle: num[0],
            fill: randomColor(255, 0.5),
            shadow: shadow
        });
        text.setGradient(randomFabricGradient({
            x1: 0,
            y1: 100
        }, 4));
        addItem(el);
        addItem(text);
    }

    function calculateImaginary(num) {
        // i^1 = i = 90
        // i^2 = -1 = 270
        // i^3 = -i = 180
        // i^4 = 1 = 0
        var txt = '';
        var rem = num % 4;
        var deg = 0;
        if(rem === 0) {
            deg = 90;
            txt += 'num: ' + num + ' = i (90 degrees)';
        } else if(rem === 1) {
            deg = 270;
            txt += 'num: ' + num + ' = -1 (270 degrees)';
        } else if(rem === 2) {
            deg = 180;
            txt += 'num: ' + num + ' = -i (180 degrees)';
        } else if(rem === 3) {
            deg = 0;
            txt += 'num: ' + num + ' = 1 (0 degrees)';
        } else {
            txt += 'num: ' + num + ' = not valid';
        }
        return [deg, txt];
    }

    function clearGrid() {
        for (var i = 0; i < overlays.length; i++) {
            canvas.remove(overlays[i]);
        }
    }

    function recalculate() {
        clearGrid();
        addLabels();
        addRotation(calculateImaginary(rando(999)));
    }

    function init() {
        bootstrapCanvas(null, true);
        setGrid();
        window.onmousemove = recalculate;
    }

    return {
        init: init
    };

})();
window.onload = imaginary.init;
