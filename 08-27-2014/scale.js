window.onload = function(){
    'use strict';
    var dims        = getViewportDimensions();
    var width       = dims.width - 100;
    var height      = 150;
    var small_dims  = {'width': width, 'height': height};
    var TRANSITION  = 100;

    function makeScale(max, ratio) {
        // generate the scale by continually
        // multiplying the previous (or starting) value
        // by the ratio @max times
        var scale = [];
        var last = null;
        for(var i = 1; i < max; i++) {
            last = last ? last * ratio : 1 * ratio;
            last /= 2; // shorten it up for display.
            scale.push(last);
        }
        return scale;
    }

    function makeScaleViz(ratio) {
        // general each visualization
        var MAX_UNITS   = 10;
        var scale       = makeScale(MAX_UNITS, ratio);
        var offset      = 20;
        var BAR_WIDTH   = 2;
        var container   = getSVG('container', small_dims, '#contents');
        var scale_scale = d3.scale.linear()
                          .domain([d3.min(scale), d3.max(scale)])
                          .range([0, width]);
        var color_scale = d3.scale.linear()
                          .domain([d3.min(scale), d3.max(scale)])
                          .range(['green', 'purple']);
        var vscale      = d3.scale.linear()
                         .domain([0, MAX_UNITS])
                         .range([offset, height])
                         .clamp(true);

        // full height bars.
        container
        .append('g')
        .selectAll('.scales')
        .data(scale)
        .enter()
        .append('rect')
        .attr('y', offset) // border
        .attr('opacity', 0)
        .attr('fill', '#ccc')
        .attr('x', function(d, i){
            return scale_scale(d);
        })
        .transition()
        .delay(function(d, i){return i * TRANSITION;})
        .attr('opacity', 1)
        .attr('height', height - offset)
        .attr('width', BAR_WIDTH);

        // colored bg bars
        container
        .append('g')
        .selectAll('.scales')
        .data(scale)
        .enter()
        .append('rect')
        .attr('y', offset) // border
        .attr('opacity', 0)
        .attr('fill', function(d){return color_scale(d);})
        .attr('x', function(d, i){
            return scale_scale(d);
        })
        .transition()
        .delay(function(d, i){return i * TRANSITION;})
        .attr('opacity', 1)
        .attr('height', offset)
        .attr('width', function(d){return d + 1;});

        container
        .append('g')
        .selectAll('.scales-text')
        .data(scale)
        .enter()
        .append('text')
        .attr('y', function(d, i){return vscale(i * 2);}) // border
        .attr('opacity', 0)
        .attr('text-anchor', 'left')
        .attr('font-size', 9)
        .attr('fill', function(d){return color_scale(d);})
        .attr('x', function(d, i){
            return scale_scale(d) + (BAR_WIDTH * 2);
        })
        .transition()
        .delay(function(d, i){return i * TRANSITION;})
        .attr('opacity', 1)
        .text(function(d){return d * 10;});

        container.append('text')
        .attr('x', 1)
        .attr('y', 0)
        .text('Ratio =  ' + ratio);
    }

    function init() {
        // a mix of arbitrary numbers and known rationals
        // (pi, tau, phi, e)
        [
            1.23, 1.41, 1.5, 2.1, 1.30,
            1.6180, 2.71828182,
            Math.PI, 4.1020, Math.PI * 2
        ].reverse().map(makeScaleViz);
    }

    init();
};
