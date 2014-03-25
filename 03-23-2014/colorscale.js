var vizzies2 = (function(){
    'use strict';
    var container;
    var data;
    var dims;
    var width;
    var height;
    var svg_h;
    var svg_w;
    var svg;
    var margin;

    function mapData(max) {
        var data = d3.range(max).map(function(d) {
            return d;
        });
        return data;
    }

    function loadDataViz() {
        // these values are reset
        // on event so new interpolations are calculated.
        var min_range;
        var max_range;
        var posScale;
        var fontScale;
        var sizeScale;
        var colorScale;
        var colorScale2;
        var text;
        var circles;
        var squares;
        var xAxisScale;
        var yAxisScale;
        var xAxisGroup;
        var yAxisGroup;
        var x_axis;
        var y_axis;

        min_range = d3.min(data);
        max_range = d3.max(data);
        posScale = d3.scale.linear()
        .domain([min_range, max_range])
        .range([margin, svg_w]);

        xAxisScale = d3.scale.linear()
        .domain([min_range, max_range])
        .range([0, svg_w]);

        yAxisScale = d3.scale.linear()
        .domain([min_range, max_range])
        .range([svg_h, 0]);

        fontScale = d3.scale.linear()
        .domain([min_range, max_range])
        .range([8, 30]);

        sizeScale = d3.scale.linear()
        .domain([0, data.length])
        .range(['red', 'green', 'purple']);

        colorScale = d3.scale.linear()
        .domain([0, data.length / 3, data.length / 2, data.length])
        .range(['red', 'green', 'yellow']);

        colorScale2 = d3.scale.linear()
        .domain([0, data.length / 3, data.length / 2, data.length])
        .range(['orange', 'purple', 'pink']);

        svg = d3.select('#container')
        .append('svg')
        .attr('width', svg_w)
        .attr('height', svg_h);

        text = svg.append('g')
        .attr('id', 'text-group');

        circles = svg.append('g')
        .attr('id', 'circles-group');

        squares = svg.append('g')
        .attr('id', 'squares-group');

        x_axis = d3.svg.axis()
        .ticks(10)
        .tickPadding(20)
        .tickSize(2)
        .scale(xAxisScale);

        y_axis = d3.svg.axis()
        .scale(yAxisScale)
        .ticks(10)
        .tickPadding(20)
        .tickSize(2)
        .orient('right');

        xAxisGroup = svg.append('g')
        .attr('id', 'xaxis')
        .attr('transform', 'translate(0, 12)')
        .style('fill', '#444')
        .call(x_axis);

        yAxisGroup = svg.append('g')
        .attr('id', 'yaxis')
        .attr('transform', 'translate(12, 0)')
        .style('fill', '#444')
        .call(y_axis);

        circles
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', function(d){
            return d;
        })
        .attr('cx', function(d){
            return posScale(d);
        })
        .attr('cy', function(d){
            return posScale(d);
        })
        .attr('transform', function(d){
            return 'rotate(' + -d / 1.5 + ')';
        })
        .attr('fill', function(d){
            return colorScale(d);
        });

        squares
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d){
            return posScale(d) * 2;
        })
        .attr('y', function(d){
            return posScale(d);
        })
        .attr('height', function(d){
            return posScale(d);
        })
        .style('opacity', function(d){
            return d * 0.1;
        })
        .attr('angle', function(d){
            return posScale(d);
        })
        .attr('transform', function(d){
            return 'rotate(' + -d / 1.5 + ')';
        })
        .attr('width', function(d){
            return posScale(d) / 10;
        })
        .attr('fill', function(d){
            return colorScale2(d);
        });

        text.
        selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', function(d){
            return colorScale(d);
        })
        .attr('x', function(d){
            return posScale(d);
        })
        .attr('y', function(d){
            return posScale(d) + 40;
        })
        .attr('font-family', 'Buenard')
        .attr('font-size', function(d){
            return Math.abs(Math.floor(fontScale(d)));
        })
        .text(function(d){
            return fontScale(d);
        });
    }

    function init() {
        container = document.getElementById('container');
        data      = mapData(40);
        dims      = getViewportDimensions();
        width     = dims.width * 0.9;
        height    = dims.height * 0.9;
        svg_h     = height;
        svg_w     = width;
        margin    = 40;
        document.onmousemove = function(e){
            container.innerHTML = '';
            data = mapData(Math.floor((e.clientX + e.clientY) * 0.05) );
            loadDataViz();
        };
    }

    return {
        'init': init
    };
})();

window.onload = vizzies2.init;
