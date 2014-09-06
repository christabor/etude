window.onload = function(){
    'use strict';
    if(!RoverWidget) return;
    var TESTING     = 100;
    var container   = document.getElementById('container');
    var output      = document.getElementById('output');
    var dims        = {'height': document.documentElement.clientHeight,
                       'width': document.documentElement.clientWidth};
    var widget_opts = {'panel': output, 'dims': dims, 'delay': TESTING ? 0 : 100};
    var widget      = new RoverWidget(widget_opts);
    var queue       = new widget.Queue();
    var rover1      = {'rover': new widget.Rover(1, 2, 'N'), 'tour': 'LMLMLMLMM'};
    var rover2      = {'rover': new widget.Rover(3, 3, 'E'), 'tour': 'MMRMMRMRRM'};

    // Quick and dirty testing functions
    function assertEqual(first, second) {
        if(console.log) console.log(first === second);
        return first === second;
    }

    function runTests() {
        var pos1 = rover1.rover.position();
        var pos2 = rover2.rover.position();

        assertEqual(pos1.x, 1);
        assertEqual(pos1.y, 3);
        assertEqual(pos1.heading, 'N');

        assertEqual(pos2.x, 5);
        assertEqual(pos2.y, 1);
        assertEqual(pos2.heading, 'E');
    }

    function init() {
        // Declarative chaining style
        queue.add(rover1).add(rover2).run();
        if(TESTING) setTimeout(runTests, 1000);
    }

    init();
};
