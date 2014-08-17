window.onload = function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var elements  = [];
    var container = d3.select('#container');
    var img_w     = 329;
    var img_h     = 472;
    var aspect    = 1.6;
    var masonry   = null;
    var PADDING   = 10;
    var MAX_WIDTH = 400; // based on masonry grid for uniform layouts.

    function getHTML(data) {
        var html = '<ul></ul>';
        d3.map(data).forEach(function(title, datum){
            var content = null;
            if(title !== 'image') {
                if(title === 'known_for') {
                    datum = '<ul>' + arrayToHTMList(datum) + '</ul>';
                }
                html += '<li class="' + title + '"><strong>' + title.split('_').join(' ') + ': </strong>' + datum + '</li>';
            }
        });
        return html;
    }

    function init() {
        d3.json('data.json', function(data){
            var $container = null;
            var scale = d3.scale.linear()
            .clamp(true)
            .domain([
                d3.min(data, function(d){
                    return d.known_for.length;
                }),
                d3.max(data, function(d){
                    return d.known_for.length;
                })
            ]).range([80, MAX_WIDTH - PADDING]);

            var groups = container
            .selectAll('.mathematician')
            .data(data)
            .enter()
            .append('div')
            .classed('mathematician', true);

            groups.append('div')
            .classed('info', true)
            .html(function(d, i){return getHTML(d);})

            groups.append('img')
            .classed('thumbnail', true)
            .attr('src', function(d){return 'imgs/' + d.image;})
            .attr('width', function(d){
                // pimp out I.Newtons size
                return scale(d.name === 'Sir Isaac Newton' ? scale(10000) : d.known_for.length);
            });

            $container = document.getElementById('container');
            // requires imagesloaded to fix an issue with positioning...
            // http://masonry.desandro.com/appendix.html
            imagesLoaded($container, function(){
                masonry = new Masonry($container, {
                    itemSelector: '.mathematician'
                });
            })
        });
    }
    init();
};
