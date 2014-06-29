var eyeballs = (function(){
    'use strict';
    var dims = getViewportDimensions();

    function init() {
        var container = getSVG('cont', {'w': dims.width, 'h': dims.height}, '#container');

        var data = d3.range(100).map(function(d){
            return {
                'r': clamp(rando(100), 20, 50),
                'x': rando(dims.width),
                'y': rando(dims.height),
            };
        });

        var inner = container.append('g')
        .selectAll('ellipse')
        .data(data)
        .enter()
        .append('ellipse')
        .attr('fill', '#ccc')
        .attr('stroke-width', 2)
        .attr('stroke', '#bbb')
        .transition()
        .delay(function(d){return d.r * 10;})
        .attr('rx', function(d){return d.r;})
        .attr('ry', function(d){return d.r / 1.4;})
        .attr('cx', function(d){return d.x;})
        .attr('cy', function(d){return d.y;});

        var iris = container.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'black')
        .attr('r', 1)
        .transition()
        .delay(function(d){return d.r * 10;})
        .attr('r', function(d){return d.r / 2;})
        .attr('cx', function(d){return d.x;})
        .attr('cy', function(d){return d.y;});

        var iris_reflection = container.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', randomArrayValue(['green', 'blue', 'brown']))
        .attr('r', 1)
        .transition()
        .delay(function(d){return d.r * 10;})
        .attr('r', function(d){return clamp(d.r, 10, 30) / 3;})
        .attr('cx', function(d){return d.x;})
        .attr('cy', function(d){return d.y;});

        var reflection = container.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'white')
        .attr('r', 1)
        .transition()
        .delay(function(d){return d.r * 10;})
        .attr('r', function(d){return d.r / 11;})
        .attr('cx', function(d){return d.x - d.r / 11;})
        .attr('cy', function(d){return d.y - d.r / 11;});

        container
        .on('mousemove', function(){
            container.selectAll('ellipse')
            .attr('transform', 'translate(' + d3.event.x * 0.01 + ',' + d3.event.y * 0.01 + ')');
            container.selectAll('circle')
            .attr('transform', 'translate(' + d3.event.x * 0.014 + ',' + d3.event.y * 0.014 + ')');
        });

        container
        .on('mousedown', function(){
            container.selectAll('ellipse')
            .transition()
            .delay(10)
            .attr('ry', 1)
            .transition()
            .delay(100)
            .attr('ry', function(d){return d.r / 1.4;});

            container.selectAll('circle')
            .transition()
            .delay(5)
            .attr('opacity', 0)
            .transition()
            .delay(120)
            .attr('opacity', 1);
        });
    }

    return {
        'init': init
    };
})();

window.onload = eyeballs.init;
