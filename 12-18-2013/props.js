$(document).ready(function(){

    function recurseObj(obj) {
        var target;
        var p;
        for (var item in obj) {
            if (typeof item !== 'object' || typeof item !== 'function') {
                target = $('<a href="#"></a>').text(item);
                target.attr({
                    'href': 'https://www.google.com/#q=' + item,
                    'target': '_blank'
                });
                $('body').append(target).find('a:last').hide().fadeIn(100);
            } else {
                recurseObj(item);
            }
        }
        return;
    }

    recurseObj(window);
});
