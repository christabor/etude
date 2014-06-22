var learnding2 = (function(){
    'use strict';
    var MARGIN     = 20;
    var PADDING    = 100;
    var tau        = Math.PI * 2;
    var width      = 250;
    var height     = width;
    var dims       = {'w': width, 'h': height};
    var colorScale = d3.scale.linear()
        .domain([1, 180, 360]).range(['red', 'blue', 'green']);

    function init() {
        // input -> domain
        // output -> range
        var timer = 0;
        var max = 100;
        var timer_reset = 100;

        var data2 = function(max){
            return d3.range(max).map(function(d){
                return [rando(d), d + rando(100)];
            });
        }

        var fns = [
            function() {
                var container = getSVG('chord', dims);
                var matrix = randomMatrix(10, null, width, true);
                var chord = d3.layout.chord()
                .padding(0.05)
                .sortSubgroups(d3.ascending)
                    .matrix(matrix); // hand off the data here

                container.selectAll('path')
                .data(chord.groups)
                .enter()
                .append('path')
                .attr('transform', getCenterTranslation(dims))
                .transition().delay(function(d, i){return i * 100;})
                .attr('fill', function(d){return colorScale(d.index * 180);})
                .attr('d', function(d){
                    var arc = d3.svg.arc()
                    .innerRadius(width / 3.4)
                    .outerRadius(width / 3);
                    return arc(d);
                });
                addTitle(container, 'Chord + arc - simple [d3.svg.chord, d3.svg.arc]');
            },
            function() {
                var container = getSVG('chord-proper', dims);
                var matrix = randomMatrix(10, null, width, true);

                var chord = d3.layout.chord()
                    .padding(0.05)
                    .matrix(matrix);
                var innerRadius = width / 2.5;
                var outerRadius = outerRadius * 1.5;

                container.append('g')
                    .attr('class', 'chord')
                    .attr('transform', getCenterTranslation(dims))
                  .selectAll('path')
                    .data(chord.chords)
                  .enter().append('path')
                    .attr('fill', 'white')
                    .style('opacity', 0)
                    .attr('d', function(d){
                        // Mostly done this way to illustrate d3
                        // for learning purposes
                        // - everything is a function that returns functions
                        // to compute values.
                        return d3.svg.chord().radius(innerRadius)(d);
                    })
                    .transition().delay(function(d, i){return i * 100;})
                    .style('stroke', function(d){return randomColor(255);})
                    .style('fill', function(d, i){
                        // fill odd 100%, otherwise make
                        // mostly transparent - just for fun
                        return i % 3 === 0 ? randomColor(255) : randomColor(255, 0.2);
                    })
                    .style('opacity', 0.8);

                addTitle(container, 'Chord - proper [d3.svg.chord]');
            },
            function() {
                // shrink these canvases down
                var scalar = 50;
                var dims2 = {'w': dims.w / 1.5, 'h': dims.h / 1.5};
                function chord(width, height) {
                    // iterate over a bunch just to get a sense of d3's power.
                    var container = getSVG('chord-proper-' + width / 10, dims2, '#svg-iterations');
                    var matrix = randomMatrix(10, null, width, true);
                    container.attr('class', 'iterated');
                    var chord = d3.layout.chord()
                        .padding(0.05)
                        .matrix(matrix);
                    var innerRadius = width / 2.5;
                    var outerRadius = outerRadius * 1.5;

                    container.append('g')
                        .attr('class', 'chord')
                        .attr('transform', getCenterTranslation(dims2))
                      .selectAll('path')
                        .data(chord.chords)
                      .enter().append('path')
                        .attr('fill', 'white')
                        .style('opacity', 0)
                        .attr('d', function(d){
                            // Mostly done this way to illustrate d3
                            // for learning purposes
                            // - everything is a function that returns functions
                            // to compute values.
                            return d3.svg.chord().radius(innerRadius)(d);
                        })
                        .transition().delay(function(d, i){return i * 100;})
                        .style('fill', function(d){return randomColor(255);})
                        .style('opacity', 0.8);
                    addTitle(container, 'Randomized - ' + width / scalar + ' [d3.svg.chord]');
                }
                // BOOM
                d3.range(10).map(function(d){
                    chord((d + 1) * scalar, height);
                });
            },
            function() {
                var container = getSVG('chord-2', dims);
                var matrix = randomMatrix(20, null, width, true);
                var chord = d3.layout.chord()
                    .padding(0.02)
                    .matrix(matrix);
                var innerRadius = width / 2.5;
                var outerRadius = outerRadius * 1.5;

                container.append('g')
                    .attr('class', 'chord')
                    .attr('transform', getCenterTranslation(dims))
                  .selectAll('path')
                    .data(chord.chords)
                  .enter().append('path')
                    .attr('fill', 'white')
                    .style('opacity', 0)
                    .attr('d', function(d){
                        // use a new startangle and radius for each path
                        return d3.svg.chord().startAngle(d.source.value / 2)
                        .radius(d.source.value / 2)(d);
                    })
                    .transition().delay(function(d, i){return i * 100;})
                    .style('fill', function(d){return colorScale(d.source.index * 180);})
                    .style('opacity', 0.6);

                addTitle(container, 'Unique chord vals per D property [d3.svg.chord]');
            },
            function() {
                var container = getSVG('x-axis', dims);
                var group = container.append('g')
                .attr('id', 'axis-group')
                .attr('transform', 'translate(0, 60)');
                function axis(data, top, ticks) {
                    var xScale = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([20, width - 20]);

                    var xAxis = d3.svg.axis()
                    .ticks(ticks)
                    .tickSize(4)
                    .tickValues(data)
                    .scale(xScale)
                    .orient('bottom');

                    group.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('fill', 'red')
                    .attr('cx', function(d){
                        return rando(width);
                    })
                    .attr('cy', function(d){
                        return clamp(rando(height) + 10, top, top + 100);
                    })
                    .attr('r', 2);

                    group.append('g')
                    .attr('transform', function(){
                        return 'translate(0, ' + top + ')';
                    })
                    .call(xAxis);
                }
                // Create a bunch of axis via range, passing
                // in appropriate data arguments to build each one
                // using helper function
                d3.range(5).map(function(d){
                    var data = d3.range(rando(30)).map(function(d){
                        return rando(d);
                    });
                    axis(data, (d * 10) + 200 * (d / 10), rando(30));
                });

                addTitle(container, 'X axis - [d3.svg.axis]');
            },
            function() {
                var container = getSVG('y-axis', dims);
                var group = container.append('g')
                .attr('id', 'axis-group')
                .attr('transform', 'translate(30, 60)');
                function axis(data, left, ticks) {
                    var xScale = d3.scale.linear()
                    .domain([0, d3.max(data)])
                    .range([20, height - 20]);

                    var xAxis = d3.svg.axis()
                    .ticks(ticks)
                    .tickSize(4)
                    .tickValues(data)
                    .scale(xScale)
                    .orient('left');

                    group.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('fill', 'red')
                    .attr('cx', function(d){
                        return clamp(rando(width) + 10, left, left + 100);
                    })
                    .attr('cy', function(d){
                        return rando(height);
                    })
                    .attr('r', 2);

                    group.append('g')
                    .attr('transform', function(){
                        return 'translate(' + left + ', 0)';
                    })
                    .call(xAxis);
                }
                d3.range(4).map(function(d){
                    var data = d3.range(rando(30)).map(function(d){
                        return rando(d);
                    });
                    axis(data, d * 50, rando(20));
                });

                addTitle(container, 'Y axis - [d3.svg.axis]');
            },
            function() {
                var MAX = 6;
                var data_int = d3.range(MAX).map(function(d){
                    return d * 0.0100;
                });
                var domain = [0, d3.max(data_int)];
                var range = [1, width / 3, width / 1.5];
                var scales = [
                    {
                        '[d3.scale.linear]': d3.scale.linear()
                            .domain(domain)
                            .range(range)
                    },
                    {
                        '[d3.scale.linear - clamped]': d3.scale.linear()
                            .domain(domain)
                            .range(range)
                            .clamp(true)
                    },
                    {
                        '[d3.scale.linear - nice]': d3.scale.linear()
                            .domain(domain)
                            .range(range)
                            .nice([2])
                    },
                    {
                        '[d3.scale.linear - rangeRound]': d3.scale.linear()
                            .domain(domain)
                            .range(range)
                            .range([10, width / 3])
                    },
                    {
                        '[d3.scale.power]': d3.scale.pow()
                        .range(range)
                        .domain(domain)
                    },
                    {
                        '[d3.scale.quantize]': d3.scale.quantize()
                        .range(range)
                        .domain(domain)
                    },
                    {
                        '[d3.scale.quantile]': d3.scale.quantile()
                        .range(range)
                        .domain(domain)
                    }
                ];

                function addScaleExample(name, scale, data) {
                    // Build up a color scale using the
                    // properties of the scale being passed in.
                    var colorScale = d3.scale.linear()
                    .domain(scale.domain())
                    .range(['red', 'blue', 'green']);

                    var container = getSVG('scale-' + name, dims, '#svg-scale-types');
                    var group = container.append('g')
                    .attr('transform', 'translate(10, ' + height / 5 + ')')
                    .attr('id', 'scale_' + name);

                    group.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('opacity', 0.3)
                    .attr('fill', colorScale)
                    .attr('x', scale)
                    .attr('y', scale)
                    .attr('width', scale)
                    .attr('height', scale);

                    group.selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .attr('opacity', 1)
                    .attr('fill', colorScale)
                    .attr('x', scale)
                    .attr('y', scale)
                    .text(scale);

                    addTitle(container, 'Scale - ' + name);
                }
                // Build up all scale examples
                scales.forEach(function(scale, key){
                    d3.map(scale).forEach(function(_, scale){
                        addScaleExample(_, scale, data_int);
                    })
                });
            },
            function() {
                var container = getSVG('cluster-f$#@!', {'w': 350, 'h': 350});
                var data = randomHierarchical(clamp(rando(40) + 10, 3, 15), 4, width);
                var cluster = d3.layout.cluster()
                .size([width, height]);
                // create a radial-diagonal path generator
                // for source/target scenarios
                var diagonalR = d3.svg.diagonal();
                // create end point "nodes"
                var nodes = cluster.nodes(data);
                // create links
                var links = cluster.links(nodes);
                var group = container.append('g')
                .attr('transform', 'translate(' + width / 4 +  ', 50)');
                var link_group = group.selectAll('path')
                .data(links)
                .enter()
                .append('path')
                .attr('stroke', function(d){
                    return colorScale(d.source.value);
                })
                .attr('fill', 'none')
                .attr('d', function(d){
                    var self = this;
                    if(d.source.depth > 0) {
                        d.source.children.forEach(function(child, k){
                            d3.select(self)
                            .data(child.value)
                            .enter()
                            .append('rect')
                            .attr('fill', 'blue')
                            .attr('width', 100)
                            .attr('height', 10)
                            .attr('x', function(d){return d.x;})
                            .attr('y', function(d){return d.y;});
                        });
                    }
                    return diagonalR(d);
                });

                group.selectAll('circle')
                .data(nodes)
                .enter()
                .append('circle')
                .attr('fill', function(d){
                    if(!d.children) return 'green';
                    return colorScale(d.value);
                })
                .attr('r', function(d){return clamp(d.value / 10, 1, 8);})
                .attr('cx', function(d){return d.x;})
                .attr('cy', function(d){return d.y;});

                group.selectAll('text')
                .data(nodes)
                .enter()
                .append('text')
                .attr('text-anchor', 'middle')
                .attr('font-size', function(d){
                    return clamp(d.value, 5, 10);
                })
                .attr('x', function(d){return d.x;})
                .attr('y', function(d){return d.y + 20;})
                .text(function(d){return d.name;});

                addTitle(container, 'Diagonal radial cluster - [d3.layout.cluster]');
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

window.onload = learnding2.init;
