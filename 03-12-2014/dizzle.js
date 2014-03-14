function init() {
    var one         = $('#one');
    var many        = $('#many');
    var one_input   = $('#one-input');
    var many_input  = $('#many-input');
    var container   = $('#words').find('span');
    var form        = $('#form');
    var empty       = $('#empty');
    var single_mode = true;

    one.on('click', function(e){
        e.preventDefault();
        one_input.show();
        many_input.hide();
        single_mode = true;
    });

    empty.on('click', function(e){
        e.preventDefault();
        container.empty();
    });

    many.on('click', function(e){
        e.preventDefault();
        one_input.hide();
        many_input.show();
        single_mode = false;
    });

    form.on('submit', function(e) {
        container.empty();
        e.preventDefault();
        var words;
        var word;
        if(single_mode) {
            word = one_input.val();
            if(word.length < 1) return;
            addWord(word, container);
        } else {
            words = many_input.val().split(' ');
            if(words[0].length < 1) return;
            $.each(words, function(k, _word){
                addWord(_word, container);
            });
        }
    });
}

function addWord(word, container) {
    var hizz = hizzleIze(word);
    if(hizz) {
        container.append('<p> ' + hizz + ' </p>');
    }
}

function hizzleIze(word) {
    var vowel = new RegExp(/(?=a|e|i|o|u)/);
    return word
    .replace(/[^a-zA-Z]/g, '')
    .replace(vowel, 'izz');
}

$(document).ready(init);
