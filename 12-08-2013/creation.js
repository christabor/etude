$(document).ready(function () {
    var container = $('#scripture');
    var verses    = $('.verse');

    verses.hide();

    function init() {
        verses.each(function(k, verse){
            var _verse = $(verse);
            setTimeout(function(){
                _verse.fadeIn(10);
                _verse.find('p').each(function(k2, para){
                    var _this = $(this);
                    var text  = _this.text();
                    _this.fadeIn(100);

                    // run the sequence plugin
                    // on each individual paragraph element
                    simpleLetterSequence({
                        container: _this,
                        word: text.split(''),
                        len: text.length - 1,
                        fade: 100,
                        css_before: {
                            'color': 'red',
                            'text-decoration': 'line-through',
                            'box-shadow': '0 0 10px red',
                            'border-bottom': '1px solid red'
                        },
                        css_after: {
                            'color': 'white',
                            'text-decoration': 'none',
                            'box-shadow': '0 0 0',
                            'border-bottom': '1px solid black'
                        },
                        timing: 100
                    });

                // empty out the previous text
                $(this).not('span').text('');
                return;
            });
return;
}, k * 1000);
});

return;
}

// fade + init
$('body').delay(1000).fadeIn(1000, init);
});
