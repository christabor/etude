window.onload = function() {
    var canvas = document.getElementById('workspace'),
    width = $(window).width(),
    height = $(window).height(),
    dpr = window.devicePixelRatio || 1,
    segments = [],
    sim = new VerletJS(width, height, canvas);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.getContext('2d').scale(dpr, dpr);

    // simulation
    sim.friction = 1;

    function createTire(radius, points, spoke_stiffness, tread_stifness, pin_location) {
        var pos = Math.floor(Math.random() * width),
        shape = sim.tire(new Vec2(pos, pos), (radius || 100), (points || 4), (spoke_stiffness || 1), (tread_stifness || 1));
        if(pin_location % 2 === 0) {
            shape.pin(0);
        }
        return;
    }

    function loop(){
        sim.frame(16);
        sim.draw();
        requestAnimFrame(loop);
        return;
    }

    function loopUntil(end, fn, args) {
        // screw that for-loop noise.
        // Let's apply arguments to a function recursively!
        if(end !== 0) {
            if(typeof args === 'string' || typeof args === 'number') {
                fn.call(this, args);
            } else {
                fn.apply(this, args);
            }
            loopUntil(end - 1, fn, args);
        }
        return;
    }

    function loopDeLoop() {
        for(var i = 0; i <= 10; i++) {
            loopUntil(i, createTire, [i * 10, i, i, i/2, i]);
        }
        return;
    }

    loop();
    loopDeLoop();
};
