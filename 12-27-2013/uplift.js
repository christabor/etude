$(document).ready(function(){
    'use strict';
    var dims = getDocumentDimensions();
    var form = $('#add-thing');
    var character = $('#character');
    var add = $('#add');
    var balloons = $('#balloons');
    var noshadows = false;
    var noshadow_btn = $('#disable-shadows');
    var input = form.find('input');
    var examples = [
    'I like to make my friends happy.',
    'I am good at doing cartwheels',
    'I helped an old lady cross the road'
    ];

    function initGame(event){
        event.preventDefault();
        character.fadeOut(1000);
        add.fadeIn(1000);
        return;
    }

    function checkShadowOption() {
        // toggle shadow
        if(noshadows) {
            noshadow_btn.text('Enable shadows (slower)');
            balloons.addClass('no-shadow');

        } else {
            noshadow_btn.text('Disable shadows (faster)')
            balloons.removeClass('no-shadow');
        }
        // invert
        noshadows = !noshadows;
        return;
    }

    function updatePlaceholder() {
        var placeholder = 'e.g. ' + randomArrayValue(examples);
        input.attr('placeholder', placeholder);
        return;
    }

    function addItem(event){
        event.preventDefault();
        var balloon = $('<div class="balloon animated bounceInUp"></div>');
        var thing = input.val();

        // don't input empty value
        if(!thing) return;

        // create balloon element
        balloon
        .text(thing)
        .css({
            'top': rando(dims.height / 2),
            'left': rando(dims.width / 2),
            'background-color': randomColor(255)
        });

        // add new balloon
        balloons
        .append(balloon);
        input.val('');
        return;
    }

    function init() {
        character.on('click', '.btn', initGame);
        form.on('submit', addItem);
        noshadow_btn.on('click', checkShadowOption);

        // cycle placeholder examples
        setInterval(updatePlaceholder, 1500);
        return;
    }

    init();
});
