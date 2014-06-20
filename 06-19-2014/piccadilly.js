var piccadilly = (function(){
    'use strict';
    var MARGIN    = 20;
    var PADDING   = 100;
    var tau = Math.PI * 2;
    var width = 300;
    var height = 300;

    function init() {
        // input -> domain
        // output -> range
        var timer = 0;
        var max = 100;
        var timer_reset = 100;
        var colorRadial = d3.scale.linear()
        .domain([0, max / 2, max]).range(['red', 'green', 'blue']);
        var data = function(max){
            var min_size = 10;
            return d3.range(max).map(function(d){
                return [clamp(d + Math.sqrt(d), min_size, width - PADDING),
                clamp(d * rando(d / 2), min_size, height - PADDING)];
            });
        };

        var data2 = function(max){
            return d3.range(max).map(function(d){
                return [rando(d), d + rando(10)];
            });
        }

        function arcGen() {
            var container = getSVG('arcgen');
            var arc = d3.svg.arc()
            .innerRadius(10)
            .outerRadius(height - PADDING)
            .startAngle(0)
            .endAngle(function(d){return d[0] / tau;});

            container.selectAll('text')
            .data(data2(max))
            .enter()
            .append('text')
            .attr('x', width / 2)
            .attr('y', height / 2 + 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', function(d){return clamp(d[0], 6, 14)})
            .transition()
            .attr('fill', function(d, i){return colorRadial(i);})
            .duration(function(d, i){return i * 40})
            .attr('transform', function(d) {
                return 'translate(' + arc.centroid(d) + ')';
            })
            .text(function(d, i) { return d;});
        }

        function squaggles() {
            var container = getSVG('squiggles');
            var rLine = d3.svg.area.radial()
            .innerRadius(height / 4)
            .outerRadius(height)
            .startAngle(0)
            .endAngle(function(d){return d[0] / tau;});

            var d = data2(200);
            var path = container.selectAll('path')
            .data([d])
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', function(d, i){return randomColor(d[0]);})
            .attr('d', rLine);

            d3.timer(function(){
                var coloring = function(){
                    return randomArrayValue(['green', 'red', 'blue']);
                };
                var d = data2(200);
                if(timer > timer_reset) {
                    timer = 0;
                    path
                    .data([d])
                    .attr('stroke', function(d, i){return randomColor(d[1]);})
                    .transition()
                    .delay(100)
                    .attr('d', rLine);
                }
                timer += 1;
            });
        }

        function getSVG(id) {
            return d3.select('#svg-container')
            .append('svg').attr('id', id)
            .attr('width', width)
            .attr('height', height);
        }

        function radSauce() {
            var arc = d3.svg.arc()
            .innerRadius(10)
            .outerRadius(height - PADDING)
            .startAngle(0)
            .endAngle(function(d){return d[0] / tau;});

            var container = getSVG('rad');
            container.selectAll('circle')
            .data(data2(100))
            .enter()
            .append('circle')
            .attr('fill', function(d, i){return colorRadial(i);})
            .attr('cx', function(d){return width / 2;})
            .attr('cy', function(d){return height / 2;})
            .transition()
            .delay(function(d,i){return i * 40;})
            .attr('transform', function(d) {
                return 'translate(' + arc.centroid(d) + ')';
            })
            .attr('opacity', function(d, i){return i * 0.01})
            .attr('r', function(d){return clamp(d[0], 4, width / 8);})
        }

        function radialSquares() {
            var container = getSVG('radialSquares');
            var pixls = container.selectAll('rect')
            .data(data2(100))
            .enter()
            .append('rect')
            .attr('fill', 'red')
            .attr('transform', function(d){
                return 'rotate(' + d[0] + ')';
            })
            .attr('x', function(d){return width / 2})
            .attr('y', function(d){return d[1] * 12})
            .attr('width', function(d){return d[0]})
            .attr('height', function(d){return d[1]});

            d3.timer(function(){
                if(timer > timer_reset) {
                    timer = 0;
                    pixls.data(data2(100))
                    .transition()
                    .delay(100)
                    .attr('x', function(d){return d[0] * 12})
                    .attr('y', function(d){return d[1] * 12})
                    .attr('width', function(d){return d[0]})
                    .attr('height', function(d){return d[1]});
                }
                timer += 1;
            });
        }

        arcGen();
        squaggles();
        radialSquares();
        radSauce();
    }

    return {
        'init': init
    };
})();

window.onload = piccadilly.init;
