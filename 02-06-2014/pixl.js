window.onload = function() {
    var dims   = getDocumentDimensions();
    var height = dims.height;
    var width  = dims.width;
    var canvas = document.getElementById('canvas');
    var ctx;
    var image_data;
    var total = 0;
    var color_index = 0;
    var size = 0;
    var color = 'rgb(' + rando(color_index) + ',' + rando(color_index) + ', ' + rando(color_index) + ')';
    var data;

    function changeShape() {
        if(size > (Math.floor(width / 2))) {
            log('big!');
            size = 0;
        }
        size += 1;
    }

    function changeColor() {
        if(color_index === 255) {
            color_index = 0;
        }
        color = 'rgb(' + rando(color_index) + ',' + rando(0) + ', ' + rando(255) + ')';
        color_index += 1;
    }

    function drawImage() {
        for (var i = 0; i < 100; i++){
            ctx.fillStyle = color;
            ctx.fillRect(rando(width), rando(height), size, size);
        }
    }

    function init() {
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        ctx = canvas.getContext('2d');
        image_data = ctx.createImageData(width, height);
        var base = 10;
        setInterval(changeColor, base);
        setInterval(changeShape, base);
        setInterval(drawImage, base * 10);
    }

    init();
};
