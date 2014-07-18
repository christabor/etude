var modality = (function(){
    'use strict';

    function init() {
        $.fn.widg_modal();
    }

    return {
        'init': init
    };
})();

$(document).ready(modality.init);
