var plasticbrain = (function(){
    var dims           = getViewportDimensions();
    var $fidelity      = $('#fidelity').find('span');
    var $attempt       = $('#attempt').find('span');
    var $delta         = $('#delta').find('span');
    var $graph         = $('.bar-graph').find('.bar-bg');
    var TOTAL          = $('#markers').find('li').length;
    var increment      = 100 / TOTAL;
    var interval       = null;
    var bar_increment  = $('.bar-graph').width() / TOTAL;
    var fidelity       = 0;
    var attempt        = 0;
    var delta          = 0;
    var graph_progress = 0;

    function evolveModel() {
        if(attempt === TOTAL) {
            return clearInterval(interval);
        }

        attempt += 1;
        fidelity += 0.2;
        graph_progress += bar_increment;
        delta += rando(10) * 0.1;

        $attempt.text(attempt);
        $fidelity.text(fidelity);
        $delta.text(delta);

        $graph.css('width', graph_progress + 'px');
        $('#model-evolution').find('li').eq(attempt - 1).fadeTo(100, 1);
    }

    function start() {
        $('.model-section').fadeIn(100);
        $(this).hide();
        $('html, body').animate({'scrollTop': dims.height});
        interval = setInterval(evolveModel, 1000);
    }

    function init() {
        $('.model-section').hide();
        $('#start-btn').on('click', start);
        $('#model-evolution').find('li').fadeTo(1, 0.4);
    }

    return {
        'init': init
    };

})();

$(document).ready(plasticbrain.init);
