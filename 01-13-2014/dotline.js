window.onload = function() {
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var $auto_btn   = $('#auto');
    var $draw_btn   = $('#draw');
    var coords      = $('#coords').find('span');
    var objs        = [];
    var counter     = 0;
    var interval;
    var seed_x = rando(width / 2);
    var seed_y = rando(height / 2);
    var r_prev_x = seed_x;
    var r_prev_y = seed_y;

    function addShape(x, y) {
        var circle = new fabric.Circle({
            radius: 2,
            fill: 'white',
            opacity: 0.4,
            selectable: false,
            top: y,
            left: x
        });
        canvas.add(circle);
        objs.push(circle);
    }

    function updateCoords(x, y) {
        coords.text('x: ' + x + ' / y: ' + y);
    }

    function dotLineEffect(data) {
        var x = data.e.clientX;
        var y = data.e.clientY;
        var curr;
        var prev;
        var dist_x;
        var dist_y;
        var line;

        addShape(x, y);
        updateCoords(x, y);

        if(counter > 2) {
            curr = objs[counter];
            prev = objs[counter - 1];
            dist_x = curr.left + prev.left;
            dist_y = curr.top + prev.top;
            line = new fabric.Line([10, 10, dist_x / 4, dist_y / 4], {
                stroke: 'white',
                fill: 'white',
                selectable: false,
                strokeWidth: 1,
                opacity: 0.2,
                top: curr.top,
                left: curr.left + (curr.left - prev.left)
            });
            canvas.add(line);
        }
    }

    function addEffectAutopilot() {
        dotLineEffect({
            e: {
                clientX: r_prev_x,
                clientY: r_prev_y
            }
        });
        // add some seeding that randomizes
        // but within a range, similar to Perlin noise,
        // so it's not complete chaos
        if(rando(10) > 7) {
            r_prev_y += rando(100);
            r_prev_x += rando(100);
        } else {
            r_prev_y += rando(10);
            r_prev_x += rando(10);
        }
        if(r_prev_x > width) {
            r_prev_x = 10;
        }
        if(r_prev_y > height) {
            r_prev_y = 10;
        }
        counter += 1;
    }

    function addEffectMouse(data) {
        dotLineEffect(data);
        counter += 1;
    }

    function resetBtns(el) {
        $('a').removeClass('active');
        el.addClass('active');
    }

    function drawFn() {
        canvas.clear();
        resetBtns($(this));
        canvas.on('mouse:move', addEffectMouse);
        clearInterval(interval);
    }

    function autoFn() {
        canvas.clear();
        resetBtns($(this));
        interval = setInterval(addEffectAutopilot, 50);
        canvas.off('mouse:move');
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;
        $draw_btn.on('click', drawFn);
        $auto_btn.on('click', autoFn)
        .click();
    }
    init();
};
