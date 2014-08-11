window.onload = function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var elements  = [];
    var container = getSVG('grapher-container', dims, 'body');
    var mygraph   = new GrapherWidget(container, dims);

    function init() {
        var d;
        var add_box_btn = container.append('rect')
        .attr('id', 'add-btn')
        .attr('x', 10)
        .attr('y', 10)
        .attr('width', 50)
        .attr('height', 20);

        var add_circle_btn = container.append('circle')
        .attr('id', 'add-btn')
        .attr('cx', 35)
        .attr('cy', 55)
        .attr('r', 20);

        add_box_btn.on('mousedown', function(){
            mygraph.addElement('box', rando(width), rando(height));
        });
        add_circle_btn.on('mousedown', function(){
            mygraph.addElement('circle', rando(width), rando(height));
        });
        var box1 = mygraph.addElement('box', width / 2 - 100, height / 2 - 100);
        var circle1 = mygraph.addElement('circle', width / 3, height / 3 - 100);
        var circle2 = mygraph.addElement('circle', width / 1.5, height / 2.5 - 100);
    }

    init();
};
