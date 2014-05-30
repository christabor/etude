var birdie = (function(){
    'use strict';
    var is_playing = false;
    var $crow      = $('#crow');
    var squawk     = new Howl({
        urls: ['crow.mp3']
    });

    function talking() {
        var active_note = rando(10) > 5 ? birdTalk : birdTalkTwo;
        if(!is_playing) {
            squawk.play();
            is_playing = true;
            active_note();
        } else {
            is_playing = false;
        }
        $('body').toggleClass('dark');
        $crow.find('#perched').toggle();
        $crow.find('#talking').toggle();
    }

    function birdTalk(e) {
        $('#notes').find('svg').find('#double').hide();
        $('#notes').find('svg').find('#single').show().delay(10).fadeOut(300);
    }

    function birdTalkTwo(e) {
        $('#notes').find('svg').find('#double').show().delay(10).fadeOut(300);
        $('#notes').find('svg').find('#single').hide();
    }

    function addEvents(data) {
        $('#double, #single').hide();
        $('#perched, #talking').on('click', talking);
    }

    function init() {
        $('body').removeClass('hidden');
        $('#notes').load('notes.svg');
        $crow.load('birds.svg', addEvents);
    }

    return {
        init: init
    };

})();

$(document).ready(birdie.init);
