window.onload = function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var _dims     = {'w': height - 200, 'h': height - 200};
    var container = getSVG(cssUuid(), _dims, '#contents');
    var letters   = 'abcdefghijlmnopqrstuvwxyz'.split('');
    var group     = container.append('g');
    var timer     = 2000;

    var d3_sets = {};
    d3_sets.container = null;
    d3_sets.set_css = function() {
        // All css properties are stored here
        return 'background-color:#ccc;';
    };
    d3_sets.load = function(container) {
        this.container = container;
        return this;
    };
    d3_sets.destroy = function() {
        this.container.selectAll('g').remove();
    };
    d3_sets._translate = function(x, y) {
        return 'translate(' + [x, y].join(',') + ')';
    };
    d3_sets._isBijective = function(set1, set2) {
        return set1.length === set2.length;
    };
    d3_sets._textTransform = function(d) {
        return d.toUpperCase();
    };
    d3_sets.surjection = function(data) {
        if(!this.container) throw new Error('Need a container');
        // Should calculate based on parent container.
        // Should be abstracted into global setting for all *jections.
        var MAX_LETTERS = 25;
        var OVAL_RATIO = 2;
        var PADDING = 10;
        var rx = 120;
        var ry = rx * OVAL_RATIO;

        var left = null;
        var right = null;
        var lines = null;

        var LABEL_FONT_SIZE = 40;
        var Y_OFFSET = LABEL_FONT_SIZE * 1.4;

        var TEXT_COLOR = 'black';
        var STROKE_WIDTH = 4;
        var STROKE_COLOR = '#999';

        var ypos_range = [-ry / 2, ry];
        var font_range = [50, 8];

        var fontScale0 = d3.scale.linear()
        .clamp(true)
        .domain([0, MAX_LETTERS])
        .range(font_range);

        var fontScale1 = d3.scale.linear()
        .clamp(true)
        .domain([0, MAX_LETTERS])
        .range(font_range);

        var yPosScale0 = d3.scale.linear()
        .clamp(true)
        .domain([0, data[0].set.length])
        .range(ypos_range);

        var yPosScale1 = d3.scale.linear()
        .clamp(true)
        .domain([0, data[1].set.length])
        .range(ypos_range);

        var font_size0 = fontScale0(data[0].set.length);
        var font_size1 = fontScale1(data[1].set.length);

        left = this.container.append('g')
        .attr('transform', this._translate(rx + STROKE_WIDTH, ry + STROKE_WIDTH));

        right = this.container.append('g')
        .attr('transform', this._translate(rx * 3.5 + STROKE_WIDTH, ry + STROKE_WIDTH));

        lines = this.container.append('g')
        .attr('transform', this._translate(0, ry + STROKE_WIDTH));

        // add bg ovals
        left.append('ellipse')
        .attr('id', 'left-side')
        .attr('cx', 0)
        .attr('cy', Y_OFFSET)
        .attr('rx', rx)
        .attr('ry', ry)
        .attr('fill', '#fff')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE_COLOR);

        right.append('ellipse')
        .attr('id', 'right-side')
        .attr('cx', 0)
        .attr('cy', Y_OFFSET)
        .attr('rx', rx)
        .attr('ry', ry)
        .attr('fill', '#fff')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE_COLOR);

        // Add mapping lines
        lines.selectAll('line')
        .data(data[0].set)
        .enter()
        .append('line')
        .attr('opacity', 0.5)
        .attr('x1', rx + STROKE_WIDTH + (font_size1 / 3))
        .attr('y1', function(d, i){return yPosScale0(i) - (font_size0 / 3);})
        .attr('x2', rx * 3.5 + STROKE_WIDTH - (font_size1 / 3))
        .attr('y2', function(d, i){return yPosScale1(i) - (font_size1 / 3);})
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', STROKE_COLOR);

        lines.selectAll('line')
        .data(data[1].set)
        .enter()
        .append('line')
        .attr('opacity', 0.5)
        .attr('x1', rx + STROKE_WIDTH + (font_size1 / 3))
        .attr('y1', function(d, i){return yPosScale0(i) - (font_size0 / 3);})
        .attr('x2', rx * 3.5 + STROKE_WIDTH - (font_size1 / 3))
        .attr('y2', function(d, i){return yPosScale1(i) - (font_size1 / 3);})
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', STROKE_COLOR);

        // Add elements
        left.selectAll('text')
        .data(data[0].set)
        .enter()
        .append('text')
        .attr('fill', TEXT_COLOR)
        .attr('text-anchor', 'middle')
        .attr('y', function(d, i){return yPosScale0(i);})
        .attr('x', 0)
        .attr('font-size', font_size0)
        .text(this._textTransform);

        right.selectAll('text')
        .data(data[1].set)
        .enter()
        .append('text')
        .attr('fill', TEXT_COLOR)
        .attr('text-anchor', 'middle')
        .attr('y', function(d, i){return yPosScale1(i);})
        .attr('x', 0)
        .attr('font-size', font_size1)
        .text(this._textTransform)

        // Add titles
        left.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -ry + LABEL_FONT_SIZE)
        .attr('font-size', LABEL_FONT_SIZE)
        .text(data[0].label);

        right.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -ry + LABEL_FONT_SIZE)
        .attr('font-size', LABEL_FONT_SIZE)
        .text(data[1].label);

        // F denotation
        this.container.append('g')
        .attr('transform', this._translate(rx * 2.25 + STROKE_WIDTH, ry + STROKE_WIDTH))
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('x', 0)
        .attr('y', -ry + LABEL_FONT_SIZE + 10)
        .attr('font-size', LABEL_FONT_SIZE / 1.5)
        .text('f');
        return this;
    };
    d3_sets.injection = function(data) {};
    d3_sets.bijection = function(data) {};

    function randomLetter() {
        return randomArrayValue(letters);
    }

    function reload() {
        var MAX = 14;
        var d1 = rando(MAX) + 2;
        var d2 = rando(MAX) + 2;
        var s1 = d3.range(d1).map(randomLetter);
        var s2 = d3.range(d2).map(randomLetter);
        d3_sets.load(group)
        .surjection([{'label':'X', 'set': s1}, {'label':'Y', 'set': s2}]);
        setTimeout(function(){d3_sets.destroy()}, timer - 100);
    }

    function init() {
        reload();
        setInterval(reload, timer);
    }

    init();
};
