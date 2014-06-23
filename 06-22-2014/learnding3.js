var learnding3 = (function(){
    'use strict';
    var MARGIN     = 20;
    var PADDING    = 100;
    var tau        = Math.PI * 2;
    var width      = 400;
    var height     = width;
    var dims       = {'w': width, 'h': height};
    var diagonal   = d3.svg.diagonal();
    var line       = d3.svg.line.radial()
    .angle(function(d){return d[0]})
    .radius(function(d){return d[1]});
    var colorScale = d3.scale.linear()
        .domain([1, 180, 360]).range(['red', 'blue', 'green']);
    function init() {
        // input -> domain
        // output -> range
        var timer = 0;
        var max = 100;
        var timer_reset = 100;

        var fns = [
            function() {
                var container = getSVG('chaotic-radial', dims);
                var data = function(){
                    return d3.range(width / 2.2).map(function(d){
                        d = rando(width / 1.2);
                        return [d * 2, d / 2];
                    });
                };

                // create a nested set of paths for multiple paths
                // rather than using the entire array as one value for path data
                var all_data = d3.range(10).map(function(d){return data();});

                container
                .append('g')
                .attr('transform', getCenterTranslation(dims))
                .selectAll('path')
                .data(all_data)
                .enter()
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', function(d, i){return colorScale(d[0][0]);})
                .attr('d', function(d){
                    return line(d) + 'Z';
                });

                addTitle(container, 'Nested random radial - [d3.svg.line.radial]');
            },
            function() {
                var container = getSVG('spiral-radial', dims);
                var all_data = d3.range(width / 1.2).map(function(d){
                    return [d * 2, d / 2];
                });

                container
                .append('g')
                .attr('transform', getCenterTranslation(dims))
                .selectAll('path')
                .data([all_data])
                .enter()
                .append('path')
                .attr('fill', randomColor(255))
                .attr('stroke', randomColor(255))
                .attr('d', function(d){
                    return line(d) + 'Z';
                });

                addTitle(container, 'Spiral radial [d3.svg.line.radial]');
            },
            function() {
                var container = getSVG('instahistogram', dims);
                var data = d3.range(80).map(function(d){return rando(width);});
                var histo = d3.layout.histogram()
                .bins(clamp(rando(10), 8, 30))(data);
                var PADDING = 4;
                var bottom_padding = 30;
                var baseline = height - bottom_padding;
                var offset_multiplier = 20;
                container.selectAll('rect')
                .data(histo)
                .enter()
                .append('rect')
                .attr('y', height - bottom_padding)
                .attr('height', 0)
                .attr('fill', function(d, i){return colorScale(i * 20);})
                .attr('x', function(d){return d.x + PADDING;})
                .attr('y', function(d){return (height - d.y * offset_multiplier) - bottom_padding;})
                .attr('height', function(d){return d.y * offset_multiplier;})
                .attr('width', function(d){return d.dx - PADDING;});

                container.append('text')
                .attr('x', width / 2)
                .attr('y', height - bottom_padding / 2 + 4)
                .attr('text-anchor', 'middle')
                .text('Distribution of randomly generated numbers');

                container.selectAll('text')
                .data(histo)
                .enter()
                .append('text')
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .attr('x', function(d){return d.x + d.dx / 2;})
                .attr('y', function(d){
                    return (height - d.y * offset_multiplier - 5) - bottom_padding;
                })
                .text(function(d){return d3.round(d.x);});

                addTitle(container, 'Histogram [d3.layout.histogram]');
            },
            function() {
                var container = getSVG('packer', dims);
                var data = randomHierarchical(30, 3, width, 2);
                var pack = d3.layout.pack()
                .padding(4)
                .size([width, height]);
                var nodes = pack.nodes(data);
                var links = pack.links(nodes);
                var scale = 100;
                var group = container.append('g');
                var depthColorScale = d3.scale.ordinal()
                .domain([0, d3.max(links, function(d){
                    return d.source.depth;
                })])
                .range(['green', 'purple']);
                var node = group
                .selectAll('.node')
                .data(nodes)
                .enter()
                .append('g')
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });

                node.append('circle')
                .attr('r', 2)
                .attr('stroke', function(d){
                    return d.depth > 0 ? 'white' : 'green';
                })
                .attr('fill', function(d){
                    return depthColorScale(d.depth);
                })
                .attr('opacity', 0.5)
                .attr('r', function(d){return d.r;});

                // add smaller connecting
                // nodes for visual aesthetics... or something.
                node
                .append('circle')
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('r', function(d){return d.r / 10;});

                group
                .selectAll('.group-path')
                .data(links)
                .enter()
                .append('path')
                .attr('fill', 'none')
                .attr('stroke', 'purple')
                .attr('d', diagonal);

                addTitle(container, 'Pack - simple [d3.layout.pack, d3.svg.diagonal]');
            },
            function() {
                var container = getSVG('packer2', dims);
                var scale = 100;
                var MAX = 20;
                var group = container.append('g');
                var data = randomHierarchical(MAX, 10, width, 4);
                var pack = d3.layout.pack()
                .padding(4)
                .size([width, height]);
                var nodes = pack.nodes(data);
                var links = pack.links(nodes);
                var depthColorScale = d3.scale.ordinal()
                .domain([0, d3.max(links, function(d){
                    return d.source.depth;
                })])
                .range(['green', 'purple']);
                var group_links = group.selectAll('.group-path-2')
                .data(links)
                .enter()
                .append('path');

                function recalculate() {
                    // recalculate
                    data = randomHierarchical(MAX, 10, width, 4);
                    nodes = pack.nodes(data);
                    links = pack.links(nodes);
                }

                function drawLinks() {
                    recalculate();
                    group_links
                    .data(links)
                    .attr('stroke', 'none')
                    .attr('fill', 'none')
                    .attr('d', diagonal)
                    .transition()
                    .delay(function(d, i){return i * 20})
                    .attr('stroke', function(d){return randomColor(255);});
                }

                container.append('text')
                .attr('text-anchor', 'middle')
                .attr('font-size', 20)
                .attr('y', height - 20)
                .attr('x', width / 2).text('Click canvas for more!');

                drawLinks();
                container.on('click', drawLinks);

                addTitle(container, 'Pack - only links [d3.layout.pack, d3.svg.diagonal]');
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

window.onload = learnding3.init;
