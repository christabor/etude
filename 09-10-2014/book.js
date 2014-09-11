window.onload = function(){
    'use strict';
    var dims      = getViewportDimensions();
    var width     = dims.width;
    var height    = dims.height;
    var _dims     = {'w': height - 200, 'h': height - 100};
    var container = getSVG(uuid(), _dims, '#contents');
    var books     = [
        ['I, Robot', 'Isaac Asimov'],
        ['Journey to the center of the earth', 'Jules Verne'],
        ['Grapes of Wrath', 'John Steinbeck'],
        ['The Great Gatsby', 'F. Scott Fitzgerald'],
        ['To Kill a Mockingbird', 'Harper Lee'],
        ['The Catcher in the Rye', 'J.D. Salinger'],
        ['The Adventures of Huckleberry Finn', 'Mark Twain'],
        ['Fahrenheit 451', 'Ray Bradbury'],
        ['Stranger in a Strange Land', 'Robert Heinlein'],
        ['Slaughterhouse-Five', 'Kurt Vonnegut'],
        ['Death of a Salesman', 'Arthur Miller'],
        ['20,000 leagues under the sea', 'Jules Verne'],
        ['Moby Dick', 'Herman Melville']
    ];

    var fontScale = d3.scale.linear()
                    .domain([d3.max(books, function(d){return d[0].length;}), 1])
                    .range([30, 80]).clamp(true);

    function init() {
        var group = container.append('g')
        .attr('transform', 'translate(0, 300)');
        var book = randomArrayValue(books);
        var fg_val = rando(255) + 10;
        var fg = randomColor(fg_val);
        var bg = randomColor(Math.abs(255 - fg_val) + 10);

        // bg rectangle
        group.append('rect')
        .classed('bg', true)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', _dims.w)
        .attr('height', _dims.h)
        .attr('fill', bg);

        // background companies text
        group.selectAll('.companies')
        .data(d3.range(100))
        .enter()
        .append('circle')
        .classed('companies', true)
        .attr('fill', function(d, i){return i % 2 === 0 ? 'none' : fg;})
        .attr('stroke-width', function(d, i){return rando(10);})
        .attr('stroke', function(d, i){return i % 2 === 0 ? fg : 'none';})
        .attr('cx', function(){return rando(_dims.w);})
        .attr('cy', function(){return rando(_dims.h) + 100;})
        .attr('r', function(d, i){return clamp(rando(i), 1, 100);});
        text([book[0]], 100, fg, null);
        text([book[1]], 160, bg, 24);
    }

    function text(text_el, y, color, font_size) {
        // book title
        container
        .selectAll('.title')
        .data(text_el)
        .enter()
        .append('text')
        .attr('x', 40)
        .attr('fill', color)
        .attr('font-size', function(d){
            if(font_size) return font_size + 'px';
            return fontScale(d.length) + 'px';
        })
        .attr('y', y)
        .text(function(d){return d;});
    }

    init();
};
