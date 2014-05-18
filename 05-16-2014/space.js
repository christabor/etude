var playdrawr = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;

    function init() {
        var bg = document.getElementById('bg');
        bg.setAttribute('width', width)
        bg.setAttribute('height', height);
    }

    return {
        init: init
    };

})();

window.onload = playdrawr.init;
