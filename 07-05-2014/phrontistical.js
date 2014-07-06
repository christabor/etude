var phrontistical = (function(){
    'use strict';
    var dims     = getViewportDimensions();
    var height   = dims.height;
    var width    = dims.width;

    function init() {
        var fonts = ['Raleway', 'Droid Serif', 'Lobster', 'BenchNine'];
        var container = getSVG('words', dims, '#container');
        var group = container.append('g');
        var words = ['quadrupedation', 'palaeogaea', 'panduriform',
                     'obambulate', 'umbel', 'unciform', 'wassail',
                     'zabaglione', 'malloseismic', 'methomania', 'mythopoeic',
                     'ebberman', 'entoptic', 'exsuccous', 'dioptric',
                     'doxology', 'dziggetai', 'cancriform', 'carnifex',
                     'chirm', 'cowcat', 'cuddy', 'cytogenesis', 'babeldom',
                     'boman', 'butyric', 'bywoner', 'acicular', 'admanuensis',
                     'alalia', 'alomancy', 'alpenglow', 'amphoriloquy',
                     'aphotic', 'averruncator', 'bufotenine', 'didelphine',
                     'eclat', 'hanaster', 'ischiorrhogic', 'isotherombrose',
                     'lepidine', 'macrocephalic', 'quadragintesimal',
                     'quicquidlibet', 'scientaster', 'sottoportico',
                     'strumpetocracy', 'tolypeutine', 'twee', 'yantra',
                     'zodiographer', 'zymotechnics'];
        var colorScale = d3.scale.linear()
        .domain([d3.max(words, function(d){return d.length;}), d3.max(words, function(d){return d.length / 3;})])
        .range(['#fff', '#111']);

        var $words = group.selectAll('.words')
        .data(words)
        .enter()
        .append('text')
        .attr('font-size', 1)
        .attr('fill', function(d){
            return colorScale(d.length);
        })
        .attr('font-family', function(d){
            return randomArrayValue(fonts);
        })
        .attr('x', function(d, i){return rando(width);})
        .attr('y', function(d, i){return rando(height);})
        .on('mouseover', function(el, _){
            return d3.select(this).classed({'active': true})
        })
        .on('mouseout', function(el, _){
            return d3.select(this).classed({'active': false})
        })
        .on('mousedown', function(el, _){
            return window.open('https://www.google.com/search?q=phrontistery ' + el);
        })
        .transition()
        .ease('bounce')
        .delay(function(d){return d.length * 70;})
        .attr('font-size', function(d){return d.length * 5;})
        .text(function(d){return d;});
    }

    return {
        'init': init
    };
})();

window.onload = phrontistical.init;
