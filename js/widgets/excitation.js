var excitation = (function(options){
    var indicators = null;
    var defaults   = {
        'mouseover': addHover,
        'mouseout': removeHover,
        'indicators': 'sup',
        'toggle_class': 'active'
    };
    var opts       = $.extend(defaults, options);
    var events     = {
        'mouseover': opts.mouseover,
        'mouseout': opts.mouseout
    };

    function positionCitation(k, _) {
        var citation = $($(this).data('cite'));
        citation.css('top', $(this).offset().top + 'px');
    }

    function addHover() {
        var citation = $($(this).data('cite'));
        $(this).addClass(opts.toggle_class);
        citation.addClass(opts.toggle_class);
    }

    function removeHover() {
        var citation = $($(this).data('cite'));
        $(this).removeClass(opts.toggle_class);
        citation.removeClass(opts.toggle_class);
    }

    $.fn.excitation = function() {
        $(opts.indicators).on(events).each(positionCitation);
    }
})();
