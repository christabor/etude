$(document).ready(function(){
    var zone               = $('#zone');
    var modes              = $('#modes');
    var split_btn          = $('#split');
    var two_x_btn          = $('#two_x');
    var warning            = $('#warning');
    var exponential_btn    = $('#exponential');
    var cell_counter       = $('#counter').find('.count');
    var generation_counter = $('#counter').find('.generation');
    var cell_template      = '<div class= "cell"><div class="nucleus"></div><div class="cell-info"></div></div>';
    var mode               = 'exponential';
    var FADE_SPEED         = 100;
    var generation         = 0;
    var cell_count         = 2;

    function init() {
        // events
        split_btn.on('click', splitCells);
        two_x_btn.on('click', switchMode);
        exponential_btn.on('click', switchMode);

        // hide initial control
        two_x_btn.fadeTo(FADE_SPEED, 0.3);

        // add a few to kick things off
        split_btn.click();
        return;
    }

    function createCell(count) {
        // loop through the cell count and
        // create new cells
        for (var i = 0; i <= count - 1; i++) {
            var id = uuid();
            var new_cell = $(cell_template);

            // add new cell, update
            // info hover text
            new_cell
            .attr('id', id)
            .css('background-color', randomColor(255))
            .find('.nucleus')
            .css('border-radius', rando(100) + '%' + rando(100) + '%')
            .parent()
            .find('.cell-info')
            .html('Cell ID: ' + id + ' <br />Generation: ' + generation);

            // add to zone and fade in
            zone
            .append(new_cell)
            .hide()
            .fadeIn(FADE_SPEED);
        }

        // update generation by split,
        // not by count of cells
        generation += 1;
        return;
    }

    function triggerMaxWarning() {
        modes.hide();
        split_btn.hide();
        warning.show();
        return;
    }

    function updateCellCount() {
        // offer two modes.
        // disable after 256 because
        // exponential growth is crazy talk
        if(mode === 'exponential') {

            // limit divisions for performance reasons
            if(cell_count < 64) {
                cell_count = cell_count * cell_count;
            } else {
                triggerMaxWarning();
            }
        } else {
            if(cell_count < 1024) {
                cell_count = cell_count * 2;
            } else {
                triggerMaxWarning();
            }
        }

        // update counters
        cell_counter.text(cell_count);
        generation_counter.text(generation);
        return;
    }

    function splitCells(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        // update must come first so the
        // right number is generated
        // from its shared data
        updateCellCount();

        // create the cells
        createCell(cell_count);
        return;
    }

    function switchMode(event) {
        // toggle split modes
        mode = $(this).attr('id');

        // update current mode visually
        modes.find('a').fadeTo(FADE_SPEED, 0.3);
        $(this).fadeTo(FADE_SPEED, 1);

        return;
    }

    init();
});
