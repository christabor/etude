$(document).ready(function(){

    var body = $('body');

    function addImage(data) {
        // get random image and text, append to body
        var word = data.Word;
        var container = $('<div></div>');
        var title = $('<p></p>').text(word);
        var img = $('<img>').attr('src', 'http://mebe.co/' + word);

        container
        .append(img)
        .append(title);

        body
        .append(container);
        return;
    }

    function getRandomImg(){
        // make an ajax call to get the random image
        $.ajax({
            success: function(data) {
                addImage(data);
            }
        });
        return;
    }

    // setup default params to keep it DRY
    $.ajaxSetup({
        url: 'http://randomword.setgetgo.com/get.php',
        dataType: 'jsonp'
    });

    doSomethingABunch(getRandomImg, 10, null);
    return;
});
