var godhead = (function(){
    'use strict';
    var dims           = getViewportDimensions();
    var width          = dims.width;
    var height         = dims.height;
    var data = {};
    var colorScale     = d3.scale.linear().range(['red', 'blue', 'yellow']).domain([0, 5, 10]);
    var letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    var names = [
        'Bestla',
        'Gorm',
        'Jötunn',
        'Ægir',
        'Angrboða',
        'Baugi',
        'Bergelmir',
        'Billingr',
        'Bölþorn',
        'Geirröd',
        'Gilling',
        'Gjálp and Greip',
        'Gríðr',
        'Gullveig',
        'Gymir',
        'Hroðr',
        'Hrungnir',
        'Hymir',
        'Járnsaxa',
        'Kári',
        'Loki',
        'Alvaldi',
        'Rindr',
        'Skaði',
        'Suttungr',
        'Þjazi',
        'Þrúðgelmir',
        'Þrymr',
        'Útgarða-Loki',
        'Vafþrúðnir',
        'Ymir/Aurgelmir'
    ];

    // format the data for use in graph
    names.map(function(name){
        if(data[name[0]]) {
            data[name[0]].count += 1;
            data[name[0]].names.push(name);
        } else {
            data[name[0]] = {'count': 0, 'names': [name]};
        }
    });
    var reformatted = [];

    for(var datum in data) {
        reformatted.push([data[datum].count, data[datum].names]);
    }

    var xRange = d3.scale.linear().domain([0, height]).range([0, height]);

    var container = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

    function init() {
        var PADDING = 40;
        var MIN_FONT_SIZE = 12;

        var circs = container.append('g').attr('id', 'circles');
        var titles = container.append('g').attr('id', 'titles');
        var counts = container.append('g').attr('counts', 'titles');

        circs.selectAll('circle')
        .data(reformatted)
        .enter()
        .append('circle')
        .attr('r', function(d){return d[0] * 3 + 10;})
        .attr('cx', function(d, i){return 100;})
        .attr('cy', function(d, i){return xRange(i * height / reformatted.length + PADDING);})
        .attr('fill', function(d){return colorScale(d[0]);});

        counts.selectAll('text')
        .data(reformatted)
        .enter()
        .append('text')
        .attr('x', function(d, i){return 100;})
        .attr('y', function(d, i){return xRange(i * height / reformatted.length + PADDING);})
        .attr('fill', function(d){return 'white';})
        .attr('font-size', function(d){return d[0] * 4 + MIN_FONT_SIZE;})
        .attr('text-anchor', 'middle')
        .text(function(d){return d[0];});

        titles.selectAll('text')
        .data(reformatted)
        .enter()
        .append('text')
        .attr('x', function(d, i){return 150;})
        .attr('y', function(d, i){return xRange(i * height / reformatted.length + PADDING + MIN_FONT_SIZE / 2);})
        .attr('font-size', function(d){return d[0] * 4 + MIN_FONT_SIZE;})
        .text(function(d){return d[1].join(', ');});
    }

    return {
        'init': init
    };
})();

window.onload = godhead.init;
