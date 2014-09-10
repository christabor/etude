window.onload = function(){
    'use strict';
    var dims   = getViewportDimensions();
    var width  = dims.width;
    var height = dims.height;

    function init() {
        var _dims     = {'w': 10, 'h': height};
        var trans     = getCenterTranslation(_dims);
        var container = getSVG(uuid(), dims, '#contents');
        var group     = container.append('g').attr('transform', trans);

        d3.json('companies-pos.json', function(data){
            var entries = d3.entries(data);
            var bins = {};
            var length_bins = {};

            // grab the entries
            d3.map(entries).forEach(function(_, entry){
                for(var i = 0, len = entry.value.length; i < len; i++) {
                    var bin = entry.value[i][1];
                    var val_len = entry.key.length;
                    if(bins[bin] === undefined) {
                        bins[bin] = 0;
                    } else {
                        bins[bin] += 1;
                    }
                    if(length_bins[val_len] === undefined) {
                        length_bins[val_len] = 0;
                    } else {
                        length_bins[val_len] += 1;
                    }
                }
            });

            bins = d3.entries(bins);
            length_bins = d3.entries(length_bins);

            var MAX_RADIUS = 200;
            var PADDING = 30;

            var xScale = d3.scale.linear()
            .domain([0, entries.length])
            .range([PADDING, width - PADDING]);

            var yScale = d3.scale.linear()
            .domain([0, entries.length])
            .range([PADDING, height - PADDING]);

            var radiusScaleLength = d3.scale.linear()
            .domain([0, d3.max(entries, function(d){return d.key.length;})])
            .range([2, 100]);

            var radiusScale = d3.scale.linear()
            .domain([
                d3.min(bins, function(d){return d.value;}),
                d3.max(bins, function(d){return d.value;})
            ])
            .range([10, MAX_RADIUS]);

            // background companies text
            container.append('g')
            .selectAll('.companies')
            .data(entries)
            .enter()
            .append('text')
            .classed('companies', true)
            .attr('x', function(){return rando(width);})
            .attr('y', function(){return rando(height);})
            .text(function(d, i){
                return d.key.split('_').join(' ');
            });

            // all lengths
            group.append('g')
            .selectAll('.length')
            .data(length_bins)
            .enter()
            .append('circle')
            .classed('length', true)
            .attr('cx', function(){return rando(width);})
            .attr('cy', function(){return rando(height / 4);})
            .attr('r', function(d){return radiusScaleLength(d.key.length);});
            log(length_bins);

            // bins for each pos tag
            group.append('g')
            .selectAll('.bin-tag')
            .data(bins)
            .enter()
            .append('circle')
            .classed('bin-tag', true)
            .attr('cx', function(d, i){return xScale(d.value * 4  + (i * 30));})
            .attr('cy', function(d){return yScale(d.value);})
            .attr('r', function(d){return radiusScale(d.value);})

            group.append('g')
            .selectAll('.bin-tag-text')
            .data(bins)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('x', function(d, i){return xScale(d.value * 4 + (i * 30));})
            .attr('y', function(d, i){return yScale(d.value) - 20;})
            .text(function(d){return d.key;});
        });

    }

    init();
};
