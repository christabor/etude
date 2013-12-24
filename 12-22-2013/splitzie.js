$(document).ready(function(){
    var progress          = $('#progress');
    var outro             = $('#final');
    var job_list          = $('#job-types');
    var percentage        = progress.find('.percentage');
    var bar               = progress.find('.bar');
    var percent           = 0;
    var categories        = job_list.find('ul').find('li');
    var categories_length = categories.length;
    var chunks            = Math.round(100 / categories_length * 1);
    var current           = 0;
    var current_category  = 0;
    var percent_interval  = setInterval(updatePercent, 100);
    var list_interval     = setInterval(updateList, chunks * 100);

    function finish() {
        outro.fadeIn(100);
        job_list.slideToggle(1000);

        clearInterval(list_interval);
        clearInterval(percent_interval);
        return;
    }

    function updateList() {
        // check if the percentage is
        // a multiple of chunks, and fade
        // the corresponding li
        // with matching index
        categories.eq(current_category)
        .addClass('automated')
        .fadeTo(100, 0.2);
        current_category += 1;
        return;
    }

    function updatePercent() {
        if(percent > 99) {
            finish();
            return;
        }

        // increment percentage
        percent += 1;

        // update visuals
        bar.css('width', percent + '%');
        percentage.text(percent + '%');
        return;
    }

});
