var wild = (function() {
    var dims;
    var height;
    var width;
    var distance = 100;
    var size = 100;
    var rotate = false;
    var $rotate = $('#rotate');
    var $distance = $('#distance');
    var $funcs    = $('#funcs');
    var $links;
    var composites = ['lighter', 'darker'];
    var active_fn = null;
    var funcs    = {
        one: function(i, x, y) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + i, y);
            ctx.lineTo(x + i, y + i);
            ctx.lineTo(x - i, y + i);
            ctx.lineTo(x - i * 2, y + i);
            ctx.lineTo(x / 2, i * 10);
            ctx.lineTo(x, width);
            ctx.lineTo(x, i);
            ctx.lineTo(width, height);
        },
        two: function(i, x, y) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, width);
            ctx.lineTo(x, i);
            ctx.lineTo(width, height);
        },
        three: function(i, x, y) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, width);
            ctx.lineTo(rando(x), rando(y));
            ctx.lineTo(width, height);
        },
        four: function(i, x, y) {
            ctx.moveTo(x, y);
            ctx.lineTo(rando(x), rando(y));
            ctx.lineTo(width, height);
        },
        five: function(i, x, y) {
            ctx.moveTo(x, y);
            ctx.lineTo(width, height);
            ctx.lineTo(rando(x), rando(y));
            ctx.lineTo(rando(x), rando(y));
            ctx.lineTo(width, height);
        },
        six: function(i, x, y) {
            ctx.moveTo(0, 0);
            ctx.lineTo(x / 2, i * 10);
            ctx.lineTo(x + i, y);
            ctx.lineTo(x + i, y + i);
            ctx.lineTo(x - i, y + i);
            ctx.lineTo(x - i * 2, y + i);
        },
        seven: function(i, x, y) {
            ctx.moveTo(rando(width), rando(height));
            ctx.fillStyle = randomColor(255, 0.4);
            ctx.lineTo(rando(width), rando(height));
            ctx.lineTo(rando(width / 2), rando(height / 2));
            ctx.lineTo(rando(width), rando(height));
        }
    };

    function addOne() {
        var x = width/2;
        var y = height/2;
        ctx.fillStyle = randomColor(255, 0.4);
        for(var i = 0; i <= distance; i++) {
            ctx.globalCompositeOperation = randomArrayValue(composites);
            ctx.beginPath();
            if(rotate) {
                ctx.rotate(i);
            }

            // abstract away into simpler fn
            active_fn(i, x, y);
            ctx.fill();
        }
    }

    function drawAll() {
        clearAll();
        addOne();
    }

    function clearAll() {
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, width, height);
    }

    function setActive(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        active_fn = setActiveFn($links, funcs, $(this), active_fn);
        drawAll();
    }

    function mapFuncsToButtons() {
        // add a menu based on a set of functions
        populateMenu(funcs, $funcs, '<a href="#" class="func"></a>');

        // add links event handlers which set the active function
        $links = $funcs.find('.func');
        $links.on('click', setActive);
    }

    function bootstrapEvents() {
        // setup a default
        addCanvasUI(null);
        $rotate.on('click', function(e){
            if($rotate.is(':checked')) {
                rotate = true;
            } else {
                rotate = false;
            }
            drawAll();
        })
        active_fn = funcs.one;
        mapFuncsToButtons();
        $distance.on('change', function(e){
            distance = $(this).val();
            $('.indicator').text(distance);
            drawAll();
        });
    }

    function init() {
        dims   = getDocumentDimensions();
        height = dims.height;
        width  = dims.width;
        bootstrapCanvas(null, false, null);
        bootstrapEvents();
        drawAll();
    }

    return {
        'init': init
    }
})();

window.onload = wild.init;
