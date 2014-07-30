var directions = (function(){
    'use strict';
    var _dims          = getViewportDimensions();
    var PADDING        = 50;
    var dims           = {
        'width': _dims.width - PADDING,
        'height': _dims.width - PADDING
    };
    var direction      = null;
    var posx           = dims.width / 2;
    var posy           = dims.height / 2;
    var INCREMENT      = 8;
    var RADIUS         = 30;
    var directions     = [
        'topleft', 'topright', 'bottomleft', 'bottomright',
        'up', 'down', 'left', 'right'
    ];
    var _log           = {};
    var svg_height     = 200;
    var logs           = getSVG('log', {'w': dims.width, 'h': svg_height}, '#log-results');
    var curr_direction = d3.select('#direction > span');
    var canvas         = d3.select('#canvas')
                        .append('canvas')
                        .attr('width', dims.width)
                        .attr('height', dims.height);
    var ctx            = canvas.node().getContext('2d');
    var len            = directions.length;
    var BAR_PADDING    = 2;

    // populate initial data with direction types
    d3.range(len).map(function(i){
        _log[directions[i]] = 0;
    });

    var data = getFreshData();
    var domain = [
        d3.min(data, function(d){return d[0];}),
        d3.max(data, function(d){return d[0];})
    ];
    var bar_width = (dims.width / len) - (len * BAR_PADDING);

    var x_scale = d3.scale.linear()
    .domain([0, len])
    .range([0, dims.width]);

    var y_scale = d3.scale.linear()
    .domain(domain)
    .range([4, svg_height - 10]);

    function addCircle() {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(posx, posy, RADIUS, 0, Math.PI * 2);
        ctx.stroke();
    }

    function init() {
        ctx.strokeStyle = 'white';
        setInterval(changeDirection, 400);
        d3.timer(function(){
            // handle... edge cases (oh I crack myself up)
            if(posx <= RADIUS || posx >= dims.width) {posx = 0;}
            if(posy <= RADIUS || posy >= dims.height) {posy = 0;}

            // handle all normal directions
            switch(direction) {
                case 'up':
                    posy += INCREMENT;
                    break;
                case 'down':
                    posy -= INCREMENT;
                    break;
                case 'left':
                    posy -= INCREMENT;
                    break;
                case 'right':
                    posy += INCREMENT;
                    break;
                case 'bottomleft':
                    posy -= INCREMENT;
                    posx -= INCREMENT;
                    break;
                case 'bottomright':
                    posy -= INCREMENT;
                    posx += INCREMENT;
                    break;
                case 'topleft':
                    posy += INCREMENT;
                    posx -= INCREMENT;
                    break;
                case 'topright':
                    posy += INCREMENT;
                    posx += INCREMENT;
                    break;
            }
            addCircle();
        });

        logs.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', '#e87406')
        .attr('y', 20)
        .attr('x', function(d, i){return x_scale(i);})
        .attr('width', bar_width)
        .attr('height', function(d, i){return y_scale(d[0]);});

        logs.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', 'white')
        .attr('font-size', 12)
        .attr('text-anchor', 'left')
        .attr('y', 10)
        .attr('x', function(d, i){return x_scale(i);})
        .text(function(d){return d.join(' / ')});
    }

    function getFreshData(){
        return d3.range(len).map(function(d){
            var _d = directions[d];
            return [_log[_d], _d];
        });
    }

    function refreshData(){
        var bars;
        var labels;
        var _domain;
        var _data = getFreshData();

        _domain = [
            d3.min(_data, function(d){return d[0];}),
            d3.max(_data, function(d){return d[0];})
        ];
        y_scale.domain(_domain);

        bars = d3.selectAll('rect').data(_data);
        bars.transition()
        bars.attr('height', function(d, i){return y_scale(d[0]);});

        labels = d3.selectAll('text').data(_data);
        labels.text(function(d){return d.join(' / ');})
    }

    function changeDirection() {
        direction = randomArrayValue(directions);
        _log[direction] += 1;
        curr_direction.text(direction);
        refreshData();
    }

    return {
        'init': init
    };
})();

window.onload = directions.init;
