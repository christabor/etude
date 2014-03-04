var griddle = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var angle        = 0;

    function generate(radius, top, left) {
        var circle = new fabric.Circle({
            radius: 0,
            opacity: 0.8,
            top: top,
            left: left,
            selectable: false,
            fill: randomColor(100)
        });
        circle.animate({
            radius: radius
        }, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 100,
            easing: fabric.util.ease.easeIn,
        });
        canvas.add(circle);
        canvas.add(new fabric.Text('(' + left + ',' + top + ')', {
            top: top,
            left: left,
            opacity: 1,
            shadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
            selectable: false,
            fontSize: 12,
            fontFamily: 'Lato, sans-serif',
            fill: 'white'
        }));
    }

    function generateAll() {
        var count = 0;
        doSomethingABunch(function(){
            setTimeout(function(){
                generate(rando(100), rando(height), rando(width));
                count += 1;
            }, 0 * 40);
        }, 10);
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(generateAll);
        addCoords({
            line_width: 2,
            block_size: 30,
        });
        generateAll();
        canvas.on('mouse:move', function(e){
            canvas.clear();
            addCoords({
                block_size: e.e.clientX / 6 + 30,
            });
            generateAll();
        });
    }

    return {
        init: init
    };

})();

$(document).ready(griddle.init);
