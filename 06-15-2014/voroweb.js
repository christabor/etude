var voroweb = (function(){
    'use strict';
    var zoom           = d3.behavior.zoom().scaleExtent([1, 20]);
    var dims           = getViewportDimensions();
    var width          = dims.width;
    var height         = dims.height;
    var voronoi        = d3.geom.voronoi().clipExtent([[0, 0], [width, height]]);
    var vertices       = [];
    var colors         = ['red', 'blue', 'green', 'purple'];
    var drag           = d3.behavior.drag();
    var svg            = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height).append('g').call(zoom);
    var path           = svg.append('g').selectAll('path');
    var initial_colors = [
    randomArrayValue(colors),
    randomArrayValue(colors),
    randomArrayValue(colors)
    ];
    var borderScale    = d3.scale.linear().range(initial_colors).domain([width, width / 2, 0]);
    var colorScale     = d3.scale.linear().range(initial_colors).domain([0, width]);

    function resetVertices() {
        vertices = d3.range(14).map(function(d) {return [rando(width), rando(height)];});
    }

    function drawAll() {
        // performance reset
        if(vertices.length > 200) {
            resetVertices();
        }
        d3.range(2).map(function(d) {
            vertices.push([rando(width), rando(height)]);
        });
        // delete old circles
        svg.selectAll('circle').remove();
        // redraw voronoi
        drawVoronoi();
    }

    function init() {
        zoom.on('zoom', zoomIt);
        svg.on('mousemove', drawAll);
        resetVertices();
        drawAll();
    }

    function addPoint(d) {
        var size = 5;
        svg.append('circle')
        .attr('r', 1)
        .attr('r', size)
        .style('fill', function(){return borderScale(d[0][1]);})
        .attr('cx', function(){return d[0][0];})
        .attr('cy', function(){return d[0][1];})

        svg.append('circle')
        .attr('r', 1)
        .attr('r', size)
        .style('fill', function(){return borderScale(d[1][1]);})
        .attr('cx', function(){return d[1][0];})
        .attr('cy', function(){return d[1][1];})
    }

    function polygon(d) {
        addPoint(d);
        return 'M' + d.join('L') + 'Z';
    }

    function drawVoronoi() {
        path = path.data(voronoi(vertices), polygon);
        path.exit().remove();
        path.enter().append('path')
        .attr('d', polygon)
        .attr('stroke', function(d){return borderScale(d[1][0]);})
        .style('stroke-width', function(d, i){return i / 10;})
        .style('fill', function(d, i){return colorScale(d[0][1]);});
        path.order();
    }

    function zoomIt() {
        return svg
        .attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')');
    }

    return {
        'init': init
    };
})();

window.onload = voroweb.init;
