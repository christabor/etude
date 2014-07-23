var coordos = (function(){
    'use strict';
    var dims    = getViewportDimensions();
    // visual effect, to produce more square shape
    dims.width  = dims.width - 200;
    function init() {
        var container = getSVG('map', dims, 'body');
        var group = container.append('g');
        var ngon_group = container.append('g')
        .attr('transform', getCenterTranslation(dims));

        var map = d3_geometer.coordSpace(group, dims, 10);
        var ngon = d3_geometer.nGon(ngon_group);

        var ngon_group2 = group.append('g')
        .attr('transform', 'translate(300, 200)');
        var ngon2 = d3_geometer.nGon(ngon_group2);

        var ngon_group3 = group.append('g')
        .attr('transform', 'translate(' + dims.width / 4 + ', 500)');
        var ngon3 = d3_geometer.nGon(ngon_group3);

        ngon(200, 5)
        .drawLabels()
        .drawVertices()
        .drawCenterPoint(dims.height, dims.width, true);

        ngon2(100, 8)
        .drawLabels()
        .drawVertices()
        .drawCenterPoint(dims.height, dims.width, true);

        ngon3(120, 3)
        .drawLabels()
        .drawVertices()
        .drawCenterPoint(dims.height, dims.width, true);
    }

    return {
        'init': init
    };
})();

window.onload = coordos.init;
