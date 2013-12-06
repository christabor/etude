// Some reusable functions that have
// been abstracted from individual days

var global_config = {

    // only works on my domain, throttled.
    GOOGLE_API_KEY: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w'
};

var globalLoader = {
    load_speed: 200,
    load: function(opts) {
        var loader = $('<div id="global-loader"></div>');
        loader
        .css(opts.css)
        .text(opts.msg || 'Loading...');

        $('body')
        .prepend(loader)
        .hide()
        .fadeIn(globalLoader.load_speed);
        return;
    },
    unload: function() {
        $('body')
        .find('#global-loader')
        .fadeOut(globalLoader.load_speed, function(){
            $(this).remove();
        });
        return;
    }
};

function initGoogleFonts() {
    window.myTypeLibrary = fonTypey({

        // public, limited access only for github.com/christabor
        api_key: global_config.GOOGLE_API_KEY
    });
    myTypeLibrary.initAllFeatures('body');
    return;
}

function hasJS() {
    // remove no-js classes for
    // compatibility and enhancement
    $('body').removeClass('no-js');
    return;
}

function getKey(arr) {
    return Math.floor(Math.random() * arr.length);
}

function randomFixedString(count) {
    var tokens = 'abcdefghijklmopqrstuvwxyz'.split('');
    var str = '';
    for(var i = 0; i <= count; i++) {
        str += tokens[rando(tokens.length)];
    }
    return str;
}

function randomStringLength(max) {
    // Returns a random string using
    // separate method, of random (MAX) characters
    return randomFixedString(rando(100));
}

function randomColor(max) {
    if(isNaN(max)) {
        max = 255;
    }
    return 'rgb(' + rando(max) + ',' + rando(max) + ',' + rando(max) + ')';
}

function randomColorScheme(color_count, max) {
    // return an array of random colors @color_count long
    var colors = [];
    for(var i = 0; i <= color_count; i++) {
        colors[i] = randomColor(max);
    }
    return colors;
}

function getDocumentDimensions() {
    return {
        'height': $(document).height() || window.screen.availHeight,
        'width': $(document).width() || window.screen.width
    };
}

function exportCanvas(canvas) {
    window.open(canvas.toDataURL());
}

function log(msg) {
    return console.log(msg);
}

function uuid() {
    // random unique identifier in the form 0000-0000-0000-0000
    var uid = (function(){ return rando(9999); });
    return [uid(), uid(), uid(), uid()].join('-');
}

function rando(max) {
    return Math.floor(Math.random() * max);
}

function stretchCanvas(canvas) {
    // makes canvas stretch across whole window size
    $(canvas)
    .height($(window).height())
    .width($(window).width());
    return;
}

function doSomethingABunch(thing, times, context) {
    // generic repeater
    if(times > 0) {
        thing(context);
        doSomethingABunch(thing, times - 1, context);
    }
    return;
}

function multiCopyToString(times, string, delimiter) {
    // copy a string multiple times
    // - similar to Pythons operator overloading
    // e.g. cat * 3 => catcatcat
    var copied = '';
    for(var i = 1; i <= times; i++) {
        copied += string + delimiter;
    }
    return copied;
}

function multiCopyToArray(times, string) {
    // similar to string copy, but sends to array a number of times
    // e.g. fn(10, 'cat') => [cat, cat]
    var copied = [];
    for(var i = 1; i <= times; i++) {
        copied.push(string);
    }
    return copied;
}

function triggerLoading(on) {
    if(on) {
        $('body').css('cursor', 'progress');
    } else {
        $('body').css('cursor', 'auto');
    }
    return;
}

function getLocation(success, error) {
    // set some options to pass in
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    // check if enabled
    if (navigator.geolocation) {
        coords = navigator
        .geolocation
        .getCurrentPosition(success, error, options);
    }
    else {
        alert('Geolocation is not supported by this browser.');
    }
    return coords;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(/* function */ callback, /* DOMElement */ element){
    window.setTimeout(callback, 1000 / 60);
};
})();
