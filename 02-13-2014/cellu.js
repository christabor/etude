window.onload = function() {
    var dims        = getViewportDimensions();
    var width       = dims.width / 2;
    var height      = width;
    var type        = $('#type');
    var reset_btn   = $('#reset');
    var encoding    = $('#encoding');
    var step        = $('#step-count');
    var sizers      = $('.sizer');
    var count       = 0;
    var SPEED       = 50;
    var size        = 10;
    var seeding     = true;
    var states      = [];
    var ruleset
    var active_rule;
    var interval;
    var sizes       = {
        'xsmall': dims.width / 3,
        'small': dims.width / 2,
        'medium': dims.width / 1.5,
        'large': dims.width / 1.1
    };
    var states_map  = {
        1: '#000',
        0: '#fff'
    };

    function setupCanvas() {
        window.canvas_elem = document.querySelector('canvas');
        window.ctx         = canvas_elem.getContext('2d');
        canvas_elem.width  = width;
        canvas_elem.height = height;
    }

    function addBox(i, x, y, state) {
        // update array and add box
        states[i] = [x, y, state];
        ctx.fillStyle = states_map[state];
        ctx.fillRect(x, y, size, size);
        ctx.fill();
    }

    function addGroup(i, first, middle, last, start) {
        // shorthand for verbose additions
        addBox(i - 1, states[i - 1][0], states[i - 1][1], first);
        addBox(i, states[i][0], states[i][1], middle);
        addBox(i + 1, states[i + 1][0], states[i + 1][1], last);

        // also update text
        encoding.html('Rule: ' + start + ' ==> ' + first + ' ' + middle + ' ' + last);
    }

    function checkGroup(i, first, middle, last) {
        // makes checking a given set simpler and more readable
        // by moving into separate function
        if(states[i - 1][2] === first && states[i][2] === middle && states[i + 1][2] === last) {
            return true;
        } else {
            return false;
        }
    }

    function addRow(y) {
        var state = 0;
        for(var xpos = 0, i = 0; xpos <= width; xpos += size, i += 1) {
            seeding ? state = rando(10) > 8 && rando(10) > 8 ? 1 : 0 : state = state;
            if(seeding) {
                addBox(i, xpos, y, state);
            } else {
                try {
                    var start = states[i-1][2] + ' ' + states[i][2] + ' ' + states[i+1][2];
                    // [ i-1, i, i+1 ]
                    // [0,0,0] => [1,0,1]
                    // [0,1,0] => [1,1,0]
                    // [0,1,1] => [1,0,0]
                    // [1,1,0] => [0,1,1]
                    // [1,0,1] => [0,1,1]
                    // [1,1,1] => [0,0,1]
                    if(checkGroup(i, 0, 0, 0)) {
                        addGroup(i, 1, 0, 1, start);
                    }
                    else if(checkGroup(i, 0, 1, 0)) {
                        addGroup(i, 1, 1, 0, start);
                    }
                    else if(checkGroup(i, 0, 1, 1)) {
                        addGroup(i, 1, 0, 0, start);
                    }
                    else if(checkGroup(i, 1, 1, 0)) {
                        addGroup(i, 0, 1, 1, start);
                    }
                    else if(checkGroup(i, 1, 0, 1)) {
                        addGroup(i, 0, 1, 1, start);
                    }
                    else if(checkGroup(i, 0, 0, 1)) {
                        addGroup(i, 0, 0, 1, start);
                    } else {
                        addBox(i - 1, xpos, y, 0);
                        addBox(i, xpos, y, 0);
                        addBox(i + 1, xpos, y, 1);
                    }
                } catch(e) {
                    // log(e);
                }
            }
        }
    }

    function populateArea() {
        ctx.clearRect(0, 0, width, height);
        for(var ypos = 0; ypos <= height; ypos += size) {
            addRow(ypos);
        }
        seeding = false;
        count += 1;
        step.text('Generation: ' + count);
    }

    function resetInterval() {
        interval = setInterval(populateArea, SPEED);
    }

    function adjustSize(event) {
        event.preventDefault();
        var size = $(this).attr('id');
        width = sizes[size];
        height = sizes[size];
        setupCanvas();
        reset();
    }

    function reset() {
        clearInterval(interval);
        seeding = true;
        resetInterval();
        count = 0;
        step.text('Generation: ' + count);
    }

    function init() {
        setupCanvas();
        populateArea();
        resetInterval();
        sizers.on('click', adjustSize);
        reset_btn.on('click', reset);
    }

    init();
};
