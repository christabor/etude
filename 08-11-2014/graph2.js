window.onload = function(){
    'use strict';
    var dims       = getViewportDimensions();
    var width      = dims.width;
    var height     = dims.height;
    var elements   = [];
    var svg_dims   = {'width': width, 'height': height / 3};
    var container1 = getSVG('container1', svg_dims, '#container');
    var container2 = getSVG('container2', svg_dims, '#container');
    var container3 = getSVG('container3', svg_dims, '#container');
    var edge       = d3.svg.line()
    .interpolate('cardinal-closed')
    .x(function(d){return d.x})
    .y(function(d){return d.y});

    function triangle(x1, y1, size, angle) {
        return container1.append('g').selectAll('.rad')
        .data([[coordify(x1, y1), coordify(x1 + size, y1 - size), coordify(x1 - size, y1 - size)]])
        .enter()
        .append('path')
        .attr('d', function(d){return edge(d) + 'Z';})
        .attr('fill', 'black')
        .attr('stroke', 'none');
    }

    function connection(container, x1, y1, x2, y2, label) {
        var data = [coordify(x1, y1), coordify(x2, y2)];
        container.append('g')
        .selectAll('.rad')
        .data([data])
        .enter()
        .append('path')
        .attr('d', edge)
        .attr('stroke', 'black')
        .attr('fill', 'none');

        container.append('g')
        .selectAll('.rad')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y})
        .attr('fill', 'red');
    }

    function label(container, data) {
        container
        .append('text')
        .attr('x', data.x)
        .attr('y', data.y)
        .text(data.label);
    }

    function connectAll(container, data) {
        // a tool for processing data with nodes and edges.
        for(var i = 0; i < data.length; i++) {
            // go through all "from" targets
            for(var j = 0; j < data[i].targets.from.length; j++) {
                // Get coords of reference connection
                var _from = data[i].targets.from[j];
                connection(container, data[i].x, data[i].y, data[_from].x, data[_from].y);
            }
            // go through all "to" targets
            for(j = 0; j < data[i].targets.to.length; j++) {
                // Get coords of reference connection
                var _to = data[i].targets.to[j];
                connection(container, data[i].x, data[i].y, data[_to].x, data[_to].y);
            }
            // add labels
            label(container, data[i]);
        }
    }

    function column(x, max) {
        return d3.range(max).map(function(d){
            return {
                'x': x + d * rando(100),
                'y': d * 30,
                'label': randomStringLength(10),
                'targets': {
                    'to': d3.range(2),
                    'from': d3.range(2)
                }
            };
        });
    }

    function init() {

        // top
        d3.range(rando(20) + 2).map(function(d){
            connection(container1, svg_dims.width / 2, d * 20, 0, d * 50);
            connection(container1, svg_dims.width / 2, d * 20, svg_dims.width, d * 50);
        });

        // middle
        connectAll(container2, column(svg_dims.width / 4, 12));
        connectAll(container2, column(svg_dims.width / 3, 8));
        connectAll(container2, column(svg_dims.width / 2, 6));
        connectAll(container2, column(svg_dims.width / 1.4, 4));

        // bottom
        d3.range(rando(40) + 2).map(function(d){
            connection(container3, svg_dims.width / 2, d * 40, width - 10, 0);
            connection(container3, svg_dims.width / 2, d * 40, 10, 0);
        });

        // add visual source
        d3.select('#code code').html(connectAll.toString());
    }

    init();
};
