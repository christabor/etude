window.onload = function(){
    'use strict';
    var container;
    var dims          = getViewportDimensions();
    var MAX           = 13;
    var PADDING       = 100;
    // populate some "cpus" -- even nums only
    var cpus          = d3.range(40).filter(function(d){return d % 2 === 0 && d >= 2;});
    var cpu_box_size  = 14;
    var node_box_size = cpu_box_size * 8;

    dims.width -= PADDING;
    dims.height -= PADDING;
    container = getSVG(cssUuid(), dims, '#contents');

    function init() {
        var group = container.append('g');
        var nodeScale = d3.scale.linear()
        .clamp(true)
        .domain([d3.min(cpus) / 2, d3.max(cpus) / 2])
        .range([d3.min(cpus) * (cpu_box_size * 4), dims.height]);

        var colorScale = d3.scale.linear()
        .domain([0, d3.max(cpus) / 2, d3.max(cpus)])
        .range(['green', 'blue', 'red']);

        var num_nodes = d3.range(MAX);
        var node_groups = group
        .selectAll('.node-group')
        .data(num_nodes)
        .enter()
        .append('g')
        .classed('node-group', true)
        .attr('transform', function(d, i){
            return 'translate(' + (i * (node_box_size + 4)) + ',0)';
        });

        // add individual nodes
        node_groups.append('rect')
        .classed('node', true)
        .attr('y', 0)
        .attr('x', 0)
        .attr('height', nodeScale)
        .attr('width', node_box_size)
        .attr('fill', function(d){
            return colorScale(cpus[d]);
        });

        node_groups.append('text')
        .classed('node-text', true)
        .attr('font-size', 12)
        .attr('x', node_box_size / 2 - 5)
        .attr('y', function(d){
            return nodeScale(d) + 30;
        })
        .attr('fill', 'green')
        .attr('text-anchor', 'middle')
        .text(function(d){return 'node ' + d + ' / ' + cpus[d] + ' cores';})

        // add individual CPUs
        node_groups.selectAll('.cpu')
        .data(function(d){return d3.range(cpus[d]);})
        .enter()
        .append('rect')
        .classed('cpu', true)
        .attr('fill', 'white')
        .attr('width', cpu_box_size)
        .attr('height', cpu_box_size)
        .attr('y', function(d, i){
            return (d + 1) * (cpu_box_size + 4);
        })
        .attr('x', function(d, i){
            var offset = (i % 2 === 0 ? cpu_box_size * 2 : 0);
            return cpu_box_size + (cpu_box_size / 2) + offset;
        });

        // add CPU text
        node_groups.selectAll('.cpu')
        .data(function(d){return d3.range(cpus[d]);})
        .enter()
        .append('text')
        .classed('cpu-text', true)
        .attr('fill', 'white')
        .attr('y', function(d, i){
            return (d + 1) * (cpu_box_size + 4);
        })
        .attr('font-size', 10)
        .attr('text-anchor', 'right')
        .attr('x', node_box_size / 2 - ( cpu_box_size / 2) - 10)
        .text(function(d){return d;});
    }

    init();
};
