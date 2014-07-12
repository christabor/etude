var intangles = (function(){
    'use strict';
    var dims    = getViewportDimensions();
    dims.width  = dims.width / 4;
    dims.height = dims.width;
    var PADDING = 10;
    var TOTAL   = 100;
    var RADIUS  = dims.width / 2.4 - PADDING;

    function init() {
        for(var i = 3; i < TOTAL; i++) {
            var container = getSVG('map', dims, 'body');
            var group = container.append('g').attr('transform', getCenterTranslation(dims));
            var deg = d3_geometer.utils.calculateAngles(i, true);
            var deg_r = d3_geometer.utils.calculateAngles(i, false);
            var ngon = d3_geometer.nGon(group);
            ngon(RADIUS, i);

            ngon
            .label(i + ' sides')
            .label(deg + '° per angle', 0, 20)
            .label('(' + deg_r + '°)', 0, 40);
        }
    }

    return {
        'init': init
    };
})();

window.onload = intangles.init;
