var quotes = (function(){
    var $set1         = $('#set1').find('.main');
    var $set2         = $('#set2').find('.main');
    var $set1_e       = $('#set1').find('.elof');
    var $set2_e       = $('#set2').find('.elof');
    var $set1_ne      = $('#set1').find('.notelof');
    var $set2_ne      = $('#set2').find('.notelof');
    var $set1_sub     = $('#set1').find('.subset');
    var $set2_sub     = $('#set2').find('.subset');
    var $set1_card    = $('#set1').find('.cardinality');
    var $set2_card    = $('#set2').find('.cardinality');

    var $xor          = $('#xor');
    var $complement   = $('#relcomplement');
    var $generate     = $('#generate');
    var $union        = $('#union');
    var $intersection = $('#intersection');
    var arr_length    = 10;
    var arr_max       = 40;

    function generateSets() {
        var sets = [];
        sets.push(_.uniq(randomNumberArray(arr_length, arr_max)));
        sets.push(_.uniq(randomNumberArray(arr_length, arr_max)));
        return sets;
    }

    function arrToHTML(arr) {
        return [
            '<span class="bracket">{</span>',
            String(arr).replace(/,/g, ', '),
            '<span class="bracket">}</span>'
        ].join('');
    }

    function generateAll() {
        var sets = generateSets();
        var notelof2 = rando(arr_max);
        var notelof1 = rando(arr_max);
        // keep generating until a reasonable amount of
        // matches exist for demonstration porpoises
        while(_.intersection(sets[0], sets[1]).length > 3) {
            sets = generateSets();
        }
        $set1.html(arrToHTML(sets[0]));
        $set2.html(arrToHTML(sets[1]));

        $set1_e.html(arrToHTML(sets[0][0]));
        $set2_e.html(arrToHTML(sets[1][0]));

        // keep generating until the two vars
        // are not elements of their respective set
        // which of course may happen the first time.
        while(_.contains(sets[0], notelof1) && _.contains(sets[1], notelof2)) {
            notelof2 = rando(arr_max);
            notelof1 = rando(arr_max);
        }

        $set1_ne.html(arrToHTML(notelof1));
        $set2_ne.html(arrToHTML(notelof2));

        $set1_card.html(arrToHTML(sets[0].length));
        $set2_card.html(arrToHTML(sets[1].length));

        $set1_sub.html(arrToHTML(sets[0].slice(arr_length / 2)));
        $set2_sub.html(arrToHTML(sets[1].slice(arr_length / 2)));

        $xor.html(arrToHTML(_.xor(sets[0], sets[1])));
        $union.html(arrToHTML(_.union(sets[0], sets[1])));
        $complement.html(arrToHTML(_.difference(sets[0], sets[1])));
        $intersection.html(arrToHTML(_.intersection(sets[0], sets[1])));
    }

    function init() {
        $generate.on('click', generateAll);
        $generate.click();
    }

    return {
        'init': init
    };

})();

$(document).ready(quotes.init);
