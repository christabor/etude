var moody = (function(){

    var emotionColorMap = {
        'negative': 'red',
        'positive': 'green',
        'neutral': '#ccc'
    };

    function checkEmotion(e) {
        e.preventDefault();
        var score = null;
        var checker = new Knwl();
        checker.init($(this).val().trim());
        score = checker.get('emotion');
        $('label').find('span')
        .text(score === 'neutral or unknown' ? 'Too ambiguous, try something else.' : score);
        if(score === 'neutral or unknown') score = 'neutral';
        $('body').css({
            'background-color': emotionColorMap[score],
            'color': 'white'
        });
        $(this).css('border-color', 'white');
    }

    function init() {
        $('textarea').on('keyup', checkEmotion);
    }

    return {
        'init': init
    }
})();

$(document).ready(moody.init);
