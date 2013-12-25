$(document).ready(function(){
    var falling    = $('#falling');
    var loader     = $('#loader');
    var random     = $('#random');
    var unepilepsy = $('#off');
    var epilepsy;

    function init() {
        falling.find('button').on('click', makeFalling);
        loader.find('button').on('click', makeLoader);
        random.find('button').on('click', makeRandom);

        unepilepsy.on('click', clearBg);

        epilepsy = setInterval(function(){
            randomCSSColorAttr(falling, 'background-color', 255);
            randomCSSColorAttr(loader, 'background-color', 255);
            randomCSSColorAttr(random, 'background-color', 255);
        }, 2000);
        return;
    }

    function populateArea(area, count) {
        // empty things out
        area.empty();

        // add new ones
        for (var i = 0; i < count; i++) {
            area.append('<input type="checkbox" />');
        }
        area.hide().fadeIn(100);
        return;
    }

    function toggleInput(input, delay) {
        var is_checked = input.is(':checked');
        setTimeout(function(){
            input
            .prop('checked', (is_checked ? false : true));
        }, delay);
        return;
    }

    function delayToggleInput(inputs, index, delay_multiplier) {
        var time  = index * delay_multiplier;
        var input = inputs.eq(index);
        toggleInput(input, time);
        return;
    }

    function playInputs(area, delay_multiplier, reverse) {
        var inputs = area.find('input');
        var count = inputs.length;
        var input;
        var i = 0;

        // go forwards or backwards
        if(reverse) {
            for (count; i > count; i--) {
                (function(i){
                    delayToggleInput(inputs, i, delay_multiplier);
                })(i);
            }
        } else {
            for (i; i < count; i++) {
                (function(i){
                    delayToggleInput(inputs, i, delay_multiplier);
                })(i);
            }
        }
        return;
    }

    function makeRandom() {
        updateText($(this));
        var area = random.find('.workspace');
        var inputs;
        var len;
        var input;

        populateArea(area, 400);

        inputs = area.find('input');
        len    = inputs.length;

        setInterval(function(){
            input = inputs.eq(rando(len));
            toggleInput(input, 100);
        }, 10);
        return;
    }

    function updateText(scope) {
        scope.text('Play Again');
        return;
    }

    function makeFalling() {
        updateText($(this));
        var area    = falling.find('.workspace');
        var ul      = area.find('ul');
        var forward = true;
        var i       = 0;
        var len;
        var list;

        // empty out ul specifically
        ul.empty();

        // populate multiple sequences
        doSomethingABunch(function(){

            // add a bunch of list items
            // programmatically, then
            // update each with inputs
            var li;
            ul.append('<li></li>');
            li = ul.find('li').last();
            populateArea(li, 20);
        }, 30);

        // sample length after population
        list = ul.find('li');
        len = list.length;

        setInterval(function(){

            // play forward then reverse
            // by inversing the boolean
            // set interval that loops
            // for each list item
            for (i = 0; i <= len; i++) {
                playInputs(list.eq(i), rando(100), forward);
            }

            // invert
            forward = !forward;
        }, 1000);
        return;
    }

    function makeLoader() {
        updateText($(this));
        var area = loader.find('.workspace');
        populateArea(area, 20);
        playInputs(area, 100);
        return;
    }

    function clearBg() {
        clearInterval(epilepsy);
        unepilepsy.fadeOut(100);
        return;
    }

    init();
});
