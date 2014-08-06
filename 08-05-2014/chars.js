var charmata = (function(){
    var DEBUG = false;
    var dims  = getViewportDimensions();
    var body  = document.querySelector('body');
    var W     = dims.width;
    var H     = dims.height;
    var ascii = document.getElementById("chars");
    var character;
    var line;
    var line_item;
    var line_break;
    var len   = Math.round((W * H) / 5);
    log(len);
    var curr_chars = new Array(len || W);  // default for mobile screen width
    var chars = '!@#$%^&*()_+=-{}|]['.split('');

    function convertToASCII() {
        // file this under "DOM stress tests"
        if(!DEBUG) {
            requestAnimationFrame(convertToASCII);
        }
        ascii.innerHTML = '';
        for(var i = 0; i < len; i += 1) {

            if(curr_chars[i] === '-') character = '+';
            else if(curr_chars[i] === '+') character = '=';
            else if(curr_chars[i] === '=') character = '#';
            else if(curr_chars[i] === '$') character = 'x'; // dead
            else if(curr_chars[i] === '#') character = '@';
            else if(curr_chars[i] === '@') character = '.';
            else if(curr_chars[i] === '.') character = '-';
            else if(curr_chars[i] === 'x') character = 'X'; // more dead (decomposing)
            else if(curr_chars[i] === 'X') character = '%'; // rebirth
            else if(curr_chars[i] === '%') character = '=';
            else character = '.';

            // random "monkey wrench" value
            if(rando(100) < 1) curr_chars[i] = character = randomArrayValue(chars);

            // if the pointer reaches end of pixel-line, create new element
            if(i !== 0 && (i / 4) % W === 0) {
                line_item  = document.createTextNode(line);
                line_break = document.createElement('br');
                ascii.appendChild(line_item);
                ascii.appendChild(line_break);
                // emptying line for the next row of pixels.
                line = '';
            }
            line += character;
            curr_chars[i] = character;
        }
    }

    function init() {
        if(DEBUG) {
            setInterval(convertToASCII, 400);
        } else {
            clearInterval(convertToASCII);
            convertToASCII();
        }
    }

    return {
        'init': init
    };

})();

window.onload = charmata.init;
