var dims        = getViewportDimensions();
var height      = dims.height;
var width       = dims.width;
var container   = $('#container');
var systems = {};


function addEl(el, input, count) {
    el.append('<p><small class="subdued">' + count + '</small> ' + input + '</p>');
}

function init() {
    systems = {
        lSystemSimple: function(el, input, count) {
            if(count === 0) {
                return;
            } else {
                var last = getLastOf(input);
                if(last === 'A') {
                    input += 'AB';
                } else if(last === 'B') {
                    input += 'A';
                }
                addEl(el, input, count);
                return systems.lSystemSimple(el, input, count - 1);
            }
        },
        lSystemFour: function(el, input, count) {
            if(count === 0) {
                return;
            } else {
                var last = getLastOf(input);
                if(last === 'A') {
                    input += 'AB';
                } else if(last === 'B') {
                    input += 'AC';
                } else if(last === 'C') {
                    input += 'DA';
                } else if(last === 'D') {
                    input += 'BA';
                }
                addEl(el, input, count);
                return systems.lSystemFour(el, input, count - 1);
            }
        },
        lSystemFourAlt: function(el, input, count) {
            if(count === 0) {
                return;
            } else {
                var last = getLastOf(input);
                if(last === 'A') {
                    input += 'CA';
                } else if(last === 'B') {
                    input += 'BD';
                } else if(last === 'C') {
                    input += 'AA';
                } else if(last === 'D') {
                    input += 'DA';
                }
                addEl(el, input, count);
                return systems.lSystemFour(el, input, count - 1);
            }
        }
    };
    systems.lSystemSimple($('#example1 .results'), 'A', 12);
    systems.lSystemFour($('#example2 .results'), 'AC', 12);
    systems.lSystemFourAlt($('#example3 .results'), 'A', 12);
}

$(document).ready(init);
