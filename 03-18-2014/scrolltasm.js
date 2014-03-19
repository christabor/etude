var scrolltasm = (function(){
    var navs = $('#navs');
    var options = $('#options').find('a');
    var active = $('#nav1');

    function toggleNav(event) {
        event.preventDefault();
        var id = $(this).attr('href');

        // Move back up to top
        $(window).scrollTop(0);

        // toggle active
        options.removeClass('active');
        $(this).addClass('active');

        // hide/show menus
        navs.find('.nav').hide();
        navs.find(id).show();

        // set global active
        active = navs.find(id);
    }

    function init() {
        options.on('click', toggleNav);
        $(window).on('scroll', function(e){
            var pos = $(window).scrollTop();
            if(pos > 20) {
                active.addClass('subdue');
            } else {
                active.removeClass('subdue');
            }
        });
        options.first().click();
    }

    return {
        'init': init
    };

})();

$(document).ready(scrolltasm.init);
