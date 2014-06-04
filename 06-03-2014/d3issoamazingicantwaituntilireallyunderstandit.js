var circularium = (function(){
    'use strict';
    var scale      = 1;
    var dims       = getViewportDimensions();
    var width      = dims.width * scale;
    var height     = dims.height * scale;

    function getData(total, min, max){
        return d3.range(total).map(function(d) {
            return randomCoords(min, max);
        });
    }

    function init() {
        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var cont = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var line = d3.svg.line()
        .x(function(d){return d.x})
        .y(function(d){return d.y});

        var colorScale = d3.scale.linear()
            .domain([0, width / 2, width])
            .range(['red', 'purple', 'blue']);

        var arc = d3.svg.arc()
            .innerRadius(width / 4 - 100)
            .outerRadius(width / 4);

        var pie = d3.layout.pie()
            .value(function(d){ return d.x; });

        var data = getData(rando(100), width, height);

        // bind layout to arcs container and make selection
        var pie_data = pie(data);
        var arcs = cont.selectAll('.arc')
            .data(pie_data)
            .enter()
            .append('g')
            .attr('class', 'arc');

        // add each individual arc to arcs, using the arc layout
        arcs.append('path')
            .attr('d', arc)
            .transition()
            .duration(function(d){
                return d.data.x * 3;
            })
            .attr('fill', function(d){
                return colorScale(d.data.x);
            });
    }

    return {
        'init': init
    };
})();

window.onload = circularium.init;
