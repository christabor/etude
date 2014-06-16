var zoomable = (function(){
    'use strict';
    var dims   = getViewportDimensions();
    var width  = dims.width;
    var height = dims.height;
    var svg;

    function init() {
        svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

        // add a bg to trigger zoom everywhere - not just the foreground
        svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'white');

        var data = d3.range(1000).map(function() {
            return [rando(width), rando(height)];
        });

        var zoomBehavior = d3.behavior.zoom()
        .scaleExtent([1, 30])
        .on('zoom', zoom);

        svg.call(zoomBehavior);

        var circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 1)
        .attr('transform', function(d) {
            return 'translate(' + width / 2 + ',' + height / 2 + ')';
        })
        .attr('opacity', 0.3)
        .transition()
        .delay(function(d){return d[0] * 4;})
        .attr('transform', function(d) {
            return 'translate(' + d + ')';
        })
        .attr('r', 4)
        .attr('fill', function(d){return randomColor(255);});

        // add some text for zooming fun
        svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function(d){return 'zoom @ ' + d;})
        .attr('transform', function(d) {
            return 'translate(' + width / 2 + ',' + height / 2 + ')';
        })
        .transition()
        .delay(function(d){return d[0] * 4;})
        .attr('transform', function(d) {
            return 'translate(' + d + ')';
        });
    }

    function zoom() {
        return svg.attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')');
    }
    return {
        'init': init
    };
})();

window.onload = zoomable.init;
