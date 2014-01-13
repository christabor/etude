window.onload = function() {
    var animate;
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var buttons     = $('#plain-menu');
    var radius      = 4;
    var tau         = Math.PI * 2;
    var step        = 0.1;
    var w           = dims. width * 0.1;
    var h           = dims.height * 0.1;
    var funcs       = {
        tau: function() {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.cos(angle) + width / 2, (h * 2) * Math.sin(angle) + height / 2);
                angle += step;
            }
        },
        pi: function(x, y) {
            var angle = 0.0;
            while(angle < Math.PI) {
                addIt(w * Math.cos(angle) + width / 2, h * Math.sin(angle) + height / 2);
                angle += step;
            }
        },
        pi_oval: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.cos(angle) + width / 2, h * Math.sin(angle) + height / 2);
                angle += step;
            }
        },
        tango: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.tan(angle) + width / 2, h * Math.sin(angle) + height / 2);
                angle += step;
            }
        },
        tango_2: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.tan(angle) + width / 2, h * Math.cos(angle) + height / 2);
                angle += step;
            }
        },
        tango_3: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.cos(angle) + width / 2, h * Math.tan(angle) + height / 2);
                angle += step;
            }
        },
        tango_4: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.sin(angle) + width / 2, h * Math.tan(angle) + height / 2);
                angle += step;
            }
        },
        combo: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.sin(angle) + width / 2, h * Math.tan(angle) + height / 2);
                addIt(w * Math.cos(angle) + width / 2, h * Math.sin(angle) + height / 2);
                addIt(w * Math.tan(angle) + width / 2, h * Math.cos(angle) + height / 2);
                angle += step;
            }
        },
        combo_2: function(x, y) {
            var angle = 0.0;
            while(angle < tau) {
                addIt(w * Math.sin(angle) + width / 2, h * Math.tan(angle) + height / 2);
                addIt(w * Math.cos(angle) + width / 2, h * Math.tan(angle) + height / 2);
                addIt(w * Math.tan(angle) + width / 2, h * Math.cos(angle) + height / 2);
                angle += step;
            }
        },
    };

    function addIt(x, y) {
        var color = randomColor(200);

        // add new circle
        canvas.add(new fabric.Circle({
            radius: radius,
            fill: color,
            opacity: 0.8,
            selectable: false,
            left: x,
            top: y
        }));
    }

    function init() {
        var func;
        var seed           = 0;
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;

        // add buttons
        for(func in funcs) {
            var code = funcs[func];
            buttons.append('<li><code class="flyout">' + code + '</code><a href="#" id="' + func + '">' + (func.split('_').join(' ')) + '</a></li>');
        }

        buttons.find('a').on('click', function(e){
            e.preventDefault();
            var type = $(this).attr('id');
            canvas.clear();
            clearInterval(animate);
            funcs[type]();
        });
    }

    init();
};
