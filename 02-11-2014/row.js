window.onload = function() {
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width / 1.5;
    var canvas_elem = document.querySelector('canvas');
    var size        = 30;
    var seeding     = true;
    var states      = [];
    var ctx;

    function addRow(y) {
        var state;
        for (var x = 0, i = 0; x < width; x += size, i++) {
            if(seeding) {
                state = rando(10) > 8 ? 1 : 0;
            } else {
                state = checkRule(i);
            }
            states[i] = [x, y, state];
            addBox(x, y, state);
        }
    }

    function checkRule(key) {
        // 0,  1,  2,
        // 3, [4], 5,
        // 6,  7,  8
        // if(!states[key - 4] || !states[key + 4]) return;
        if(rando(10) > 6) {
        // if(states[key + 1][2] === 0 && states[key + 4][2] === 1) {
            return 1;
        } else {
            return 0;
        }
    }

    function addRows() {
        for(var y = 0; y <= height; y += size) {
            addRow(y);
        }
        // console.table(states);
    }

    function addBox(x, y, state) {
        ctx.fillStyle = (state === 1 ? '#000': '#fff');
        ctx.fillRect(x, y, width, height);
        ctx.fill();
    }

    function init() {
        ctx = canvas_elem.getContext('2d');
        canvas_elem.width  = width;
        canvas_elem.height = height;
        addRows();
        seeding = false;
        setInterval(addRows, 500);
    }

    init();
};
