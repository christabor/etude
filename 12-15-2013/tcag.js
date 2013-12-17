$(document).ready(function(){
    var helix;
    var seq;
    var seq_length;
    var pivot;
    var seq_default;
    var multiplier_default;
    var opacity;
    var controls;
    var sliders;
    var slider_funcs;
    var loader  = {
        msg: 'Sequencing Genomic HTML',
        css: {
            'background': 'black url(http://upload.wikimedia.org/wikipedia/commons/8/81/ADN_animation.gif) no-repeat center center',
            'color': '#6d014b',
            'z-index': '9999',
            'font-size': '40px'
        }
    };

    function addControls() {
        sliders.each(function(k, slider){

            // declarative approach to sliders.
            var name = $(this).attr('data-func');
            var func = slider_funcs[name];
            $(slider).slider({
                slide: func,
                value: parseFloat($(this).attr('data-value'), 10) || 1,
                step: parseFloat($(this).attr('data-step'), 10) || 1,
                min: $(this).attr('data-min'),
                max: $(this).attr('data-max')
            });
        });
        return;
    }

    function sequencePairs(count, multiplier) {
        helix.html('');
        for (var i = 0, len = count; i <= len; i++) {
            var degree = i >= pivot ? -i : i;
            var pair_l = seq[rando(seq_length)];
            var pair_r = seq[rando(seq_length)];
            var pair = $('<tr></tr>')
            .append('<td></td>');
            var inner = '<span class="' + pair_l + '">' + pair_l + '</span>' + '<span class="' + pair_r + '">' + pair_r + '</span>';

            helix.append(pair)
            .find('tr')
            .last()
            .css('-webkit-transform', 'rotate('+ degree * multiplier +'deg)')
            .find('td')
            .html(inner);
        }
        return;
    }

    function init() {
        globalLoader.load(loader);

        helix              = $('#helix');
        seq                = 'TCGA'.split('');
        seq_length         = seq.length;
        pivot              = seq_length / 2;
        seq_default        = 50;
        multiplier_default = 5;
        opacity            = 1;
        controls           = $('#controls');
        sliders            = controls.find('.slider');
        slider_funcs = {
            spiral: function(event, ui) {
                sequencePairs(seq_default, ui.value);
                return;
            },
            add_more: function(event, ui) {
                sequencePairs(ui.value, multiplier_default);
                return;
            }
        };

        sequencePairs(seq_default, multiplier_default);
        addControls();
        globalLoader.unload();
        return;
    }
    init();
});
