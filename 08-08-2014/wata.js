var wata = (function(){
    'use strict';
    var dims = getViewportDimensions();
    var PADDING = 100;
    // 0.39361654351 per liter
    // 8.00 per liter
    var water_prices = [0.39, 8.00];
    var scale = d3.scale.linear()
    .domain(water_prices)
    .range([15, 500]);

    var data = [
        {
            'data': water_prices[0],
            'name': 'Hard Rock Casino'
        },
        {
            'data': water_prices[1],
            'name': 'CVS'
        }
    ];

    function init() {
        addBar('#hardrock', data[0]);
        addBar('#cvs', data[1]);
    }

    function addBar(id, data) {
        d3.select(id)
        .append('div')
        .classed('fill', true)
        .style('height', 0)
        .transition()
        .delay(200)
        .style('height', function(d){
            return scale(data.data) + 'px';
        });
    }

    return {
        'init': init
    };

})();

window.onload = wata.init;
