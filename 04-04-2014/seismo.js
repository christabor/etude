var zagg = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var canvases    = [];
    var size        = 4;
    var max         = 500;
    var current     = 0;
    var max_canvas  = 6;
    var c_count     = 1;
    var point_count = 0;
    var x           = 0;
    var y           = height / 2;
    var oldy        = height / 2 + 10;
    var oldx        = 10;
    var $points     = document.getElementById('points');
    var c_width     = width / max_canvas - (max_canvas * 1);

    function addCanvas() {
        var temp_canvas = document.createElement('canvas');
        var temp_ctx = temp_canvas.getContext('2d');
        var text = document.getElementById('trial' + c_count);
        temp_canvas.setAttribute('width', c_width);
        temp_canvas.setAttribute('height', height);
        document.body.appendChild(temp_canvas);
        document.onmousedown = function() {
            exportCanvas(temp_canvas);
        };
        canvases.push(
            [temp_canvas,
            temp_ctx,
            randomColor(255),
            text,
            rando(500)]);
        c_count += 1;
    }
    function animate(){
        requestAnimFrame(animate);
        var color = randomColor(200);
        var distance;
        for (var i = 0; i < canvases.length; i++) {
            distance = canvases[i][4];
            var ctx = canvases[i][1];
            ctx.fillStyle = canvases[i][2];
            ctx.strokeStyle = canvases[i][2];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(oldx, oldy);
            ctx.stroke();
            ctx.fillRect(oldx, oldy, size, size);
            ctx.fill();
            canvases[i][3].innerHTML = 'x:' + x + ', y:' + y;
            $points.innerHTML = 'Point count: ' + point_count;
            point_count += 1;
            if(current >= max) {
                current = oldx = oldy = x = y = 0;
            }
            oldx = x;
            oldy = rando(height) + distance;
            x += 1;
            y = y + rando(i);
            current += 1;
        }
    }

    function init() {
        doSomethingABunch(addCanvas, max_canvas);
        animate();
    }

    return {
        'init': init
    };

})();

window.onload = zagg.init;
