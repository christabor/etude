window.onload = function(){
    'use strict';
    var dims        = getViewportDimensions();
    var width       = dims.width;
    var height      = dims.height;
    var _dims       = {'width': width / 3, 'height': width / 3};
    var container   = d3.select('#container');
    var CLEAR_COLOR = 'black';
    var MAX         = 8;

    var utils = {
        newGroup: function() {
            var _container = container
                .append('div')
                .attr('id', uuid())
                .classed('group', true);
            _container.append('p').classed('subdued', true)
                .html('Iteration: 0');
            _container.append('canvas')
                .attr('width', _dims.width)
                .attr('height', _dims.height);
            return _container;
        },
        plotDotAt: function(ctx, x, y, size) {
            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fill();
            ctx.closePath();
        },
        clear: function(ctx) {
            ctx.fillStyle = CLEAR_COLOR;
            ctx.fillRect(0, 0, dims.width, dims.height);
            ctx.fill();
        }
    };

    function lorenzAttractor(start, h, frac, iteration) {
        // page 33 of "Chaos in Wonderland"
        var _group        = utils.newGroup();
        var max           = 20;
        var npts          = 5000;
        var x             = start;
        var y             = start;
        var z             = start;
        var size          = 2;
        var current       = 0;
        var offset_x      = _dims.width / 2;
        var offset_y      = _dims.width / 2;
        var magnitude     = 10;
        var frac_increase = 100;
        var curr_itr      = _group.select('p');
        var ctx           = _group.select('canvas').node().getContext('2d');

        curr_itr.html(['start: ' + start, 'h: ' + h, 'fraction: ' + frac].join(' / '));

        function render() {
            if(current >= max) {
                // remove one = remove all
                d3.select('#loader').classed('fadeOutUp', true);
                return setTimeout(function(){d3.select('#loader').remove()}, 1000);
            }
            current += 1;
            for(var i = 0; i <= npts; i++) {
                x = x + h * 10 * (y - x) * magnitude;
                y = y + h * ((-x * z) + 28 * x - y) * magnitude;
                z = z + h * (x * y - frac * z);
                utils.plotDotAt(ctx, x + offset_x, y + offset_y, size);
            }
            frac += frac_increase;
            requestAnimationFrame(render);
        }

        return {
            'init': render
        };
    }

    function init() {
        // A bunch of attractors
        d3.range(1, MAX).map(function(d){
            var start = 0.01 * d; // 0.06 is default
            var h = 0.001 + (d * 0.0001); // 0.01 is default
            var frac = 8 / d; // 8/3 is default
            lorenzAttractor(start, h, frac, d).init();
        });
    }

    // match loader speed (roughly)
    setTimeout(init, 1000);
};
