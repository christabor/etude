/*

Art based tools for use in Fabric.js
Dependencies: utils.js, fabric.js

*/

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
