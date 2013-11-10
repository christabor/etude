// Some reusable functions that have
// been abstracted from individual days

var global_config = {

    // only works on my domain, throttled.
    GOOGLE_API_KEY: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w'
};

function getKey(arr) {
    return Math.floor(Math.random() * arr.length);
}

function randomColor(max) {
    return 'rgb(' + rando(max) + ',' + rando(max) + ',' + rando(max) + ')';
}

function log(msg) {
    return console.log(msg);
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
    var copied = '';
    for(var i = 1; i <= times; i++) {
        copied += string + delimiter;
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

function multiCopyToArray(times, string) {
    var copied = [];
    for(var i = 1; i <= times; i++) {
        copied.push(string);
    }
    return copied;
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
        coords = navigator.geolocation.getCurrentPosition(success, error, options);
    }
    else {
        alert('Geolocation is not supported by this browser.');
    }
    return coords;
}
