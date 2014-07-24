var diagrammer = (function(){
    'use strict';
    var drag_opts_box       = {'containment': 'parent', 'handle': '.handle'};
    var drag_opts_arrow     = {'containment': 'parent'};
    var drag_opts_container = {'handle': '.handle'};
    var resize_opts         = {minWidth: $('.box-container:first').width(), minHeight: $('.box-container:first').height()};

    function init() {
        // run modal plugin
        $.fn.widg_modal();

        // randomly resize arrows for demo
        // left in for reference
        // $('.arrow-left, .arrow-right').each(function(k, arrow){
        //     $(arrow).css('width', rando(200));
        // });
        // $('.arrow-up, .arrow-down').each(function(k, arrow){
        //     $(arrow).css('height', rando(200));
        // });

        triggerEvents();
        $('#new-box').on('click', addBox);
    }

    function triggerEvents() {
        $('.box-container')
        .draggable(drag_opts_container).resizable(resize_opts);
        $('.box').draggable(drag_opts_box);
        $('.arrow').draggable(drag_opts_arrow);
    }

    function addBox() {
        $('.after')
        .after($('.box-container').eq(0).clone(false).draggable(drag_opts_container).resizable(resize_opts));
        triggerEvents();
    }

    return {
        'init': init
    };
})();

window.onload = diagrammer.init;
