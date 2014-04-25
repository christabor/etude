var letric = (function(){
    var $results = $('#results');
    var $text    = $('input');
    var $distances = $('#distances');
    var $metrics = $('#metrics');
    var $distribution = $('#distribution');
    var $mapping = $('#mapping');
    var map      = {
        'a': 1,
        'b': 2,
        'c': 3,
        'd': 4,
        'e': 5,
        'f': 6,
        'g': 7,
        'h': 8,
        'i': 9,
        'j': 10,
        'k': 11,
        'l': 12,
        'm': 13,
        'n': 14,
        'o': 15,
        'p': 16,
        'q': 17,
        'r': 18,
        's': 19,
        't': 20,
        'u': 21,
        'v': 22,
        'w': 23,
        'x': 24,
        'y': 25,
        'z': 26
    };

    function getDistances(letters) {
        var letter_count = {};
        var distances = [];
        var total = letters.length;
        for(var i = 0, len = letters.length - 1; i <= len; i++) {
            var distance = 0;
            var curr_letter = letters[i];
            var prev_letter = letters[i - 1];
            var prev = map[prev_letter];
            var current = map[curr_letter];
            if(!prev) {
                prev_letter = 'NONE';
                prev = 0;
            }
            if(!letter_count[curr_letter]) {
                letter_count[curr_letter] = 1;
            }
            letter_count[curr_letter] += 1;
            distance = Math.abs(current - prev);
            $distances.append('<span class="sequence">' + ['[', prev_letter, ',', prev, ']', '-', '[', curr_letter, ',', current, ']'].join(' ') + ' = ' + distance + '</span>');
            $mapping.append('<span class="sequence">' + curr_letter + '&rarr;' + current + '</span>');
        }
        log(letter_count);
        log(total);
        // calculate distribution after counts have been added up.
        $.each(letter_count, function(k, count){
            $distribution.append('<span class="sequence" style="font-size:'+ clamp((count / total) * 2, 10, 30) +'px">' + k + ': ' + count + '/' + total + ' ... ' + Math.floor((count / total) * 100) + '%</span>');
        });
    }

    function getLetterMetrics(event) {
        var text = $text.val()
        .toLowerCase().replace(/[^a-z]/g, '').split('');
        $results.empty();
        $distribution.empty();
        $distances.empty();
        $mapping.empty();
        getPrimes(text);
        getDistances(text);
    }

    function getPrimes(text) {
        var num;
        var is_prime;
        var prime_count = 0;
        for(var i = 0, len = text.length - 1 ; i <= len; i++) {
            var container = $('<div></div>');
            num = map[text[i]];
            if(!num) {
                num = 0;
            }
            is_prime = findPrime(num);
            if(is_prime) {
                prime_count += 1;
                container.addClass('prime');
            }
            container.html([text[i].toUpperCase(), '<span class="subdued">' + num + '</span>'].join(' / '));
            $results.append(container);
        }
        if(prime_count && len) {
            $metrics.html('Total primes: ' + prime_count + ' of ' + (len + 1) + ' letters, or (' + Math.floor((prime_count / len) * 100) + '%)');
        } else {
            $metrics.empty();
        }
    }

    function init() {
        var random_names = [
            'Rocky Balboa', 'Cliff Hanger', 'I.C. Weiner',
            'Boo Radley', 'Ned Flanders', 'Professor Farnsworth', 'Albert Einstein',
            'Django Reinhardt', 'Bela Lugosi'];
        setTimeout(function(){
            $text.val(randomArrayValue(random_names)).change();
        }, 200);
        $('form').on('submit', function(e){e.preventDefault();});
        $text.on('keyup change', getLetterMetrics);
    }

    return {
        init: init
    };

})();
$(document).ready(letric.init);
