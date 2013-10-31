$(document).ready(function(){
    var results = $('#results'),
    words = $.getJSON('words.json'),
    colors = $.ajax({
        url: 'http://www.colr.org/json/schemes/random/',
        dataType: 'jsonp',
        type: 'GET'
    });

    $.when(words).done(function(word_list){
        var word = word_list[getKey(word_list)],
        url = 'https://duckduckgo-duckduckgo-zero-click-info.p.mashape.com/?q=' + word + '&no_html=1&no_redirect=1&skip_disambig=1&format=json&t=etude',
        promise;

        if(word) {
            promise = $.ajax({
                url: url,
                type: 'GET',
                beforeSend: function(xhr){

                    // using public key with limited access
                    xhr.setRequestHeader('X-Mashape-Authorization', 'XWVdanmMiwliLCWgzDagxuPGNJiDckX9');
                    return;
                }
            });
            promise.fail(populateData);
            promise.done(populateData);
        }

        // optionally load color scheme
        $.when(colors).done(loadColorScheme);
        return;
    });

    function loadColorScheme(scheme) {
        var colors = scheme.schemes[0].colors;
        log(colors);
        if(colors) {
            $('body').css('background-color', '#' + colors[0]);
            results.css('background-color', '#' + colors[2]);
        }
        return;
    }

    function createDescription(description) {
        return 'A library for ' + (description || 'something (loading error)');
    }

    function populateData(data){
        var item = $.parseJSON(data.responseText);
        if(!data) {
            results.html('<p>No data available.</p>');
            return;
        }
        var version = ['version ', Math.floor(Math.random() * 4), '.', Math.floor(Math.random() * 10), '.', Math.floor(Math.random() * 10)].join('');
        results.find('h2').html(item.Heading + '<span>.js</span>');
        results.find('.details').text(createDescription(item.Definition.split(':')[1]));
        results.find('.version').text(version);
        results.find('.btn').attr('href', 'https://github.com/search?l=JavaScript&q=' + item.Heading + '&ref=searchresults&type=Repositories');
        return;
    }

});
