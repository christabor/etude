window.onload = function(){
    'use strict';
    var dims     = getViewportDimensions();
    var results  = d3.select('#results');
    var text     = d3.select('#information');
    var list     = d3.select('#n-types');
    var table    = 'abcdefghijklmnopqrstuvwxyz';

    function rotN(string, n) {
        var encoded = '';
        for(var i = 0, len = string.length; i < len; i++) {
            // get letter position based on a string
            var pos = getLetterPosition(string[i]);
            // don't convert non-letters or actual numbers
            if(string[i] === ' ' || isNaN(pos) || !isNaN(parseInt(string[i], 10))) {
                encoded += string[i];
            } else {
                // convert as normal
                if(table[pos + n]) {
                    encoded += table[pos + n];
                } else {
                    encoded += table[(pos + n) % table.length];
                }
            }
        }
        return encoded;
    }

    function getLetterPosition(character) {
        if(character.length > 1) throw new RangeError('Only one character allowed!');
        for(var i = 0; i < table.length; i++ ) {
            if(table[i] === character) {
                return i;
            }
        }
        return character;
    }

    function rotNify(e) {
        var val = text.node().value;
        list.selectAll('li').remove();
        list.selectAll('li')
        .data(d3.range(14).map(function(d){
            return {'N': d, 'result': rotN(val, d)};
        }))
        .enter()
        .append('li')
        .html(function(d){
            return '<strong>N=' + d.N + '</strong> ... ' + d.result;
        })
        .classed('rot13', function(d){return d.N === 13 ? true : false;});
    }

    function init() {
        text.on('keyup', rotNify);
    }

    init();
};
