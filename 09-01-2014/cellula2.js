window.onload = function(){
    'use strict';
    var dims        = getViewportDimensions();
    var width       = dims.width / 3.5;
    var height      = width;
    var size        = 5;
    var MAX         = 1;
    var MAX_HISTORY = 10;
    var offset      = 50;
    var svg_dims    = {'width': width, 'height': 150};
    var charts      = getSVG('charts1', svg_dims, '#charts');
    var ratios      = [0, 0];
    var _charts     = null;
    var scale       = d3.scale.linear().range([0, width]);
    var ratio_txt   = d3.select('#ratio');
    var history     = getSVG('history1', svg_dims, '#history');
    var container   = d3.select('#contents')
    .append('canvas')
    .attr('width', width)
    .attr('height', height);
    var ctx         = container.node().getContext('2d');
    var data        = new Uint8Array(width * height);
    var len         = data.length;
    var c_on        = 'orange';
    var c_off       = '#853826';
    var types       = [{
        'fn': function(y, x) {
            /*

                [ 1, 2, 3 ]
                [ 4, 5, 6 ]
                [ 7, 8, 9 ]

            */
            if(data[x] && data[x + 1] || data[x] && data[x - 1]) {
                _draw(y, x, c_on);
                data[x - 1] = false;
            } else {
                _draw(y, x, c_off);
                data[x - 1] = true;
            }
        },
        timesteps: []
    },
    {
        'fn': function(y, x) {
            if(data[x] && data[x + 1] && !data[x + 5]) {
                _draw(y, x, c_on);
                data[x + x / 2] = true;
            } else {
                _draw(y, x, c_off);
                data[x + x / 3] = true;
            }
        },
        timesteps: []
    },
    {
        'fn': function(y, x) {
            if(data[x] && data[x + 1] && data[x + 2]) {
                _draw(y, x, c_on);
                data[x + 1] = false;
                data[x] = false;
            } else {
                _draw(y, x, c_off);
                data[x + 1] = true;
                data[x] = true;
            }
        },
        timesteps: []
    },
    {
        'fn': function(y, x) {
            if(data[x] && data[y - 2]) {
                _draw(y, x, c_on);
                data[y] = false;
                data[y + 1] = false;
                data[x - 1] = true;
            } else {
                _draw(y, x, c_off);
                data[y] = true;
                data[y + 1] = true;
                data[x - 1] = true;
            }
        },
        timesteps: []
    },
    {
        'fn': function(y, x){
            if(data[x] && data[y + 2]) {
                _draw(y, x, c_on);
                data[x] = false;
                data[x + 1] = true;
            } else {
                _draw(y, x, c_off);
                data[x] = true;
                data[x + 2] = true;
            }
        },
        timesteps: []
    }
    ];
    var active = types[0];

    function _seed() {
        for(var i = 1; i <= len; i++) {
            // seed deterministic states
            // data[i] = i % 2 === 0 ? true : false;
            // seed random states.
            data[i] = (rando(10) > 5 ? true : false);
        }
    }

    function _draw(x, y, color) {
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function updateChart() {
        // update scale
        charts.selectAll('rect').remove();
        ratio_txt.html(ratios[1] / ratios[0]);
        scale.domain([0, d3.max(ratios)]);
        charts.selectAll('rect')
        .data(ratios)
        .enter()
        .append('rect')
        .attr('height', 40)
        .attr('width', function(d){return scale(d);})
        .attr('y', function(d, i){return i * offset;})
        .attr('x', function(d, i){return 40;})
        .attr('fill', function(d, i){
            return i === 0 ? c_on : c_off;
        });
    }

    function reset() {
        // reset ratios
        ratios = [0, 0];
        // draw over canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        // remove d3 elements
        charts.selectAll('rect').remove();
        history.selectAll('rect').remove();
        _seed();
        // reset all timelines to
        for(var type in types) {
            types[type].timesteps = [];
        }
    }

    function _loop() {
        for (var y = 0; y <= width; y += size) {
            for (var x = 0; x <= height; x += size) {
                active.fn(y, x);
                if(data[x] === 0) {
                    // off
                    ratios[0] += 1;
                }
                if(data[x] === 1) {
                    // on
                    ratios[1] += 1;
                }
            }
        }
        // add last ratio set to the history for each function.
        if(active.timesteps.length < MAX_HISTORY) {
            active.timesteps.push(ratios);
            updateHistory();
        }
        updateChart();
        // reset ratios
        ratios = [0, 0];
    }

    function updateHistory() {
        if(active.timesteps.length >= MAX_HISTORY) return;
        var color_scale = d3.scale.linear()
        .domain([0, active.timesteps.length])
        .range(['#000', '#ccc']);

        var bar_scale = d3.scale.linear()
        .domain([0, d3.max(active.timesteps, function(d){return d[1];})])
        .range([1, 100]);
        var bar_width = (svg_dims.width / active.timesteps.length) / 2;
        history.selectAll('.history-bar').remove();

        history.selectAll('.history-bar')
        .data(active.timesteps)
        .enter()
        .append('rect')
        .classed('history-bar', true)
        .attr('x', function(d, i){return i * (bar_width + 2)})
        .attr('y', 0)
        .attr('fill', function(d, i){
            return color_scale(i);
        })
        .attr('width', function(d){return bar_width;})
        .attr('height', function(d){return bar_scale(d[1]);});
    }

    function init() {
        // add labels
        charts.selectAll('text')
        .data(['on', 'off'])
        .enter()
        .append('text')
        .attr('text-anchor', 'right')
        .attr('y', function(d, i){return i * offset + 24 /* bar height ~ 2 */; })
        .attr('x', function(d, i){return 0; })
        .text(function(d){return d;});

        d3.select('select')
        .selectAll('option')
        .data(types)
        .enter()
        .append('option')
        .html(function(d, i){return 'Type - ' + i;})
        .attr('name', function(d, i){return 'Type' + i;});

        d3.select('select').on('change', function(){
            var index = document.querySelector('select').options.selectedIndex;
            active = types[index];
            reset();
        });

        _seed();
        d3.timer(_loop);
    }

    init();
};
