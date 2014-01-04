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
    var pig = pigLatinize(word);
    container.append('<p> ' + pig + ' </p>');
    return;
}

function pigLatinize(word) {
    log(word);
    var postfix       = $('#postfix').val();
    var piggified     = '';
    var length        = word.length;

    // positive lookahead
    // so it doesn't remove the vowel
    var vowel_re      = new RegExp(/(?=a|e|i|o|u)/g);
    var last_letter   = word.substr(length - 1, length);
    var second_letter = word.substr(1, 1);
    var first_letter  = word.substr(0, 1);
    var vowels;
    var alpha         = 'bcdfghjklmnpqrstvwxyz'.split('');

    // Check if random is set,
    // set a random consonant if so.
    (postfix = (postfix === 'random' ? randomArrayValue(alpha) + 'ay' : postfix));

    // clean up non letters
    word = word.replace(/[^a-zA-Z]/g, '');

    if(vowel_re.test(first_letter)) {
        piggified = word + 'way';
    } else {
        vowels = word.split(vowel_re);
        piggified = [word.substr(1, length), first_letter, postfix].join('');
    }
    return piggified;
}

$(document).ready(init);
