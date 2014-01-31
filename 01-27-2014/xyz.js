var xval;
var yval;
var zval;
var xchar;
var ychar;
var zchar;
var pow;
var power;
var form;
var result;

function updateValues() {
    pow.text(power.val());
    xchar.text(xval.val());
    ychar.text(yval.val());
    zchar.text(zval.val());
}

function recalculate(event) {
    event.preventDefault();
    updateValues();
    var p = power.val();
    var results = Math.pow(xval.val(), p) + Math.pow(yval.val(), p) + Math.pow(zval.val(), p);
    result.text(results);
}

function init() {
    result = $('#result');
    form   = $('form');
    xchar  = $('#xchar');
    ychar  = $('#ychar');
    zchar  = $('#zchar');
    power  = $('#power');
    xval   = $('#xval');
    yval   = $('#yval');
    zval   = $('#zval');
    power  = $('#power');
    pow    = $('.pow');
    form.on('keyup, keydown, change', recalculate);
}

$(document).ready(init);
