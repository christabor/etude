window.onload = function(){
    'use strict';
    var group         = d3.select('#contents');
    var dims          = getViewportDimensions();
    var PADDING       = 100;
    var fibos         = d3.range(12).map(fibo);
    var nodeScale     = d3.scale.linear()
                        .clamp(true)
                        .domain([d3.max(fibos), d3.min(fibos)])
                        .range([300, 40]);
    var names_male    = ['Henry', 'James', 'Clark', 'Maxwell',
                         'Ludwig', 'Beethoven', 'Bertrand', 'Simpson',
                         'Darnell', 'Jurgen', 'Samwell', 'Kristoff',
                         'Spot', 'Poppin', 'Twinkle', 'Ellington', 'francis',
                         'Richard', 'Pumpkin', 'Mocha', 'Muffin'];

    var names_female  = ['Beatrice', 'Elizabeth', 'Agatha', 'Francine',
                         'Victoria', 'Helen', 'Bella', 'Daisy', 'Lily', 'Lola',
                         'Peanut', 'Coco', 'Pepper', 'Chloe', 'Ginger', 'Luna',
                         'Ruby', 'Nibbles', 'Sophie', 'Lulu'];

    var titles_male   = ['Prince', 'Count', 'Sir', 'Duke', 'Lord',
                         'Baron', 'King', 'Emperor'];
    var titles_female = ['Queen', 'Princess', 'Duchess', 'Empress', 'Madam',
                         'Baroness', 'Lady'];
    var gens          = ['I', 'II', 'III', 'IV', 'V', 'Sr', 'Jr'];

    function fibo(n) {
        // slow fibo
        if(n < 2) return n;
        return fibo(n - 1) + fibo(n - 2);
    }

    log(fibo(10));

    function newName(gender) {
        var rav = randomArrayValue;
        if(gender === 'male') {
            return [rav(titles_male), rav(names_male), rav(gens)].join(' ');
        }
        return [rav(titles_female), rav(names_female), rav(gens)].join(' ');
    }

    function addBunnyGroup(count, generation) {
        var g = group.append('div')
        .classed('generation-container', true);

        g.append('h3')
        .text('Generation ' + (generation + 1));

        g.append('p')
        .classed('number-title', true)
        .text('Pairs of Bunnies: ' + count);

        var imgs = g.selectAll('.bunny-image-inner')
        .data(d3.range(count))
        .enter()
        .append('p')
        .classed('subdued-title', true)
        .text(function(d, i){
            return newName('male') + ', ' + newName('female');
        })
        .classed('name', true)
        .append('img')
        .classed('bunny-image-inner', true)
        .attr('width', ~~nodeScale(count))
        .attr('src', 'bunnypair.png');
    }

    function init() {
        var d = d3.range(3, 10).map(fibo);
        d.forEach(function(fib, i){
            addBunnyGroup(fib, i);
        })
    }

    init();
};
