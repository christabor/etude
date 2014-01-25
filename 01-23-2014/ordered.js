var dims        = getViewportDimensions();
var height      = dims.height;
var width       = dims.width;
var container   = $('#container');


function sequenceSet(base, count) {
    var block = $('<div class="block"></div>');
    var start = 0;
    while(start < count) {
        block.append('<span>' + (base * start) + '</span>');
        start += 1;
    }
    container.append(block);
}

function init() {
    var start = 1;
    var count = 15;
    var max = 100;
    doSomethingABunch(function(){
        var current;
        sequenceSet(start, count);
        current = container.find('.block').last();
        current.prepend('<p>' + start + ' * N...15</p>');
        start += 1;
    }, max);
}

$(document).ready(init);
