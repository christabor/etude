var geometer3 = (function(){
    'use strict';
    var dims       = getViewportDimensions();
    var height     = dims.height;
    var width      = dims.width;
    var container  = getSVG('map', dims, '#container');
    var group      = container.append('g')
    .attr('id', 'container-group')
    .attr('transform', getCenterTranslation(dims));

    function init() {
        var radius = width / 4;
        var sides = 3;
        var ngon = d3_geometer.nGon(group);

        d3.select('body').on('keydown', function(d){
            if(d3.event.keyCode === 13) {
                sides += 1;
                ngon.destroy();
                initShape(sides);
            } else if(d3.event.keyCode === 48) {
                // reset
                sides = 3;
                ngon.destroy();
                initShape(sides);
            }
        });

        function initShape(sides) {
            ngon(radius, sides);

            // showcase modulo option
            if(sides % 3 === 0) {
                ngon.drawNearAdjacentEdges(null, 3);
            } else {
                ngon.drawNearAdjacentEdges(null);
            }

            ngon
            .drawLabels()
            .drawVertices()
            .drawCenterPoint(height, width, true);

            // do the angle thang'
            if(sides === 4) {
                // based on known radius params.
                ngon.drawRightAngle(-18, -18)
                .drawRightAngle(0, 0);
            }
        }

        initShape(sides);
    }

    return {
        'init': init
    };
})();

window.onload = geometer3.init;
