/* elements */

var video_element = document.querySelector('video'),
context,
flashy = $('#white-flasher'),
brightness = flashy.find('p').find('.level'),
canvas_total = document.querySelectorAll('canvas').length,
canvases = [],
cw,
ch;

/* canvas redrawing */

video_element.addEventListener('play', function(){
    drawAllCanvases(this);
},false);

function toggleBrightnessIndicator() {
    flashy.fadeIn(300);
    setInterval(function(){
        var level = Math.floor(Math.random() * 1000);
        flashy.css('height',  level + 'px');
        brightness.text('Brigthness level: ' + level);
    }, 250);
    return;
}

function drawAllCanvases(scope) {
    for(var i = 1; i <= canvas_total; i++) {
        canvases[i] = document.querySelector('canvas#c-' + i);
        context = canvases[i].getContext('2d');
        cw = 400;
        ch = 400;
        canvases[i].width = cw;
        canvases[i].height = ch;
        // canvases[i].style.webkitTransform = 'perspective(' + (i * 100) + 'px) rotateY(' + (i > canvas_total / 2 ? '-': '') +  '45deg)';
        drawCanvas(scope, context, cw, ch);
    }
    return;
}

function drawCanvas(v, c, w, h) {
    if(v.paused || v.ended) {
        return false;
    }
    c.drawImage(v, 0, 0, w, h);
    setTimeout(drawCanvas, 20, v, c, w, h);
    return;
}

/*
    Video playback and shim  - credits to
    http://www.html5rocks.com/en/tutorials/getusermedia/intro/
    for original code
        */

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

    function successCallback(video, stream) {
    // make stream available to console
    window.stream = stream;
    video.src = window.URL.createObjectURL(stream);
    video.play();
    toggleBrightnessIndicator();
    return;
}

function errorCallback(error) {
    return console.log('navigator.getUserMedia error: ', error);
}

function start(video) {
    var constraints = {
        video: {}
    };
    if (!!window.stream) {
        video.src = null;
        window.stream.stop();
    }
    navigator.getUserMedia(constraints, function(stream) {
        successCallback(video, stream);
    }, function(error){
        errorCallback(error);
    });
    return;
}

start(video_element);

