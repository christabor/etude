window.onload = function(){
    'use strict';
    var MAX     = 10;
    var PADDING = 100;
    var _dims   = getViewportDimensions();
    var SIZE    = _dims.height - 200;
    var dims    = {'width': SIZE, 'height': SIZE};

    d3.select('body').style('width', SIZE * 3 + (3 * PADDING) + 'px');

    function harmonize(k) {
        // Double sum (sum for each element of n in N (from 1 ... n)
        return sum(d3.range(k + 1).map(function(d){
            return 1 / (d + 1);
        }));
    }

    function init() {
        var trans = getCenterTranslation(dims);

        var container1 = getSVG(uuid(), dims, '#contents');
        var container2 = getSVG(uuid(), dims, '#contents');
        var container3 = getSVG(uuid(), dims, '#contents');

        var g2 = container2.append('g').attr('transform', trans);
        var g3 = container3.append('g').attr('transform', trans);

        var data = d3.range(70).map(harmonize);
        var data2 = d3.range(300).map(harmonize);

        // group 1
        container1.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', function(d, i){return i * 8;})
        .attr('y', function(d){return dims.height - d * (dims.height / 10) - PADDING;})
        .text(function(d){return '1/' + d;});

        container1.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function(d, i){return i * 10;})
        .attr('y', function(d){return dims.height - d * (dims.height / 10) - PADDING;})
        .attr('height', function(d){return d * dims.height / 10;})
        .attr('width', 6);

        addTitle(container1, '1a. Height');

        // group 2
        g2.selectAll('circle')
        .data(data2)
        .enter()
        .append('circle')
        .attr('cx', function(d){return Math.cos(d) * SIZE / 3;})
        .attr('cy', function(d){return Math.sin(d) * SIZE / 3;})
        .attr('r', function(d){return d * 10;});

        g2.selectAll('text')
        .data(data2)
        .enter()
        .append('text')
        .attr('x', function(d){return Math.cos(d) * SIZE / 3 + 10;})
        .attr('y', function(d){return Math.sin(d) * SIZE / 3 + (d / 2);})
        .text(function(d){return '1/' + d;});

        addTitle(g2, '1b. Sine/Cosine');

        // group 3
        g3.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('transform', function(d){return 'rotate(' + d * 300 + ')';})
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', function(d){return d * 60;})
        .attr('width', 6);

        g3.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('transform', function(d){return 'rotate(' + d * 300 + ')';})
        .attr('x', 0)
        .attr('y', function(d){return d * 30;})
        .text(function(d){return '1/' + d;});
        addTitle(container3, '1c. Rotation');
    }

    init();
};
