$(document).ready(function(){
    // colors from Chrome chroma plugin: https://chrome.google.com/webstore/detail/chroma
    var colors = ['#fdbe90', '#fc9549', '#fc903f', '#fc7817', '#dd5f02', '#b54e02'];

    $(window).on('mousemove', function(){
        var pumpkin = $('<div class="pumpkin"><span class="eye"></span><span class="eye"></span><span class="nose"></span><span class="mouth"></span></div>')
        .css('background-color', colors[getKey(colors)]);
        $('body').append(pumpkin);
    });

    $('body').on('click', '.pumpkin', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).fadeOut(100, function(){
            $(this).remove();
        });
    });

});
