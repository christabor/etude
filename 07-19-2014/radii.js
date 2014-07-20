var radii = (function(){
    'use strict';

    var dims             = getViewportDimensions();
    var el               = getSVG('foo', dims, '#container');
    var height           = dims.height;
    var width            = dims.width;
    var group            = el.append('g').attr('transform', getCenterTranslation(dims));
    var SIZE             = 20;
    var MAX              = 1;
    var START_RADIUS  = height / 5;
    var OFFSET = 10;
    var data = d3.range(8).map(function(d){return 360 / 8;});
    var pie = d3.layout.pie()(data);
    // create arc path generator, using a fraction
    // of the data size to generate a "growing" spiral

    var radii = [
        [
            10,
            START_RADIUS
        ],
        [
            START_RADIUS + OFFSET,
            START_RADIUS + OFFSET * 2 + START_RADIUS / 2.4
        ],
        [
            START_RADIUS + OFFSET * 2 + START_RADIUS / 2.4 + OFFSET,
            START_RADIUS + OFFSET * 2 + START_RADIUS / 2 + START_RADIUS / 2
        ]
    ];

    function init() {
        var arc1 = d3.svg.arc()
        .innerRadius(function(d){return radii[0][0];})
        .outerRadius(function(d){return radii[0][1];});

        var arc2 = d3.svg.arc()
        .innerRadius(function(d){return radii[1][0];})
        .outerRadius(function(d){return radii[1][1];});

        var arc3 = d3.svg.arc()
        .innerRadius(function(d){return radii[2][0];})
        .outerRadius(function(d){return radii[2][1];});

        createArcGroup([[arc1, 1], [arc2, 0.66], [arc3, 0.33]]);

        circleGroup(20, 100, 1000, 0.6);
        circleGroup(20, 200, 2000, 0.6);
        circleGroup(20, 300, 3000, 0.6);

        circleGroup(5, 100, 1000, 1);
        circleGroup(5, 200, 2000, 1);
        circleGroup(5, 300, 3000, 1);
    }

    function createArcGroup(opacities) {
        for(var i = 0; i < opacities.length; i++) {
            createArc('path-' + i, opacities[i][0], opacities[i][1], i * 500);
        }
    }

    function circleGroup(radius, size, delay, opacity) {
        group
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 0)
        .attr('fill', 'white')
        .transition()
        .delay(function(d, i){return i * 100 + delay;})
        .attr('opacity', opacity)
        .attr('r', radius)
        .attr('cx', function(d, i){return calculateRadialAngle(d, i, size)[0];})
        .attr('cy', function(d, i){return calculateRadialAngle(d, i, size)[1]});
    }

    function createArc(classname, arc, opacity, delay) {
        var paths = group.selectAll(classname)
        .data(pie)
        .enter()
        .append('path')
        .attr('transform', 'rotate(0)')
        .attr('stroke', 'white')
        .attr('fill', 'white')
        .attr('stroke-width', 2)
        .transition()
        .delay(delay)
        .attr('transform', 'rotate(180)')
        .attr('opacity', opacity || 1)
        .attr('fill', function(d, i){return emotions[i].color;})
        .attr('d', arc);
    }

    return {
        'init': init
    };
})();

window.onload = radii.init;
