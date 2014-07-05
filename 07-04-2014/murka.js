var murka = (function(){
    'use strict';
    var diagonal      = d3.svg.diagonal();
    var form          = d3.select('form');
    var stripe_height = 40;
    var stripes       = 13;
    var height        = stripe_height * stripes;
    var width         = height * 1.8;
    var dims          = {'w': width, 'h': height};

    function init() {
        var container = getSVG('murka', dims, '#fourth');
        var group = container.append('g');

        var stripe = group.selectAll('.stripes')
        .data(d3.range(stripes))
        .enter()
        .append('rect')
        .attr('opacity', 0)
        .attr('fill', 'red')
        .transition()
        .delay(function(d){return d * 30;})
        .attr('fill', function(d, i){return i % 2 === 0 ? '#e1001b' : 'white';})
        .attr('opacity', 1)
        .attr('height', stripe_height)
        .attr('width', width)
        .attr('x', 0)
        .attr('y', function(d, i){return i * stripe_height;});

        var stripe_text = group.selectAll('.stripes-label')
        .data(d3.range(stripes + 1))
        .enter()
        .append('text')
        .attr('opacity', 0)
        .attr('fill', 'red')
        .text(function(d, i){return i;})
        .transition()
        .delay(function(d){return d * 30;})
        .attr('fill', function(d, i){return i % 2 === 0 ? '#e1001b' : 'white';})
        .attr('text-anchor', 'right')
        .attr('opacity', 1)
        .attr('height', stripe_height)
        .attr('width', width)
        .attr('x', width - 30)
        .attr('y', function(d, i){return i * stripe_height - 10;});

        var star_container = group.append('rect')
        .attr('width', width / 2.2)
        .attr('height', stripe_height * 7)
        .attr('x', 0)
        .attr('y', 0)
        .attr('opacity', 0)
        .transition()
        .delay(function(d){return height + 10;})
        .attr('opacity', 1)
        .attr('fill', '#181e84');

        var stars_container = group.append('g').attr('id', 'stargroup')
        .attr('transform', 'scale(0.9), translate(25, 20)');

        function starRow(y, is_offset) {
            var stars = stars_container.selectAll('.stargroup-star')
            .data(d3.range(is_offset ? 5 : 6))
            .enter()
            .append('g')
            .attr('transform', function(d){
                var magnitude = 130;
                var x = is_offset ? d * magnitude + magnitude / 2 : d * magnitude;
                return 'scale(0.6),translate(' + x + ',' + y + ')';
            })
            .append('path')
            .attr('opacity', 0)
            .attr('fill', 'red')
            .transition()
            .delay(function(d){return (height + 10) + d * 100;})
            .attr('fill', 'white')
            .attr('opacity', 1)
            .attr('d', function(d){return 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z';});
        }

        for(var i = 0; i < 9; i++) {
            var offset = i % 2 === 0 ? false : true;
            starRow(i * 50, offset);
        }
    }

    return {
        'init': init
    };
})();

window.onload = murka.init;
