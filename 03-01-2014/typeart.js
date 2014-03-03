var petalArt = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var current      = 0;
    var max_iters    = 20;

    function generate() {
        var seed = rando(width / 10);
        if(current === max_iters) {
            canvas.clear();
            current = 0;
        } else {
            current += 1;
        }
        basicFlower({
            radius: seed / 2,
            petals: rando(10),
            x: rando(width),
            y: rando(height),
            division: rando(4),
            center: rando(10) > 5 ? true : false,
            thickness: seed / 20
        });
        canvas.renderAll();
        animateAll();
    }

    function animate(el, speed) {
        el.animate({
            scaleX: el.width / 10
        }, {
            onChange: canvas.renderAll.bind(canvas),
            duration: speed,
            easing: fabric.util.ease.easeInOut,
        });
    }

    function animateAll() {
        $(canvas._objects).each(function(k, object){
            animate(object, 100);
        });
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(generate);
        generate();
    }

    return {
        init: init
    };

})();

$(document).ready(petalArt.init);
