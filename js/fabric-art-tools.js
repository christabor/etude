/*

Art based tools for use in Fabric.js
Dependencies: utils.js

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
