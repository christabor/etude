var learnding = (function(){
    'use strict';
    var MARGIN    = 20;
    var PADDING   = 100;
    var tau = Math.PI * 2;
    var width = 500;
    var height = 500;
    var dims = {'w': width, 'h': height};

    function init() {
        // input -> domain
        // output -> range
        var timer = 0;
        var max = 100;
        var timer_reset = 100;
        var colorRadial = d3.scale.linear()
        .domain([0, max / 2, max]).range(['red', 'green', 'blue']);

        var data2 = function(max){
            return d3.range(max).map(function(d){
                return [rando(d), d + rando(100)];
            });
        }

        function addTitle(container, title) {
            return container.append('text')
            .attr('x', container[0][0].clientWidth / 2)
            .attr('y', 40)
            .attr('class', 'title')
            .attr('font-size', 20)
            .attr('text-anchor', 'middle')
            .text(title);
        }

        var fns = [
            function() {
                var container = getSVG('chaos', dims);
                var lineR = d3.svg.line.radial()
                .angle(function(d){return d[0];})
                .radius(function(d){return d[1];});

                container.selectAll('path')
                .data([data2(width)])
                .enter()
                .append('path')
                .attr('opacity', 0.7)
                .attr('fill', 'none')
                .attr('stroke', randomColor(255))
                .attr('d', lineR);

                addTitle(container, 'Chaos [d3.svg.line.radial]');
            },
            function() {
                var container = getSVG('area', dims);
                var data = smoothData(height, 10, dims);
                var line = d3.svg.line();
                var area = d3.svg.area().x(function(d){
                    return d[0] * Math.PI;
                });

                container.selectAll('path')
                .data([data])
                .enter()
                .append('path')
                .attr('opacity', 0.7)
                .attr('fill', randomColor(255))
                .attr('d', area);

                addTitle(container, 'Random interpolation [d3.svg.area]');
            },
            function() {
                var container = getSVG('radial-area', dims);
                var data = smoothData(height, 10, dims);
                var area = d3.svg.area.radial()
                .radius(360)
                .innerRadius(10)
                .outerRadius(width / 2)
                .startAngle(function(d){return d[0];})
                .endAngle(function(d){return d[1] / 2;});

                container.selectAll('path')
                .data([data])
                .enter()
                .append('path')
                .attr('transform', function(){
                    return 'translate(' + [width / 2, height / 2].join(',') + ')';
                })
                .attr('opacity', 0.7)
                .attr('fill', randomColor(255))
                .attr('d', function(d){
                    return area(d) + 'Z';
                });

                addTitle(container, '[d3.svg.area.radial]');
            },
            function() {
                var container = getSVG('arc', dims);
                var data = smoothData(height, 10, dims);
                var arc = d3.svg.arc()
                .innerRadius(width / 10)
                .outerRadius(width / 4)
                .startAngle(function(d){return d[0] * 0.1;})
                .endAngle(function(d){return d[1] * 0.1;});

                container.selectAll('path')
                .data(data)
                .enter()
                .append('path')
                .transition()
                .duration(function(d, i){return i * 5})
                .attr('transform', function(d) {
                    return 'translate(' + [width / 2, height / 2].join(',') + ')';
                })
                .attr('fill', function(d){return randomColor(255);})
                .attr('d', arc);

                addTitle(container, '[d3.svg.arc]');
            }
        ];

        // call all wrapped functions
        for(var i = 0; i < fns.length; i++) {
            fns[i]();
        }
    }

    return {
        'init': init
    };
})();

window.onload = learnding.init;
