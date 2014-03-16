var circle = (function(){
    var dims           = getViewportDimensions();
    var height         = dims.height;
    var width          = dims.width;
    var canvas_elem    = document.querySelector('canvas');
    var info           = document.getElementById('info');
    var color          = randomColor(100);

    function generate(left, top, x, y) {
        canvas.add(new fabric.Ellipse({
            rx: x,
            ry: y,
            selectable: false,
            left: left,
            top: top,
            fill: 'none',
            strokeWidth: 1,
            stroke: color,
        }));
    }

    function addGroup(x, y, top, left, amt) {
        var offset = 1.5;
        canvas.add(new fabric.Text(String(amt), {
            top: top * offset,
            left: left,
            fontSize: 12,
            fontFamily: 'Lato, Arial, sans-serif'
        }));
        doSomethingABunch(function(){
            generate(left, top * offset, x, y);
            x += 4;
            y += 4;
            amt += 1;
        }, amt);
    }

    function addRow(x, y, top, left, amt) {
        var max = 5;
        doSomethingABunch(function(){
            addGroup(x, y, top, left, amt);
            left += width / max;
            amt += 1;
        }, max);
    }

    function setInfo(info) {
        info.innerHTML = info;
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI();

        canvas.on('mouse:move', function(e){
            canvas.clear();
            var x      = e.e.clientX / 10;
            var y      = e.e.clientY / 10;
            var max    = 5;
            var left   = 0;
            var top    = 50;
            var amt    = 1;
            left += 100;
            doSomethingABunch(function(){
                addRow(x, y, top, left, amt);
                top += 100;
                amt += 1;
            }, max);
            top = 50;
            left = 0;
            amt = 0;
            setInfo(['x: ', x, 'y: ', y].join(''));
        });
    }

    return {
        init: init
    };

})();

window.onload = circle.init;
