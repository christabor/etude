$(document).ready(function(){

    if(global_config.is_mobile) {
        disableForMobile();
        return;
    }

    var count = 0;
    var dims = getDocumentDimensions();
    var present_count = $('#presents');
    var container = $('#present-holder');

    function removePresent() {
        // remove the first
        // present and fade out
        // slight delay so accumulation
        // is still possible
        setTimeout(function(){
            container
            .find('.present')
            .eq(0)
            .fadeOut(100, function(){
                $(this).remove();
            });
            count -= 1;
        }, 400);
        return;
    }

    function checkForCleanup() {
        if(count > 40) {
            removePresent();
        }
        return;
    }

    function updatePresentCount(event) {
        present_count
        .text(count + ' presents!')
        .css('top', event.clientY);
        return;
    }

    function addPresent(event) {
        // check for cleanup to keep
        // performance higher
        checkForCleanup();

        // update count
        count += 1;

        // update live count
        updatePresentCount(event);

        // create new css object of random
        // size and place at mouse cursor
        var present_box = $('<div class="present"></div>');
        var present_lid = $('<div class="lid"></div>');
        var present_bottom = $('<div class="bottom"></div>');
        var width = rando(100) + 50;
        var height = rando(100) + 50;
        var pos_x = event.clientY - rando(400) + 'px';
        var pos_y = event.clientX - rando(400) + 'px';
        var default_props = {
            'top': pos_x,
            'left': pos_y
        };
        var lid_props = {
            'width': width * 1.2 + 'px',
            'height': height / 4 + 'px',
            'background-color': randomColor(255),
            'margin-left': - (width * 1.2 / 10) + 'px'
        };
        var bottom_props = {
            'width': width + 'px',
            'height': height + 'px',
            'background-color': randomColor(255)
        };

        // update unique parts
        present_lid.css(lid_props);
        present_bottom.css(bottom_props);

        // add pieces together
        present_box
        .prepend(present_bottom)
        .prepend(present_lid)
        .css(default_props);

        // add new present
        container
        .prepend(present_box);
        return;
    }

    function init() {
        $(document).on('mousemove', addPresent);
        container.on('click', '.present', function(e){
            $(this)
            .addClass('spin')
            .fadeOut(400, function(){
                $(this).remove();
            });
        });
        return;
    }

    init();
});
