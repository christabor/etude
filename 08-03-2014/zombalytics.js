var zombalytics = (function(){
    'use strict';
    var dims    = getViewportDimensions();
    var pie_dims = {'width': 120, 'height': 120};
    var bar_dims = {'width': 200, 'height': 150};
    var music;
    var age;
    var country;
    var speed_you;
    var speed_natl;
    var weapon_types;
    var hit_regions;

    function init() {
        addPieCharts();
        addBarcharts();
    }

    function addPieChart(id, dom_el) {
        var container = getSVG(id, pie_dims, dom_el);
        var age_pie = d3.layout.pie()(d3.range(5).map(function(d){return rando(10) + 1;}));
        var arc = d3.svg.arc()
        .innerRadius(pie_dims.width / 5)
        .outerRadius(pie_dims.width / 2.5);

        container.append('g')
        .attr('transform', getCenterTranslation(pie_dims))
        .selectAll('path')
        .data(age_pie)
        .enter()
        .append('path')
        .attr('fill', function(d){return randomColor(255);})
        .attr('d', arc);
    }

    function addBarChart(id, dom_el, data, fmt) {
        var PADDING = 40;
        var BAR_HEIGHT = 20;
        var container = getSVG(id, bar_dims, dom_el);
        var chartScale = d3.scale.linear()
                        .domain([0, d3.max(data, function(d){return d.datum;})])
                        .range([10, bar_dims.width - PADDING]);

        container.append('g')
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', '#444')
        .attr('x', 0)
        .attr('y', function(d, i){return i * (BAR_HEIGHT * 2) + 20;})
        .attr('fill', function(d){return '#203f78';})
        .attr('height', BAR_HEIGHT)
        .attr('width', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('width', function(d){return chartScale(d.datum);});

        container.append('g')
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', '#444')
        .attr('x', 0)
        .attr('y', function(d, i){return i * (BAR_HEIGHT * 2) + BAR_HEIGHT / 1.5;})
        .text(function(d, i){return d.label;});

        container.append('g')
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', '#444')
        .attr('x', function(d){return chartScale(d.datum) + 8;})
        .attr('y', function(d, i){return i * (BAR_HEIGHT * 2) + 35;})
        .text(function(d, i){return d.datum + (fmt || '%');});
    }

    function addPieCharts() {
        addPieChart('pie-1', '#country-eaten');
        addPieChart('pie-2', '#age-eaten');
        addPieChart('pie-3', '#music-eaten');
    }

    function addBarcharts() {
        addBarChart('bar-1', '#speed', [{'label': 'you (2.12mph)', 'datum': 80}, {'label': 'national (1.025mph)', 'datum': 60}]);
        addBarChart('bar-2', '#hit-regions', [{'label': 'neck', 'datum': 20}, {'label': 'groin', 'datum': 10}, {'label': 'forehead', 'datum': 70}]);
        addBarChart('bar-3', '#weapon-types', [{'label': 'shovel', 'datum': 60}, {'label': 'bat', 'datum': 10}, {'label': 'other', 'datum': 30}]);
        addBarChart('bar-4', '#grunting-range', [{'label': 'you', 'datum': 60}, {'label': 'national average', 'datum': 18}], 'Db');
    }

    return {
        'init': init
    };
})();

window.onload = zombalytics.init;
