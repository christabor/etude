$(document).ready(function(){
    var BOX_SIZE = 20,
    workspace = $('#workspace'),
    heading = $('#hallucinator'),
    letters = 'abcdefghijklmnopqrstuvwxyz1234567890'.split(''),
    font_stacks = [
    'Arial, "Helvetica Neue", Helvetica, sans-serif',
    'Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif',
    '"Andale Mono", AndaleMono, monospace',
    '"Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif',
    'Consolas, monaco, monospace',
    '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
    '"Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
    '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
    'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
    '"Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter", Georgia, serif',
    '"Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace',
    'Copperplate, "Copperplate Gothic Light", fantasy',
    'Papyrus, fantasy',
    '"Brush Script MT", cursive',
    '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
    '"Rockwell Extra Bold", "Rockwell Bold", monospace',
    '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
    '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif',
    'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans serif',
    'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
    '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
    '"Franklin Gothic Medium", "Franklin Gothic", "ITC Franklin Gothic", Arial, sans-serif'
    ];

    function randLetter() {
        return letters[Math.floor(Math.random() * letters.length)];
    }

    function randFont() {
        return font_stacks[Math.floor(Math.random() * font_stacks.length)];
    }

    function randClr() {
        return 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
    }

    function generateGrid() {
        workspace.html('');
        for(var i = 0; i <= 100; i++) {
            block = $('<div class="letter"></div>')
            .css({
                'background-color': randClr(),
                'font-family': randFont(),
                'color': randClr(),
                'border-bottom': '10px solid ' + randClr()
            })
            .text(randLetter());
            workspace.append(block);
        }
        return;
    }

    generateGrid();

    $(window).on('mousemove', function(e){
        setTimeout(generateGrid, 300);
    });
});
