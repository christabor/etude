var subject = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width / 1.5;
    var height    = dims.height / 1.2;
    var ypos      = height / 1.4;
    var offset    = 0;
    var color_scale;
    var graph;
    var pie;
    var circs;

    // This is a bit of a hackneyed example because javascript
    // and d3 have built in observer patterns, and this is generally
    // irrelevant on client-side applications, unless a
    // large framework is being used -- but hey, fk it.
    var observer = {
        'callback': null,
        'curr_data': null,
        processInputs: function() {
            var val = d3.select(this).property('value');
            if(isNaN(val)) return false;
            // throttle size.
            val = val > 100 ? 40 : val;
            observer.callback(val);
        },
        initDelegation: function(input, callback){
            // attach a callable via one-way abstraction
            // to this delegator object - provides a decoupling
            // of callback mechanisms by simply
            // assigning it to this interface.
            this.callback = callback;
            input.on('keyup', this.processInputs);
            input.on('keypress', this.processInputs);
            input.on('keydown', this.processInputs);
        }
    };

    var pie_gen = d3.svg.arc()
    .innerRadius(40)
    .outerRadius(90)
    .startAngle(0)
    .endAngle(function(d){return Math.PI * 2 / d[1];});

    function reloadData(max) {
        // a semi-interesting (visually) results generator
        observer.curr_data = d3.range(max).map(function(d){
            return [d / 2, d * 2]
        });
        color_scale = d3.scale.linear()
        .domain([0, d3.max(observer.curr_data, function(d){return d[0];})])
        .range(['red', 'blue']);
    }

    function restartVisualization(max){
        reloadData(max);
        loadDataViz();
    }

    function init() {
        var _dims = {'w': 300, 'h': 450};
        var container_g = getSVG('cont-g', _dims, '#data-viz1');
        var container_p = getSVG('cont-p', _dims, '#data-viz2');
        var container_c = getSVG('cont-c', _dims, '#data-viz3');

        graph = container_g.append('g')
        .attr('transform', 'translate(40, 0)')
        .attr('id', 'viz-graph');

        pie = container_p.append('g')
        .attr('transform', 'translate(150, 225)')
        .attr('id', 'viz-pie');

        circs = container_c.append('g')
        .attr('transform', 'translate(100, 0)')
        .attr('id', 'viz-circles');

        observer.initDelegation(d3.select('input'), restartVisualization);
        restartVisualization(30);
    }

    function loadDataViz() {
        graph.selectAll('rect').remove();
        pie.selectAll('path').remove();
        circs.selectAll('circle').remove();

        graph.selectAll('rect')
        .data(observer.curr_data)
        .enter()
        .append('rect')
        .attr('fill', function(d){return color_scale(d[0]);})
        .attr('width', function(d){return d[0] * 10})
        .attr('x', 10)
        .attr('y', function(d, i){return i * 10 + 10;})
        .attr('height', 8);

        pie.selectAll('path')
        .data(observer.curr_data)
        .enter()
        .append('path')
        .attr('fill', function(d){return color_scale(d[0]);})
        .attr('y', function(d, i){return 100})
        .attr('d', pie_gen);

        circs.selectAll('circle')
        .data(observer.curr_data)
        .enter()
        .append('circle')
        .attr('fill', function(d){return color_scale(d[0]);})
        .attr('r', function(d){return d[0];})
        .attr('cx', function(d){return d[0] * 2;})
        .attr('cy', function(d, i){return i * 4;});
    }

    return {
        'init': init
    };
})();

window.onload = subject.init;
