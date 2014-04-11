/*

Art based tools for use in Fabric.js
Dependencies: utils.js, fabric.js

*/

function randomFabricGradient(opts, max_stops) {
    var stops        = {};
    var stop_counter = 0;
    doSomethingABunch(function(){
        stops[stop_counter] = randomColor(255);
        stop_counter += 1 * 0.1;
    }, max_stops);
    return {
        x1: opts.x1 || 0,
        y1: opts.y1 || 100,
        x2: opts.x2 || 50,
        y2: opts.y2 || 100,
        colorStops: stops
    };
}

function randomPolygonCoords(max_x, max_y) {
    // returns a single object containing
    // x and y coords
    return {
        x: rando(max_x),
        y: rando(max_y)
    };
}

function randomPolygon(max_iterations, x_distance, y_distance) {
    // returns an array of objects containing
    // points for a polygon
    var points = [];
    max_iterations = clamp(max_iterations, 3, 100);
    doSomethingABunch(function(){
        points.push(randomPolygonCoords(x_distance, y_distance));
    }, max_iterations);
    return points;
}

function addCross(opts) {
    var b1, b2;
    var setup = {
        selectable: false,
        width: opts.size || 10,
        height: opts.size * opts.thickness || 4,
        left: opts.left || rando(width),
        top: opts.top || rando(height),
        fill: opts.color || randomColor(255)
    };
    b1 = new fabric.Rect(setup);
    setup.angle = 90;
    b2 = new fabric.Rect(setup);
    canvas.add(new fabric.Group([b1, b2],{
        angle: opts.angle || 0,
        selectable: false,
        left: opts.left || rando(width),
        top: opts.top || rando(height),
    }));
}

function addCircleGroup(x, y, fill, size, direction, times) {
    if(!x && !y) {
        var dims = getViewportDimensions();
        x = rando(dims.width);
        y = rando(dims.height);
    }
    doSomethingABunch(function(){
        var shape = new fabric.Circle({
            radius: size,
            fill: fill || randomColor(255),
            opacity: 0.8,
            selectable: false,
            left: x,
            top: y
        });
        if(direction === 'vertical') {
            y += size * 2 + size;
        } else {
            x += size * 2 + size;
        }
        canvas.add(shape);
    }, times);
}

function drawTriangleWave(x, y, stroke, fill, maxsize, times, distored, shadow) {
    var offset = rando(maxsize);
    doSomethingABunch(function(){
        canvas.add(new fabric.Triangle({
            height: maxsize,
            width: distored ? maxsize / 2 : maxsize,
            fill: stroke ? 'none' : fill,
            strokeWidth: stroke ? 0 : 2,
            selectable: false,
            shadow: shadow || 'rgba(0,0,0,0)',
            stroke: stroke ? fill : 'none',
            opacity: 0.8,
            left: x,
            top: y
        }));

        // increment positions
        x += offset;
        y += distored ? offset / 2 : 0;
        maxsize += offset;
    }, times);
}

function addCircleGrid(x, y, fill, size, direction, times) {
    doSomethingABunch(function(){
        addCircleGroup(x, y, fill, size, direction, times);
        // inverted since it needs to
        // move in the opposite direction
        // of the composed sub-function
        if(direction === 'vertical') {
            x += (size + times + (size * 2));
        } else {
            y += (size + times + (size * 2));
        }
    }, times);
}

function addPath(pathdata) {
    path = new fabric.Path(pathdata);
    path.set({
        opacity: 0.5,
        fill: randomColor(255),
        left: rando(width),
        top: rando(height),
        selectable: false
    });
    canvas.add(path);
}

function smartPath(seed, maxsize) {
    var data = [];
    data.push(randomSVGMoveTo(seed));
    for (var i = 1; i < seed; i++) {
        data.push(randomSVGCurveTo(i + maxsize));
        data.push(randomSVGLineTo(i + maxsize));
        data.push(randomSVGArcTo(i + maxsize));
    }
    data.push(',z');
    return data.join(',');
}

function addChaoticPath(seed, width, height, maxsize) {
    var pathdata = smartPath(rando(100), maxsize);
    path = new fabric.Path(pathdata);
    path.set({
        opacity: 0.3,
        fill: randomColor(100),
        left: rando(width) / 2,
        top: rando(height / 2),
        selectable: false
    });
    canvas.add(path);
}

function addSpirograph(width, height, times, fill, reverse) {
    var top       = rando(height);
    var left      = rando(width);
    var angle     = 1;
    var increment = 10;
    doSomethingABunch(function(){
        canvas.add(new fabric.Line(
            [0, 0, width, height], {
                stroke: fill || randomColor(100),
                selectable: false,
                strokeWidth: rando(10),
                angle: angle,
                opacity: 0.5,
                top: top,
                left: left
            }));
        if(reverse) {
            left -= increment;
            top -= increment;
            angle -= increment;
        } else {
            left += increment;
            top += increment;
            angle += increment;
        }
    }, times);
}

function alternateRingsY(x, y) {
    // use a sub processes to calculate
    // new x, y values
    // - used with -> addRings etc..
    y += 100;
    if(rando(10) > 4) {
        x += 100;
    } else {
        x -= 100;
    }
    return [x, y];
}

function alternateRingsX(x, y) {
    // use a sub processes to calculate
    // new x, y values
    // - used with -> addRings etc..
    x += 100;
    if(rando(10) > 4) {
        y += 100;
    } else {
        y -= 100;
    }
    return [x, y];
}

function addSporadicUniformRings(opts) {
    doSomethingABunch(function(){
        var coords;
        canvas.add(new fabric.Circle({
            top: opts.y,
            left: opts.x,
            radius: opts.radius,
            selectable: false,
            opacity: 1,
            fill: 'none',
            strokeWidth: opts.thickness,
            stroke: opts.color || randomColor(255)
        }));
        if(opts.direction === 'vertical') {
            coords = alternateRingsY(opts.x, opts.y);
        } else {
            coords = alternateRingsX(opts.x, opts.y);
        }
        opts.x = coords[0];
        opts.y = coords[1];
    }, opts.max);
}

function addWideGrowingRings(opts) {
    doSomethingABunch(function(){
        var coords;
        canvas.add(new fabric.Circle({
            top: opts.y,
            left: opts.x,
            radius: opts.radius,
            selectable: false,
            opacity: 1,
            fill: 'none',
            strokeWidth: opts.thickness,
            stroke: opts.color || randomColor(255)
        }));
        opts.radius += opts.radius * opts.magnitude;
        if(opts.direction === 'vertical') {
            coords = alternateRingsY(opts.x, opts.y);
        } else {
            coords = alternateRingsX(opts.x, opts.y);
        }
        x = coords[0];
        y = coords[1];
    }, opts.max);
}

function spiralRepeater(opts) {
    // @opts.magnitude: controls the intensity
    // of each angle rotation, from 0 - 1
    // @opts.shape: Flexible enough to let you
    // determine what kind of shape to use
    // -- options: triangle, rect, path
    // @opts.stretch: optional stretch to distort h/w
    var angle = 0;
    var amt   = Math.floor(360 / opts.max);
    doSomethingABunch(function(){
        var pathdata;
        var path;
        var args  = {
            width: opts.size || rando(width),
            height: (opts.size || rando(width)) / (opts.stretch || 1),
            opacity: opts.opacity || 0.8,
            stroke: opts.stroke || 'rgba(0,0,0,1)',
            selectable: false,
            strokeWidth: opts.thickness || 0,
            angle: opts.angle || angle,
            fill: opts.fill || randomColor(255),
            top: opts.y,
            left: opts.x
        };
        if(opts.shape === 'rect') {
            canvas.add(new fabric.Rect(args));
        } else if(opts.shape === 'triangle') {
            canvas.add(new fabric.Triangle(args));
        } else if(opts.shape === 'path') {
            if(!opts.pathdata) {
                pathdata = smartPath(opts.size / 12, opts.size / 12);
            }
            path = new fabric.Path(pathdata);
            path.set(args);
            canvas.add(path);
        } else {
            return;
        }
        angle += amt * opts.angle_magnitude;
        opts.x += opts.size / 8;
        opts.y += opts.size / 4;
    }, opts.max);
}

function addRandomColorBricks(opts) {
    // adds an initial full-width strip,
    // then adds smaller width strips within
    doSomethingABunch(function(){
        canvas.add(new fabric.Rect({
            width: opts.width,
            height: opts.height,
            selectable: false,
            opacity: opts.opacity || 1,
            shadow: opts.shadow || 'none',
            fill: randomColor(255),
            top: opts.top || 0,
            left: rando(width)
        }));
        opts.width = rando(opts.width - opts.decrease_increment);
    }, opts.max);
}

function addFullSizeColorBricks(opts) {
    // adds a bunch of bands uniformly,
    // adding up to the screen height
    doSomethingABunch(function(){
        addRandomColorBricks(opts);
        opts.top += opts.height;
        opts.width = width;
    }, opts.max_lines);
}

function addRandomPolygons(opts) {
    doSomethingABunch(function(){
        var points = randomPolygon(opts.poly_points, width, height);
        var poly = new fabric.Polygon(points, {
            selectable: false,
            left: opts.left || rando(width),
            top: opts.top || rando(height),
            shadow: opts.shadow || 'none',
            stroke: opts.outline,
            strokeWidth: opts.thickness || 0,
            fill: opts.no_fill ? 'none' : (opts.fill || randomColor(255))
        });
        if(opts.use_gradients) {
            poly.setGradient('fill', randomFabricGradient({
                x1: 0,
                y1: rando(height),
                x2: rando(width),
                y2: rando(height)
            }, opts.gradient_steps || 4));
        }
        canvas.add(poly);
    }, opts.max);
}

function addRandomLinesBG(opts) {
    doSomethingABunch(function(){
        canvas.add(new fabric.Line([rando(90), 0, 0, height * 2], {
            top: 0,
            strokeWidth: opts.thickness,
            selectable: false,
            opacity: opts.opacity,
            left: rando(width),
            stroke: randomColor(255)
        }));
    }, opts.max_lines);
}

function zigZag(opts) {
    var poly;
    var points       = [];
    var increment    = opts.increment || 4;
    var x            = 0;
    var y            = increment;
    var first_state  = true;
    var prev_largest = 0
    var counter      = 0;
    var max          = opts.max || 100;
    var xfunc        = opts.xfunc || null;
    var yfunc        = opts.yfunc || null;
    doSomethingABunch(function(){
        var update = increment * counter;
        // push points into array
        // but alternate the sizes
        // between x and y so it will zigzag
        // also allow any arbitrary x/y
        // transformation function to be passed in
        points.push({
            x: x,
            y: y
        });
        if(first_state) {
            if(opts.xfunc) {
                x += opts.xfunc(x);
            } else {
                x += update;
            }
        } else {
            if(opts.yfunc) {
                x += opts.yfunc(y);
            } else {
                y += update;
            }
        }
        first_state = !first_state;
        counter += 1;
    }, max);
    poly = new fabric.Polyline(points, {
        left: opts.left || rando(width),
        top: opts.top || rando(height),
        selectable: false,
        opacity: opts.opacity || 0,
        fill: opts.fill || randomColor(255)
    });
    return poly;
}

/* Typographic oriented */

function addShiftedText(opts) {
    var text = (opts.vertical ? opts.text.split('').join('\n') : opts.text);
    opts.selectable = false;
    opts.fontFamily = opts.fontFamily || randomArrayValue(global_config.basic_fonts);
    opts.fontSize   = opts.fontSize || 50;
    canvas.add(new fabric.Text(text, opts));
    opts.left = opts.left + 8;
    opts.top = opts.top + 4;
    opts.fill = randomColor(255, 0.7);
    canvas.add(new fabric.Text(text, opts));
}

function addRandomAngledCharacters(opts) {
    var increment = 100;
    var x = rando(width);
    var y = rando(height);
    doSomethingABunch(function(){
        canvas.add(new fabric.Text(randomStringLength(1), {
            top: y,
            left: x,
            angle: rando(90),
            selectable: false,
            fontSize: opts.fontSize || 50,
            fill: opts.color || randomColor(255),
            fontFamily: randomArrayValue(global_config.basic_fonts)
        }));
        if(opts.reverse) {
            if(opts.vertical) {
                x -= increment;
                y -= increment / 4;
            } else {
                x -= increment / 4;
                y -= increment;
            }
        } else {
            if(opts.vertical) {
                x += increment;
                y += increment / 4;
            } else {
                x += increment / 4;
                y += increment;
            }
        }
    }, opts.max)
}

/* Simple specific shapes/objects */

function basicFlower(opts) {
    var color = randomColor(255);
    var curr_angle = 0;
    var angle = 360 / opts.petals;
    var group = [];
    var items;
    doSomethingABunch(function(){
        group.push(new fabric.Ellipse({
            rx: opts.radius / opts.division || 4,
            ry: opts.radius,
            selectable: false,
            opacity: opts.opacity || 0.4,
            left: opts.x,
            top: opts.y,
            fill: opts.stroke ? 'none' : opts.color || color,
            strokeWidth: opts.stroke ? opts.thickness : 'none',
            stroke: opts.stroke ? opts.color || color : 'none',
            angle: curr_angle
        }));
        curr_angle += angle;
    }, opts.petals);

    // add an optional center piece
    // with inner outer circles
    if(opts.center) {
        var center_opts = {
            radius: opts.radius / 4,
            selectable: false,
            opacity: opts.opacity || 0.4,
            left: opts.x,
            top: opts.y,
            fill: randomColor(255),
        };
        group.push(new fabric.Circle(center_opts));
        center_opts.radius = opts.radius / 8;
        group.push(new fabric.Circle(center_opts));
    }
    canvas.add(new fabric.Group(group, {
        selectable: false,
        top: opts.y,
        left: opts.x,
        scale: opts.radius
    }));
}

function complexFlower(opts) {
    doSomethingABunch(function(){
        basicFlower(opts);
        opts.radius += opts.increment || 100;
    }, opts.total);
}

/*  More instructional */

function addCoords(options) {
    var line_width    = options.line_width || 1;
    var block_size    = options.block_size;
    var quadrants     = [];
    var quad_width    = width / 2;
    var quad_height   = height / 2;
    var bg_opacity    = 0.1;
    var current       = 0;
    var offset        = block_size - line_width;
    var grid_spaces_x = Math.floor(width / offset);
    var grid_spaces_y = Math.floor(height / offset);
    var midway_x      = Math.floor(grid_spaces_x / 2);
    var midway_y      = Math.floor(grid_spaces_y / 2);

    // split these in half to get
    // negative and positive values to loop over
    var pos_count_x   = -Math.floor(grid_spaces_x / 2);
    var pos_count_y   = Math.floor(grid_spaces_y / 2);
    var opts          = {
        fill: 'black',
        selectable: false,
        angle: 0,
        top: height / 2,
        left: (width / 2) + (line_width / 2),
        width: line_width,
        height: height
    };
    var quadrant_opts = {
        width: quad_width,
        height: quad_height,
        selectable: false
    };
    var text_opts     = {
        fontFamily: opts.font_family || 'Lato, sans-serif',
        selectable: false,
        fontSize: opts.font_size || 9,
        fill: opts.text_color || 'red'
    };
    opts.angle = 90;
    opts.height = width - (line_width / 2);

    // add subtle grid background
    // add y
    opts.top     = offset;
    opts.opacity = bg_opacity;
    doSomethingABunch(function(){
        text_opts.top = opts.top;
        text_opts.left = (width / 2) + (offset / 2);
        opts.opacity = current === midway_y ? 1 : bg_opacity;
        canvas.add(new fabric.Rect(opts));
        if(pos_count_y !== 0) {
            canvas.add(new fabric.Text(
                String(Math.floor(pos_count_y)), text_opts));
        }
        opts.top += offset;
        current += 1;
        pos_count_y -= 1;
    }, grid_spaces_y);

    // add x
    current = 0;
    opts.top   = height / 2;
    opts.left  = offset - line_width * 2;
    opts.angle = 0;
    opts.height = height;
    text_opts.left = 0;
    doSomethingABunch(function(){
        text_opts.top = (height / 2) + (offset / 2);
        text_opts.left += offset;
        // slight tweak to offset by 1
        // for the lack of a 0 on y-axis
        if(current !== 0) {
            canvas.add(new fabric.Text(
                String(Math.floor(pos_count_x)), text_opts));
        }
        opts.opacity = current === midway_x ? 1 : bg_opacity;
        canvas.add(new fabric.Rect(opts));
        opts.left += offset;
        current += 1;
        pos_count_x += 1;
    }, grid_spaces_x);

    // add quadrants
    if(options.use_quadrant) {
        quadrant_opts.opacity = 0.2;
        quadrant_opts.fill = opts.quadrant_color || randomColor(255);
        quadrant_opts.top = quad_height / 2;
        quadrant_opts.left = quad_width / 2;
        quadrants[0] = new fabric.Rect(quadrant_opts);

        quadrant_opts.top = quad_height / 2;
        quadrant_opts.left = quad_width + quad_width / 2;
        quadrant_opts.opacity = 0.4;
        quadrants[1] = new fabric.Rect(quadrant_opts);

        quadrant_opts.top = quad_height + quad_height / 2;
        quadrant_opts.left = quad_width / 2;
        quadrant_opts.opacity = 0.2;
        quadrants[2] = new fabric.Rect(quadrant_opts);

        quadrant_opts.top = quad_height + quad_height / 2;
        quadrant_opts.left = quad_width + quad_width / 2;
        quadrant_opts.opacity = 0.4;
        quadrants[3] = new fabric.Rect(quadrant_opts);

        for(var quadrant in quadrants) {
            canvas.add(quadrants[quadrant]);
        }
    }
}

/*  Image Filters */

var fabric_filters = (function(filters){
    // return all filters that have
    // been added to the filter object
    // for random use or sampling
    var all = [];
    $.each(filters, function(filter, fn){
        all.push(filter);
    });
    return all;
})(fabric.Image.filters);

function addImgFilter(filter_name, dims, pixel_func){
    // A faster way to add custom filters - WITH
    // settable dimensions - not just the entire canvas.
    var filters = fabric.Image.filters;
    filters[filter_name] = fabric.util.createClass({
        type: filter_name,
        applyTo: function(elem) {
            var ctx        = elem.getContext('2d');
            var image_data = ctx.getImageData(
                dims.top || 0,
                dims.left || 0,
                dims.width || width,
                dims.height || height);
            var data = image_data.data;
            data = pixel_func(data);
            // format for pixel_func:
            // standard image data loop, with keys for RGBA
            // must return pixel data
            // for (var i = 0, len = data.length; i < len; i += 4) {
            //     data[i + 0] = 0;
            //     data[i + 1] = 0;
            // }
            ctx.putImageData(image_data, 0, 0);
        }
    });

    // add to object for instantation
    filters[filter_name].fromObject = function(object) {
        return new filters[filter_name](object);
    };
}

function applyFilter(img, filter_name) {
    // push and apply to a given fabric.Image instance
    img.filters.push(new fabric.Image.filters[filter_name]());
    img.applyFilters(canvas.renderAll.bind(canvas));
}
