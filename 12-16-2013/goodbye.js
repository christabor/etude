
$(document).ready(function(){
    var loader  = {
        msg: 'Calculating',
        css: {
            'background': '#ff0000',
            'color': '#6d014b',
            'z-index': '9999',
            'font-size': '40px'
        }
    };
    var height;
    var countdown;
    var species;
    var counter;
    var outro;
    var reverse_countdown;
    var extinction_average;
    var sequence;
    var main_counter;
    var canvas;
    var completed;

    function complete() {
        outro.fadeIn(1000);
        completed = true;
        return;
    }

    function updateVisuals() {
        if(completed) return;

        countdown -= 1;
        reverse_countdown += 1;
        height++;
        species
        .html('<span class="number">' + (reverse_countdown * extinction_average) + '</span>' + '<br />species have died');
        main_counter
        .html('<span class="number">' + countdown + '</span><br />days have passed');
        counter
        .css('height', height + 'px');

        if(countdown <= 1) {
            window.clearInterval(sequence);
            complete();
        }
        return;
    }

    function init() {
        globalLoader.load(loader);
        height             = 0;
        completed          = false;
        countdown          = window.innerHeight;
        reverse_countdown  = 0;
        extinction_average = 150;
        species            = $('#species');
        outro              = $('#outro');
        main_counter       = $('#main-counter');
        counter            = $('#scary-bar');
        sequence           = setInterval(updateVisuals, 20);
        globalLoader.unload();
        return;
    }
    init();
    return;
});
