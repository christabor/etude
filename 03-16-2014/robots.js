var dims           = getViewportDimensions();
var canvas_elem    = document.querySelector('canvas');
var $btns          = $('#svg a');
var $clear         = $('#clear');
var $export_button = $('#export');
var $sliders       = $('.control-group').find('input');
var $bg_picker     = $('#color');

function exportCanvas(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    canvas
    .deactivateAll()
    .renderAll();
    window.open(canvas.toDataURL('png'));
}

function loadSVG(url) {
    fabric.loadSVGFromURL(url, function(objects, options) {
        var obj;
        $.each(objects, function(k, path){
            path.set({
                fill: randomColor(255),
                stroke: randomColor(255)
            });
        });
        obj = fabric.util.groupSVGElements(objects, options);
        obj.set({
            left: clamp(rando(width), 200, width - 200),
            top: clamp(rando(height), 200, height - 200)
        });
        canvas.add(obj);
    });
}

function addSVG(event) {
    event.preventDefault();
    var url = $(this).attr('href');
    loadSVG(url);
}

function changeBG(event) {
    event.preventDefault();
    canvas.backgroundColor = $(this).val();
    canvas.renderAll();
}

function setVal(event) {
    var active = canvas.getActiveObject() || canvas.getActiveGroup();
    var type = $(this).attr('id');
    var updated = {};
    if(type === 'opacity') {
        updated[type] = $(this).val() * 0.01;
    } else {
        updated[type] = $(this).val();
    }
    if(active) {
        active.set(updated);
        canvas.renderAll();
    }
}

function init() {
    bootstrapCanvas(null, true);
    canvas.backgroundColor = '#f1f1f1';
    canvas.selection = true;
    $bg_picker.on('change', changeBG);
    $btns.on('click', addSVG);
    $clear.on('click', function(){
        canvas.clear().renderAll();
    });
    $export_button.on('click', exportCanvas);
    $sliders.on('change', setVal);
}

$(document).ready(init);
