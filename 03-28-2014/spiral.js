var circentric = (function(){
    var dims         = getViewportDimensions();
    var height         = dims.height;
    var width          = dims.width;
    var canvas_elem    = document.querySelector('canvas');
    var rot            = 0;
    var max_iterations = 720;
    var increment      = 2;
    var total          = Math.floor(360 / increment);
    var $iterations    = $('#iterations').find('span');
    var $rotations     = $('#rotations');
    var $funcs         = $('#funcs');
    var line_defaults  = {
        height: 2,
        left: width / 2,
        top: height / 2,
        opacity: 0.2,
        selectable: false
    };
    var funcs          = {
        rotationTau: function(){
            line_defaults.width = width / 10 + rot;
            line_defaults.angle = rot + rot * (Math.PI * 2);
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        tangentRotation: function(){
            line_defaults.width = width / 4 + rot;
            line_defaults.angle = Math.tan(rot);
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        perfect: function(){
            line_defaults.width = width / 10 + rot;
            line_defaults.angle = rot + Math.sqrt(rot);
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        tangentRandom: function(){
            line_defaults.width = width;
            line_defaults.angle = Math.cos(rot) + rando(360);
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        tangential: function(){
            line_defaults.width = width;
            line_defaults.angle = Math.tan(rot) + 100;
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        warp: function(){
            line_defaults.width = (height - rot) * Math.sqrt(rot);
            line_defaults.angle = rot;
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        radial: function(){
            line_defaults.width = width + rot * Math.sqrt(rot);
            line_defaults.angle = rot;
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        random: function(){
            line_defaults.width = width / 3 + rando(100);
            line_defaults.angle = rot;
            var line = new fabric.Rect(line_defaults);
            return line;
        },
        sqrt: function(){
            line_defaults.width = width / rot * Math.sqrt(rot);
            line_defaults.angle = rot;
            var line = new fabric.Rect(line_defaults);
            return line;
        }
    };
    var active_fn = funcs.sqrt;

    function setActive(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        updateAll();
        active_fn = setActiveFn($links, funcs, $(this), active_fn);
    }

    function mapFuncsToButtons() {
        // add a menu based on a set of functions
        populateMenu(funcs, $funcs, '<a href="#" class="func"></a>');

        // add links event handlers which set the active function
        $links = $funcs.find('.func');
        $links.on('click', setActive);
        $rotations.on('change', function(){
            max_iterations = $rotations.val();
            log(max_iterations);
            add();
        });
    }

    function updateAll() {
        canvas.clear();
        canvas.renderAll();
    }

    function add() {
        $iterations.html(max_iterations);
        var line = active_fn();
        rot += increment;
        if(rot >= max_iterations) {
            updateAll();
            rot = 0;
            return;
        }
        canvas.add(line);
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI(null);
        mapFuncsToButtons();
        setInterval(add, 10);
    }

    return {
        init: init
    };

})();

window.onload = circentric.init;
