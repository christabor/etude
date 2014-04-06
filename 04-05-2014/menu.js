var quotes = (function(){
    var $menu = $('#main-menu');
    var $iframe = '<iframe width="1001" height="563" src="//www.youtube-nocookie.com/embed/-XbQgdSlsd0?disablekb=1&amp;controls=0&amp;modestbranding=1&amp;autoplay=1" frameborder="0"></iframe>';

    function secretQuit(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var confirmed = confirm('Are you sure?');
        if(confirmed) {
            window.location.href = 'https://www.youtube.com/results?search_query=dishonored';
        }
    }

    function hideNav() {
        $('h1, #heading-bg').fadeOut(200);
    }

    function loadVideo(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        hideNav();
        $menu.hide();
        $('body').append($iframe);
    }

    function simpleToggle() {
        hideNav();
        showMenu();
    }

    function showMenu() {
        $('iframe').remove();
        $menu.show()
        .animate({left: '50%'}, 200);
        $('nav').animate({left: '-50%'}, 200);
    }

    function init() {
        $('#overlay').height(window.innerHeight);
        $('#overlay').width(window.innerWidth);
        $('nav').find('a').not('.unique').on('click', simpleToggle);
        $('#quit').on('click', secretQuit);
        $('#newgame').on('click', loadVideo);
    }

    return {
        'init': init
    };

})();

$(document).ready(quotes.init);
