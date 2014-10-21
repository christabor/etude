var font_metrics = (function() {
    var loader     = $('#loader');
    var viewer     = $('#viewer');
    var load_more  = $('#load-more');
    var font_list  = {};
    var phi        = 1.6180339887498948482;
    var font_count = 0;
    var MAX_SIZE   = 100;
    var els        = {
        h1: {
            size: 8,
            dom: viewer.find('h1'),
            list: null
        },
        h2: {
            size: 6,
            dom: viewer.find('h2'),
            list: null
        },
        h3: {
            size: 3,
            dom: viewer.find('h3'),
            list: null
        },
        h4: {
            size: 2,
            dom: viewer.find('h4'),
            list: null
        }
    };

    function init() {
        loader.fadeIn(10);
        var myTypeLibrary = fonTypey({
            // public, limited access only for github.com/christabor
            api_key: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w'
        });
        myTypeLibrary.initAllFeatures('body');
        viewer.hide();

        // Delay for font-loading
        setTimeout(function(){
            // Cache selectors
            $.each(els, function(k, el){
                el.list = el.dom.find('.font-list').find('li');
                log(el);
            });
            viewer.show();
            viewer.on('click', redraw);
            $.each(myTypeLibrary.getFontData(), function(k, d){
                // convert to hash for easier reference.
                font_list[d.family] = d;
                // count here instead of length, since we're already
                // doing it anyway.
                font_count += 1;
            });
            loader.hide();
            redraw();
        }, 1000);
    }

    function updateLetter(k, el) {
        loader.fadeIn(100);
        var font      = new Font();
        var font_name = el.list.eq(rando(font_count)).find('a').first();
        font_name.click();
        // set up the onload handler
        font.onload = function() {
            log(font);
        };
        font.onerror = function(err) { alert(err); };
        // then kick off font loading by assigning the "src" property
        font.fontFamily = font_name.text();
        try {
            // Try and grab the google font source -- only uses
            // regular for simplicity.
            font.src = font_list[font.fontFamily].files.regular;
        } catch(e) {return;}
        setTimeout(function(){
            // Wrap in timeout for loading purposes.
            var html = [
                'Ascent: ' + font.metrics.ascent,
                'Descent: ' + font.metrics.descent,
                'Leading: ' + font.metrics.leading,
                'Quadsize: ' + font.metrics.quadsize
            ].join(', ');
            el.dom.find('.info').text(html);
            el.dom.css({
                'margin-bottom': (font.metrics.descent * el.size * 10) / 4,
                'font-size': font.metrics.ascent * el.size * 10 + 'px',
                'line-height': font.metrics.descent * el.size * 10 + 'px',
            });
            loader.hide();
        }, 1000);
    }

    function redraw(e) {
        $.each(els, updateLetter);
    }

    return {
        'init': init
    };
})();

$(document).ready(font_metrics.init);
