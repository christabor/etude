var codequalizer = (function(){
    'use strict';
    var dims       = getViewportDimensions();
    var MAX        = 100;
    var VARIANCE   = 40;
    var MAX_LENGTH = 120;
    var PADDING    = 20;
    var x_scale    = d3.scale.linear()
    .domain([0, MAX_LENGTH - PADDING])
    .range([0, dims.width]);
    var container  = getSVG('#eq', dims, 'body');
    var group      = container.append('g')

    function init() {
        var groups = group
        .selectAll('.eq-bar')
        .data(d3.range(MAX).map(function(){
            return randomBinary(rando(MAX_LENGTH));
        }))
        .enter()
        .append('g')
        .attr('transform', function(d, i){
            return 'translate(' + x_scale(i) + ', 0), rotate(90)'
        });

        var bars = groups.selectAll('text')
        .data(function(d, i){
            return [randomBinary(rando(MAX_LENGTH))];
        })
        .enter()
        .append('text');

        bars.text(function(d){return d;})

        setInterval(function(){
            setTimeout(function(){
                bars.data(function(d, i){
                    return [randomBinary(d.length + rando(VARIANCE))];
                })
                .text(function(d){return d;});
            }, rando(100));
        }, 100);
    }

    return {
        'init': init
    };
})();

window.onload = codequalizer.init;
