$(document).ready(function(){
    var seq = $('#sequence');
    var timing = 100;
    var fade = 450;
    var text = '"Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators, in every nation, by children being taught mathematical concepts... A graphic representation of data abstracted from banks of every computer in the human system. Unthinkable complexity. Lines of light ranged in the nonspace of the mind, clusters and constellations of data. Like city lights, receding..."';
    var words = text.split('');
    var len = words.length - 1;

    function sequenceLetters() {
        for(var i = 0; i <= len; i++) {
            (function(i){
                setTimeout(function(){
                    var letter = words[i];
                    var block = '<span>' + letter + '</span>';
                    seq
                    .append(block)
                    .find('span')
                    .last()
                    .hide()
                    .css({
                        'background-color': '#15260a',
                        'border': '1px solid green',
                        'color': 'white'
                    })
                    .fadeIn(fade, function(){
                        $(this).css({
                            'border': '',
                            'background-color': '',
                            'color': ''
                        });
                    });
                }, i * timing);
            })(i);
        }
        return;
    }

    function init() {
        $('h1').hide().fadeIn(1000, function(){
            $('h2').hide().fadeIn(400, function(){
                sequenceLetters();
            });
        });
        return;
    }

    init();
});
