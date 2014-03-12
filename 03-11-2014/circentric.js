var circentric = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var btns         = $('.btn');
    var width        = dims.width;
    var speed        = 100;
    var max_amt      = 20;
    var min_amt      = 8;
    var canvas_elem  = document.querySelector('canvas');
    var max          = clamp(rando(max_amt), min_amt, max_amt);
    var radius       = Math.floor(width / max);
    var left         = 0;
    var top          = 0;
    var curr_fill;
    var fg;
    var bg;

    function animateAll(event) {
        var curr_random_color;
        var anim_opts = {
            onChange: canvas.renderAll.bind(canvas),
            duration: speed,
            easing: fabric.util.ease.easeIn,
        };
        btns.css('top', event.e.y - 10);
        $(canvas._objects).each(function(k, el){
            el.radius = event.e.y * 0.5;
            el.fill = curr_fill;
        });
        canvas.renderAll();
    }

    function addCircle(top, left, radius) {
        var circle = new fabric.Circle({
            selectable: false,
            radius: radius,
            fill: 'none',
            stroke: fg,
            left: left,
            top: top,
            strokeWidth: 1
        });
        canvas.add(circle);
    }

    function addRow(ypos, left, radius) {
        doSomethingABunch(function(){
            addCircle(ypos, left, radius);
            left += (radius + radius / 2);
        }, max);
        left = 0;
    }

    function resetAll() {
        max  = clamp(rando(max_amt), min_amt, max_amt);
        fg   = randomColor(clamp(255, 200, 255));
        bg   = randomColor(100);
        top  = radius / 2;
        left = radius / 2;
    }

    function generateAll() {
        resetAll();
        canvas.clear();
        canvas.backgroundColor = bg;
        doSomethingABunch(function(){
            addRow(top, left, radius);
            top += radius;
        }, max);
        canvas.renderAll();
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(generateAll);
        generateAll();
        canvas.on('mouse:move', animateAll);

        // throttle fill colors to prevent seizure
        // (only rendered on mouse event animations)
        setInterval(function(){
            curr_fill = randomColor(255, 0.1);
            log(curr_fill)
        }, 1000);
    }

    return {
        init: init
    };

})();

window.onload = circentric.init;
