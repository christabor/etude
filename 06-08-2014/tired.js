var tired = (function(){
    'use strict';
    var margin       = 0;
    var dims         = getViewportDimensions();
    var width        = dims.width - margin;
    var height       = dims.height - margin;
    var reverse      = true;
    var svg          = d3.select('body').append('svg')
    var colorScale   = d3.scale.linear()
    .domain([0, width])
    .range(['red', 'purple', 'blue'])
    var max          = width / 4;
    var tree         = d3.layout.tree().size([height, width]);
    var diagonal     = d3.svg.diagonal()
    .projection(function(d) {return [d.y, d.x];});

    function init() {
        svg.attr('width', width)
        .attr('height', height);
        var data = d3.range(20).map(function(d, i){
            return [rando(width), rando(height)];
        });

        function redraw() {
            svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', function(d){
                return d[0];
            })
            .attr('y', function(d){
                return d[1];
            })
            .attr('font-size', 2)
            .transition()
            .duration(function(d, i){
                return i * 100;
            })
            .attr('font-size', function(d){
                return d[0] / 2;
            })
            .attr('fill', function(d){return colorScale(d);})
            .text('Z');
        }

        svg.on('mousemove', function() {
            data.push(d3.mouse(this));
            redraw();
        });
        redraw();
    }

    return {
        'init': init
    };
})();

window.onload = tired.init;
