var widg_dpanel = (function(options){
    var defaults  = {
        'animation_duration': 500,
        'module_class': '.box',
        'container_class': '.box-container'
    };
    var opts      = $.extend(defaults, options);
    var z_index   = 999;
    var active_eq = 1;
    var $diagrams = $('.diagram-panel');
    var max_eq    = $diagrams.length - 1;
    var animating = false;

    function closePanel(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var parent = $(this).parent();
        var index = parent.index();
        // If panel is next to beginning, close
        // initial panel as well.
        if(index === 1) {resetAllPanels();}
        if(index === 0) {
            // Prevent first panel from closing.
            return;
        }

        $(this).parent().removeClass('open');
        // deactivate/remove inactive states for all child containers
        $(this).parent().find(opts.module_class).removeClass('active inactive');
        $(this).parent().find(opts.container_class).removeClass('active inactive');
        // move back in panel order
        active_eq -= 1;
    }

    function openPanel(self, boxes, containers) {
        $diagrams.eq(active_eq).addClass('open');

        boxes.addClass('inactive');
        containers.addClass('inactive');

        self.parent().removeClass('inactive');
        self.removeClass('inactive').addClass('active');
    }

    function resetAllPanels() {
        // Resets all panels and containers back to their
        // original state.
        $diagrams.find(opts.module_class).removeClass('active inactive');
        $diagrams.find(opts.container_class).removeClass('inactive');
    }

    function scrollToPanel() {
        // trigger "lock" for potential animation queues
        if(animating) return;
        animating = true;
        // http://css-tricks.com/snippets/jquery/smooth-scrolling/
        $('html, body').animate({
            scrollLeft: $('.diagram-panel').eq(active_eq).position().left
        }, opts.animation_duration);
        // "unlock" after animation completes
        setTimeout(function(){animating = false}, opts.animation_duration);
    }

    $.fn.widg_dpanel = function() {
        // add close buttons
        $diagrams.each(function(k, panel){
            $(this).addClass('animated fadeInLeft');
            $(this).prepend('<a href="#" class="close-btn">X</a>');
            $(this).find('.close-btn').on('click', closePanel);
        });
        $diagrams.height(window.innerHeight);
        $diagrams.on('click', opts.module_class, function(e){
            // prevent jitter and wonk when clicks queue up.
            if(animating) return;
            var $boxes      = $(this).parent().find(opts.module_class);
            var $containers = $(this).parent().find(opts.container_class);

            // end of panels
            if(active_eq === max_eq) return;
            openPanel($(this), $boxes, $containers);
            // move forward in panel order
            active_eq += 1;
            scrollToPanel();
        });
    }
})();
