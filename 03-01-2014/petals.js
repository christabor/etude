var petalArt = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var current      = 0;
    var max_iters    = 20;

    function generate() {
        var seed = rando(width / 4) + 50;
        if(current === max_iters) {
            canvas.clear();
            current = 0;
        } else {
            current += 1;
        }
        basicFlower({
            radius: seed / 2,
            petals: rando(8) + 4,
            x: rando(width),
            y: rando(height),
            opacity: 0,
            division: rando(4) + 1,
            center: rando(10) > 5 ? true : false,
            thickness: rando(10)
        });
    }

    function generateMany(amount) {
        var init_time = 100;
        var time_increment = 50;
        var final_time = init_time + time_increment * amount;
        canvas.clear();
        canvas.backgroundColor = randomColor(255);
        doSomethingABunch(function(){
            setTimeout(generate, init_time);
            init_time += time_increment;
        }, amount);
    }

    function animate(el, speed) {
        el.animate({
            angle: rando(360),
            opacity: rando(10) * 0.1
        }, {
            onChange: canvas.renderAll.bind(canvas),
            duration: speed,
            easing: fabric.util.ease.easeIn,
        });
    }

    function animateAll() {
        $(canvas._objects).each(function(k, group){
            animate(group, 500);
        });
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(function(){
            generateMany(max_iters);
        });
        generateMany(max_iters);
        setInterval(animateAll, 1000);
    }

    return {
        init: init
    };

})();

$(document).ready(petalArt.init);
