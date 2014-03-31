var htmlscape = (function(){
    var $container = $('#container');
    var interval;
    var dims = getViewportDimensions();
    var width = dims.width;
    var tags;
    var max = 50;

    function addHtml() {
        var html = '';
        $container.fadeOut(100);
        doSomethingABunch(function(){
            var tag = Object.keys(randomObjValue(tags))[0];
            var sentence = randomSentence(rando(20), rando(12));
            html += ['<div class="col-container"',
            'style="opacity:' + rando(10) * 0.1 + ';padding:' + rando(20) + 'px;left:' + rando(width) + 'px;background-color: ' + randomColor(255) + '">',
            makeHTMLTag(tag, sentence),
            '</div>'].join('');
        }, max);
        $container.html(html).fadeIn(100)
        .find('.col-container').hide();
    }

    function loop() {
        addHtml();
        waveHtml();
    }

    function waveHtml() {
        $container.find('.col-container')
        .each(function(k, col){
            setTimeout(function(){
                $(col).slideToggle(100);
            }, k * 10);
        });
    }

    function loadTags(data) {
        tags = data[0];
        delete tags.iframe;
        delete tags.embed;
        delete tags.canvas;
        loop();
        interval = setInterval(loop, 3000);
    }

    function init() {
        var req = $.getJSON('../fixtures/html-tags.json');
        $.when(req).then(loadTags);
    }

    return {
        'init': init
    };

})();

$(document).ready(htmlscape.init);
