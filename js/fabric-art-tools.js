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
            width: opts.size,
            height: opts.size / (opts.stretch || 1),
            opacity : 0.8,
            stroke: opts.stroke || 'rgba(0,0,0,1)',
            selectable: false,
            strokeWidth: opts.thickness || 1,
            angle: angle,
            fill: randomColor(255),
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
            opacity: opts.opacity,
            shadow: opts.shadow || 'none',
            fill: randomColor(255),
            top: opts.top,
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

/* Typographic oriented */

function addShiftedText(opts) {
    var text = (opts.vertical ? opts.text.split('').join('\n') : opts.text);
    opts.selectable = false;
    opts.fontFamily = opts.fontFamily || 'Arial';
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
