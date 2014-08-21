var parametric = (function(){
    'use strict';
    var delta      = 0.2;
    var MAX_WIDTH  = 300;
    var MAX_HEIGHT = 300;

    // cache invalidation and naming things, blah blah...
    function addParametricExample(equation, offset, w, h) {
        var _dims     = {'w': MAX_WIDTH, 'h': MAX_HEIGHT};
        var container = getSVG(equation + '-id', _dims, '#container');
        var radius    = 0.3;
        var group     = container.append('g').attr('transform', getCenterTranslation(_dims));
        var constant  = 1;
        var power_x   = 2;
        var power_y   = 4;

        addTitle(container, 'Parametric ' + equation, true);

        d3.timer(function(){
            if(offset < 0) return false;
            // Add required constant and optional axes for equations
            // that require it.
            var coords = mathGraph.parametric[equation](constant, w, h, power_x, power_y);
            group.append('circle')
            .attr('r', radius)
            .attr('stroke-width', 0)
            .attr('stroke', 'none')
            .attr('opacity', 0.2)
            .attr('cx', coords[0] * offset)
            .attr('cy', coords[1] * offset)
            .attr('fill', 'green');
            constant += delta;
            offset -= delta;
            radius += 0.2;
        });
    }

    function addAllGraphs() {
        d3.selectAll('svg').remove();
        addParametricExample('hyperbolaSophisticated2', 100, 10, 50);
        addParametricExample('hyperbolaSophisticated2', 100, 100, 300);
        addParametricExample('hyperbolaSophisticated2', 100, 10, 100);
        addParametricExample('circle', 140);
        addParametricExample('circleRational', 150);
    }

    function init() {
        addAllGraphs();
        d3.select('input').on('change', function(e){
            d3.event.preventDefault();
            log(this.value);
            delta = parseFloat(this.value, 10);
            d3.select('.value').text('delta = ' + delta);
            addAllGraphs();
        });
    }

    return {
        'init': init
    };
})();

window.onload = parametric.init;
