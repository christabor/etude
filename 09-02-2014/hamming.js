window.onload = function(){
    'use strict';
    var dims    = getViewportDimensions();
    var results = document.getElementById('results');

    function hammify(str1, str2) {
        var distance = 0;
        var distance_html = '';
        var i = 0;
        // I feel like this is too simple and
        // I'm missing something important.

        // In theory though, it should be simple enough --
        // compare one string, and find the differences.
        // In the case of strings with different lengths,
        // anything longer than one string is considered a difference,
        // so naturally the distance will increase.

        // Basically, we'll check the shortest string first, and then
        // get the offset and add that to the distance.
        if(str1.length < str2.length) {
            for(i = 0; i < str1.length; i++) {
                if(str1[i] !== str2[i]) {
                    distance += 1;
                    distance_html += '<span class="diff">' + str1[i] + '</span>';
                } else {
                    distance_html += str1[i];
                }
            }
            // Check remainder -- whatever is left.
            for(i = str1.length; i < str2.length; i++) {
                distance += 1;
                distance_html += '<span class="diff">' + str2[i] + '</span>';
            }
        } else {
            for(i = 0; i < str2.length; i++) {
                if(str1[i] !== str2[i]) {
                    distance += 1;
                    distance_html += '<span class="diff">' + str2[i] + '</span>';
                } else {
                    distance_html += str2[i];
                }
            }
            // Check remainder -- whatever is left.
            for(i = str2.length; i < str1.length; i++) {
                distance += 1;
                distance_html += '<span class="diff">' + str1[i] + '</span>';
            }
        }
        return [distance, distance_html];
    }

    function getHamming(e) {
        var inp1 = document.getElementById('inp1').value;
        var inp2 = document.getElementById('inp2').value;
        var res  = hammify(inp1, inp2);
        var html = 'Hamming distance: ' + res[0] + '<br /><span id="comparison">' + res[1] + '</span>';
        results.innerHTML = html;
    }

    function addEvents(id) {
        var el = document.getElementById(id);
        el.onkeydown = getHamming;
        el.onkeyup = getHamming;
        el.onkeypress = getHamming;
    }

    function init() {
        addEvents('inp1');
        addEvents('inp2');
    }

    init();
};
