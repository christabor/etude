var flippant = (function(){
    'use strict';

    function init() {
        $('body').on('click', function(){
            $('.card-container-group').toggleClass('flipping');
            $('.card-container-group')
            .find('.cards').first().
            toggleClass('flipping-1');

            $('.card-container-group')
            .find('.cards').eq(1).
            toggleClass('flipping-2');

            $('.card-container-group')
            .find('.cards').last().
            toggleClass('flipping-3');
        });
    }

    return {
        'init': init
    };
})();

$(document).ready(flippant.init);
