$(document).ready(function(){
    var phrase = $('.loading-phrases'),
    phrases = phrase.find('li'),
    count = phrases.length,
    advance,
    current = 0;

    phrases.hide();
    advance = setInterval(function(){
        phrases.eq(current).show();
        phrases.eq(current).prevAll().hide();
        current += 1;
    }, 1000);

    if(count === current) {
        clearInterval(advance);
    }
    return;
});
