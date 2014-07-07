var jungle = (function(){
    'use strict';
    var dims       = getViewportDimensions();
    var height     = dims.height;
    var width      = dims.width;
    var MAX        = 15;
    var MAX_STROKE = 12;
    var PADDING    = 50;

    function path(group, data) {
        var max_x = d3.max(data, function(d){return d.x;});
        var max_y = d3.max(data, function(d){return d.y;});

        var xPath = d3.scale.linear()
        .domain([0, max_x])
        .range([0, width]);

        var yPath = d3.scale.linear()
        .domain([0, max_y])
        .range([0, height - PADDING * 2]);

        var stroke = rando(MAX_STROKE);
        var size = clamp(stroke, 2, MAX_STROKE);
        var line = d3.svg.line()
        .x(function(d){return xPath(d.x);})
        .y(function(d){return yPath(d.y);})
        .interpolate('cardinal');

        var colorScaleStroke = d3.scale.linear()
        .domain([0, MAX_STROKE])
        .range(['green', 'purple']);

        var colorScaleDist = d3.scale.linear()
        .domain([0, max_y])
        .range(['red', 'green']);

        group.selectAll('.path-line')
        .data([data])
        .enter()
        .append('path')
        .attr('opacity', 0)
        .attr('fill', 'none')
        .attr('stroke', colorScaleStroke(size))
        .attr('stroke-width', stroke)
        .attr('opacity', 0.8)
        .attr('d', line);

        group.selectAll('.node')
        .data(data)
        .enter()
        .append('circle')
        .attr('opacity', 0)
        .attr('r', 1)
        .attr('cx', function(d){return xPath(d.x);})
        .attr('cy', function(d){return yPath(d.y);})
        .attr('stroke-width', 2)
        .attr('stroke', colorScaleStroke(size))
        .attr('fill', function(d, i){
            return colorScaleDist(d.y);
        })
        .attr('r', size / 1.2)
        .attr('opacity', function(d,i){return size * 0.1;});
    }

    function init() {
        var container = getSVG('map', dims, '#container');
        var group = container.append('g')
        .attr('transform', 'translate(0, ' + PADDING + ')');

        for(var i = 1; i < MAX; i++) {
            path(group, bumpLayer(clamp(i * 10, 10, 60)));
        }

        container.append('text')
        .attr('font-size', 50)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .text('Data Jungle');
    }

    return {
        'init': init
    };
})();

window.onload = jungle.init;
