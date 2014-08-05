var dovah = (function(){
    'use strict';
    var dims = getViewportDimensions();

    function init() {
        var dragons = [
            {'name': 'Dragon', 'maxlvl': 10},
            {'name': 'Blood Dragon', 'maxlvl': 20},
            {'name': 'Skeletal Dragon', 'maxlvl': 20},
            {'name': 'Frost Dragon', 'maxlvl': 30},
            {'name': 'Ancient Dragon', 'maxlvl': 50},
            {'name': 'Elder Dragon', 'maxlvl': 40},
            {'name': 'Revered Dragon', 'maxlvl': 62},
            {'name': 'Serpentine Dragon', 'maxlvl': 58},
            {'name': 'Legendary Dragon', 'maxlvl': 75},
            {'name': 'Krosulhah', 'maxlvl': 50},
            {'name': 'Durnehviir', 'maxlvl': 20},
            {'name': 'Mirmulnir', 'maxlvl': 50},
            {'name': 'Naaslaarum', 'maxlvl': 62},
            {'name': 'Nahagliiv', 'maxlvl': 50},
            {'name': 'Numinex', 'maxlvl': 0},
            {'name': 'Kruziikrel', 'maxlvl': 50},
            {'name': 'Relonikiv', 'maxlvl': 50},
            {'name': 'Sahrotaar', 'maxlvl': 58},
            {'name': 'Odahviing', 'maxlvl': 50},
            {'name': 'Paarthurnax', 'maxlvl': 10},
            {'name': 'Sahloknir', 'maxlvl': 50},
            {'name': 'Viinturuth', 'maxlvl': 50},
            {'name': 'Voslaarum', 'maxlvl': 62},
            {'name': 'Vuljotnaak', 'maxlvl': 50},
            {'name': 'Vulthuryol', 'maxlvl': 50},
            {'name': 'Alduin', 'maxlvl': 100}
        ];

        var max_name_length = d3.max(dragons, function(d){return d.maxlvl;});
        var domain = [0, max_name_length / 2, max_name_length];
        var inverse_color = d3.scale.linear()
        .domain([domain[2], domain[1], domain[0]])
        .range(['red', 'orange', 'yellow']);

        var color_scale = d3.scale.linear()
        .domain(domain)
        .range(['#1a2532', '#4f7199', '#fff']);

        var BAR_HEIGHT = 16;
        var PADDING = BAR_HEIGHT / 2;
        var scale_x = d3.scale.linear()
        .domain(domain)
        .range([10, dims.width / 2.5, dims.width / 1.5 - PADDING]);

        var OFFSET = (PADDING * dragons.length) + PADDING;

        var scale_y = d3.scale.linear()
        .domain([0, dragons.length])
        .range([BAR_HEIGHT, dims.height - OFFSET]);

        var container = getSVG('dragons', dims, '#container');

        container.selectAll('rect')
        .data(dragons)
        .enter()
        .append('rect')
        .attr('height', BAR_HEIGHT)
        .attr('fill', function(d){return color_scale(d.maxlvl);})
        .attr('width', 10)
        .transition()
        .delay(function(d, i){return i * 40;})
        .attr('x', 0)
        .attr('y', function(d, i){return scale_y(i);})
        .attr('width', function(d){return scale_x(d.maxlvl);})
        .attr('opacity', 0.9);

        container.selectAll('.dragon-maxlvl')
        .data(dragons)
        .enter()
        .append('text')
        .attr('fill', function(d){return inverse_color(d.maxlvl);})
        .attr('font-size', 9)
        .attr('y', function(d, i){return scale_y(i) + BAR_HEIGHT / 1.4;})
        .attr('x', function(d){return scale_x(d.maxlvl) - 20;})
        .text(function(d){return d.maxlvl;})
        .attr('opacity', 0)
        .transition()
        .delay(function(d, i){return (i + 1) * 40;})
        .attr('opacity', 1);

        container.selectAll('.dragon-name')
        .data(dragons)
        .enter()
        .append('text')
        .classed('dragon-name', true)
        .attr('font-size', 9)
        .attr('y', function(d, i){return scale_y(i) + 10;})
        .attr('x', function(d){return scale_x(d.maxlvl) + 10;})
        .text(function(d){return dovahfy(d.name);})
        .on('mouseover', function(){
            return d3.select(this)
            .classed('dragon-name', false)
            .transition()
            .attr('fill', 'white')
            .delay(100)
            .attr('font-size', 20);
        })
        .on('mouseout', function(){
            return d3.select(this)
            .classed('dragon-name', true)
            .transition()
            .delay(100)
            .attr('font-size', 9);
        })
        .attr('opacity', 0)
        .transition()
        .delay(function(d, i){return (i + 1) * 40;})
        .attr('opacity', 1);
    }

    function dovahfy(name) {
        var n = name.split();
        if(n[1]) {
            n[1] = 'dovah';
        }
        return n.join(' ');
    }

    return {
        'init': init
    };
})();

window.onload = dovah.init;
