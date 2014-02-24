var toDoSomeArt = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');

    function addAll() {
        canvas.clear();
        doSomethingABunch(function(){
            var color         = randomColor(255);
            var size          = 100;
            var times         = 10;
            var distorted     = rando(10) > 5 ? true : false;
            var use_stroke    = rando(10) > 5 ? randomColor(255) : false;
            var ring_args     = {
                x: rando(width),
                y: rando(height),
                max: times,
                radius: rando(400),
                direction: 'vertical',
                magnitude: 0.4,
                stretch: rando(8),
                shape: 'rect',
                color: randomColor(255),
                thickness: rando(4)
            };
            var rand_height = rando(height / 2);
            var band_args = {
                height: rand_height,
                width: width / 4,
                max_lines: 4,
                decrease_increment: 10,
                opacity: 1,
                fill: randomColor(255),
                poly_points: 4,
                outline: randomColor(255),
                use_gradients: true,
                thickness: rando(4),
                gradient_steps: rando(10),
                shadow: '0px 20px 1px ' + randomColor(255, 0.5),
                top: 0,
                max: rando(4)
            };
            doSomethingABunch(function(){
                addCircleGrid(
                    rando(width),
                    rando(height),
                    randomColor(255),
                    rando(20),
                    (rando(10) > 6 ? 'vertical' : 'horizontal'),
                    rando(6));
            }, 8);
            drawTriangleWave(
                rando(width / 2),
                rando(height / 2),
                true,
                color, size, times, distorted,
                'rgba(' + rando(255) + ', ' + rando(255) + ', ' + rando(255) + ', 0.5) 10px 10px 10px');
            addSporadicUniformRings(ring_args);
            addRandomPolygons(band_args);
            addText(uuid());
            addRandomLinesBG({
                thickness: rando(5),
                opacity: 0.4,
                max_lines: 30
            });
            addRandomAngledCharacters({
                max: 10,
                fontSize: rando(100) + 10
            });
            addRandomAngledCharacters({
                max: 20,
                reverse: true,
                type: 'vertical',
                fontSize: rando(100) + 10
            });
        }, 1);
    }

    function addText(text) {
        addShiftedText({
            text: text,
            left: rando(width),
            vertical: true,
            top: rando(height),
            opacity: 0.7,
            fontFamily: randomArrayValue(global_config.basic_fonts),
            shadow: '0 10px 10px ' + randomColor(255, 0.4),
            fontSize: rando(width / 4),
            fill: randomColor(255)
        });
    }

    function generate() {
        canvas.backgroundColor = randomColor(255);
        addAll();
        canvas.renderAll();
    }

    function liveLine() {
        addRandomLinesBG({
            thickness: rando(5),
            opacity: 1,
            max_lines: 1
        });
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(generate);
        generate();
        setInterval(liveLine, 500);
    }

    return {
        okayLetsDoIt: init
    };

})();

$(document).ready(toDoSomeArt.okayLetsDoIt);
