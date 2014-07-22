var logotrends = (function(){
    'use strict';

    var _dims   = getViewportDimensions();
    var height  = _dims.height / 1.4;
    var width   = _dims.width / 1.4;
    var dims    = {'w': width, 'h': height};
    var group   = getSVG('foo', dims, '#container');
    var PADDING   = 50;
    var BAR_WIDTH = 50;

    function init() {
        d3.json('all-categories.json', function(data){
            var total_max = d3.max(data, function(d){return d.total;});
            var totalScale = d3.scale.linear()
            .domain([1, total_max])
            .range([100, height - PADDING])
            .clamp(true);

            var yearScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d){
                return isNaN(d.year) ? 0 : Number(d.year);
            })])
            .range([PADDING, width - PADDING])
            .clamp(true);

            var xScale = d3.scale.linear()
            .domain([0, data.length])
            .range([PADDING * 2, width - PADDING])

            var colorScaleTotal = d3.scale.linear()
            .domain([0, total_max / 2, total_max])
            .range(['gray', 'green', 'blue'])

            var bars;

            bars = group
            .append('g')
            .selectAll('.bar')
            .data(data);

            bars.enter()
            .append('rect')
            .attr('height', 0)
            .attr('y', height)
            .transition()
            .delay(function(d, i){return i * 100;})
            .attr('width', BAR_WIDTH)
            .attr('height', function(d){
                return totalScale(d.total) - PADDING * 1.5;
            })
            .attr('fill', function(d){
                return colorScaleTotal(d.total);
            })
            .attr('x', function(d, i){
                return xScale(i);
            })
            .attr('y', function(d){
                return height - totalScale(d.total) + PADDING / 1.5;
            })
            .attr('title', function(d){
                return 'http://www.logolounge.com/article/' + d.year + 'trends';
            })
            .attr('data-url', function(d){
                return 'http://www.logolounge.com/article/' + d.year + 'trends';
            });

            bars
            .on('mouseover', function(d, i){
                d3.select('#tooltip-bg-' + i)
                .classed('hidden', false);
                d3.select('#tooltip-' + i)
                .classed('hidden', false);
            })
            .on('mouseout', function(d, i){
                d3.select('#tooltip-bg-' + i)
                .classed('hidden', true);
                d3.select('#tooltip-' + i)
                .classed('hidden', true);
            })
            .on('mousedown', function(d){
                return window.open(d3.select(this).attr('data-url'));
            });

            group.append('g')
            .selectAll('.bar-text-bg')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 0)
            .transition()
            .delay(function(d, i){return i * 100;})
            .attr('r', 12)
            .attr('fill', 'black')
            .attr('cx', function(d, i){
                return xScale(i) + BAR_WIDTH / 2;
            })
            .attr('cy', function(d){
                return height - totalScale(d.total) + PADDING / 1.5 - 20;
            });

            // totals
            group.append('g')
            .selectAll('.bar-text-total')
            .data(data)
            .enter()
            .append('text')
            .attr('opacity', 0)
            .transition()
            .delay(function(d, i){return i * 100;})
            .attr('fill', 'white')
            .attr('opacity', 1)
            .attr('text-anchor', 'middle')
            .attr('x', function(d, i){
                return xScale(i) + BAR_WIDTH / 2;
            })
            .attr('y', function(d){
                return height - totalScale(d.total) + PADDING / 1.5 - 17;
            })
            .text(function(d){
                return d.total;
            });

            group.append('g')
            .selectAll('.text-years')
            .data(data)
            .enter()
            .append('text')
            .attr('opacity', 0)
            .transition()
            .delay(function(d, i){return i * 100;})
            .attr('fill', 'black')
            .attr('opacity', 1)
            .attr('text-anchor', 'middle')
            .attr('x', function(d, i){
                return xScale(i) + BAR_WIDTH / 2;
            })
            .attr('y', function(d){
                return height - PADDING / 2;
            })
            .text(function(d){
                return d.year;
            });

            // add tooltips last for z-index
            var tooltips = group
            .append('g')
            .selectAll('.categories')
            .data(data);

            tooltips.enter()
            .append('g')
            .attr('id', function(d, i){
                return 'tooltip-' + i;
            })
            .classed({'hidden': true, 'tooltip': true})
            .attr('width', 200)
            .attr('height', 80)
            .attr('fill', 'black')
            .attr('x', function(d, i){
                return xScale(i) - BAR_WIDTH / 2;
            })
            .attr('y', function(d){
                return height - totalScale(d.total) + PADDING;
            })
            .selectAll('.categories-text-inner')
            .data(function(d){
                return d.categories;
            })
            .enter()
            .append('text')
            .attr('x', 12)
            .attr('y', function(d, i){
                return PADDING + i * 20;
            })
            .text(function(d){
                return d;
            });
        });
    }

    return {
        'init': init
    };
})();

window.onload = logotrends.init;
