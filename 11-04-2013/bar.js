$(document).ready(function(){
    var barcode = $('.barcode'),
    bars = barcode.find('.bar'),
    width = $(window).width(),
    bar_count = bars.length,
    max_width = Math.ceil(width / bar_count);

    barcode.css('height', $(window).height() - 100);
    bars.each(function(k, bar){
        $(bar).css('width',  Math.random() * max_width + 'px');
    });
});
