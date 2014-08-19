// D3 Geometer - a utility library for d3 that allows drawing
// of geometric primitives, labels, connections and more.
// Licensed under MIT.
// Copyright (c) 2014, Chris Tabor
// All rights reserved.

// Using semantic versioning. http://semver.org/
var d3_geometer = {
    'version': '0.6.2'
};

d3_geometer.utils = {};

d3_geometer.utils.toRadian = function(deg) {
    if(deg > 360) deg = 360;
    // Converts degrees to radians.
    // @param {number} degree - the degrees to convert - up to 360
    if(isNaN(deg)) return deg;
    return deg * (Math.PI / 180);
};

d3_geometer.utils.calculateAngleSum = function(sides) {
    // Calculates the sum of interior angles of a given number of sides
    // @param {number} sides - number of sides to calculate from.
    // http://www.regentsprep.org/Regents/math/geometry/GG3/LPoly1.htm
    return 180 * (sides - 2);
};

d3_geometer.utils.calculateAngles = function(sides, round) {
    // Calculates the angle of a given side,
    // given a number of equal sides.
    // @param {sides} number - number of sides to calculate.
    // @param {round} boolean - whether or not to round the calculation.
    var deg = d3_geometer.utils.calculateAngleSum(sides) / sides;
    return round ? Math.round(deg) : deg;
};

d3_geometer.protractor = function(group, size) {
    // Generates a visual protractor to use in angle measurement
    // and interactive contexts
    // @param {group} object - d3 data selection.
    // @param {size} number - size of protractor.
    var SIZE                    = size || 200;
    var end_angle               = d3_geometer.utils.toRadian(180);
    var drag                    = d3.behavior.drag().on('drag', move)
    var BAR_THICKNESS           = 1;
    var HIGHLIGHT_BAR_THICKNESS = 4;
    var protractor              = group.attr('id', 'protractor').call(drag);
    var angle                   = 0; // protractor angle -- part of interactivity.
    var arc_bottom;
    var arc_bg;

    arc_bg = d3.svg.arc()
    .innerRadius(20)
    .outerRadius(SIZE)
    .startAngle(0)
    .endAngle(end_angle);

    arc_bottom = d3.svg.arc()
    .innerRadius(10)
    .outerRadius(20)
    .startAngle(0)
    .endAngle(end_angle);

    function move() {
        d3.select(this)
        .attr('transform', translation(d3.event.x, d3.event.y));
    }

    function rotate() {
        var trans = protractor.attr('transform');
        var ang   = ',rotate(' + Math.abs(angle) + ')';
        trans = trans.replace(/,rotate\(+[0-9]+\)/g, '');
        trans += ang;
        protractor.attr('transform', trans);
    }

    function _updateAngle(e) {
        // updates the angle of the protractor based on
        // user key presses (up and down keys)
        var key = d3.event.keyCode;
        // reset angle
        if(angle > 360) {
            angle = 0;
        }
        // up key
        if(key === 38) {
            angle -= 1;
        // down key
        } else if(key === 40) {
            angle += 1;
        }
        // recalculate
        rotate();
    }

    function updateAngle(ang) {
        // sets angle and rotates
        angle = ang;
        rotate();
    }

    // drag bg
    protractor
    .append('path')
    .classed('protractor-bg', true)
    .attr('fill', 'white')
    .attr('opacity', 0.3)
    .attr('stroke', 'black')
    .attr('stroke-width', HIGHLIGHT_BAR_THICKNESS / 2)
    .attr('d', arc_bg);

    // 0, 180 degree line -----
    protractor
    .selectAll('.protractor-angle-0')
    .data(d3.range(1))
    .enter()
    .append('rect')
    .classed('protractor-angle-0', true)
    .attr('fill', 'black')
    .attr('width', HIGHLIGHT_BAR_THICKNESS)
    .attr('height', SIZE * 2)
    .attr('y', -SIZE)
    .attr('x', -HIGHLIGHT_BAR_THICKNESS / 2);

    // 90 degree line -----
    protractor
    .selectAll('.protractor-angle-90')
    .data(d3.range(89, 90))
    .enter()
    .append('rect')
    .classed('protractor-angle-90', true)
    .attr('fill', 'red')
    .attr('width', SIZE / 1.4)
    .attr('height', HIGHLIGHT_BAR_THICKNESS)
    .attr('y', -HIGHLIGHT_BAR_THICKNESS / 2)
    .attr('x', 0);

    // all angles -----
    protractor
    .selectAll('.protractor-angle')
    .data(d3.range(1, 180))
    .enter()
    .append('rect')
    .classed('protractor-angle', true)
    .attr('fill', function(d){return d === 90 ? 'red' : 'black';})
    .attr('width', BAR_THICKNESS)
    .attr('opacity', 0.6)
    .attr('height', function(d){
        if(d % 10 === 0) {
            if(d === 90) {
                return SIZE / 6;
            }
            return SIZE;
        } else if(d % 5 === 0) {
            return SIZE / 6;
        }
        return SIZE / 14;
    })
    .attr('y', -SIZE)
    .attr('transform', function(d){return 'rotate(' + d + ')';});

    // bottom arc overlay
    protractor
    .append('path')
    .classed('protractor-arc-bottom', true)
    .attr('fill', 'black')
    .attr('stroke-width', 0)
    .attr('stroke', 'none')
    .attr('d', arc_bottom);

    // text labels - TOP -----
    protractor
    .selectAll('.protractor-text-top')
    .data(d3.range(19)) // 0 + 18 * 10 = 180
    .enter()
    .append('text')
    .classed('protractor-text-top', true)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', -SIZE - 8)
    .attr('font-size', function(d){return d === 90 ? 30 : 15;})
    .attr('transform', function(d){return 'rotate(' + (d * 10)+ ')';})
    .text(function(d){return d * 10;});

    // text labels - BOTTOM -----
    protractor
    .selectAll('.protractor-text-bottom')
    .data(d3.range(1, 18)) // 0 + 18 * 10 = 180
    .enter()
    .append('text')
    .classed('protractor-text-bottom', true)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', -SIZE / 1.3)
    .attr('font-size', 11)
    .attr('transform', function(d){return 'rotate(' + (d * 10)+ ')';})
    .text(function(d){return d !== 90 ? 180 - d * 10 : '';});

    d3.select('body').on('keydown', _updateAngle);
    // trigger update angle first time, so user set angle is rendered.
    rotate();

    // return some public helper methods
    return {
        'el': protractor,
        'rotate': updateAngle
    };
};

d3_geometer.coordSpace = function(group, dims, max_coords) {
    // @param {object} group - A d3 group selection.
    // @param {object} dims - A dimensions (width, height) object.
    // Expects keys `width` and `height`
    // @param {number} max_coords - Max number of coordinate spaces per axis.
    var PADDING        = 10;
    var LINE_THICKNESS = 1;
    var x_scale        = null;
    var y_scale        = null;
    var x_axis         = null;
    var y_axis         = null;
    var coords         = d3.range(-max_coords, max_coords + 1);

    x_scale = d3.scale.linear()
    .domain([d3.min(coords), d3.max(coords)])
    .range([PADDING, dims.width - PADDING]);

    y_scale = d3.scale.linear()
    .domain([d3.min(coords), d3.max(coords)])
    .range([dims.height - PADDING, PADDING]);

    x_axis = d3.svg.axis()
    .tickValues(coords)
    .scale(x_scale)
    .orient('bottom');

    y_axis = d3.svg.axis()
    .tickValues(coords)
    .scale(y_scale)
    .orient('left');

    // add x-axis
    group.append('g')
    .attr('transform', 'translate(0,' + dims.height / 2 + ')')
    .attr('id', 'xCoords').call(x_axis);

    // add y-axis
    group.append('g')
    .attr('transform', 'translate(' + dims.width / 2 + ', 0)')
    .attr('id', 'yCoords').call(y_axis);

    // add bg lines
    group.append('g').attr('id', 'yCoordsLines')
    .selectAll('.ycoord-line')
    .data(coords)
    .enter()
    .append('rect')
    .attr('opacity', function(d){
        return d === 0 ? 1 : 0.1;
    })
    .attr('y', dims.width / 2)
    .attr('width', function(d){
        return d === 0 ? LINE_THICKNESS * 3 : LINE_THICKNESS;
    })
    .attr('height', dims.height)
    .attr('x', x_scale)
    .attr('y', 0);

    group.append('g').attr('id', 'xCoordsLines')
    .selectAll('.xcoord-line')
    .data(coords)
    .enter()
    .append('rect')
    .attr('y', dims.height / 2)
    .attr('opacity', function(d){
        return d === 0 ? 1 : 0.1;
    })
    .attr('width', dims.width)
    .attr('height', function(d){
        return d === 0 ? LINE_THICKNESS * 3 : LINE_THICKNESS;
    })
    .attr('x', 0)
    .attr('y', y_scale);

    // hide domain paths
    group.select('#xCoords')
    .select('.domain').style('display', 'none');

    group.select('#yCoords')
    .select('.domain').style('display', 'none');
};

d3_geometer.nGon = function(group) {
    // @param {object} group - A d3 group selection.
    if(!d3) return console.error('d3 library not found :sadface:');

    // d3 style - chainable interfaces.
    var element      = null;
    var _radius      = null;
    var _sides       = null;
    var _coords      = null;
    var GLOBAL_CLASS = 'd3_geometer';
    var _connections = [];
    var tau          = Math.PI * 2;
    var STROKE       = '#b66d48';
    var FILL         = '#f4eae5';
    var STROKE_WIDTH = 3;
    var DOT_SIZE     = 5;
    var RADIUS       = 6;
    var OFFSET       = 50;
    var DASHARRAY    = 5;
    var ARC_I_RADIUS = 10;
    var ARC_O_RADIUS = RADIUS * 4;
    var ANG_OPACITY  = 0.8;
    var ANG_STROKE   = '#689452';
    var ANG_FILL     = '#acf287';
    var line         = d3.svg.line()
    .x(function(d){return d.x;})
    .y(function(d){return d.y;});

    function setupGroups() {
        // A single source to set up parent groups
        // for each type of element.
        var classes = [
            'ngon-labels',
            'ngon-dash-edges',
            'ngon-angles',
            'ngon-vertices',
            'ngon-right-angles'
        ];

        for(var i = 0, len = classes.length; i < len; i ++) {
            group.append('g')
            .attr('class', [GLOBAL_CLASS, classes[i]].join(' '));
        }
    }

    // Inner "parent" function that is **always** returned
    // in each helper function, which allows for chaining.
    function _nGon(radius, sides) {
        // @param {number} radius - Size of entire shape
        //  - calculated using the unit circle
        // @param {number} sides - Number of sides.
        group   = group || d3.select('svg').append('g');
        // expose values
        _radius = radius;
        _sides  = sides;
        _coords = _nGon.getCoords(radius, sides);
        // Initialize element for later reference
        // This is important!
        element = group.selectAll('.ngon')
        .data([_coords])
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH)
        .attr('stroke', STROKE)
        .attr('fill', FILL)
        .attr('opacity', 1)
        .attr('d', function(d){return line(d) + 'Z';});
        setupGroups();
        return _nGon;
    }

    _nGon.rotate = function(deg, el) {
        // Rotate a given element.
        // @param {number} deg - the amount, in degrees, to rotate by
        // @param {string} el - the d3 selector (class, tag, etc..) to rotate.
        group.select(el)
        .attr('transform', 'rotate(' + deg + ')');
        return _nGon;
    };

    _nGon.destroy = function() {
        element.remove();
        // One reason for keeping all elements
        // in a group is that it makes cleanup easier.
        group.selectAll('g').remove();
    };

    _nGon.getCoords = function(radius, sides) {
        // Generate the coordinates for
        // each point based on # of sides.
        // @param {number} radius - Size of entire shape
        //  - calculated using the unit circle
        // @param {number} sides - Number of sides.
        return d3.range(sides).map(function(d){
            var cx           = 0;  // center x
            var cy           = 0;  // center y
            var start_angle  = 0;
            var center_angle = tau / sides;
            var curr_angle   = start_angle + (d * center_angle);
            var vx           = Math.round(cx + radius * Math.cos(curr_angle));
            var vy           = Math.round(cy - radius * Math.sin(curr_angle));
            return {
                'label': 'L' + d,
                'x': vx,
                'y': vy
            };
        });
    };

    _nGon.label = function(text, x, y) {
        // Draw a custom label, wherever.
        // @param {string} text - the label text.
        // @param {number} x - x position
        // @param {number} y - y position
        group.select('.ngon-labels')
        .append('text')
        .attr('class', 'custom-label')
        .text(text)
        .attr('x', x || 0)
        .attr('y', y || 0);
        return _nGon;
    };

    _nGon.drawLabels = function() {
        // Draw some labels on the vertices.
        group.select('.ngon-labels')
        .selectAll('.label')
        .data(element.datum())
        .enter()
        .append('text')
        .text(function(d){return d.label;})
        .attr('x', function(d){return d.x - (RADIUS + RADIUS / 2);})
        .attr('y', function(d){return d.y - (RADIUS + RADIUS / 2);});
        return _nGon;
    };

    _nGon.drawVertices = function() {
        // Draw vertices for each edge.
        group.select('.ngon-vertices')
        .selectAll('.vertex')
        .data(element.datum())
        .enter()
        .append('circle')
        .attr('r', 0)
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y})
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', RADIUS);
        return _nGon;
    };

    _nGon.drawRightAngle = function(x, y) {
        group.select('.ngon-right-angles')
        .append('rect')
        .attr('class', 'right-angle')
        .attr('x', x)
        .attr('y', y)
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', ANG_STROKE)
        .attr('fill', ANG_FILL)
        .attr('opacity', ANG_OPACITY)
        .attr('width', RADIUS * 3)
        .attr('height', RADIUS * 3);
        return _nGon;
    };

    _nGon.drawAngle = function(deg, x, y) {
        var _arc = d3.svg.arc()
        .innerRadius(ARC_I_RADIUS)
        .outerRadius(ARC_O_RADIUS)
        .startAngle(0)
        .endAngle(d3_geometer.utils.toRadian(deg));

        group.select('.ngon-angles')
        .append('g')
        .attr('transform', 'translate(' + x + ',' + y +')')
        .append('path')
        .attr('class', 'ngon-angle')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', ANG_STROKE)
        .attr('fill', ANG_FILL)
        .attr('opacity', ANG_OPACITY)
        .attr('d', _arc);

        // add label
        group.select('.ngon-angles')
        .append('text')
        .attr('class', 'ngon-angle-text')
        .attr('x', x + 5)
        .attr('y', y + 20)
        .attr('fill', 'black')
        .attr('font-size', 10)
        .text(Math.abs(deg) + '°');
        return _nGon;
    };

    _nGon.calculateEdgeOffsets = function(modulo) {
        // Calculates all positions for each
        // vertex to connect to - offset by one,
        // since adjacent vertices are already connected
        // @param {number} modulo - A modulo to allow custom numerical offsets.
        var datum = element.datum();
        var len   = datum.length;
        if(len < 3) return;

        function push(inner, sub_index, index) {
            inner.push({'x': datum[index].x, 'y': datum[index].y, 'label': 'C' + index});
            inner.push({'x': datum[len - sub_index].x, 'y': datum[len - sub_index].y, 'label': 'C' + (len - sub_index)});
        }

        // store connections state
        _connections = d3.range(len).map(function(d, i){
            var inner = [];
            for(var j = 1; j < len - 1; j++) {
                if(modulo) {
                    if(j % modulo === 0) {
                        push(inner, j, i);
                    }
                } else {
                    push(inner, j, i);
                }
            }
            return inner;
        });
        return _nGon;
    };

    _nGon.drawCenterPoint = function(height, width, use_labels) {
        // Simply draws the center vertex
        // @param {number} height - required height of container
        // @param {number} width - required width of container
        // @param {boolean} use_labels - Add a label to center point
        group.select('.ngon-vertices')
        .append('circle')
        .attr('class', 'center-vertex')
        .attr('r', 0)
        .attr('cx', 0)
        .attr('cy', 0)
        .transition()
        .delay(function(d, i){return i * 100;})
        .attr('r', RADIUS);

        if(use_labels) {
            // Draw some labels on the vertices.
            group.select('.ngon-labels')
            .append('text')
            .attr('class', 'center-vertex-label')
            .text(function(d){return 'O1';})
            .attr('x', RADIUS + RADIUS / 2)
            .attr('y', RADIUS);
        }
        return _nGon;
    };

    _nGon.drawNearAdjacentEdges = function(connections, modulo) {
        // Draws edges directly adjacent + 1 to each vertex.
        // see calculateEdgeOffsets for details.
        // @param {array} connections - A list of custom connections
        //  -must be an array of objects with x and y accessors
        if(!connections) {
            _nGon.calculateEdgeOffsets(modulo);
            connections = _connections;
        }
        group.select('.ngon-dash-edges')
        .selectAll('.dashed')
        .data(connections)
        .enter()
        .append('path')
        .attr('stroke-width', STROKE_WIDTH / 2)
        .attr('stroke', STROKE)
        .attr('fill', 'none')
        .attr('d', line);
        return _nGon;
    };

    return _nGon;
};
