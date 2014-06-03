var sprob = (function(){
    'use strict';
    var count;
    var container;
    var data;
    var dims;
    var width;
    var height;
    var svg_h;
    var svg_w;
    var svg;
    var margin;
    var scale;
    var colorScale;

    function getData(max) {
        return d3.range(max).map(function(d) {
            return d;
        });
    }

    function drawTree() {
        var min_range;
        var max_range;
        var posScale;
        var text;
        var squares;
        var circs;

        min_range = d3.min(data);
        max_range = d3.max(data.length - 1);
        posScale = d3.scale.linear()
        .domain([min_range, max_range]).range([margin, svg_w]);

        svg = d3.select('#container')
        .append('svg')
        .attr('width', svg_w)
        .attr('height', svg_h);

        circs = svg.append('g').attr('id', 'circs');

        circs.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', function(d){
            return colorScale(d);
        })
        .attr('cx', function(d){
            return Math.sin(d) * svg_w;
        })
        .attr('cy', function(d){
            return d;
        })
        .attr('r', function(d){
            return d * 0.1;
        });
    }

    function render(e) {
        container.innerHTML = '';
        count += 20;
        data = getData(e.clientX + e.clientY);
        if(count >= 700) {
            count = 1;
            colorScale = getNewColors(data);
        }
        drawTree();
    }
    function getNewColors(data) {
        return d3.scale.linear()
        .domain([0, data.length / 2, data.length / 1.5, data.length - 1])
        .range([randomColor(255), randomColor(255), randomColor(255), randomColor(255)]);
    }

    function init() {
        container  = document.getElementById('container');
        scale      = 1;
        count      = 1;
        dims       = getViewportDimensions();
        width      = dims.width * scale;
        height     = dims.height * scale;
        data       = getData(width / 2);
        svg_h      = height;
        svg_w      = width;
        margin     = 100;
        colorScale = getNewColors(data);
        window.onmousemove = render;
    }

    return {
        'init': init
    };
})();

window.onload = sprob.init;
