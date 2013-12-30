$(document).ready(function(){
    'use strict';
    var MAX_BOXES = 400;
    var dims = getDocumentDimensions();

    function generateGradientSquare() {
        var square    = '<div class="square" style="';
        var gradients = randomGradientObj(rando(4) + 2);
        var end       = '"></div>';

        square += 'width:' + rando(dims.width / 10) + 'px;';
        // loop through gradients and apply
        // -- can't map directly since the keys will
        // be the same -- not allowed!
        for(var gradient in gradients) {
            square += 'background-image: ' + gradients[gradient] + ';';
        }
        square += end;
        $('body').append(square);
        return;
    }

    function randomizeSquares() {
        $('body').css('background-color', randomColor(255));
        // loop through all squares
        // and add new width
        var squares = $('.square');
        $.each(squares, function(k, square){
            $(square).width(rando(100));
        });
        return;
    }

    function init() {
        // add a bunch of squares
        doSomethingABunch(generateGradientSquare, MAX_BOXES);

        // constantly change the width
        setInterval(randomizeSquares, 200);
        return;
    }

    init();
});
