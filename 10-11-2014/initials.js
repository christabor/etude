var initials = (function() {
    var e          = $('#letter-e');
    var r          = $('#letter-r');
    var t          = $('#letter-t');
    var loader     = $('#loader');
    var viewer     = $('viewer');
    var body       = $('html, body');
    var font_count = 0;
    var e_list;
    var r_list;
    var t_list;

    function init() {
        var myTypeLibrary = fonTypey({
            // public, limited access only for github.com/christabor
            api_key: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w'
        });
        myTypeLibrary.initAllFeatures('body');
        viewer.hide();

        // Delay for font-loadin
        setTimeout(function(){
            font_count = $('[data-typey-font-list]').first()
            .find('.font-list').find('li').length;

            // Cache selectors
            e_list = e.find('.font-list').find('li');
            r_list = e.find('.font-list').find('li');
            t_list = e.find('.font-list').find('li');

            viewer.show();
            loader.hide();
            body.on('click', redraw);
            redraw();
            loader.addClass('shrunken');
        }, 1000);
    }

    function updateLetter(letter, letter_list) {
        var rot = 'rotate(' + randomArrayValue([0, 90, 180, -90, -180]) + 'deg)';
        letter.css({
            'transform': rot,
            '-webkit-transform': rot,
            'opacity': clamp(0.2, rando(10) * 0.1, 1),
            'font-size': clamp(200, rando(900), 900)
        });
        // Click a random font, change footer as well
        letter_list.eq(rando(font_count)).find('a').first().click();
    }

    function redraw() {
        loader.fadeIn(100);
        $('body').css({
            'color': randomColor(100),
            'background-color': randomColor(255)
        });
        updateLetter(e, e_list);
        updateLetter(r, r_list);
        updateLetter(t, t_list);
        setTimeout(function(){
            loader.fadeOut(100);
        }, 0);
    }

    return {
        'init': init
    };
})();

$(document).ready(initials.init);
