var transcend = (function(){
    'use strict';
    var dims     = getViewportDimensions();
    var diagonal  = d3.svg.diagonal();
    var _dims     = {'w': dims.width, 'h': dims.height};
    var deg       = 0;
    var MAX_RINGS = 10;
    var rings     = d3.range(MAX_RINGS).map(function(d){
        return {'scale': d / 3, 'radius': d * 10};
    });

    function init() {
        // draw nodes
        var main = d3.select('body')
        .append('svg')
        .attr('width', dims.width)
        .attr('height', dims.height)
        .append('g')
        .attr('id', 'main-group')
        .attr('transform', getCenterTranslation(_dims));

        // Make matching radial groups of concentric circls
        // but shrink each one down by a factor to give the effect
        // of concentric styles moving outward
        var ring_groups = main.selectAll('g')
        .data(rings)
        .enter()
        .append('g')
        .attr('transform', function(d){return 'scale(' + [d.scale, d.scale].join(',') + ')';})
        .selectAll('circle')
        .data(function(d){return d3.range(360);})
        .enter();

        ring_groups.append('circle')
        .attr('fill', 'none')
        .attr('stroke', '#bff3c6')
        .attr('cx', function(d, i){return Math.cos(i) * i;})
        .attr('cy', function(d, i){return Math.sin(i) * i;})
        .attr('r', 1)
        .transition()
        .delay(function(d, i){return i * 50;})
        .attr('stroke-width', function(d,i){return i % 3 === 0 ? 1.2: 0.1;})
        .attr('opacity', function(d, i){return i * 0.01;})
        .attr('r', function(d, i){return i / 8;});

        // rotate that biddy
        d3.timer(function(){
            main.selectAll('g').attr('transform', 'rotate(' + deg + ')');
            deg += 1;
        });
    }

    return {
        'init': init
    };
})();

window.onload = transcend.init;
