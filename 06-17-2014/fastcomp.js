var fastcomp = (function(){
    'use strict';
    var dims       = getViewportDimensions();
    var width      = dims.width;
    var height     = dims.height;
    var MARGIN     = 100;
    var XPOS       = 100;
    var PADDING    = 20;
    var MAX        = 30;
    var colorScale = d3.scale.linear().range(['green', '#111']).domain([0, MAX / 2]);
    var container  = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

    function init() {
        d3.json('comps.json', function(data){
            var fontScale = d3.scale.linear()
            .domain([1, MAX])
            .range([30, 14]);
            var LEFT = width / 2;
            var dist_multiplier = 10;

            // bg circles
            container.append('g').attr('id', 'circles')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .transition()
            .delay(function(d, i){
                return i * 50;
            })
            .attr('r', function(d){
                return parseInt(d['rmax rpeak ( pflops )'], 10) * dist_multiplier;
            })
            .attr('fill', function(d){
                var size = parseInt(d.rank.split(' ')[0], 10);
                return colorScale(size);
            })
            .attr('cx', LEFT)
            .attr('cy', function(d){
                var radius = parseInt(d['rmax rpeak ( pflops )'], 10) * dist_multiplier;
                var size = parseInt(d.rank.split(' ')[0], 10);
                return PADDING + radius + size * 2;
            });
            // rank label
            container.append('g').attr('id', 'ranks')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .transition()
            .delay(function(d, i){
                return i * 50;
            })
            .attr('font-size', function(d){
                var size = parseInt(d.rank.split(' ')[0], 10) * 2;
                return fontScale(size);
            })
            .text(function(d){return d.rank.split(' ')[0];})
            .attr('x', function(d, i){
                var pos = parseInt(d['rmax rpeak ( pflops )'], 10) * 4;
                if(i % 2 === 0) {
                    return LEFT + pos;
                } else {
                    return LEFT - pos;
                }
            })
            .attr('y', function(d){
                var radius = parseInt(d['rmax rpeak ( pflops )'], 10) * dist_multiplier;
                var size = parseInt(d.rank.split(' ')[0], 10);
                return PADDING + radius + size * 2;
            });

            // detailed info
            var info = container.append('g').attr('id', 'info')
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('font-size', function(d){
                var size = parseInt(d.rank.split(' ')[0], 10);
                return fontScale(size);
            })
            .transition()
            .delay(function(d, i){
                return i * 50;
            })
            .attr('class', 'subdued')
            .text(function(d){return d.name + ' / ' + d.vendor;})
            .attr('x', function(d, i){
                var pos = parseInt(d['rmax rpeak ( pflops )'], 10) * 4 + 100;
                if(i % 2 === 0) {
                    return LEFT + pos;
                } else {
                    return LEFT - pos;
                }
            })
            .attr('y', function(d){
                var radius = parseInt(d['rmax rpeak ( pflops )'], 10) * dist_multiplier;
                var size = parseInt(d.rank.split(' ')[0], 10);
                return PADDING + radius + size * 2;
            });
        });
}

return {
    'init': init
};
})();

window.onload = fastcomp.init;
