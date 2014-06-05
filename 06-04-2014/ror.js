var ror = (function(){
    'use strict';
    var data       = getData(100, 100, 100);
    var scale      = 1;
    var dims       = getViewportDimensions();
    var width      = dims.width * scale;
    var height     = dims.height * scale;
    var colorScale = d3.scale.linear()
            .domain([0, width / 2, width])
            .range(['orange', 'green', 'blue']);

    function getData(total, min, max){
        return d3.range(total).map(function(d) {
            return randomCoords(min, max);
        });
    }

    function circMousemove(e) {
        d3.select(this)
        .attr('fill', function(d){ return colorScale(d.y * 10); })
        .attr('stroke', function(d){ return colorScale(d.x * 10); })
        .attr('stroke-width', function(d){ return (d.x + d.y) / 10; })
    }

    function init() {
        var svg = d3.select('body').append('svg')
            .attr('width', width)
            .attr('height', height);

        var circs = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .on('mousemove', circMousemove);

        circs.attr('fill', function(d){ return colorScale(d.x * 10); })
            .attr('r', function(d){ return d.x + d.y; })
            .attr('cy', function(d){ return d.y * 5; })
            .attr('cx', function(d){ return d.x * 10; })
            .on('mouseover', function(e){
                d3.select(this)
                .attr('fill', 'green');
            })
            .on('mouseover', function(e){
                var self = d3.select(this);
                self.transition()
                .attr('r', rando(100) + 20);
            })
            .on('mouseout', function(e){
                var self = d3.select(this);
                self.transition()
                .attr('r', rando(50) + 10);
            })
            .transition()
            .duration(function(d, i){ return i * 10; })
            .attr('r', function(d){ return d.x + d.y / 2; })
            .attr('transform', function(d){ return 'rotate(' + ((d.x + d.y) / 4) + ')'; })
            .attr('cx', function(d){ return d.x * 30; });
    }

    return {
        'init': init
    };
})();

window.onload = ror.init;
