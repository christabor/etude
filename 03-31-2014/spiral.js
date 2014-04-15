var circentric  = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var seedx       = rando(width);
    var seedy       = rando(height);
    var autopilot   = null;
    var tau         = Math.PI * 2;
    var current     = 0;
    var max         = 1000;
    var $mouse      = document.getElementById('mouse');
    var $autopilot  = document.getElementById('autopilot');
    var midy        = height / 2;
    var midx        = width / 2;
    var offset      = 100;

    function circle(x, y, radius, color) {
        ctx.strokeStyle = color || 'rgba(255, 0, 0, 0.3)';
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.arc(x, y, radius, 0, tau);
        ctx.stroke();
        ctx.fill();
    }

    function line(x, y) {
        // curved path
        ctx.strokeStyle = 'purple';
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);

        // flip values when warping around midway points
        ctx.quadraticCurveTo(
            (x > midx ? x - offset : x + offset),
            (y > midy ? y - offset : y + offset),
            x, y);
        ctx.stroke();
        ctx.fill();
        circle(x, y, 4, 'rgba(255, 0, 0, 0.8');

        // straight path
        ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(x, y);
        ctx.moveTo(x+100, y+100);
        ctx.lineTo(width / 2, height / 2);
        ctx.stroke();
        circle(x + 10, y + 10, 2, 'rgba(255, 0, 0, 0.8');
    }

    function ring(event) {
        current += 1;
        if(current >= max) {
            ctx.reset();
        }

        // add static shapes
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'none';
        circle(width / 2, height / 2, 100, 'red');
        circle(width / 2, height / 2, event.y);
        circle(width / 2, height / 2, 5, 'rgba(255,0,0,0.3');
        circle(width / 2, height / 2, 10, 'rgba(255,0,0,0.3');
        circle(width / 2, height / 2, 50, 'rgba(255,0,0,0.3');

        // add follower
        line(event.x, event.y);
    }

    function init() {
        bootstrapCanvas(null, false);
        ctx.clear = function() {
            ctx.fillStyle = 'black';
            this.fillRect(0, 0, width, height);
        };
        ctx.reset = function() {
            ctx.clear();
            current = 0;
        }
        window.onmousedown = ctx.reset;

        $mouse.onclick = setMouse;
        $autopilot.onclick = setAutopilot;
        setAutopilot();
    }

    function setMouse() {
        ctx.clear();
        $autopilot.style.opacity = 0.3;
        $mouse.style.opacity = 1;
        clearInterval(autopilot);
        window.removeEventListener('mousemove', ring);
        window.addEventListener('mousemove', ring);
    }

    function setAutopilot() {
        ctx.clear();
        $autopilot.style.opacity = 1;
        $mouse.style.opacity = 0.3;
        window.removeEventListener('mousemove', ring);
        var ev = {
            'x': 0,
            'y': 0
        };
        clearInterval(autopilot);
        autopilot = setInterval(function(){
            ev.x = rando(width);
            ev.y = rando(height);
            ring(ev);
        }, 10);
    }

    return {
        'init': init
    };

})();

window.onload = circentric.init;
