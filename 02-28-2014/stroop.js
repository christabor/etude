var game = (function(){
    var gameboard = $('#game');
    var check_btn = $('#check');
    var controls = $('#controls');
    var colors = ['red', 'green', 'blue', 'red', 'orange', 'black', 'pink'];

    function addText() {
        var text_block = $('<p></p>');
        var color = randomArrayValue(colors);
        var text = randomArrayValue(colors);

        // retry if collision
        while(color === text) {
            color = randomArrayValue(colors);
            text = randomArrayValue(colors);
        }
        text_block.css('color', color)
        .text(text);
        gameboard.html(text_block);
    }

    function init() {
        check_btn.on('click', addText);
    }

    return {
        'init': init
    };
})();

$(document).ready(game.init);
