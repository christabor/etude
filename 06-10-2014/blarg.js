var blarg = (function(){
    'use strict';
    var margin      = 200;
    var dims        = getViewportDimensions();
    var width       = dims.width - margin;
    var height      = dims.height - margin;
    var padding     = 100;
    var container   = getSVG('container', dims, 'body');
    var incline     = 0.4;
    var edge_offset = 100;
    var initx       = edge_offset;
    var inity       = edge_offset;
    var min_range   = 1;
    var max_range   = 1000;
    var yGrid       = d3.scale.linear()
    .domain([0, 100])
    .range([0, height]);
    var xGrid       = d3.scale.linear()
    .domain([0, 100])
    .range([0, width]);

    var line = d3.svg.line()
    .x(function(d){return d[0]})
    .y(function(d){return d[1]});

    var xAxisScale = d3.scale.linear()
    .domain([min_range, max_range])
    .range([0, width]);

    var yAxisScale = d3.scale.linear()
    .domain([min_range, max_range])
    .range([height, 0]);

    function newPath() {
        var rand_max = 20;
        var max_points = width - edge_offset / 2;
        return d3.range(max_points).map(function(d){
            // add a 'spike' for fun
            if(d === Math.round(max_points / 2)) {
                initx += rando(rand_max);
                inity += 200;
            }
            else if(initx < width - 300) {
                initx += rando(rand_max);
                inity += rando(rand_max) * incline;
            }
            return [initx, inity];
        });
    }

    function init() {
        addPath(newPath());
        addAxis();
    }

    function addPath(data) {
        container.selectAll('path')
        .data([data])
        .enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
        .attr('d', line);

        container.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 1)
        .transition()
        .duration(function(d, i){return i * 50;})
        .attr('r', 5)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('cx', function(d){return d[0];})
        .attr('cy', function(d){return d[1];});
    }

    function addAxis() {
        var left = 50;
        var top = 30;
        var x_axis = d3.svg.axis()
        .ticks(5)
        .tickPadding(20)
        .tickSize(1)
        .scale(xAxisScale);

        var y_axis = d3.svg.axis()
        .scale(yAxisScale)
        .ticks(5)
        .tickPadding(20)
        .tickSize(1)
        .orient('right');

        // add axis
        var xAxisGroup = container.append('g')
        .attr('id', 'xaxis')
        .attr('transform', 'translate(' + left + ', ' + (height + top) + ')')
        .style('fill', '#ccc')
        .call(x_axis);

        var yAxisGroup = container.append('g')
        .attr('id', 'yaxis')
        .attr('transform', 'translate(' + left + ', ' + top +')')
        .style('fill', '#ccc')
        .call(y_axis);
    }

    return {
        'init': init
    };
})();

window.onload = blarg.init;
