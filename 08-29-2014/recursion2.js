window.onload = function(){
    'use strict';
    var MAX     = 10;
    var SIZE    = 300;
    var RADIUS  = SIZE / 3;
    var dims   = {'w': SIZE, 'h': SIZE};

    function _circle(container, x, y, r) {
        // defer duplicate appending to one function.
        container.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('r', r);
    }

    // A bunch of recursive circle functions for different effects

    function circle1(container, radius, x, y, count) {
        if(count <= 0) return;

        _circle(container, x, y, radius);
        _circle(container, x - radius, y, radius / 2);
        _circle(container, x + radius, y, radius / 2);

        _circle(container, x, y - radius, radius / 2);
        _circle(container, x, y + radius, radius / 2);

        return circle1(container, radius / 2, x, y, count - 1);
    }

    function circle2(container, radius, x, y, count) {
        if(count <= 0) return;

        _circle(container, x, y, radius);
        _circle(container, x - radius, y, radius / 2);
        _circle(container, x + radius, y, radius / 2);

        _circle(container, x - radius, y, radius / count);
        _circle(container, x + radius, y, radius / count);

        return circle2(container, radius / 2, x, y, count - 1);
    }

    function circle3(container, radius, x, y, count) {
        if(count <= 0) return;

        var g = container.append('g')
        .attr('transform', getCenterTranslation(dims))

        d3.range(10).map(function(d){
            // change magnitude
            d = d * 10;
            _circle(g, Math.cos(d) * (x / 2), Math.sin(d) * (y / 2), radius);
        });

        return circle3(container, radius / 2, x, y, count - 1);
    }

    function circle4(container, radius, x, y, count, rotation) {
        if(count <= 0) return;

        var degrees = 360 / count;

        var g = container.append('g')
        .attr('transform', 'rotate(' + rotation + ')');

        d3.range(10).map(function(d){
            // change magnitude
            d = d * 10;
            _circle(g, Math.sin(d) * (x / 2), Math.cos(d) * (y / 2), radius);
        });

        return circle4(g, radius / 2, x, y, count - 1, rotation + degrees);
    }

    function circle5(container, radius, x, y, count, rotation) {
        if(count <= 0) return;

        var degrees = 360 / count;

        var g = container.append('g')
        .attr('transform', 'rotate(' + rotation + ')');

        d3.range(20).map(function(d){
            // change magnitude
            d = d * 2;
            _circle(g, x - d, y, radius - d);
        });

        return circle5(g, radius / 2, x / 2, y / 2, count - 1, rotation + degrees);
    }

    function init() {
        function gsvg(container) {
            // shorten and partially apply helper function for brevity.
            return getSVG(container, dims, '#contents');
        }

        circle1(gsvg('c1'), RADIUS, dims.w / 2, dims.h / 2, MAX);
        circle2(gsvg('c2'), RADIUS, dims.w / 2, dims.h / 2, MAX);
        circle3(gsvg('c3'), RADIUS, dims.w / 2, dims.h / 2, MAX);

        var c4svg = gsvg('c4');
        var c4g = c4svg.append('g').attr('transform', getCenterTranslation(dims))

        circle4(c4g, RADIUS, dims.w / 2, dims.h / 2, MAX, 0);

        d3.range(10).map(function(d){
            if(d === 0) return;
            var c5svg = gsvg('c5-' + d);
            var c5g = c5svg.append('g')
            .attr('transform', getCenterTranslation(dims))
            circle5(c5g, RADIUS * d, dims.w / d, dims.h / d, MAX, 0);
        });
    }

    init();
};
