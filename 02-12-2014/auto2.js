window.onload = function() {
    var dims        = getViewportDimensions();
    var height      = dims.height / 2;
    var width       = dims.width / 2;
    var canvas_elem = document.querySelector('canvas');
    var type        = $('#type');
    var step        = $('#step-count');
    var SPEED       = 1000;
    var size        = 10;
    var count       = 0;
    var seeding     = true;
    var states      = [];
    var funcs       = {};
    var active_rule;
    var interval;
    var ctx;

    funcs.basic = function(key) {
        if(!states[key + 2]) return;
        if(states[key + 2][2] === 0) {
            return 1;
        } else {
            return 0;
        }
    };

    funcs.zag = function(key) {
        if(!states[key + 4]) return;
        if(states[key + 4][2] === 0) {
            return 1;
        } else {
            return 0;
        }
    };

    funcs.builder = function(key) {
        if(!states[key - 1]) return;
        if(states[key + 1][2] === 0) {
            return 1;
        } else {
            return 0;
        }
    };

    funcs.randomEven = function(key) {
        if(rando(key) % 2 === 0) {
            return 1;
        }
        return 0;
    };

    funcs.randomOdd = function(key) {
        if(rando(key) % 3 === 0) {
            return 1;
        }
        return 0;
    };

    funcs.bands = function(key) {
        if(!states[key + 1]) return;
        if(randomArrayValue(states)[2] % 2 === 0) {
            return states[key + 1][2] = 1;
        }
        return states[key + 1][2] = 0;
    };

    funcs.zag2 = function(key) {
        if(!states[key + 1]) return;
        if(states[key + 1][2] === 0) {
            return 1;
        } else {
            return 0;
        }
    };

    funcs.angleFill = function(key) {
        if(!states[key + 2] || !states[key + 1]) return;
        if(states[key + 2][2] === 1 && states[key + 1][2] === 0) {
            return 0;
        } else {
            return 1;
        }
    };

    funcs.growth = function(key) {
        if(!states[key + 2] || !states[key + 1]) return;
        if(states[key + 2][2] === 0 && states[key + 1][2] === 0) {
            return 0;
        } else {
            return 1;
        }
    };

    funcs.complex1 = function(key) {
        var total_alive = getTotalAlive(key);
        if(total_alive > 3) {
            return 0;
        }
        return 1;
    };

    function getTotalAlive(key) {
        var total = 0;
        if(states[key + 1] && states[key + 1][2] === 1) {
            total += 1;
        }
        if(states[key + 2] && states[key + 2][2] === 1) {
            total += 1;
        }
        if(states[key + 3] && states[key + 3][2] === 1) {
            total += 1;
        }
        if(states[key + 4] && states[key + 4][2] === 1) {
            total += 1;
        }
        if(states[key - 1] && states[key - 1][2] === 1) {
            total += 1;
        }
        if(states[key - 2] && states[key - 2][2] === 1) {
            total += 1;
        }
        if(states[key - 3] && states[key - 3][2] === 1) {
            total += 1;
        }
        if(states[key - 4] && states[key - 4][2] === 1) {
            total += 1;
        }
        return total;
    }

    function addRow(y) {
        var state;
        for (var x = 0, i = 0; x < width; x += size, i++) {
            if(seeding) {
                if(rando(10) > 8) {
                    state = 1;
                } else {
                    state = 0;
                }
            } else {
                state = active_rule(i);
            }
            states[i] = [x, y, state];
            addBox(x, y, state);
        }
    }

    function addRows() {
        for(var y = 0; y <= height; y += size) {
            addRow(y);
        }
        step.html(count);
        count += 1;
        seeding = false;
        // console.table(states);
    }

    function addBox(x, y, state) {
        ctx.fillStyle = (state === 1 ? '#000': '#fff');
        ctx.fillRect(x, y, width, height);
        ctx.fill();
    }

    function updateAutomoton(event) {
        clearInterval(interval);
        var type = $(this).val();
        step.empty();
        count       = 0;
        seeding     = true;
        active_rule = funcs[type];
        interval    = setInterval(addRows, SPEED);
    }

    function init() {
        ctx = canvas_elem.getContext('2d');
        canvas_elem.width  = width;
        canvas_elem.height = height;
        addRows();
        seeding = false;
        populateMenu(funcs, type, '<option>');
        type.on('change', updateAutomoton);
        interval = setInterval(addRows, SPEED);
        active_rule = funcs.basic;
    }

    init();
};
