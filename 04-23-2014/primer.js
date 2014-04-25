var primer = (function(){
    var $results = $('#results');
    var $text    = $('textarea');
    var $metrics = $('#metrics');
    var $form    = $('form');
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
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];

    function findPrime(num) {
        var is_prime = false;
        for(var i = 0, len = primes.length - 1; i <= len; i++) {
            if(primes[i] === num) {
                is_prime = true;
            }
        }
        return is_prime;
    }

    function findPrimes(event) {
        var num;
        var is_prime;
        var prime_count = 0;
        var text = $text.val()
        .toLowerCase().replace(/[^a-z]/g, '').split('');
        $results.empty();
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
            $metrics.html('Total primes: ' + prime_count + ' of ' + len + ' letters, or (' + len / prime_count + '%)');
        } else {
            $metrics.empty();
        }
    }

    function init() {
        $form.on('submit', findPrimes);
        $text.on('keyup change', findPrimes);
    }

    return {
        init: init
    };

})();
$(document).ready(primer.init);
