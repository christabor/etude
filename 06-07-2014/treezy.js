var treezy = (function(){
    'use strict';
    var margin  = 100;
    var dims    = getViewportDimensions();
    var width   = dims.width - margin;
    var height  = dims.height - margin;
    var reverse = true;
    var svg     = d3.select('body').append('svg')
    var colorScale = d3.scale.ordinal()
    .domain([0, 100])
    .range(['red', 'green', 'blue']);

    function init() {
        svg.attr('width', width)
        .attr('height', height);
        var max = width / 4;
        var random_nodes = randomHierarchical(rando(40) + 2, rando(5) + 2, max);
        var tree = d3.layout.tree()
        .size([height, width]);

        var diagonal = d3.svg.diagonal()
        .projection(function(d) {return [d.y, d.x];});

        // create connector paths
        var nodes = tree.nodes(random_nodes),
        links = tree.links(nodes);

        var link = svg.selectAll("path.link")
        .data(links)
        .enter().append("path")
        .attr('fill', 'none')
        .attr('stroke', function(d){return colorScale(d.source.value);})
        .attr('stroke-width', 2)
        .attr("d", diagonal);

        // create groups and dots/text
        // add edges
        var node = svg.selectAll("g.node")
        .data(nodes)
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

        // add ending vertices
        node.append("circle").attr("r", 4).attr('fill', function(d){return colorScale(d.value);});

        // add labels
        node.append("text")
        .attr("dx", function(d){return d.children ? -10 : 10;})
        .attr("dy", function(d){return d.children ? -10 : 10;})
        .attr('fill', '#555')
        .attr('font-size', function(d){return d.children ? '8px': '14px'})
        .attr("text-anchor", function(d) {return d.children ? "end" : "start";})
        .text(function(d) {return 'N-' + d.name;});
    }

    return {
        'init': init
    };
})();

window.onload = treezy.init;
