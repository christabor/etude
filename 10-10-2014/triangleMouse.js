window.onload = function() {

    var container  = document.getElementById('container');
    var text_mode  = false;
    // Increasing in complexity to give a shaded look
    var symbols    = ['.', '`', '~', ':', ';', '+', '{', '%', '&', '#', '@'];
    var sym_length = symbols.length - 1;
    var tail       = symbols[sym_length];

    function init() {
        window.onclick = function(e){
            text_mode = !text_mode;
            document.getElementById('body').setAttribute('class', text_mode ? 'charmode' : '');
        };
        window.onmousemove = function(e){
            container.innerHTML = '';
            var mousex = ~~(e.clientX * 0.1);
            var max_lines = clamp(4, ~~(e.clientY * 0.1), 20);
            triangle(mousex, max_lines);
        };
    }

    function getText(mousex, cur_val) {
        var val = '';
        cur_val = ~~((mousex + cur_val) * 0.1);
        if(symbols[cur_val] === undefined || symbols[cur_val] === 'undefined') {
            val = tail;
        } else {
            val = symbols[cur_val];
        }
        return val;
    }

    function triangle(mousex, max_lines) {
        var html = '';
        var cur_max_index = 0;
        var padding = 10;
        var cur_val = 0;
        var prev_first = 1;
        var prev_last = 1;

        // Go through all rows
        for(var i = 0; i < max_lines; i++) {
            if(i !== 0) {
                var row = '';
                // Count up to last index
                for(var j = 0; j < cur_max_index; j++) {
                    cur_val = prev_last + prev_first;
                    // Add mouse coords just to make it interesting.
                    row += pad(text_mode ? getText(mousex, j) : (mousex + cur_val), padding);
                    // Set new beginning to last val
                    prev_first = cur_val;
                }
                // Increase items per row
                cur_max_index += 1;
                html += '<p style=opacity:'+ (cur_max_index * 0.04) +';">' + row + '</p>';
            }
        }
        container.innerHTML = html;
    }

    init();
};
