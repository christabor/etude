var dtree = (function(){
    'use strict';
    var dims   = getViewportDimensions();
    var height = dims.height;
    var width  = dims.width;

    function init() {
        d3.json('data.json', function(data){
            var html = createDTreeFromJSON(data[0], null, false);
            // add default title
            d3.select('#container')
            .append('p')
            .attr('class', 'dtree-title')
            .html(data[0].title || 'Untitled');
            // add new html
            d3.select('#container').append('div').html(html);
            // add code sample from same json data
            d3.select('code').html(JSON.stringify(data));
            // add events for demo
            d3.select('#flatten').on('mousedown', function(){
                d3.event.preventDefault();
                d3.select('#container').selectAll('ul')
                .classed('flattened', true);
            });
            d3.select('#nest').on('mousedown', function(){
                d3.event.preventDefault();
                d3.select('#container').selectAll('ul')
                .classed('flattened', false);
            });
        });
    }

    return {
        'init': init
    };
})();

window.onload = dtree.init;
