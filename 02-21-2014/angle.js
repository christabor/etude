var coolArts = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var export_btn   = $('#export');
    var generate_btn = $('#generate');
    var load_opts    = {
        load_speed: 100,
        msg: 'Generating art...',
        css: {
            'background': 'black',
            'color': 'white',
            'text-align': 'left',
            'padding': '50px',
            'opacity': 0.8,
            'font-size': '40px'
        }
    };

    function addGroup(x, y) {
        var base_num = rando(255);
        var base     = randomColor(base_num);
        var outlined = rando(10) > 6 ? true : false;
        var radius   = rando(width / 4) + 50;
        for(var i = 0; i <= rando(5); i++) {
            canvas.add(new fabric.Triangle({
                width: radius,
                height: radius,
                angle: rando(10) > 5 ? 360 / i : 90,
                selectable: false,
                fill: (outlined ? '' : randomColor(base_num)),
                stroke: (outlined ? 'none' : randomColor(base_num)),
                strokeWidth: (outlined ? rando(10) : 0),
                opacity: rando(10) * 0.1,
                left: rando(width),
                top: rando(height)
            }));
            canvas.add(new fabric.Circle({
                radius: radius,
                selectable: false,
                opacity: rando(10) * 0.1,
                fill: (outlined ? '' : randomColor(base_num)),
                stroke: (outlined ? 'none' : randomColor(base_num)),
                strokeWidth: (outlined ? rando(10) : 0),
                left: rando(width),
                top: rando(height)
            }));
            canvas.add(new fabric.Rect({
                width: radius,
                height: radius,
                angle: rando(10) > 5 ? 360 / i : 90,
                selectable: false,
                fill: (outlined ? '' : randomColor(base_num)),
                stroke: (outlined ? 'none' : randomColor(base_num)),
                strokeWidth: (outlined ? rando(10) : 0),
                opacity: rando(10) * 0.1,
                left: rando(width),
                top: rando(height)
            }));

            // determine slight color
            // variation (2) vs. high contrast (10)
            base_num += rando(10) > 6 ? 10 : 2;
            addCircleGrid(
                rando(width),
                rando(height),
                randomColor(255),
                rando(20),
                (rando(10) > 6 ? 'vertical' : 'horizontal'),
                rando(10));
        }
    }

    function generate() {
        canvas.clear();
        globalLoader.load(load_opts);
        setTimeout(function(){
            canvas.backgroundColor = randomColor(255);
            doSomethingABunch(function(){
                var color      = randomColor(255);
                var size       = 100;
                var times      = 10;
                var distorted  = rando(10) > 5 ? true : false;
                var use_stroke = rando(10) > 5 ? randomColor(255) : false;
                addGroup(width, height);
                drawTriangleWave(
                    rando(width / 2),
                    rando(height / 2),
                    use_stroke,
                    color, size, times, distorted,
                    'rgba(' + rando(255) + ', ' + rando(255) + ', ' + rando(255) + ', 0.5) 10px 10px 10px');
                addSpirograph(400, 400, 10, randomColor(100), true);
                addChaoticPath(2, width, height, 10);
                globalLoader.unload(100);
            }, 2);
            canvas.renderAll();
        }, 200);
    }

    function init() {
        canvas_elem.width      = width;
        canvas_elem.height     = height;
        canvas                 = new fabric.Canvas('canvas');
        canvas.selection       = false;

        // add events and position text
        export_btn.on('click', function(){
            exportCanvas(canvas);
        });
        generate_btn.on('click', generate);
        generate();
    }

    return {
        init: init
    };
})();

$(document).ready(coolArts.init);
