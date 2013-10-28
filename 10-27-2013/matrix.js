$(document).ready(function(){
    var letters = 'abcdefghijklmnopqrstuvwxyz1234567890-=!@#$%^&*()_+-=?/.,<>;:|[]'.split(''),
    len = letters.length;

    var body = $('body');

    function getKey(arr) {
        return Math.floor(Math.random() * len);
    }

    function addLetter(container) {

        // get random letter
        var letter = $('<p></p>').text(letters[getKey(letters)]),
        _container = $(container);
        _container.append(letter);
    }

    function removeLetter(container) {
        var _container = $(container);
        _container.find('p').first().remove();
        return;
    }

    function addLetters(container) {

        // repeatedly add and remove items with random letters
        setInterval(function(){
            addLetter(container);
            setTimeout(function(){
                removeLetter(container);
            }, Math.random() * 1000);
        }, Math.random() * 10);
        return;
    }

    function doSomethingABunch(thing, times, context) {
        // generic repeater
        if(times > 0) {
            thing(context);
            doSomethingABunch(thing, times - 1, context);
        }
        return;
    }

    function createColumn() {
        // add a column
        body.append('<div></div>');
        return;
    }

    function populateColumns() {
        // initial interval function for each column
        $('div').each(function(k, div){
            addLetters(div);
        });
        return;
    }

    doSomethingABunch(createColumn, Math.floor($(window).width() / 50));
    populateColumns();
});
