var radianjump = (function(){
    'use strict';
    var dims       = getViewportDimensions();
    var height     = dims.height / 2;
    var width      = dims.width / 2;
    var container  = getSVG('map', dims, '#container');
    var group      = container.append('g')
    .attr('id', 'container-group')
    .attr('transform', getCenterTranslation(dims));

    function init() {
        var radius = width;
        var sides = 0;
        var ngon = d3_geometer.nGon(group);

        function initShape(sides) {
            ngon(radius, sides);
            for(var i = 0; i < 50; i++) {
                (function(i){
                    setTimeout(function(){
                        ngon.drawAngle(i, i * 15, Math.cos(i) * i);
                        ngon.drawAngle(i, -i * 15, Math.cos(i) * i);
                    }, i * 40);
                })(i);
            }
        }
        initShape(sides);
    }

    return {
        'init': init
    };
})();

window.onload = radianjump.init;
