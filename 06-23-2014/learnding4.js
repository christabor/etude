var learnding4 = (function(){
    'use strict';
    var width      = 400;
    var height     = width;
    var dims       = {'w': width, 'h': height};
    var diagonal   = d3.svg.diagonal();
    var colorScale = d3.scale.linear()
        .domain([1, 180, 360])
        .range(['red', 'blue', 'green']);

    function init() {
        var fns = [
            function() {
                function makeSpiral(inner, outer) {
                    var dims = {'w': 200, 'h': 200};
                    var container = getSVG('pie', dims, '#spiral-container');
                    // generate an arc based on radial values in
                    // increments of 90 degrees
                    var pie = d3.layout.pie()(d3.range(90 * rando(10) + 90));
                    // create arc path generator, using a fraction
                    // of the data size to generate a "growing" spiral
                    var arc = d3.svg.arc()
                    .innerRadius(function(d){return (d.data + 1) / inner;})
                    .outerRadius(function(d){return (d.data + 1) / outer;});
                    container.append('g')
                    .attr('transform', getCenterTranslation(dims))
                    .selectAll('path')
                    .data(pie)
                    .enter()
                    .append('path')
                    .transition()
                    .delay(function(d, i){return i * 5})
                    .attr('fill', function(d, i){return colorScale(i);})
                    .attr('d', arc);
                    addTitle(container, 'Spiral pie-arc [d3.layout.pie, d3.svg.arc]');
                }
                // create multiple options for inner/outer radius
                var opts = [[12, 4], [8, 4], [5, 3], [6, 3]];
                // create many artboards dynamically
                for(var i = 0; i < opts.length; i++) {
                    makeSpiral(opts[i][0], opts[0][1]);
                }
            },
            function() {
                var container = getSVG('stack', dims);
                // generate some bumpdata
                var data = randomStackLayer(10, 10, width, height);
                // create stack constructor
                var stack = d3.layout.stack()
                .offset('wiggle')
                .values(function(d){return d.values;});
                // generate computed stack values
                var stack_data = stack(data);
                // create svg path generator for stack data
                var area = d3.svg.area()
                .x(function(d){return d.x;})
                .y0(function(d){return d.y0;})
                .y1(function(d){return d.y0 - d.x;})

                container.append('g')
                .attr('transform', 'translate(10, 200),scale(40, 20)')
                .selectAll('path')
                .data(stack_data)
                .enter()
                .append('path')
                .attr('fill', function(d, i){return randomColor(255);})
                .attr('d', function(d){return area(d.values)});

                addTitle(container, 'Random data stack [d3.layout.stack]');
            },
            function(){
                var container = getSVG('tree', dims);
                var tree = d3.layout.tree()
                .size([width, height / 2]);
                var data = randomHierarchical(10, 10, width, 4);
                var nodes = tree.nodes(data);
                var links = tree.links(nodes);
                var group = container.append('g')
                .attr('transform', 'translate(0, 100)');

                function getWidth(d) {
                    // returns width of a unit
                    // based on depth value
                    return (d.depth + 1) * 8;
                }

                function getFontSize(d) {
                    // return a relative font size based
                    // on square y position (and thus scale),
                    // since weighting is in the y-direction
                    return d.y / (getWidth(d) / 2);
                }

                // construct link connectors
                group
                .selectAll('path')
                .data(links)
                .enter()
                .append('path')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('stroke', '#888')
                .attr('d', diagonal);

                // construct nodes
                group.selectAll('rect')
                .data(nodes)
                .enter()
                .append('rect')
                .attr('x', function(d){return d.x - getWidth(d) / 2;})
                .attr('y', function(d, i){return i === 0 ? d.y - getWidth(d) / 1.5 : d.y;})
                .attr('width', function(d){return getWidth(d);})
                .attr('height', function(d, i){return i === 0 ? getWidth(d) * 1.5: getWidth(d);})
                .attr('fill', function(d, i){return i === 0 ? 'black' : d.depth > 1 ? colorScale(d.value) : '#999';});

                // construct nodes - text
                group.selectAll('text')
                .data(nodes)
                .enter()
                .append('text')
                .attr('font-size', function(d){return clamp(getFontSize(d), 6, 14);})
                .attr('x', function(d){return d.x;})
                .attr('y', function(d){return d.y + (getWidth(d) / 2) + getFontSize(d) / 2;})
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text(function(d){return getWidth(d);});

                addTitle(container, 'Weighted Tree [d3.layout.tree]');
            },
            function() {
                function makeTreemapMode(mode) {
                    var width = 400;
                    var height = width;
                    var dims = {'w': width, 'h': height};
                    var container = getSVG('treemap-' + mode, dims, '#treemap-container');
                    var PADDING = 10;
                    var treemap = d3.layout.treemap()
                    .mode(mode)
                    .size([width - PADDING, height / 1.4]);
                    var data = randomHierarchical(20, 4, width, 5);
                    var nodes = treemap.nodes(data);
                    var links = treemap.links(nodes);

                    var group_link = container.append('g')
                    .attr('id', 'g-links')
                    .attr('transform', 'translate(' + PADDING / 2 + ', ' + height / 4 + ')');

                    var group_nodes = container.append('g')
                    .attr('id', 'g-nodes')
                    .attr('transform', 'translate(' + PADDING / 2 + ', ' + height / 4 + ')');

                    // construct nodes
                    group_nodes
                    .selectAll('rect')
                    .data(nodes)
                    .enter()
                    .append('rect')
                    .attr('x', function(d){return d.x;})
                    .attr('y', function(d){return d.y;})
                    .attr('width', function(d){return d.dx;})
                    .attr('height', function(d){return d.dy;})
                    .attr('stroke-width', 2)
                    .attr('stroke', function(d){return colorScale(d.size / 2);})
                    .attr('fill', function(d){return colorScale(d.size);});

                    // construct nodes - text
                    group_nodes.selectAll('text')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .attr('font-size', 7)
                    .attr('x', function(d){return d.x + (d.dx / 2);})
                    .attr('y', function(d){return d.y + (d.dy / 2);})
                    .attr('fill', 'white')
                    .attr('text-anchor', 'middle')
                    .text(function(d){return d.size;});

                    addTitle(container, 'Treemap colorations - "' + mode + '" [d3.layout.treemap]');
                }
                var modes = ['squarify', 'slice', 'dice', 'slice-dice'];
                for(var i = 0; i < modes.length; i++) {
                    makeTreemapMode(modes[i]);
                }
            },
            function() {
                var container = getSVG('quadtree', dims);
                var poly = d3.geom.polygon(d3.range(100).map(function(d){
                    return [rando(width / 1.2), rando(height / 2)];
                }));
                var area = d3.svg.area()
                .x(function(d){return d[0];})
                .y0(function(d){return d[1];})
                .y1(function(d){return d[1] + d[0];});

                var line = d3.svg.line()
                .x(function(d){return d[0]})
                .y(function(d){return d[1]});

                var group = container.append('g')
                .attr('transform', 'translate(25, 100)');

                // draw nodes
                group.append('g')
                .selectAll('circle')
                .data(poly)
                .enter()
                .append('circle')
                .attr('r', 2)
                .attr('cx', function(d){return d[0];})
                .attr('cy', function(d){return d[1];})
                .attr('fill', 'none')
                .attr('stroke', '#999');

                // draw centroids
                group.append('g')
                .selectAll('circle')
                .data(poly.centroid())
                .enter()
                .append('circle')
                .attr('cx', function(d){return d;})
                .attr('cy', function(d){return d;})
                .attr('r', 50)
                .transition()
                .delay(function(d, i){return i + 1 * 500;})
                .attr('r', 4)
                .attr('fill', 'red');

                addTitle(container, 'Polygon w/ centroids - [d3.layout.polygon]');
            }
        ];
        callAll(fns);
    }

    function callAll(fns) {
        // call all wrapped functions ... easily
        for(var i = 0; i < fns.length; i++) {
            fns[i]();
        }
    }

    return {
        'init': init
    };
})();

window.onload = learnding4.init;
