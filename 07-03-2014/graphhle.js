var graphhle = (function(){
    'use strict';
    var diagonal    = d3.svg.diagonal();
    var form        = d3.select('form');
    var height      = 800;
    var width       = height;
    var dims        = {'w': width, 'h': height};
    var name        = d3.select('[name="name"]');
    var val         = d3.select('[name="value"]');
    var active_node = null;
    var success_msg = d3.select('.success');

    function init() {
        var container = getSVG('packer', dims, '#graphhle');
        var initial_data = randomHierarchical(30, 10, width, 3);
        var pack = d3.layout.pack().padding(30)
        .size([width - 100, height - 100]);
        var nodes = pack.nodes(initial_data);
        var links = pack.links(nodes);
        var group = container.append('g');

        var node_fill = '#111';
        var $group_links = group.selectAll('.group-path-2')
        .data(links)
        .enter()
        .append('path')
        .attr('stroke', '#ccc')
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('d', diagonal);

        var $nodes = group
        .selectAll('.node')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('fill', node_fill)
        .attr('stroke-width', 2)
        .attr('stroke', '#ccc')
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y})
        .attr('opacity', function(d, i){return i === 0 ? 0 : 1;})
        .attr('r', function(d, i){return d.depth === 0 ? 200 : clamp(d.r, 10, 100);})
        .on('mouseout', function(){
            return d3.select(this).attr('fill', node_fill);
        })
        .on('mouseover', function(){
            return d3.select(this).attr('fill', '#1d2f48');
        })
        .on('mousedown', function(d){
            var node = d3.select(this);
            // deselect others.
            $nodes[0].forEach(function(_node, _){
                return d3.select(_node).attr('class', null);
            });
            populateForm(d);
            if(node.classed('active')) {
                return node.attr('class', null);
            }
            return node.attr('class', 'active');
        });

        var node_text = group
        .selectAll('.node-label')
        .data(nodes)
        .enter()
        .append('text')
        .attr('font-size', 9)
        .text(function(d, i){return i === 0 ? null : d.name;})
        .attr('fill', '#999')
        .attr('text-anchor', 'middle')
        .attr('x', function(d){return d.x})
        .attr('y', function(d){return d.y + (d.r / 2.5);});

        form.on('submit', updateForm);
    }

    function updateForm(e) {
        d3.event.preventDefault();
        if(!active_node) return;
        active_node.name = name.property('value');
        active_node.value = val.property('value');
        success_msg.classed({'hidden': false});
        setTimeout(function(){
            success_msg.classed({'hidden': true});
        }, 1000);
    }

    function populateForm(node) {
        form.attr('class', '');
        name.property('value', node.name);
        val.property('value', node.value);
        // set active node - LAME
        active_node = node;
    }

    return {
        'init': init
    };
})();

window.onload = graphhle.init;
