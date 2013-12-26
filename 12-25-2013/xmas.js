$(document).ready(function(){
    var words             = $('#words');
    var output            = $('#animation');
    var lines             = words.text().split(/\n/g);
    var prev_stop         = 0;
    var prev_start        = 0;

    // 1/10th ms after the previous faded out
    var NEXT_OFFSET       = 1;

    // ms per letter
    var LETTER_MULTIPLIER = 1.2;

    function makeStripedHTML(words) {
        // wrap each word in
        // a span for decoration
        var html = '';
        $.each(words, function(k, word){
            html += '<span>' + word + '</span>';
        });
        return html;
    }

    function makeSuccession(key, value) {
        var para       = $('<p></p>');
        var text       = lines[key].trim();
        var words      = text.split(' ');
        var letters    = 0;
        var curr_stop  = 0;
        var curr_start = 0;

        // in milliseconds,
        // how long to read a line per letter
        letters = value.length * LETTER_MULTIPLIER;

        // start: prev_stop + NEXT_OFFSET + (letter * LETTER_MULTIPLIER)
        // stop: curr_stop + (letter * LETTER_MULTIPLIER)
        curr_start = (prev_stop + NEXT_OFFSET + letters);
        curr_stop  = (curr_start + NEXT_OFFSET + letters);

        // populate data attributes
        // for declarative reading
        para
        .html(makeStripedHTML(words))
        .attr({
            'data-succession': '',
            'data-fade-speed': 1000,
            'data-start': curr_start,
            'data-stop': curr_stop
        })
        .hide()
        .appendTo(output);

        // set to new value
        // to offset going forward
        prev_start = curr_start;
        prev_stop = curr_stop;
        return;
    }

    function makeSuccessions() {
        // remove first and last
        lines = lines.slice(1, lines.length - 1);

        // make paragraphs for plugin succession
        // with proper data attributes
        // eg.<data-start="1" data-stop="12" data-succession>CONTENT</>
        // timing is based on length of word (dynamic vs. manual)
        $.each(lines, makeSuccession);
        return;
    }

    function init() {
        // the lost art of making things more
        // intuitive and readable (for practice)
        hide(words).remove();
        makeSuccessions();
        successionPlugin('#animation', 50);
        return;
    }

    init();
    return;
});
