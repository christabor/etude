$(document).ready(function(){
    $(".dial").knob({
        font: 'font-family: \'Days One\', sans-serif;',
        width: 80,
        fgColor: '#51B0E5'
    });

    function inputInterval(elem, interval) {
        setInterval(function(){
            elem.val(rando(100)).change();
        }, 1000);
        return;
    }

    function indicatorInterval(key, elem){
        var val = parseInt($(elem).text().replace(',', ''), 10);
        var _this = $(elem).find('span');
        setInterval(function(){
            _this.text(rando(val));
        }, 500);
        return;
    }

    inputInterval($('.dial').eq(0), 100);
    inputInterval($('.dial').eq(1), 200);
    inputInterval($('.dial').eq(2), 400);
    inputInterval($('.dial').eq(3), 120);
    inputInterval($('.dial').eq(4), 240);
    inputInterval($('.dial').eq(5), 450);

    $('.indicator-detail').each(indicatorInterval);
    $('body').fadeIn(1000);
});
