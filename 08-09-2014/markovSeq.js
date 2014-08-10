var markovSeq = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var curr_val    = 0;
    var $output     = document.getElementById('output');
    var red;
    var blue;
    var bar1;
    var bar2;
    var count = 0;
    var max = 100;
    var all = '';
    var zeroes = 0;
    var ones = 0;

    function startMarkov() {
        var prev = 0;
        var current = 0;
        setInterval(function(){
            if(count > max){
                return;
            }
            if(prev === 0) {
                zeroes += 1;
                bar1.updateHeight(zeroes);
                blue.activate();
                blue.activateConnection();
                red.deactivate();
                red.deactivateConnection();
                current = 1;
            } else {
                ones += 1;
                bar2.updateHeight(ones);
                red.activate();
                red.activateConnection();
                blue.deactivate();
                blue.deactivateConnection();
                current = 0;
            }
            updateOutput(all);
            all += current + ' ';
            count += 1;
            prev = current;
        }, 400);
    }

    function updateOutput(val) {
        log(val);
        $output.innerHTML = 'Iteration: ' + count + '<br> Value: <br>' + val;
    }

    function addGraph(top, left) {
        var opts = {
            top: top,
            left: left,
            fill: 'black',
            width: 1,
            height: height / 2
        };
        canvas.add(new fabric.Rect(opts));
        opts.height = 1;
        opts.width = width / 2;
        opts.top = height / 2;
        canvas.add(new fabric.Rect(opts));
    }

    function addElements() {
        var RADIUS = 60;
        red = new MarkovState('red', 100, 400, RADIUS, '1');
        blue = new MarkovState('blue', 100, Math.abs(width - 400), RADIUS, '0');
        bar1 = new Bar('red', 100, Math.abs(height - 300), 400);
        bar2 = new Bar('blue', 100, Math.abs(height - 300), Math.abs(width - 400));
        blue.connectTo(red, 60, width / 2, 'right');
        red.connectTo(blue, 130, width / 2, 'left');
        startMarkov();
    }

    function init() {
        bootstrapCanvas(null, true);
        addElements();
    }

    return {
        init: init
    };

})();

window.onload = markovSeq.init;
