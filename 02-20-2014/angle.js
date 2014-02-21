var cool = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var canvas_elem = document.querySelector('canvas');
    var total       = 100;
    var current     = 0;
    var text        = $('#text');
    var generate    = $('#generate');
    var export_btn  = $('#export');
    var load_opts   = {
        msg: 'Generatificating',
        css: {
            'background': randomColor(200),
            'color': 'white',
            'text-align': 'left',
            'padding': '50px',
            'opacity': 0.8,
            'font-size': '40px'
        }
    };
    var subheadings = [
    'exciting',
    'expansion',
    'good vibes',
    'free spirit',
    'philosophy',
    'live life',
    'dead end',
    'we are one',
    'mother nature'
    ];
    var phrases = [
    'infinite love',
    'we are sacred geometry',
    'into the void',
    'the mind is a tool',
    'live to the fullest',
    'question authority',
    'are you feeling it?',
    'this is not over'
    ];

    function addGroup(x, y) {
        var base_num = rando(255);
        var base     = randomColor(base_num);
        var outlined = rando(10) > 6 ? true : false;
        var radius   = rando(width / 2) + 50;
        for(var i = 0; i <= rando(12); i++) {
            canvas.add(new fabric.Triangle({
                width: radius,
                height: radius,
                angle: rando(10) > 5 ? 360 / i : 90,
                selectable: false,
                fill: (outlined ? '' : randomColor(base_num)),
                stroke: (outlined ? 'none' : randomColor(base_num)),
                strokeWidth: (outlined ? rando(10) : 0),
                opacity: rando(10) * 0.1,
                left: rando(width),
                top: rando(height)
            }));
            canvas.add(new fabric.Circle({
                radius: radius,
                selectable: false,
                opacity: rando(10) * 0.1,
                fill: (outlined ? '' : randomColor(base_num)),
                stroke: (outlined ? 'none' : randomColor(base_num)),
                strokeWidth: (outlined ? rando(10) : 0),
                left: rando(width),
                top: rando(height)
            }));
            canvas.add(new fabric.Rect({
                width: radius,
                height: radius,
                angle: rando(10) > 5 ? 360 / i : 90,
                selectable: false,
                fill: (outlined ? '' : randomColor(base_num)),
                stroke: (outlined ? 'none' : randomColor(base_num)),
                strokeWidth: (outlined ? rando(10) : 0),
                opacity: rando(10) * 0.1,
                left: rando(width),
                top: rando(height)
            }));
            canvas.add(new fabric.Line([rando(width / 2), rando(height / 2), rando(width) / 4, rando(height) / 4], {
                stroke: randomColor(base_num),
                fill: randomColor(base_num),
                selectable: false,
                strokeWidth: rando(10),
                opacity: rando(10) * 0.1,
                left: rando(width),
                top: rando(height)
            }));

            // determine slight color
            // variation (2) vs. high contrast (10)
            base_num += rando(10) > 6 ? 10 : 2;
        }
    }

    function addGroups(x, y, times) {
        if(times <= 0) {
            return;
        }
        addGroup(x, y);
        return addGroups(x, y, times - 1);
    }

    function generateAgain() {
        var fonts_length = $('h1').find('.font-list').find('li').length;
        var font_size    = rando(100) + 50;
        globalLoader.load(load_opts);
        canvas.backgroundColor = randomColor(255);
        canvas.clear();

        // add bg art
        addGroups(width, height, 3);

        // update text and font stuff
        $('h1').find('span').text(randomArrayValue(phrases)).css({
            'color': randomColor(255),
            'text-transform': rando(10) > 6 ? 'uppercase': 'capitalize',
            'font-style': rando(10) > 6 ? 'italic': '',
            'font-size': font_size + 'px'
        });
        $('p').find('span').text(randomArrayValue(subheadings)).css({
            'color': randomColor(255),
            'text-transform': rando(10) > 6 ? 'uppercase': 'capitalize',
            'font-style': rando(10) > 6 ? 'italic': '',
            'font-size': font_size / 2 + 'px'
        });

        // add random font
        $('h1').find('.font-list').find('li')
        .eq(rando(fonts_length)).find('a').first().click()

        $('p').find('.font-list').find('li')
        .eq(rando(fonts_length)).find('a').first().click()

        setTimeout(globalLoader.unload, 100);
    }

    function init() {
        canvas_elem.width      = width;
        canvas_elem.height     = height;
        canvas                 = new fabric.Canvas('canvas');
        canvas.selection       = false;
        $('h1, p')
        .prepend('<ul class="fonts" data-typey-font-list></ul>')
        .append('<div class="font-name"></div>')
        .attr('data-typey-editable', '')
        .addClass('typer');
        initGoogleFonts();

        // add events and position text
        text.css('margin-top', dims.height / 4);
        generate.on('click', generateAgain);
        export_btn.on('click', function(){
            exportCanvas(canvas);
        });

        // kick it off
        generate.click();
    }

    return {
        init: init
    };
})();

$(document).ready(cool.init);
