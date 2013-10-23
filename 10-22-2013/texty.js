$(document).ready(function(){
    var workspace = $('#workspace'),
    form = $('#form'),
    text_input = form.find('input:text'),
    count_input = form.find('input[type="number"]'),
    submit_btn = $('input:submit'),
    letters = 'abcdefghijklmnopqrstuvwxyz1234567890-=!@#$%^&*()_+-=?/.,<>;:|[]'.split('');

    // broken down into teensy weensy functions
    // to practice functional style.
    // It's not purely functional but it's going in the right direction
    // (particularly one argument per function, minimal mutation!)

    function getLength(word) {
        // offset by 1 to prevent IndexError
        return word.length - 1;
    }

    function randomizeLetter() {
        return letters[Math.round(Math.random() * getLength(letters))];
    }

    function randomizeWord(word) {
        var text = '',
        len = getLength(word);
        for(var letter = 0; letter < len; letter++) {

            // only alter even ones
            if(letter % 2 === 0 && letter % 4 === 0) {
                text += randomizeLetter();
            } else {
                text += word[letter] || '';
            }
        }
        console.log(text);
        return text;
    }

    function clearWorkspace() {
        workspace.html('');
        return;
    }

    function adjustCount(count) {
        if(count > 1000) {
            count = 1000;
        }
        return count;
    }

    function addToWorkSpace(elem, val) {
        workspace.append(elem.text(randomizeWord(val)));
        return;
    }

    submit_btn.on('click', function(e){
        e.preventDefault();
        var val = text_input.val(),
        count = count_input.val();
        count = adjustCount(count);

        clearWorkspace();

        for(var i = 1; i <= count; i++) {
            var word = $('<p></p>');
            addToWorkSpace(word, val);
        }
    });
});
