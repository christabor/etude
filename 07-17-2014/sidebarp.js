var sidebarp = (function(options){

    function init() {
        $.fn.widg_panel();
    }

    return {
        'init': init
    };
})();

$(document).ready(sidebarp.init);
