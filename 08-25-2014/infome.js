window.onload = function(){
    'use strict';
    var width       = 200;
    var height      = 180;
    var small_dims  = {'width': width, 'height': height};
    var container   = getSVG('container', small_dims, '#viz1');

    function swapClass(el, oldclass, newclass) {
        d3.select(el).on('click', function(){
            var _classes = {};
            _classes[oldclass] = false;
            _classes[newclass] = true;
            d3.selectAll('table').classed(_classes);
            d3.selectAll('body').classed(_classes);
        });
    }

    function init() {
        swapClass('#toggle-teal', 'mint', 'teal');
        swapClass('#toggle-mint', 'teal', 'mint');

        container
        .append('g')
        .attr('transform', getCenterTranslation(small_dims))
        .selectAll('.circle')
        .data(d3.range(100))
        .enter()
        .append('circle')
        .attr('cx', function(d){
            return Math.cos(d) * width / 3;
        })
        .attr('cy', function(d){
            return Math.sin(d) * height / 3;
        })
        .attr('opacity', 0.2)
        .transition()
        .attr('r', 0)
        .delay(function(d){return d % 2 === 0 ? d * 10 : d * 20;})
        .attr('r', function(d){
            return d / 4;
        });
    }

    init();
};
