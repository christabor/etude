var trochoidia = (function(){
    'use strict';
    var dims    = getViewportDimensions();
    dims.height = dims.height - 40;
    dims.width  = dims.width - 40;

    function trochoidGroup(group, radius) {
        // Given a group, fills it up with
        // trochoid pieces.
        group.append('circle')
        .attr('r', radius / 2)
        .attr('stroke-width', 4)
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('cx', dims.width / 2)
        .attr('cy', dims.height / 2);

        group.append('circle')
        .attr('r', 10)
        .attr('cx', dims.width / 2)
        .attr('cy', dims.height / 2)
        .attr('fill', 'black')
        .attr('opacity', 0.4);

        group.append('rect')
        .attr('width', dims.width / 4)
        .attr('height', 3)
        .attr('x', dims.width / 2)
        .attr('y', dims.height / 2 - 1)
        .attr('fill', 'black')
        .attr('opacity', 0.4)

        group.append('circle')
        .attr('r', 5)
        .attr('cx', dims.width / 1.5)
        .attr('cy', dims.height / 1.5)
        .attr('fill', 'red');
        return group;
    }

    function init() {
        var container = getSVG('map', dims, 'body');
        var degree    = 0;
        var degree2   = 0;
        var degree3   = 0;
        var coords    = d3_geometer.coordSpace(container.append('g'), dims, 4);
        var radius    = 150;
        var all       = container.append('g');
        var t_group   = all.append('g');
        var t_group2  = all.append('g');
        var trochoid  = trochoidGroup(t_group, radius);
        var trochoid2 = trochoidGroup(t_group2, radius);

        all.append('g')
        .append('circle')
        .attr('r', radius)
        .attr('stroke-width', 4)
        .attr('stroke', 'blue')
        .attr('cx', dims.width / 2)
        .attr('cy', dims.height / 2)
        .attr('fill', 'none');

        d3.timer(function(){
            // rotate each element independently
            all.attr('transform', 'rotate(' + [degree, dims.width / 2, dims.height / 2.5].join(',') + ')')
            trochoid.attr('transform', 'rotate(' + [degree2, dims.width / 2 + radius, dims.height / 2].join(',') + ')')
            trochoid2.attr('transform', 'rotate(' + [degree3, dims.width / 2 + radius, dims.height / 2].join(',') + ')')

            // rotate at different paces
            degree += 1;
            degree2 += 2;
            degree3 += 3;
        });
    }

    return {
        'init': init
    };
})();

window.onload = trochoidia.init;
