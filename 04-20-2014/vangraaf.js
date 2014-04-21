var vangraaf = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var tau         = Math.PI * 2;
    var text_blocks = document.getElementById('text')

    function line(x1, y1, x2, y2) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function rect(x1, y1, w, h) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(x1, y1, w, h);
    }

    function vanDeGraaf() {
        var mid_w = width / 2;
        var mid_h = height / 2;

        // main diagonals + middle
        line(0, 0, width, height);
        line(0, height, width, 0);
        line(mid_w, 0, mid_w, height);

        // sub-diagonals
        line(0, height, mid_w, 0);
        line(width, height, mid_w, 0);

        line(width / 3, 0, width / 3, height / 3);
        line(width / 1.5, 0, width / 1.5, height / 3);

        line(width / 3, 0, width / 1.5, height / 3);
        line(width / 1.5, 0, width / 3, height / 3);

        // left square
        rect(width / 8.8, height / 9, width / 3, height / 1.5);

        // right square
        rect(width / 1.8, height / 9, width / 3, height / 1.5);

        // corner circle - left
        circle(width / 2.24, height / 1.29, 5);

        // corner circle - right
        circle(width / 1.8, height / 1.29, 5);

        // left block
        textBlock('left', width / 8.8, height / 9, width / 3, height / 1.5);

        // right block
        textBlock('right', width / 1.8, height / 9, width / 3, height / 1.5);
    }

    function textBlock(id, x, y, width, height) {
        var block = document.getElementById(id);
        block.style.width = width + 'px';
        block.style.height = height + 'px';
        block.style.left = x + 'px';
        block.style.top = y + 'px';
    }

    function circle(x, y, radius) {
        ctx.fillStyle = 'red';
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.lineTo(x, y);
        ctx.arc(x, y, radius, 0, tau);
        ctx.stroke();
        ctx.fill();
    }

    function init() {
        bootstrapCanvas(null, false);
        vanDeGraaf();
    }

    return {
        init: init
    };

})();

window.onload = vangraaf.init;
