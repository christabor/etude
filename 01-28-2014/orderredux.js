var dims        = getViewportDimensions();
var height      = dims.height;
var width       = dims.width;
var container   = $('#container');


function sequenceSet(base, count) {
    var block = $('<div class="block"></div>');
    var start = 0;
    while(start < count) {
        var amt = (base * start) * 0.5 + 1;
        block.append('<span style="width:' + amt + 'px;"></span>');
        start += 1;
    }
    container.append(block);
}

function toggleInline(event) {
    event.preventDefault();
    $('.block').removeClass('display-block');
}

function toggleAligned(event) {
    event.preventDefault();
    $('.block').addClass('display-block');
}

function init() {
    var start = 1;
    var count = 15;
    var max   = 100;
    doSomethingABunch(function(){
        var current;
        sequenceSet(start, count);
        current = container.find('.block').last();
        current.prepend('<p>' + start + ' * N...15</p>');
        start += 1;
    }, max);
    $('body').on('click', '#align', toggleAligned);
    $('body').on('click', '#inline', toggleInline);
}

$(document).ready(init);
