window.onload = function() {
    var dims         = getDocumentDimensions();
    var img          = document.querySelector('img');
    var canvas_elem  = document.querySelector('canvas');
    var TWO_PI       = Math.PI * 2;
    var a            = 0;
    var b            = 0;
    var shape_count  = 50;
    var radius       = 30;
    var padding      = 10;
    var spacing      = ((radius + padding) * shape_count) / shape_count;
    var total_radius = 4;

    function getY(y) {
        var new_y;
        if(a > TWO_PI) {
            a = 0;
        }
        new_y = (dims.height / 2) + Math.sin(a) * dims.height / total_radius;
        a = a + 0.2;
        return new_y;
    }

    function getX(x) {
        var new_x;
        if(b > TWO_PI) {
            b = 0;
        }
        new_x = (dims.width / 2) + Math.cos(b) * dims.width / (total_radius + 2);
        b = b + 0.2;
        return new_x;
    }

    function updateText() {
        // add a new date and format it,
        // then add to cnvas
        var countdown = new fabric.Text(newTime(), {
            left: dims.width / 2,
            top: dims.height / 2,
            selectable: false,
            fill: randomColor(255),
            fontFamily: 'lato'
        });
        canvas.add(countdown);
        canvas.renderAll();
        return;
    }

    function newTime() {
        var date = new Date();
        var time = [date.getHours(), ' hours \n', date.getMinutes(), ' minutes \n', date.getSeconds(), ' seconds'].join('');
        return time;
    }

    function animate() {
        sequence();
        updateText();
        return;
    }

    function sequence() {
        // clear out canvas each sequence
        canvas.clear();
        var curr_shape;
        var curr_y;
        var curr_x;

        for (var i = 0; i < shape_count; i++) {
            curr_y = getY(i);
            curr_x = getX(i);

            curr_shape = new fabric.Circle({
                left: curr_x,
                top: curr_y,
                radius: rando(radius),
                selectable: false,
                fill: randomColor(255)
            });

            // add into canvas
            canvas.add(curr_shape);

            // animate first,
            // before next value is assigned
            curr_shape.animate('radius', rando(radius), {
                onChange: canvas.renderAll.bind(canvas),
                duration: 10,
                easing: fabric.util.ease.easeInOut
            });
            canvas.renderAll();
        }
        return;
    }

    function init() {
        // add canvas
        canvas_elem.width = dims.width;
        canvas_elem.height = dims.height;
        canvas = new fabric.Canvas('canvas');
        canvas.selection = false;
        setInterval(animate, 100);
        return;
    }

    init();
    return;
};
