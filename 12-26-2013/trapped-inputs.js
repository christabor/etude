$(document).ready(function(){
    'use strict';

    var INPUTS_PER_GROUP = 6;
    var TOTAL_GROUPS     = 10;
    var REPLACE_RATE     = 1000;
    var MINIMUM_GROUPS   = 2;
    var input_container  = $('#input-container');
    var phrases          = ['Please Help Me!', 'I\'m stuck in here!', 'Someone please help!'];
    var dims             = getDocumentDimensions();

    function clearInputs() {
        input_container.empty();
        return;
    }

    function addInputGroup() {
        // create a grouping container
        // and recursively add more content to it
        var container = $('<div></div>');
        var inputs = doSomethingABunch(function(){
            addInputsToGroup(container);
        }, INPUTS_PER_GROUP);

        // add html to body
        container.html(inputs);

        // add html to body
        input_container
        .append(container)
        .find('div')
        .last()
        .width(rando(dims.width / 2))
        .css('background-color', randomColor(100));
        return;
    }

    function addInputsToGroup(selector) {
        // get existing html
        // from selector passed through
        var existing = selector.html();
        var str      = randomStringLength(30);
        var input    = [existing, '<input type = "text" placeholder = "', str, '" />'].join('');

        // add new html
        selector.html(input);

        // and return it for
        // chaining purposes
        return selector;
    }

    // add a bunch of groups
    function addRandomInputGroups() {
        clearInputs();
        doSomethingABunch(addInputGroup, (rando(TOTAL_GROUPS) + MINIMUM_GROUPS));

        var inputs = input_container.find('input');
        var len    = inputs.length;
        var phrase = randomArrayValue(phrases);

        // random color for
        // one random input on active inputs
        inputs.eq(rando(len))
        .val(phrase)
        .css({
            'background-color': randomColor(100),
            'box-shadow': '0 2px 20px ' + randomColor(255),
            'color': 'white'
        });
        return;
    }

    setInterval(addRandomInputGroups, REPLACE_RATE);
    return;
});
