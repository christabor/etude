var dims    = getDocumentDimensions();
var width   = dims.width;
var height  = dims.height;
var letters = $('#letter-sequence');
var numbers = $('#random-sequence').find('span');
var text    = randomBinary(5000).split('');
var gui     = $('#gui-overlay');
var reticle = $('#box-container');

function addGuiElements() {
    simpleLetterSequence({
        container: letters,
        word: text,
        len: text.length - 1,
        fade: 200,
        css_before: {
            'color': 'black',
            'background-color': 'red',
            'text-decoration': 'line-through'
        },
        css_after: {
            'color': 'white',
            'background-color': 'transparent',
            'text-decoration': 'none'
        },
        timing: 20
    });
    setInterval(function(){
        numbers
        .text([randomBinary(10), randomFixedString(10), randomBinary(10)].join(' '));
    }, 100);
    return;
}

function errorCallback(error) {
    $('body').append('<p class="error">Sorry, something went wrong. Please refresh.</p>');
    return console.log('navigator.getUserMedia error: ', error);
}

function init() {
    reticle.width(width);

    // use width to maintain circle aspect ratio
    reticle.height(width);

    var c_large = new funky('c_large');
    var c_small = new funky('c_small');

    c_large.on('error', errorCallback);
    c_small.on('error', errorCallback);

    c_large.effectScanLines(true);
    c_small.effectEdgeDetection(true);

    addGuiElements();
    return;
}

init();
