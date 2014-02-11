window.onload = function() {
    var dims        = getDocumentDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var total       = 100;
    var current     = 0;


    function addGroup(radius, x, y, opacity) {
        // add center circle
        for(var i = 0; i <= 8; i++) {
            canvas.add(new fabric.Triangle({
                width: radius,
                height: radius,
                angle: 360 / i,
                fill: randomColor(255),
                selectable: false,
                opacity: opacity,
                left: x,
                top: y
            }));
            canvas.add(new fabric.Triangle({
                width: radius,
                height: radius,
                angle: 360 / i,
                fill: randomColor(255),
                selectable: false,
                opacity: opacity,
                left: x * 2,
                top: y
            }));
            canvas.add(new fabric.Triangle({
                width: radius,
                height: radius,
                angle: 360 / i,
                fill: randomColor(255),
                selectable: false,
                opacity: opacity,
                left: x / 2,
                top: y
            }));
        }
    }

    function addGroups(radius, x, y, times, opacity) {
        if(times <= 0) {
            return;
        }
        addGroup(radius, x, y, opacity);
        opacity += 0.1;
        return addGroups(radius / 2, x, y, times - 1, opacity);
    }

    function init() {
        canvas_elem.width      = width;
        canvas_elem.height     = height;
        canvas                 = new fabric.Canvas('canvas');
        canvas.selection       = false;
        canvas.backgroundColor = 'black';
        addGroups(width / 2, width / 2, height / 2, 2, 0.1);
        canvas.on('mouse:move', function(e){
            for(var obj in canvas._objects) {
                var h = canvas._objects[obj].height;
                var w = canvas._objects[obj].width;
                canvas._objects[obj].height = (e.e.clientY) + h / 4;
                canvas._objects[obj].width = (e.e.clientX) + w / 4;
            }
            canvas.renderAll();
        });
    }
    init();
};
