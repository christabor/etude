$(document).ready(function(){
    var rando_half = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

    function obfuscate(number, str) {
        // divide the number into a string for each increment
        // giving an equal representation of itself, albeit more obfuscated.
        if(!number || isNaN(number) || number <= 0) return str;
        if(!str) str = '';
        str += fractionate(number) + '<br />';
        return str;
        // return obfuscate(number - 1, str);
    }

    function fractionate(number) {
        // runs through the length of number and
        // generates half-fractions in place of each number
        var str = '';
        for(var i = 1; i <= number; i++) {
            // add half * 2 for each number, and also prevent
            // trailing + if last number (e.g 1 + 1 +)
            str += [randHalfFraction(), randHalfFraction()].join(' + ') + (i < number ? ' + ': '');
        }
        return str;
    }

    function randHalfFraction() {
        // returns a random fraction that is always some form that
        // can be reduced to 1/2
        var h = randomArrayValue(rando_half);
        return ' ' + h + '/' + (h * 2);
    }

    function update(e) {
        e.preventDefault();
        var results = null;
        var number = $(this).find('input').val();
        if(number > 9999) {
            number = '<span class="error">Sorry, but that number is too big. Try something smaller.</span>';
        } else {
            results = obfuscate(number, null);
            number = ('<strong>' + number +'</strong><br />' + ' = <br />' + results);
        }
        $('#obfuscated').html('\\alpha(x) \\infty')
        $('#obfuscated').html(number)
        .css('font-size', clamp(number.length / 10, 20, 40) + 'px');
    }

    function init() {
        $('form').on('submit', update);
    }

    init();
});
