var vizzies = (function(){
    'use strict';
    var charts = $('#charts');
    var info  = $('#info');
    var data = mapData(100);
    var scalar;
    var colorScale;

    function getVal(d) {
        // separated for
        // unit-testing goodness!
        return (d + 10) + 'px';
    }

    function mapData(max) {
        var data = _.map(_.range(max), function(num){
            return num;
        });
        return data;
    }

    function loadDataViz() {
        // these values are reset
        // onSlide so new interpolations are calculated.
        colorScale = d3.scale.linear()
        .domain([0, data.length / 3, data.length / 2, data.length])
        .range(['red', 'green', 'purple', 'yellow']);

        d3.select('#charts')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style({
            'font-size': getVal,
            'background-color': colorScale,
            'width': getVal,
            'height': getVal,
            'border-radius': function(d) {
                return d / 2 + 'px';
            }
        })
        .text(function(d){
            return d;
        });
    }

    function init() {
        data = mapData(20);
        loadDataViz();
        $('.slider').slider({
            min: 0,
            max: 100,
            slide: function(e, ui){
                info.find('p').text('Current value: ' + ui.value);
                charts.empty();
                data = mapData(ui.value);
                loadDataViz();
            }
        });
    }

    return {
        'init': init
    };
})();

window.onload = vizzies.init;
