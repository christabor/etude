var playdrawr = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height/1.4;
    var width       = dims.width/2;
    var $container  = $('#svgcontainer');

    function animateSVG(data) {
        $container.show();
        $container.find('g').hide().on('click', function(e){
            $(this).attr('fill', 'blue');
            log(e);
        });
        $container.find('path').on('click', copy);
        $container.find('#star').delay(100).fadeIn(100);
    }

    function copy(e) {
        $(this).after($(this).clone().attr('fill', 'red'));
    }

    function init() {
        $container.hide();
        $('#svgcontainer').load('star.svg', animateSVG);
    }

    return {
        init: init
    };

})();

window.onload = playdrawr.init;
