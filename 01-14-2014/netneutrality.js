var health_interval;
var interval;
var dims            = getViewportDimensions();
var width           = dims.width;
var height          = dims.height;
var message_box     = $('#message-box');
var intro           = $('#intro');
var controls        = $('#controls');
var attackspace     = $('#attackspace');
var options         = $('#options');
var level           = $('#level').find('.score');
var longest_bar     = $('#longest-word').find('.score');
var $highscore      = $('#highscore').find('.score');
var internet_bar    = $('#internet-life').find('.life-inner');
var healthbar       = $('#internet-life').find('#internet-health');
var main            = $('#main');
var form            = main.find('form');
var input           = form.find('input');
var current_speed   = 10;
var SPEED_INCREASE  = 70;
var point_value     = 10;
var attack_value    = 10;
var health          = 100;
var attack_speed    = 900;
var highscore       = 0;
var longest         = 0;
var uncleared_words = 0;
var current_level   = 0;
var phases          = {
    '1': [
    'net',
    'verizon',
    'dump-truck',
    'AT&T'
    ]
};
var extra_words   = [
'arpanet',
'series of tubes',
'rapid',
'FCC',
'neutrality',
'freedom',
'freepress',
'ruling',
'open web',
'non-profit',
'overlords',
'advocates',
'disastrous',
'cable',
'monopoly',
'duopoly',
'software',
'bureaucracy',
'internet',
'google',
't-mobile',
'yahoo',
'NSA',
'sprint',
'tubes',
'Obama',
'human rights'
];

function init() {
    // set the current phase
    updateLevel();

    // check words on submit
    form.on('submit', checkWords);

    health_interval = setInterval(checkHealth, 10);
}

function updateSpeed(new_speed) {
    attack_speed = new_speed;
}

function checkForMatches(typed) {
    var words = attackspace.find('.netword');
    var matches = false;
    $.each(words, function(k, word){
        var text = $(word).text();
        if(typed === text) {
            matches = true;
            uncleared_words -= 1;
            $(this).css('background-color', 'red').fadeOut(100, function(){
                $(this).remove();
            });
            return false;
        }
    });
    return matches;
}

function checkHealth() {
    log('checking health...');
    log(health);
    // update bars
    if(health > 0) {
        internet_bar.css('height', health + '%');
        healthbar.text(health + '%');
        $highscore.text(highscore);
    } else {
        internet_bar.css('height', '0%');
        healthbar.text('0%');
        $highscore.text(0);
        endGame();
    }
}

function endGame() {
    clearInterval(health_interval);
    clearInterval(interval);
    triggerMsg('You did great, but you lost!');
    attackspace.html('<h2>You did great! <br /><strong>Now, go fight for Net Neutrality!</strong></h2>');
}

function updatePoints(amount, type) {
    if(type === 'add') {
        health += amount;
        highscore += amount;
    } else {
        health -= attack_value;
        highscore -= amount;
    }
}

function triggerMsg(msg) {
    message_box.text(msg)
    .show()
    .delay(100)
    .fadeOut(100);
}

function updateLongest(word) {
    longest = word;
    longest_bar.text(longest + ' letters');
}

function checkForCollision(top, word) {
    // remove the word and subtract points
    // if it's gone below the screen
    if(top > height) {
        uncleared_words -= 1;
        updatePoints(point_value, 'subtract');
        $(this).css('background-color', 'red').fadeOut(100, function(){
            $(this).remove();
        });
        return false;
    } else {

        // otherwise keep animating
        $(word).css('top', (top + 10) + 'px');
    }
}

function animateWords() {
    var words   = attackspace.find('.netword');
    var matches = false;

    interval = setInterval(function(){

        // clear out the interval from
        // previous run if necessary
        checkInterval();

        $.each(words, function(k, word){
            var top  = convertPxToNum($(word).css('top'));
            checkForCollision(top, word);
        });
    }, attack_speed);
}

function updateLevel() {
    var phase;

    // update to new phase
    if(attack_speed <= 0) {
        attack_speed = 1000;
        return;
    }

    current_level += 1;
    triggerMsg('New Level: ' + current_level);
    level.text(current_level);

    // get the words for a given phase
    // only one for now.
    phase = phases['1'];

    // update the value of each point given
    point_value += 10;

    // add some more words to the list,
    // keeping the old ones.
    phase.push(randomArrayValue(extra_words));
    phase.push(randomArrayValue(extra_words));

    // set current count of uncleared
    // words to equal the words in list
    uncleared_words = phase.length;

    // empty everything out
    attackspace.empty();

    // add the words to DOM
    for (var i = 0; i < phase.length; i++) {
        addWord(phase[i]);
    }

    // update the speed,
    // set the animation up again.
    updateSpeed(attack_speed - SPEED_INCREASE);
    animateWords();
}

function addWord(text) {
    var word = $('<li></li>');
    word.addClass('netword')
    .css({
        'background-color': randomColor(255),
        'top': '-50px',
        'left': rando(width) + 'px'
    })
    .text(text);
    attackspace.append(word);
}

function checkInterval() {
    // reset a new phase and clear interval
    // if all words have been cleared
    if(uncleared_words === 0) {
        clearInterval(interval);
        updateLevel();
        return;
    }
}

function checkWords(event) {
    event.preventDefault();
    var matched;
    var text = input.val();

    // check the interval
    // and check if all words
    // have been cleared
    checkInterval();

    // check for the collision
    matched = checkForMatches(text);
    if(matched) {
        if(text.length > longest) {
            updateLongest(text.length);
        }
        updatePoints(point_value, 'add');
    } else {
        updatePoints(point_value, 'subtract');
    }

    // reset
    input.val('');
}

$(document).ready(init);
