window.onload = function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width / 5;
    var height    = width;
    var MAX       = 6;
    var _dims     = {'width': width, 'height': height};
    var container = d3.select('#container');
    var digits    = [0, 2, 3, 4, 5];
    var utils     = {
        newGroup: function() {
            var _container = container
            .append('div')
            .attr('id', uuid())
            .classed('group', true);
            _container.append('canvas')
            .attr('width', _dims.width)
            .attr('height', _dims.height);
            return _container;
        },
        clear: function(ctx) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.fill();
        },
        square: function(ctx, color, x, y, size) {
            ctx.beginPath();
            ctx.rect(x, y, size, size);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        },
        seedData: function() {
            var data   = new Int8Array(width * height);
            var len    = data.length;
            for(var i = 0; i < len; i++) {
                // set random starting values,
                // max of 6 for all CA's.
                data[i] = randomArrayValue(digits);
            }
            return data;
        }
    };

    function automataArt(rules) {
        var size    = 10;
        var current = 0;
        var data    = utils.seedData();
        var _group  = utils.newGroup();
        var ctx     = _group.select('canvas').node().getContext('2d');
        var _rule   = randomArrayValue(digits);

        function eventLoop() {
            var color = null;
            for(var y = 1; y < height; y += size) {
                for(var x = 1; x < width; x += size) {
                    var rule = rules[data[x]];
                    utils.square(ctx, rule[1], x, y, size);
                    data[x] = rule[0];
                }
            }
            current += 1;
            requestAnimationFrame(eventLoop);
        }

        eventLoop();
    }

    function randomRules() {
        var ruleset = {};
        function _singleRule() {
            var raf    = randomArrayValue;
            var colors = d3.range(MAX).map(function(){return randomColor(255, 1)});
            return [rando(MAX), raf(colors), raf(colors)];
        }
        for(var i = 0; i < MAX; i++) {
            ruleset[i] = _singleRule();
        }
        return ruleset;
    }

    function init() {
        d3.range(6).map(function(d){
            automataArt(randomRules());
        });
    }

    init();
};
