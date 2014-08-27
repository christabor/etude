window.onload = function(){
    'use strict';
    var dims        = getViewportDimensions();
    var width       = dims.width - 100;
    var height      = 200;
    var small_dims  = {'width': width, 'height': height};
    var container   = getSVG('container', small_dims, '#contents');
    var SIZE        = 30;
    var PADDING     = SIZE / 4;
    var TRANSITION  = 5;
    var MAX_WIDTH   = Math.round(width / SIZE + PADDING) / 3;
    var stack       = d3.range(MAX_WIDTH).map(rando);

    function sum(arr) {
        var _sum = 0;
        for(var i = 0; i < arr.length; i++) {
            _sum += arr[i];
        }
        return _sum;
    }

    function getText(d, i) {
        if(i === 0) return i + ' (tail)';
        if(i === stack.length - 1) return i + ' (head)';
        return i;
    }

    function getColor(d, i) {
        if(i === 0) return 'green';
        if(i === stack.length - 1) return 'red';
        return 'black';
    }

    function updateInfo() {
        var headings = [
            '<div class="heading-group"><h2>Length of stack</h2><p>' + stack.length + '</p></div>',
            '<div class="heading-group"><h2>Sum of stack</h2><p>' + sum(stack) + '</p></div>',
        ];
        d3.select('#info').html(headings.join(''));
    }

    function pop() {
        stack.pop();
        render();
    }

    function push() {
        var val = parseInt(d3.select('input')[0][0].value, 10);
        val = isNaN(val) ? 0 : val;
        stack.push(val);
        render();
    }

    function init() {
        d3.select('#pop-btn').on('click', pop);
        d3.select('#push-btn').on('click', push);
        render();
    }

    function render() {
        container.selectAll('g').remove();

        // text values
        container
        .append('g')
        .selectAll('.text')
        .data(stack)
        .enter()
        .append('text')
        .attr('font-size', 10)
        .attr('y', SIZE / 1.5)
        .attr('opacity', 0)
        .attr('fill', getColor)
        .attr('x', function(d, i){
            return (i + 1) * (SIZE + PADDING) + SIZE / 2;
        })
        .transition()
        .delay(function(d, i){return i * 5;})
        .attr('opacity', 1)
        .text(function(d, i) {return d;});

        // text indices
        container
        .append('g')
        .selectAll('.text')
        .data(stack)
        .enter()
        .append('text')
        .attr('font-size', 8)
        .attr('y', SIZE + SIZE / 2)
        .attr('opacity', 0)
        .attr('fill', getColor)
        .attr('x', function(d, i){
            return (i + 1) * (SIZE + PADDING) + SIZE / 2;
        })
        .transition()
        .attr('opacity', 1)
        .delay(function(d, i){return i * TRANSITION;})
        .text(getText);

        container
        .append('g')
        .selectAll('.rect')
        .data(stack)
        .enter()
        .append('rect')
        .attr('y', 1) // border
        .attr('opacity', 0)
        .attr('x', function(d, i){
            return (i + 1) * (SIZE + PADDING);
        })
        .transition()
        .delay(function(d, i){return i * TRANSITION;})
        .attr('opacity', 1)
        .attr('stroke', getColor)
        .attr('fill', 'none')
        .attr('height', SIZE)
        .attr('width', SIZE);
        updateInfo();
    }

    init();
};
