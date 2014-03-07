var layout = (function(){
    var fonts        = global_config.basic_fonts;
    var generate_btn = $('#generate');
    var gen          = $('#layout-gen');
    var dark         = $('.dark-bg');
    var mid          = $('.mid-bg');
    var light        = $('.light-bg');

    function generate() {
        var base = tinycolor.complement(randomColor(clamp(255, 100, 255)));
        var dark_one = tinycolor.darken(base, 40);
        var dark_two = tinycolor.darken(base, 15);
        var light_one = tinycolor.lighten(base, 40);
        var light_two = tinycolor.lighten(base, 15);

        dark.find('p, a').css('color', light_one);
        dark.css('background-color', dark_one);
        dark.find('h1, h2, h3').css('color', light_two);
        dark.find('.btn').css({
            'color': light_one,
            'border-color': light_one
        });

        mid.find('p, a').css('color', base);
        mid.find('ul').css('color', light_two);
        mid.css('background-color', light_one);
        mid.find('h1, h2, h3').css('color', dark_two);
        mid.find('.btn').css({
            'color': dark_one,
            'border-color': dark_one
        });

        light.find('p, a').css('color', light_one);
        light.css('background-color', base);
        light.find('h1, h2, h3').css('color', dark_two);
        light.find('.btn').css({
            'color': light_one,
            'border-color': light_one
        });
        randomFonts();
    }

    function randomFonts() {
        gen.find('h1, h2, h3').css('font-family', randomArrayValue(fonts));
        gen.find('p, ul, a').css('font-family', randomArrayValue(fonts));
    }

    function init() {
        generate();
        generate_btn.on('click', generate);
    }

    return {
        init: init
    };

})();

$(document).ready(layout.init);
