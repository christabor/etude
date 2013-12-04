$(document).ready(function(){
    var elem      = $('#headlines');
    var sidebar   = $('#sidebar');
    var try_again = $('#again');
    var fonts     = [
    '\'Averia Serif Libre\', cursive',
    '\'Titan One\', cursive',
    '\'Yanone Kaffeesatz\', sans-serif',
    '\'Chewy\', cursive'
    ];
    var headlines = [
    '<span>Bloomberg Defends NYPD\'s</span> <span>Controversial</span> <span>Stop And</span> <span>Kiss</span> <span>Program</span>',
    '<span>Stunned St. Peter\'s Square</span> <span>Crowd Overhears</span> <span>Pope Francis</span> <span>Getting Bitched Out</span> <span>By God</span>',
    '<span>Man Confidently Hits</span> <span>\'Send\' On</span> <span>Worst</span> <span>Job Application</span> <span>Company Has Ever Seen</span>',
    '<span>What The Average</span><span>American Consumer</span> <span>Will Spend This</span><span> Christmas</span>',
    '<span>Insane Man Gets</span><span> A Little Perspective</span> <span>By Reminding Himself</span> <span>That He Is</span><span>God</span>',
    '<span>What If We Put </span><span></span> <span>M&M\'s</span><span> On Top?</span><span>Would They Eat That?</span> <span>Doritos Exec </span> <span>Wonders Out Loud</span>',
    '<span>FAA Issues Holiday Reminder That</span> <span>Planes Can Crash And</span> <span>Kill</span> <span>You</span>',
    '<span>10 Photos Of</span> <span>Plus-Size Models</span> <span>We Deserve</span> <span>A Pat On The Back</span> <span>For Running</span>',
    '<span>Deformed</span> <span>Freak Born</span> <span>Without Penis</span>',
    '<span>I\'m Sorry,</span> <span>But At This School We Don\'t</span> <span>Promote</span> <span>Someone To</span> <span>Head Surf Instructor</span> <span>Just Because They Directed</span> <span>\'Goodfellas\'</span>',
    '<span>Archaeologists</span> <span>Discover Site</span> <span>Where Desperate</span> <span>Jesus Christ</span> <span>Turned Tricks</span>',
    '<span>Hundreds Killed</span><span>In Brutal</span><span>Pro-Something-Anti-Something</span> <span>Clash</span>',
    '<span>Why Are All</span> <span>The Good Guys</span> <span>Always Taken,</span> <span>Gay,</span> <span>Dead,</span> <span>Or Available?</span>'
    ];
    var loader   = {
        msg: 'Loading headline...',
        css: {
            'background-color': 'white',
            'color': 'orange',
            'font-family': 'Averia Serif Libre\', cursive;',
            'font-size': '40px'
        }
    };
    globalLoader.load(loader);

    function slabify() {
        var text = headlines[rando(headlines.length)];
        var font = fonts[rando(fonts.length)];

        elem
        .addClass('slabtext')
        .css({
            'color': randomColor(150),
            'font-family': font
        })
        .hide()
        .html(text)
        .find('span')
        .addClass('slabtext');

        setTimeout(function(){
            elem
            .show()
            .slabText();
        }, 10);
        return;
    }

    try_again.on('click', slabify);
    slabify();
    globalLoader.unload();
    sidebar.css('left', '-400px').animate({
        'left': '0'
    }, 500);
    return;
});
