var widg_panel = (function(options){
    var defaults = {};
    var opts    = $.extend(defaults, options);
    var $panels = $('[data-sidebar-target]')

    function togglePanel(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var anim_class = $(this).data('anim');
        if(!anim_class) anim_class = '';
        $('.sidebar-panel').toggleClass('open ' + anim_class);
    }

    // jquery namespace
    $.fn.widg_panel = function() {
        $panels.on('click', togglePanel);
    }
})();
