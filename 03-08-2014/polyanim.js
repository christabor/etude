var cat = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');

    function adjustImageColors(id, max) {
        var data;
        var img_data;
        img = document.getElementById(id);
        ctx.drawImage(img, 0, 0);
        img_data = ctx.getImageData(0,0, width, height);
        data = img_data.data;
        for (var i = 0, len = data.length; i < len; i += 10) {
            data[i] = rando(max) - data[i];
            data[i + 1] = rando(max) - data[i + 1];
            data[i + 2] = rando(max) - data[i + 2];
            data[i + 3] = rando(max);
        }
        ctx.putImageData(img_data, rando(width), rando(height));
    }

    function generateAll() {
        try {
            clearCanvas();
            adjustImageColors('img1', 255);
        }
        catch(e) {
            window.location.reload();
        }
    }

    function adjust(event) {
        adjustImageColors('img1', event.x / 4);
        ctx.fillStyle = randomColor(event.x / 4, 0.3);
        ctx.fill();
        doSomethingABunch(function(){
            ctx.fillRect(
                event.x + rando(400),
                event.y - rando(100),
                rando(event.y / 4),
                rando(event.x / 4));
        }, 40);
    }

    function init() {
        bootstrapCanvas(null, false);
        var img = document.querySelector('img');
        generateAll();
        window.addEventListener('mousemove', adjust);
    }

    return {
        meow: init
    };

})();

window.onload = cat.meow;
