var dims;
var canvas;
var height;
var width;
var ctx;
var distance  = 4;
var $links;
var $distance = $('#distance');
var $funcs    = $('#funcs');

function makeFuzzyGradient() {
    var img;
    var data;
    var len;
    var grd = ctx.createLinearGradient(0, 0, width, height);
    var size = 100;
    var max = size / width;
    var iter = 0;
    log(distance);

    grd.addColorStop(0, randomColor(255));
    doSomethingABunch(function(){
        grd.addColorStop(iter, randomColor(255));
        iter += 0.1;
    }, clamp(distance, 4, 10));
    grd.addColorStop(1, randomColor(255));

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';

    img = ctx.getImageData(0, 0, width, height);
    data = img.data;
    len = data.length;

    // coerce to a number
    distance = +distance;
    for(var i = 0; i <= len; i += distance) {
        data[i + 2] = rando(255);
        data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}

function bootstrapEvents() {
    // setup a default
    addCanvasUI(null);
    $distance.on('change', function(e){
        distance = $(this).val();
        $('.indicator').text(distance);
        makeFuzzyGradient();
    });
}

function init() {
    dims   = getDocumentDimensions();
    height = dims.height;
    width  = dims.width;
    bootstrapCanvas(null, false, null);
    bootstrapEvents();
    makeFuzzyGradient();
}

window.onload = init;
