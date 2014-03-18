var type = (function(){
    var container = $('#container');

    function init() {
        $(window).on('keyup, keydown', function(e){
            e.preventDefault();
            if(e.which === 13) {
                container
                .append('<span><br /></span>');
            } else if(e.which === 8) {
                container.find('span').last().remove();
            }
            else {
                container
                .append('<span>' + randomBinary(rando(5)) + '</span>');
            }
            $(window).animate({
                top: $(window).height()
            }, 100);
        });
    }

    return {
        'init': init
    };

})();

$(document).ready(type.init);
