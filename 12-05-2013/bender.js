window.onload = function(){

    // most of the ascii conversion code
    // shamelessly taken from
    // http://thecodeplayer.com/walkthrough/cool-ascii-animation-using-an-image-sprite-canvas-and-javascript
    var body   = document.querySelector('body');
    var img    = document.getElementById("img");
    var W      = img.width;
    var H      = img.height;
    var ascii  = document.getElementById("ascii");
    var canvas = document.createElement("canvas");
    var ctx    = canvas.getContext("2d");
    var r;
    var g;
    var b;
    var gray;
    var character;
    var pixels;
    var line;
    var line_item;
    var line_break;
    var color_data;
    var len;

    canvas.width = W;
    canvas.height = H;

    // drawing the image to the canvas
    ctx.drawImage(img, 0, 0, W, H);

    // accessing pixel data
    pixels     = ctx.getImageData(0, 0, W, H);
    color_data = pixels.data;
    len        = color_data.length;

    function convertToASCII() {

        // every pixel gives 4 integers -> r, g, b, a
        // so length of color_data array is W * H *4
        for(var i = 0; i < len - 1; i = i + 4) {

            r = color_data[i];
            g = color_data[i + 1];
            b = color_data[i + 2];

            // converting the pixel into grayscale
            gray = r * 0.2 + g * 0.7 + b * 0.07;

            // for ASCII, shading is determined by
            // 'density' of character
            if(gray > 250) character = ' ';
            else if(gray > 230) character = '.';
            else if(gray > 200) character = '"';
            else if(gray > 175) character = '|';
            else if(gray > 150) character = '*';
            else if(gray > 125) character = '+';
            else if(gray > 100) character = '=';
            else if(gray > 75) character = 'Y';
            else if(gray > 50) character = 'W';
            else if(gray > 10) character = 'X';
            else if(gray > 5) character = '#';

            //almost black
            else character = '@';

            // if the pointer reaches end of pixel-line
            if(i !== 0 && (i / 4) % W === 0) {
                line_item  = document.createTextNode(line);
                line_break = document.createElement('br');
                ascii.appendChild(line_item);
                ascii.appendChild(line_break);

                // emptying line for the next row of pixels.
                line = '';
            }

            line += character;
        }
        return;
    }

    convertToASCII();

    // change colors randomly
    setInterval(function(){
        body.style.backgroundColor = randomColor(255);
        body.style.color = randomColor(255);
    }, 2000);
    return;
};
