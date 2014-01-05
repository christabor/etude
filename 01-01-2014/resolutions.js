function initText(container) {
    container.bigtext({
        maxfontsize: 150
    });
}

function addText(container, key, word) {
    var text = ['<div style="display:none;">', (key + 1), '. ', word, '</div>'].join('');
    container
    .append(text);
}

function init() {
    var dims        = getDocumentDimensions();
    var container   = $('#bigtext');
    var resolutions = [
    'Lose Weight and Get Fit',
    'Quit Smoking',
    'Learn Something New',
    'Eat Healthier and Diet',
    'Get Out of Debt and Save Money',
    'Spend More Time with Family',
    'Travel to New Places',
    'Be Less Stressed',
    'Volunteer',
    'Drink Less'
    ];

    $.each(resolutions, function(k, word){
        (function(k){
            setTimeout(function(){
                addText(container, k, word);
                container.find('div').last().fadeIn(10);
                initText(container);
            }, (k+1) * 1000 / 2);
        })(k);
    });
}

$(document).ready(init);
