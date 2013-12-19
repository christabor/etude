$(document).ready(function () {
    var linear                = $('#linear');
    var exponential           = $('#exponential');
    var linear_indicator      = linear.find('.growth-indicator');
    var exponential_indicator = exponential.find('.growth-indicator');
    var linear_bar            = linear.find('.growth-bar-progress');
    var exponential_bar       = exponential.find('.growth-bar-progress');
    var stop                  = $('#stop-running');
    var is_running            = true;

    var LINEAR_STEP           = 5;
    var EXPONENTIAL_STEP      = 1000;
    var linear_count          = 0;
    var exponential_count     = 2;
    var linear_interval       = setInterval(linear_fn, LINEAR_STEP);
    var exponential_interval  = setInterval(exponential_fn, EXPONENTIAL_STEP);

    function linear_fn(){
        log('linear:' + linear_count);
        linear_count = linear_count + 1;
        linear_indicator.text(linear_count);
        updateBar(linear_bar, linear_count);
        return;
    }

    function resetIntervals() {
        linear_interval = setInterval(linear_fn, LINEAR_STEP);
        exponential_interval  = setInterval(exponential_fn, EXPONENTIAL_STEP);
        return;
    }

    function exponential_fn(){
        if(exponential_count === Infinity) return;
        log('exp:' + exponential_count);
        exponential_count = exponential_count * exponential_count;
        exponential_indicator.text(exponential_count);
        updateBar(exponential_bar, exponential_count);
        return;
    }

    function updateBar(bar, amount) {
        bar.css('height', amount + 'px');
        return;
    }

    stop.on('click', function(e){
        e.preventDefault();
        if(is_running) {
            $(this).text('Start running');
            clearInterval(exponential_interval);
            clearInterval(linear_interval);
            is_running = false;
        } else {
            $(this).text('Stop running');
            resetIntervals();
            is_running = true;
        }
        return;
    });
    return;
});
