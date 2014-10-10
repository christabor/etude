var cayley = (function(){
    var $table = $('#table');
    var $btn   = $('#generate');
    var $square = $('#square').find('input');

    function td(datum) {
        return '<td>' + datum + '</td>';
    }

    function generateTable(edge, operation) {
        var html = '';
        for(var row = 0; row < edge.length; row++) {
            html += '<tr>';
            // Show first item like normal,
            // But shift by one inside of inner loop.
            // If top corner, make it blank.
            if(row === 0) {
                html += td('');
            } else {
                html += td(edge[row]);
            }
            for(var col = 0; col < edge.length; col++) {
                // Leave alone if top edge,
                // Otherwise do combination
                // top row, second to first and beyond
                if(row === 0 && col !== 0) {
                    html += td(edge[col]);
                } else if(col !== 0) {
                    // Allow arbitrary operations for customized tables
                    html += td(operation(edge[row], edge[col]));
                } else {
                }
            }
            html += '<tr>';
        }
        return html;
    }

    var operations = {
        group: function(val1, val2) {
            return val1 + ' o ' + val2;
        },
        add: function(val1, val2) {
            if(isNaN(val1)) return val1 + '' + val2;
            return val1 + val2;
        },
        mul: function(val1, val2) {
            if(isNaN(val1)) return val1 + '' + val2;
            return val1 * val2;
        }
    };

    var func_types = {
        identity: function(cntx, value) {
            return value;
        },
        binary: function(cntx, value) {
            return randomBinary(3);
        },
        sets: function(cntx, value) {
            return '{' + rando(10) + ':' + value + '}';
        },
        sentence: function(cntx, value) {
            return randomSentence(1, 1, '-');
        }
    };

    function init() {
        // convert obj to array for randomizing
        var ops_converted = $.map(operations, function(d){return d;});
        var fns_converted = $.map(func_types, function(d){return d;});
        $btn.on('click', function(){
            var MAX_ITEMS = rando(8) + 4;
            var edges = newArr(MAX_ITEMS, randomArrayValue(fns_converted));
            var html = generateTable(edges, randomArrayValue(ops_converted));
            $table.html(html);
        });

        $square.on('click', function(){
            $table.toggleClass('square');
        });
        $btn.click();
    }

    return {
        init: init
    };

})();
$(document).ready(cayley.init);
