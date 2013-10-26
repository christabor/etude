$(document).ready(function(){

    var input_types = ['radio', 'checkbox', 'text', 'submit', 'number', 'time', 'range', 'datetime', 'color'],
    workspace = $('#workspace'),
    body = $('body'),
    timeleft = $('#timeleft').find('.time'),
    timer = 60,
    countdown,
    scorecard = $('#scorecard').find('.score'),
    total_score = 0;

    function getKey(arr) {
        return Math.floor(Math.random() * arr.length);
    }

    function updateScore(score) {
        scorecard.text(score);
        return;
    }

    function doSomethingABunch(thing, times) {
        if(times > 0) {
            thing();
            doSomethingABunch(thing, times - 1);
        }
        return;
    }

    function appendItem(){
        var input = $('<input type="' + input_types[getKey(input_types)] + '" />');
        workspace.append(input);
        return;
    }

    function endGame() {
        $('#game-end').fadeIn().find('.final-score').text(total_score);
        body.off('mouseover mousemove');
        clearInterval(countdown);
        return;
    }

    function finalCountdown() {
        $('#final-countdown').fadeIn(200).text(timer).fadeOut(800);
        console.log('final countdown called');
        return;
    }

    function updateTimer() {
        if(timer === 3 || timer < 4) {
            finalCountdown(timer);
        }
        if(timer > 0) {
            timeleft.text(timer);
            timer--;
        } else {
            endGame();
        }
        return;
    }
    function startGame() {
        $('#controls').fadeIn(100);
        $('#go').delay(100).fadeIn(100).delay(500).fadeOut(100);

        // setup timeout and initial appending of items
        setTimeout(function(){
            countdown = setInterval(updateTimer, 1000);
            doSomethingABunch(appendItem, 1000);
        }, 1000);

        // setup events
        body.on('mouseover', 'input', function(){
            $(this).addClass('exploding').toggle('explode', 300, function(){
                total_score += 10;
                updateScore(total_score);
            }).remove();
        }).on('mousemove', function(){
            appendItem();
        });
        return;
    }

    $('#start-game').on('click', function(){

        // remove it so we can't run more than once
        $('#intro').fadeOut(200, function(){
            $(this).remove();
        });
        startGame();
    });
});
