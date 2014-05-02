var lettergraph = (function(){
    var $results = $('#results');
    var $text    = $('input');
    var map      = {
        'a': [5, 3],
        'b': [3, 3],
        'c': [2, 1],
        'd': [2, 2],
        'e': [6, 4],
        'f': [5, 3],
        'g': [5, 3],
        'h': [6, 3],
        'i': [6, 3],
        'j': [4, 2],
        'k': [6, 3],
        'l': [3, 2],
        'm': [5, 4],
        'n': [4, 3],
        'o': [0, 1],
        'p': [3, 2],
        'q': [2, 2],
        'r': [4, 3],
        's': [2, 1],
        't': [4, 2],
        'u': [2, 1],
        'v': [3, 2],
        'w': [5, 4],
        'x': [5, 2],
        'y': [4, 2],
        'z': [4, 3]
    };


    function getLetterGraph() {
        var letters = $text.val().replace(/[^a-zA-Z]/g, '')
        .toLowerCase().split('');
        $results.empty();
        for(var i = 0, len = letters.length - 1; i <= len; i++) {
            var res = map[letters[i]];
            var html = ['<span class="unit"><span class="letter">',
                        letters[i], '</span>', 'vertices: ', res[0], '<br>',
                        'edges: ', res[1], ' ',
                        '</span>'].join('');
            $results.append(html);
        }
    }

    function init() {
        $('form').on('submit', function(e){e.preventDefault();});
        $text.on('keyup change', getLetterGraph);
    }

    return {
        init: init
    };

})();
$(document).ready(lettergraph.init);
