// Some reusable functions that have
// been abstracted from individual days

function getKey(arr) {
    return Math.floor(Math.random() * arr.length);
}

function log(msg) {
    return console.log(msg);
}

function doSomethingABunch(thing, times, context) {
    // generic repeater
    if(times > 0) {
        thing(context);
        doSomethingABunch(thing, times - 1, context);
    }
    return;
}
