var shapeof = (function(){
    'use strict';

    var _dims = getViewportDimensions();
    var height = _dims.height;
    var width = _dims.width;
    var tau = Math.PI * 2;
    var size = 250;
    var dims = {'w': size, 'h': size};

    function radialGon(sides) {
        var cont = getSVG('ngon-' + sides, dims, '#groups');
        var data = d3.range(10).map(function(d){
            return [d / sides, d * sides - d * (sides / 2)];
        });

        var lineR = d3.svg.line.radial()
        .angle(function(d){return d[0] * tau;})
        .radius(function(d){return d[1] * tau;});

        var group = cont.append('g')
        .attr('transform', getCenterTranslation(dims));

        var radial = group.selectAll('path');
        radial.data([data])
        .enter()
        .append('path')
        .attr('stroke', '#ccc')
        .attr('fill', 'none')
        .attr('d', lineR);

        group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'red')
        .attr('r', 2)
        .attr('cx', function(d){return d[0] * tau;})
        .attr('cy', function(d, i){return d[1] * tau;});

        addTitle(cont, 'Polygon radial - ' + sides + ' sides [d3.svg.line.radial]');
    }

    function normal(lines, data_func, title_prefix, container) {
        var cont = getSVG('lines-' + lines, dims, container);
        var offset = 4;
        var group = cont.append('g')
        .attr('transform', getCenterTranslation(dims));

        var data = d3.range(lines).map(data_func);

        var line = d3.svg.line()
        .x(function(d){return d[0] * size / offset;})
        .y(function(d){return d[1] * size / offset;});

        var lattice = group.selectAll('path');
        lattice.data([data])
        .enter()
        .append('path')
        .attr('stroke-width', 1)
        .attr('stroke', '#ccc')
        .attr('fill', 'none')
        .attr('d', line);

        group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', 'red')
        .attr('r', 2)
        .attr('cx', function(d){return d[0] * size / offset;})
        .attr('cy', function(d, i){return d[1] * size / offset;});

        addTitle(cont, 'Polygon "' + title_prefix + '" ' + lines + ' lines - [d3.svg.line.radial]');
    }

    function init() {
        for(var i = 3; i <= 12; i++) {
            radialGon(i);
        }
        for(i = 4; i <= 40; i += 5) {
            // tan / sin
            // tan / cos
            // =========
            // sin / tan
            // sin / cos
            //=========
            // cos / tan
            // cos / sin

            normal(i, function(d){return [Math.tan(d), Math.sin(d)];}, 'tan+sin', '#groups2');
            normal(i, function(d){return [Math.tan(d), Math.cos(d)];}, 'tan+cos', '#groups2');

            normal(i, function(d){return [Math.sin(d), Math.tan(d)];}, 'sin+tan', '#groups2');
            normal(i, function(d){return [Math.sin(d), Math.cos(d)];}, 'sin+cos', '#groups2');

            normal(i, function(d){return [Math.cos(d), Math.tan(d)];}, 'cos+tan', '#groups2');
            normal(i, function(d){return [Math.cos(d), Math.sin(d)];}, 'cos+sin', '#groups2');
        }
    }


    return {
        'init': init
    };

})();

window.onload = shapeof.init;
