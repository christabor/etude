window.onload = function(){
    'use strict';
    var dims    = getViewportDimensions();
    var width   = dims.width / 2;
    var height  = width;
    var size    = 3;
    var MAX     = 10;
    var columns = clamp(width / size, width / size, 1000);
    var rows    = clamp(height / size, height / size, 1000);

    function board() {
        var container = d3.select('#contents')
        .append('canvas')
        .attr('width', columns + size)
        .attr('height', rows + size);

        var ctx  = container.node().getContext('2d');
        var data = new Uint8Array(width * height);
        var len  = data.length;

        function _seed() {
            // seed random states.
            for(var i = 1; i <= len; i++) {
                data[i] = (rando(10) > 5 ? 1 : 0);
            }
        }

        function _draw(x, y, color) {
            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        function _alive(i, j) {
            if(data[i] === 1 && data[j] === 1) {
                return true;
            }
            return false;
        }

        function _loop() {
            _seed();
            for (var i = 0 ; i <= columns; i += size) {
                for (var j = 0 ; j <= rows; j += size) {
                    if(_alive(i, j)) {
                        _draw(i , j, 'red');
                    } else {
                        _draw(i, j, 'white');
                    }
                }
            }
        }

        _loop();
    }

    function newBoards() {
        d3.selectAll('canvas').remove();
        d3.range(MAX).map(board);
    }

    function init() {
        d3.select('button').on('click', newBoards);
        newBoards();
    }

    init();
};
