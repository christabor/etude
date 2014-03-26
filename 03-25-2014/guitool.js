var dims;
var canvas;
var height;
var width;
var ctx;
var total;
var num_squares;
var size      = 12;
var fg        = randomColor(255);
var bg        = randomColor(100);
var r         = 255;
var g         = 255;
var b         = 255;
var hex       = null;
var interval  = null;
var density   = 100;
var $links;
var $hex      = $('#hex');
var $size     = $('#size');
var $density  = $('#density');
var $fg       = $('#fg');
var $bg       = $('#bg');
var $color_r  = $('#color-r');
var $color_g  = $('#color-g');
var $color_b  = $('#color-b');
var $funcs    = $('#funcs');
var active_fn = null;
var funcs    = {
    noiseGenerator: function() {
        for(var i = 0; i <= density; i++) {
            addBox();
        }
    },
    drawBoxThing: function() {
        var startX = rando(width);
        var startY = rando(height);
        ctx.fillStyle = fg;
        doSomethingABunch(function(){
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(rando(startX), rando(startY));
            ctx.lineTo(rando(startX), rando(startY));
            ctx.lineTo(startX, startY);
            ctx.stroke();
            startY += 4;
            startX += 4;
        }, clamp(density, 10, 100));
    },
    subdivideColors: function() {
        var base = 1;
        var initial = rando(width + height);
        var x = rando(width);
        var y = rando(height);
        interval = setInterval(function(){
            ctx.fillStyle = randomColor(base);
            if(initial > 0) {
                ctx.fillRect(
                    initial,
                    initial,
                    rando(x),
                    rando(y));
                initial = initial / 2;
                base += 2;
            }
        }, 40);
    },
    noiseBox: function() {
        funcs.noiseGenerator();
        funcs.drawBoxThing();
    }
};

function addBox(x, y, w, h) {
    ctx.fillStyle = fg;
    ctx.fillRect(
        x || rando(width),
        y || rando(height),
        w || size,
        h || size);
}

function preFunc() {
    clearCanvas();
    var color = 'rgb(' + r + ',' + g + ',' + b + ')';
    // bg has to come first
    if(hex) {
        bg = hex;
        fg = hex;
    } else {
        if($bg.is(':checked') && !$fg.is(':checked')) {
            bg = color;
        }
        if($fg.is(':checked')) {
            fg = color;
            ctx.fillStyle = fg;
        }
    }
    // must be set whether
    // or not it was updated
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
}

function addEvents() {
    $hex.on('change', function(event){
        hex = $(this).val();
        run();
    });
    $color_r.on('change', function(event){
        r = $(this).val();
        hex = null;
        run();
    });
    $color_g.on('change', function(event){
        g = $(this).val();
        hex = null;
        run();
    });
    $color_b.on('change', function(event){
        b = $(this).val();
        hex = null;
        run();
    });
    $density.on('change', function(event){
        density = $(this).val();
        run();
    });
    $size.on('change', function(event){
        size = $(this).val();
        run();
    });
}

function run() {
    clearInterval(interval);
    preFunc();
    active_fn();
}

function setActive(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    setActiveFn($links, funcs, $(this));
    run();
}

function bootstrapEvents() {
    ctx.fillStyle = bg;

    // setup a default
    active_fn = funcs.noiseBox;
    addEvents();
    populateMenu(funcs, $funcs, '<a href="#" class="func"></a>');
    $links = $funcs.find('.func');
    $links.on('click', setActive);
    addCanvasUI(null);
    $links.last().click();
}

function init() {
    dims   = getDocumentDimensions();
    height = dims.height;
    width  = dims.width;
    bootstrapCanvas(null, false, null);
    bootstrapEvents();
}

window.onload = init;
