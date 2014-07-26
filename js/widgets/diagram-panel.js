var widg_dpanel = (function(options){
    var defaults  = {
        'animation_duration': 500,
        'module_class': '.box',
        'container_class': '.box-container',
        'root': $('.diagram'),
        'close_btn_html': '<a href="#" class="close-btn">X</a>'
    };
    var opts      = $.extend(defaults, options);
    var z_index   = 999;
    var $body     = $('body, html');
    var $diagrams = $('.diagram-panel');
    var max_eq    = $diagrams.length;
    var animating = false;

    function getTotalWidth() {
        var width = 0;
        $diagrams.filter('.open').each(function(k, diagram){
            if(k !== 0) {
                width += $(diagram).outerWidth();
            }
        });
        return width;
    }

    function scrollToPanel() {
        // http://css-tricks.com/snippets/jquery/smooth-scrolling/
        setTimeout(function(){
            $body.animate({
                scrollLeft: $diagrams.filter('.open:last').offset().left
            }, opts.animation_duration);
        }, 100);
    }

    function adjustWidth() {
        // adjust width of document for scrolling purposes
        $body.css('width', getTotalWidth());
    }

    function openPanel(index) {
        var panels = opts.root.find('.diagram-panel');
        var panel = panels.eq(index + 1);
        var position = 0;
        panel.addClass('open').removeClass('closed');
        panel.css('left', getTotalWidth());
        adjustWidth();
        scrollToPanel();
    }

    $.fn.widg_dpanel = function() {
        // force overflow-x scrolling
        $body.css('overflow-x', 'scroll');
        $diagrams.css({
            'position': 'absolute',
            'top': 0,
            'left': 0
        });
        // add close buttons
        $diagrams.each(function(index, panel){
            var self = $(this);
            // stretch all diagrams to height of window
            $(this).height(window.innerHeight)
            // .addClass('animated ' + opts.enter_class);
            $(this).prepend(opts.close_btn_html);
            $(this).find('.close-btn').on('click', function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                var panels = opts.root.find('.diagram-panel:gt(' + (index - 1) + ')');
                // Prevent first panel from closing, if a button exists.
                if(index === 0) return;
                panels.addClass('close').removeClass('open');
                adjustWidth();
                scrollToPanel();
            });
            // add panel events
            $(this).on('click', opts.module_class, function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                openPanel(index);
            });
        });
    }
})();
