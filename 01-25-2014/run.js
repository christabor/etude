window.onload = function() {
    var dims                = getDocumentDimensions();
    var height              = dims.height;
    var width               = dims.width;
    var canvas_elem         = document.querySelector('canvas');
    var objs                = [];
    var REPOSITION_INTERVAL = 2000;
    var DURATION            = REPOSITION_INTERVAL / 2;
    var item_size           = 20;


    function addItem(x, y) {
        var item;
        if(rando(10) > 5) {
            item = new fabric.Rect({
                top: y || rando(height),
                left: x || rando(width),
                selectable: false,
                fill: randomColor(200),
                width: item_size,
                height: item_size
            });
        } else {
            item = new fabric.Circle({
                top: y || rando(height),
                left: x || rando(width),
                selectable: false,
                fill: randomColor(200),
                radius: item_size / 2
            });
        }
        objs.push(item);
        canvas.add(item);
    }

    function removeTrail(k, item) {
        setTimeout(function(){
            item.remove();
        }, k + 100);
    }

    function reposition() {
        $.each(objs, function(k, item){
            var trail_items = [];
            var size = 1;
            var opts = {};
            var opacity = 0.3;
            var interval = setInterval(function(){
                var top = item.top;
                var left = item.left;
                var fill = item.get('fill');
                var trail_item;
                if(item.radius) {
                    trail_item = new fabric.Circle({
                        radius: size,
                        top: top,
                        left: left,
                        stroke: fill,
                        fill: 'none',
                        strokeWidth: 2,
                        selectable: false,
                        opacity: opacity
                    });
                }  else {
                    trail_item = new fabric.Rect({
                        width: size,
                        height: size,
                        top: top,
                        left: left,
                        stroke: fill,
                        fill: 'none',
                        strokeWidth: 2,
                        selectable: false,
                        opacity: opacity
                    });
                }
                size += 1;
                trail_items.push(trail_item);
                canvas.add(trail_item);
            }, 20);
            opts = {
                left: rando(width),
                top: rando(height)
            };
            item.animate(opts, {
                duration: DURATION,
                onChange: canvas.renderAll.bind(canvas)
            });
            setTimeout(function(){
                $.each(trail_items, removeTrail);
                clearInterval(interval);
            }, DURATION);
        });
        canvas.backgroundColor = randomColor(100);
        canvas.renderAll();
    }

    function seedCanvas() {
        doSomethingABunch(addItem, 6);
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;
        seedCanvas();
        canvas.renderAll();
        setInterval(reposition, 2000);
        canvas.on('mouse:move', function(e){
            $.each(objs, function(k, item){
                item.set('left', e.e.clientX + rando(100));
                item.set('top', e.e.clientY + rando(100));
            });
            canvas.renderAll();
        });
    }
    init();
};
