var summation = (function(){
    var $input   = $('input');
    var $start   = $('#start');
    var $end     = $('#end');
    var $results = $('#results');

    function sum(num) {
        var res = 0;
        for(var i = 0; i <= num; i++) {
            res += i;
        }
        return res;
    }

    function range(start, end, func) {
        for(var i = start; i <= end; i++) {
            func.apply(this, [i, sum(i)]);
        }
    }

    function td(val) {
        return '<td>' + val + '</td>';
    }

    function addRow(num, sum) {
        $results.append('<tr>' + td(num) + td(sum) + '</tr>');
    }

    function drawTable() {
        $results.empty();
        var start = parseInt($start.val(), 10);
        var end = parseInt($end.val(), 10);
        if(start > end) return;
        range(start, end, addRow);
    }

    function init() {
        $input.on('keyup keydown keypress', drawTable);
    }

    return {
        'init': init
    };

})();

$(document).ready(summation.init);
