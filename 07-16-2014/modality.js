var modality = (function(options){

    // traditional namespace
    var defaults = {
        'blur': true,
        'transition_classes': 'animated fadeInUp'
    };
    var opts    = $.extend(defaults, options);
    var z_index = 999;
    var $modals = $('.modal-container');

    function openModal(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var $target = $(this).data('modal-target');

        if(opts.blur) {
            $modals.addClass('blur');
            $($target).removeClass('blur');
        }

        $($target)
        .addClass('active')
        .css('z-index', z_index + 1)
        .find('.modal-dialog')
        .addClass(opts.transition_classes);

        z_index += 1;
    }

    function closeModal(e) {
        // coupled to structure, which is probably a good thing.
        $(this).parent().parent().parent().removeClass('active');
        if(opts.blur) {
            $modals.removeClass('blur');
        }
    }

    // jquery namespace
    $.fn.modality = function() {
        $('a[data-modal-target]').on('click', openModal);
        $('.modal-header').find('[data-close]').on('click', closeModal);
    }
})();

var modality = (function(){
    'use strict';


    function init() {
        $.fn.modality();
    }

    return {
        'init': init
    };
})();

$(document).ready(modality.init);
