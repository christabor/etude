$(document).ready(function(){

    function getKey(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    var adjectives = [
    'adorable',
    'beautiful',
    'clean',
    'drab',
    'elegant',
    'fancy',
    'glamorous',
    'handsome',
    'long',
    'magnificent',
    'old-fashioned',
    'plain',
    'quaint',
    'sparkling',
    'unsightly',
    'wide-eyed'
    ],
    enthusiams = [
    'really',
    'definitely',
    'kind of',
    'mostly',
    'absolutely',
    'pretty much',
    'not really'
    ],
    ings = [
    'feeling',
    'looking',
    'being'
    ],
    excitements = [
    'very',
    'mostly'
    ],
    times = [
    'now',
    'right now',
    'today',
    'this morning',
    'this afternoon',
    'this evening'
    ],
    adjective = adjectives[getKey(adjectives)],
    time = times[getKey(times)],
    enthuse = enthusiams[getKey(enthusiams)],
    excite = excitements[getKey(excitements)],
    ing = ings[getKey(ings)],
    combined = [excite, enthuse, ing, adjective, time].join(' '),
    phrase = 'You\'re ' + combined,
    elem = $('<h1></h1>');

    $('body').append(elem);
    for(var i = 0, len = phrase.length - 1; i <= len; i++) {
        (function(i){
            setTimeout(function(){
                elem.text(elem.text() + phrase[i]);
            }, 100);
        })(i);
    }
});
