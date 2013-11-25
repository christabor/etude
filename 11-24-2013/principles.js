var ul    = $('.unstyled-list');
var total = ul.find('li').length;
var prev  = $('#prev');
var next  = $('#next');

function toggleNext(event) {
    event.preventDefault();
    var next  = ul.find('.active').next();
    var idx   = next.index();
    if(idx !== -1) {
        ul.find('.active').removeClass('active');
        next.addClass('active');
    } else {
        ul.find('li').eq(0).addClass('active');
        ul.find('li').eq(total - 1).removeClass('active');
    }
    return;
}

function togglePrev(event) {
    event.preventDefault();
    var prev  = ul.find('.active').prev();
    var idx   = prev.index();
    if(idx > -1) {
        ul.find('.active').removeClass('active');
        prev.addClass('active');
    }
    return;
}

prev.on('click.prev', togglePrev);
next.on('click.next', toggleNext);
