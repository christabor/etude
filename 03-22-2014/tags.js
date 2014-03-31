var htmlz = (function(){
    'use strict';
    var container = $('#container');

    function loadTags(data) {
        $.each(data, function(k, tags){
            $.each(tags, function(tag, desc){
                log(tag);
                var new_desc = ['[', tag, ']: ', desc].join('');
                var el = $(makeHTMLTag(tag, new_desc));
                el.addClass('el').attr('contenteditable', 'true');

                // one off fixes - stinky!
                if(tag === 'a') {
                    el.attr('href', '#');
                }
                if(tag === 'li') {
                    el.html('<ul><li>' + el.text() + '</li><li>' + el.text() + '</li></ul>');
                }
                if(tag === 'ul' || tag === 'ol') {
                    el.html('<li>' + el.text() + '</li><li>' + el.text() + '</li>');
                }
                if(tag === 'img') {
                    el.attr('src', '#');
                }
                container.append(el);
            });
        });
    }

    function init() {
        var req = $.getJSON('../fixtures/html-tags.json');
        $.when(req).then(loadTags);
    }

    return {
        'init': init
    };
})();

window.onload = htmlz.init;
