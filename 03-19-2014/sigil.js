var dims           = getViewportDimensions();
var canvas_elem    = document.querySelector('canvas');
var $clear         = $('#clear');
var $export_button = $('#export');
var $textarea      = $('textarea');
var $steps         = $('#steps');
var $controls      = $('#controls');
var offset         = $controls.width();
var color          = 'black';

function exportCanvas(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    canvas
    .deactivateAll()
    .renderAll();
    window.open(canvas.toDataURL('png'));
}

function addText(el, text, fade, callback) {
    el.show().empty();
    simpleLetterSequence({
        container: el,
        word: text,
        fade: fade,
        css_before: {
            'color': '#a2164f',
            'text-shadow': '0 0 10px #d21c67'
        },
        css_after: {
            'color': 'black',
            'text-shadow': '0 0 10px white'
        },
        callback: callback,
        timing: fade / 2
    });
}

function fadeControls() {
    $steps.fadeIn(500);
    $textarea.on('keypress keyup keydown', makeSigil);
    makeSigil();
}

function addAllText() {
    addText($('h1'), $('h1').text(), 100, function(){
        addText($('p'), $('p').text(), 50, fadeControls);
    });
}

function filterDuplicates(letters) {
    var filtered = {};
    $.each(letters, function(k, letter){
        // bastardize the usage of a map
        // and discard the 'value', using the key
        // as the value for a hack: { 'f': 1, 'z': 2 }
        if(!filtered[letter]) {
            filtered[letter] = k;
        }
    });
    return filtered;
}

function removeVowels(letters) {
    return letters
    .replace(/[a|e|i|o|u|]/g, '')
    .replace(/\s|[^A-Za-z]/g, '')
    .split('');
}

function addRing(radius, stroke) {
    var circle = new fabric.Circle({
        radius: radius,
        selectable: false,
        fill: 'none',
        strokeWidth: stroke,
        stroke: color
    });
    canvas.add(circle);
    circle.center();
}

function makeSigil() {
    canvas.clear();
    var rect;
    var val         = $.trim($textarea.val().toLowerCase());
    var letters     = filterDuplicates(removeVowels(val));
    var offset      = 20;
    var w           = width - offset;
    var h           = height - offset;
    var left        = offset / 2;
    var text_offset = 100;
    var ring_outer  = w / 2.2 - 80;

    // add some rings for effect
    addRing(ring_outer - 10, 5);
    addRing(ring_outer - 20, 1);
    addRing(ring_outer - 30, 1);
    addRing(ring_outer - 40, 1);
    addRing(ring_outer - 200, 1);

    // add outer boundary
    rect = new fabric.Rect({
        width: w,
        height: h,
        fill: '',
        stroke: color,
        strokeWidth: 4,
        selectable: false
    });
    canvas.add(rect);
    rect.center();

    $.each(letters, function(letter, k){
        var character;
        var fontSize = clamp(rando(500), 100, width);
        var opts = {
            fontSize: fontSize,
            fill: color,
            angle: rando(10) > 5 ? 90 : 0,
            fontFamily: 'Dorsa',
            selectable: false
        };
        if(k === 0) {
            opts.fontSize = width;
        }
        character = new fabric.Text(letter, opts);
        canvas.add(character);
        if(k === 0) {
            character.center();
        } else {
            character.centerH();
        }
        character.set({ 'top': clamp(rando(height / 4), 100, height / 4) });
    });
    canvas.renderAll();
}

function init() {
    bootstrapCanvas(null, true);
    canvas.backgroundColor = $('body').css('backgroundColor');
    setTimeout(addAllText, 500);
    $clear.on('click', function(){
        canvas.clear().renderAll();
    });
    $export_button.on('click', exportCanvas);
}

$(document).ready(init);
