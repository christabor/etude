var rec = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;

    function addCircleGroup(total) {
        total = total + 10;
        var _dims = {'w': total * 20, 'h': total * 20};
        var cont = getSVG('recurse', _dims, '#vis');
        recursiveAdd(cont, total, dims.width / 2 , dims.height / 2, _dims);
        addTitle(cont, 'total=' + total, 14);
    }

    function recursiveAdd(cont, total, x, y, dims) {
        var tightness = 3;  // smaller = tighter
        var data = d3.range(total);
        var color_scale = d3.scale.linear()
        .domain([0, d3.max(data) / 2, d3.max(data)])
        .range(['red', 'green', 'blue']);
        if(total <= 0) {
            return;
        }
        var group = cont.append('g')
        .attr('transform', getCenterTranslation(dims))
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('transform', 'scale(' + total * 0.1 + ')')
        .attr('opacity', 0.3)
        .attr('stroke-width', 0.3)
        .attr('stroke', 'white')
        .attr('fill', function(d){return color_scale(d);})
        .attr('cx', function(d){return Math.cos(d) * total * tightness;})
        .attr('cy', function(d){return Math.sin(d) * total * tightness;})
        .attr('r', function(d,i){return total * 2;});

        return recursiveAdd(cont, total - 4, x / 2, y / 2, dims);
    }

    function init() {
        d3.range(30).map(function(d){
            addCircleGroup(d);
        });
    }

    return {
        'init': init
    };
})();

window.onload = rec.init;
