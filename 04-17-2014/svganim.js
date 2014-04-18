var paper = (function(){
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var $generate = document.getElementById('btn');
    var svg       = document.querySelector('svg');
    var p         = document.querySelector('path');
    var padding   = 100;


    function smoothSVGLoop(count, max) {
        var path = '';
        for(var i = 0; i <= count; i+=4) {
            path += 'q ' + i + ' ';
            path += padding + max * i / 2 + ' ';
            path += padding + rando(width / 4) + ' ';
            path += padding + max * i / 4 + ' ';
        }
        return path;
    }

    function svgLine(max) {
        return ['L', max * 1.2, max * 1.4].join(' ');
    }

    function randomPath() {
        return ['M100 100 l -10',
        padding + rando(height / 4),
        smoothSVGLoop(4, 20),
        svgLine(rando(20)),
        smoothSVGLoop(4, 20),
        smoothSVGLoop(4, 20),
        svgLine(rando(20)),
        smoothSVGLoop(rando(10), 20), 'Z'
        ].join(',');
    }

    function generate() {
        svg.style.display = 'block';
        svg.setAttribute('stroke', randomColor(255));
        svg.setAttribute('stroke-width', rando(10));
        p.setAttribute('d', randomPath());
        animatePath(p);
    }

    function init() {
        $generate.onclick = generate;
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        generate();
    }

    return {
        'init': init
    };

})();

window.onload = paper.init;
