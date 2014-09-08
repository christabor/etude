window.onload = function(){
    'use strict';
    var dims      = getViewportDimensions();
    var container = d3.select('#container');
    var movex = 0;
    var movey = 0;
    var utils     = {
        newGroup: function(dims) {
            var _container = container
            .append('div')
                .attr('id', uuid())
                .classed('group', true);
            _container.append('canvas')
                .attr('width', dims.width)
                .attr('height', dims.height);
            return _container;
        },
        clear: function(ctx, width, height) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.fill();
        },
        square: function(data, ctx, x, y, size) {
            var r = data[x] + data[y]; // red's just cool.
            var g = !movex || movex < 100 ? r / 2 : movex / 3;
            var b = !movey || movey < 100 ? r / 2 : movey / 3;
            var bg = 'rgba(' + [~~r, ~~g, ~~b].join(',') + ', 1)';

            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.fillStyle = bg;
            ctx.fill();
            ctx.closePath();
        }
    };

    function raver() {
        var width  = dims.width;
        var height = dims.height;
        var _dims  = {'width': width, 'height': height};
        var data   = d3.range(width * height).map(rando);
        var size   = 60;
        var _group = utils.newGroup(_dims);
        var ctx    = _group.select('canvas').node().getContext('2d');

        function eventLoop() {
            for(var y = 0; y < height; y += size) {
                for(var x = 0; x < width; x += size) {
                    utils.square(data, ctx, x, y, size);
                    data[x] = data[x] >= 255 ? 0 : data[x] + 1;
                }
            }
        }
        // sorry, requestAnimationFrame just doesn't cut it here.
        setInterval(eventLoop, 100);
    }

    function init() {
        d3.select(document).on('mousemove', function(){
            movex = d3.event.x;
            movey = d3.event.y;
        });
        raver();
    }

    init();
};
