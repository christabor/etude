var dims;
var canvas;
var height;
var width;
var ctx;
var canvas_data;
var center;
var squares = [];
var square_size = 10;
var total;
var num_squares;

function populateSquares() {
    // populate the states
    // array with initial values
    for(var i = 0; i <= total; i++) {
        if(rando(10) > 8) {
            squares.push(0);
        } else {
            squares.push(1);
        }
    }
}

function clearCanvas() {
    // a hackish way to clear the canvas
    canvas.width = canvas.width;
}

function addBox(idx, state, color) {
    squares[idx] = state;
    ctx.fillStyle = color;
    ctx.fillRect(rando(width), rando(height), square_size, square_size);
}

function seedRandom() {
    clearCanvas();
    // draw the seeded data to start
    var x;
    var y;
    for(var i = 0; i <= total; i++) {
        if(squares[i] === 1) {
            addBox(i, 0, '#ffffff');
        } else {
            addBox(i, 1, '#000000');
        }
    }
}

function timeStep() {
    // do each calculation
    // to determine next state
    for(var i = 0; i <= total; i++) {
        x = i * square_size;
        if(squares[i - 1] === 1 || square_size[i + 1] === 1) {
            if(squares[rando(i)] === 0) {
                addBox(i, 1, '#ff0000');
            } else {
                addBox(i, 0, '#ffffff');
            }
        } else {
            addBox(i, 1, '#000000');
        }
    }
}

function init() {
    dims   = getDocumentDimensions();
    canvas = document.getElementById('canvas');
    height = dims.height;
    width  = dims.width;
    total  = (height + width) / square_size;
    ctx    = canvas.getContext('2d');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    populateSquares();
    seedRandom();
    setInterval(timeStep, 10);
}

window.onload = init;
