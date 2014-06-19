var wino = (function(){
    'use strict';
    var dims      = getViewportDimensions();
    var MARGIN    = 20;
    var width     = dims.width - MARGIN * 4;
    var height    = dims.height - MARGIN * 4;
    var XPOS      = 100;
    var MAX       = 30;
    var PADDING   = 20;
    var min_range = 1;
    var max_range = 10;
    var zoom = d3.behavior.zoom()
    .scaleExtent([1, 20]);
    var container = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g').call(zoom);

    function init() {
        d3.json('winequality-red.json', function(data){
            var block_width = 2;
            var scalar = 30;
            var ticks = 15;
            var max_alch = d3.max(data, function(d){return d.alcohol;});
            var max_ph = d3.max(data, function(d){return d.pH;});
            var max_quality = d3.max(data, function(d){return d.quality;});
            var alt_toggled = false;

            var color_scale = d3.scale.linear()
            .range(['blue', 'green', 'red'])
            .domain([0, max_ph / 2, max_ph]);

            var bars = container
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', setFillpH)
            .attr('x', function(d, i){return (i * block_width);})
            .attr('y', 0)
            .attr('width', block_width)
            .attr('height', function(d){return d.alcohol * scalar;})
            .on('mouseover', function(d){
                return d3.select(this).attr('fill', 'white')
            })
            .on('mouseout', function(d){
                return d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', setFillpH(d));
            })
            .on('click', function(d){
                bars
                .transition()
                .duration(400)
                .attr('height', function(d){
                    var val;
                    if(alt_toggled) {
                        return d.alcohol * scalar;
                    } else {
                        return d.quality * scalar;
                    }
                })
                alt_toggled = !alt_toggled;
            });

            zoom.on('zoom', zoomIt);

            function setFillpH(d) {
                if(d.pH) {
                    return color_scale(d.pH);
                } else {
                    return '#ccc';
                }
            }

            function zoomIt() {
                log(d3.event.translate);
                return container.attr('transform', 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')');
            }
        });
}

return {
    'init': init
};
})();

window.onload = wino.init;
