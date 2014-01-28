var dims                = getDocumentDimensions();
var height              = dims.height;
var width               = dims.width;
var canvas_elem         = document.querySelector('canvas');
var speed_indicator     = $('#speed');
var speed_adjustor      = $('#speed-checker');
var objs                = [];
var REPOSITION_INTERVAL = 500;
var DURATION            = REPOSITION_INTERVAL / 2;
var item_size           = 20;
var interval_speed      = 1000;
var main_interval;
var template;

function removeTrail(k, item) {
    setTimeout(function(){
        opts = {
            opacity: 0
        };
        item.animate(opts, {
            duration: k + 100,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function() {
                item.remove();
            }
        });
    }, k + 100);
}

function addItems(size, item, trail_items) {
    var top = item.top;
    var left = item.left;
    var fill = item.get('fill');
    var trail_item = fabric.util.object.clone(template);
    trail_item.opacity = 0.2;
    size += 1;
    trail_items.push(trail_item);
    canvas.add(trail_item).renderAll();
}

function reposition() {
    canvas.clear();
    $.each(objs, function(k, item){
        var trail_items = [];
        var size = 1;
        var opts = {};
        var interval = setInterval(function(){
            addItems(size, item, trail_items);
        }, 10);
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
    canvas.renderAll();
}

function updateInterval() {
    clearInterval(main_interval);
    main_interval = setInterval(reposition, interval_speed);
}

function seedCanvas() {
    fabric.loadSVGFromURL('heart.svg', function(objects, options){
        template = fabric.util.groupSVGElements(objects, options);
        template.selectable = false;
        template.top = height / 2;
        template.left = width / 2;
        template.centeredScaling = true;
        template.scale(0.1);
        objs.push(template);
        canvas.add(template).renderAll();
        updateInterval();
        speed_adjustor.slider({
            min: 10,
            max: 100,
            slide: function(e, ui) {
                // reverse for visual effect
                interval_speed = Math.abs(ui.value - 100) * 10;
                speed_indicator.text(ui.value);
                updateInterval();
            }
        });
    });
}

function init() {
    canvas_elem.width  = width;
    canvas_elem.height = height;
    canvas             = new fabric.Canvas('canvas');
    canvas.selection   = false;
    canvas.backgroundColor = '#64000b';
    seedCanvas();
    canvas.renderAll();
}

$(document).ready(init);

