var viz;
var data;
var funcs = {};
var curr_set = 0;

function updateSet() {
    data.find('.set')
    .eq(curr_set)
    .find('li')
    .hide();

    viz.find('.set')
    .find('p')
    .hide();

    viz.find('.set')
    .find('p')
    .first()
    .show();
}

function init() {
    viz = $('#viz').find('span');
    data = $('#data').find('span');
    funcs = {
        0: {
            0: function(eq) {},
            1: function(eq) {},
            2: function(eq) {
                viz.find('.set')
                .eq(curr_set)
                .find('span')
                .first()
                .hide()
                .text('sliced')
                .fadeIn(1000);

                viz.find('.set')
                .eq(curr_set)
                .find('p').first()
                .find('.highlight')
                .find('span')
                .fadeOut(1000);
            }
        },
        1: {
            0: function(eq) {
                viz
                .find('p').eq(eq).show();
            },
            1: function(eq) {
                viz
                .find('p').eq(eq - 1).hide();
                viz
                .find('p').eq(eq).fadeIn(100);
            },
        }
    };

    updateSet();
    data.find('li')
    .first()
    .show();

    $('a').on('click', function(e){
        var idx;
        var fn;

        idx = $(this)
        .parent()
        .index();

        if($(this).hasClass('next')) {
            curr_set += 1;

            data.find('.set')
            .eq(curr_set).show();

            viz.find('.set')
            .eq(curr_set).show();

            data.find('.set')
            .eq(curr_set - 1).remove();

            viz.find('.set')
            .eq(curr_set - 1).remove();

            data.find('.set')
            .first()
            .find('li')
            .hide();

            data.find('li')
            .first()
            .show();

            updateSet();
        } else {

            // call corresponding function
            fn = funcs[curr_set][idx];
            fn(idx);
        }

        $(this)
        .parent()
        .next('li')
        .show();

        $(this)
        .parent()
        .fadeTo(100, 0.3);

        e.preventDefault();
        e.stopImmediatePropagation();
    });
    data.find('.set').first().show();
    viz.find('.set').first().show();
}

$(document).ready(init);
