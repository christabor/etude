var container;

function addColors(colors) {
    $.each(colors, function(k, color){
        var color_box = $('<div class="color"></div>');
        color_box.css('background-color', color);
        $('#colors-holder').append(color_box);
    });
}

$.fn.bgColor = function(color) {
    $(this).css('background-color', color);
}

$.fn.fgColor = function(color) {
    $(this).css('color', color);
}

function init() {
    container = $('#viewer');
    $('body').on('keyup keydown', function(e){
        e.stopImmediatePropagation();
        log(e.which);
    });
    container.find('[data-typey-editable]')
    .on('click', function(e){
        $(this).fgColor(randomColor(255));
    });
    $('body')
    .on('dblclick', function(e){
        $(this).bgColor(randomColor(255));
    });
    $('#color-scheme')
    .on('click', function(e){
        var colors = randomColorScheme(2);
        var compl  = tinycolor.triad(colors[0])[0].toHex();

        container.find('h1').fgColor(colors[1]);
        container.find('p').fgColor(colors[2]);

        $('body').bgColor('#' + compl);
        $('#colors-holder').empty();

        addColors(colors);
    });

    var myTypeLibrary = fonTypey({
        // public, limited access only for github.com/christabor
        api_key: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w'
    });
    myTypeLibrary.initAllFeatures('body');
}

$(document).ready(init);
