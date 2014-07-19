var d3modals = (function(){
    'use strict';

    var $modal_template  = $('[data-modal-template]');
    var $modal_container = $('#modals');
    var dims             = getViewportDimensions();
    var el               = getSVG('spacegrid', dims, '#container');
    var height           = dims.height;
    var width            = dims.width;
    var group            = el.append('g');
    var SIZE             = 10;
    var MAX              = 50;
    var data             = d3.range(MAX).map(function(i){
        return [rando(width), rando(height)];
    });

    function init() {
        group.selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'black')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('data-modal-target', function(d, i){
            return '#modal' + i;
        })
        .attr('transform', function(d){ return 'translate(' + d + ')';})
        .attr('r', SIZE);

        group.selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .attr('fill', 'orange')
        .text(function(d, i){
            return 'M-' + i;
        })
        .attr('x', function(d){return d[0] + SIZE * 2;})
        .attr('y', function(d){return d[1] + SIZE / 2;});

        // clone all the modals
        d3.range(MAX).map(newModal);

        // run modal plugin
        $.fn.widg_modal();
    }

    function newModal(i, id) {
        var modal = $modal_template.clone(true);
        modal.attr('id', 'modal' + id).find('h3').text('I am modal - ' + id);
        modal.find('.modal-body')
        .html('<p>I am some text...weee!</p>' + '<p>Coordinates of this button are: <strong>' + data[i].join(', ') + '</strong></p>');
        $modal_container.append(modal);
        return '';
    }

    return {
        'init': init
    };
})();

window.onload = d3modals.init;
