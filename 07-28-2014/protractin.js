var protractin = (function(){
    'use strict';
    var dims    = getViewportDimensions();
    // visual effect, to produce more square shape
    dims.width  = dims.width - 200;
    function init() {
        var protractor;
        var container  = getSVG('map', dims, 'body');
        var group      = container.append('g');
        var ngon_group = container.append('g').attr('transform', getCenterTranslation(dims));
        var p_group    = container.append('g').attr('transform', getCenterTranslation(dims));
        var map        = d3_geometer.coordSpace(group, dims, 10);
        var ngon       = d3_geometer.nGon(ngon_group);

        ngon(100, 6)
        .drawLabels()
        .drawVertices()
        .drawCenterPoint(dims.height, dims.width, true);
        protractor = d3_geometer.protractor(p_group, 250);
        protractor.rotate(90);
    }

    return {
        'init': init
    };
})();

window.onload = protractin.init;
