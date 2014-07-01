var binarychoice = (function(){
    'use strict';
    var dims   = getViewportDimensions();
    var width  = dims.width / 2;
    var height = dims.height / 2;
    var h      = 12;
    var data_0 = [];
    var data_1 = [];

    function init() {
        var container = getSVG('cont', dims, '#container');
        var ypos      = height / 1.4;
        var offset    = 0;
        var bars      = container.selectAll('rect');
        var rect_0    = container.append('rect')
        .attr('x', 0)
        .attr('y', offset)
        .attr('height', h - offset)
        .attr('width', width / 2)
        .attr('id', '0')
        .attr('fill', '#999');

        var label_0 = container
        .append('text').text('0s - 0')
        .attr('text-anchor', 'middle')
        .attr('x', width / 4)
        .attr('y', ypos + offset);

        var rect_0_bg = container.append('rect')
        .attr('x', 0)
        .attr('y', offset)
        .attr('opacity', 0.1)
        .attr('height', height - offset)
        .attr('width', width / 2)
        .attr('id', '0')
        .attr('fill', 'black');

        var rect_1 = container.append('rect')
        .attr('x', width / 2)
        .attr('y', offset)
        .attr('height', h - offset)
        .attr('width', width / 2)
        .attr('id', '1')
        .attr('fill', 'red');

        var rect_1_bg = container.append('rect')
        .attr('x', width / 2)
        .attr('y', offset)
        .attr('opacity', 0.1)
        .attr('height', height - offset)
        .attr('width', width / 2)
        .attr('id', '1')
        .attr('fill', 'red');

        var label_1 = container
        .append('text').text('1s - 0')
        .attr('text-anchor', 'middle')
        .attr('x', width / 2 + (width / 4))
        .attr('y', ypos + offset);

        function tick(zero_length, one_length) {
            rect_0.attr('height', zero_length);
            rect_1.attr('height', one_length);

            label_0.text('0s - ' + zero_length);
            label_1.text('1s - ' + one_length);
        }

        d3.timer(function(d){
            var zero_length = data_0.length;
            var one_length = data_1.length;
            var num = parseInt(randomBinary(0), 10);
            if(zero_length >= height || one_length >= height) return false;
            num === 0 ? data_0.push(num) : data_1.push(num);
            tick(zero_length, one_length);
        });

        function binaryTrial(max) {
            // Run a single trial, determining
            // how many random 0s and 1s are created.
            var one = 0;
            var zero = 0;
            for(var i = 0; i < max; i++) {
                var val = parseInt(randomBinary(0), 10);
                if(val === 0) {
                    zero += 1;
                } else {
                    one += 1;
                }
            }
            return {'1': one, '0': zero};
        }

        function allTrials(max, max_per_trial) {
            // Generate a number of trial results to compute
            // statistics across a range of trial runs.
            var trials = [];
            for(var i = 0; i < max; i++) {
                trials.push(binaryTrial(max_per_trial));
            }
            return trials;
        }

        // Generate bar charts, 2 per trial - for both zero and one results.
        var dims_2           = {'w': 400, 'h': 500};
        var trials_container = getSVG('trial-results', dims_2, '#trials');
        var font_size        = 8;
        var PADDING          = 10;
        var MAX_TRIALS       = 10;
        var trial_data       = allTrials(MAX_TRIALS, 100);
        var trial_range_h    = [PADDING, height / 2 - PADDING];

        var trial_scale_zero_h = d3.scale.linear()
        .domain([0, d3.max(trial_data, function(d){return d['0']})])
        .range(trial_range_h);

        var trial_scale_one_h = d3.scale.linear()
        .domain([0, d3.max(trial_data, function(d){return d['1']})])
        .range(trial_range_h);

        var bar_width = (dims_2.w / 2) / MAX_TRIALS - PADDING;

        function addZeroes() {
            // zeroes
            var z = trials_container.append('g')
            .attr('id', 'zero-trials');

            z.selectAll('rect')
            .data(trial_data)
            .enter()
            .append('rect')
            .attr('width', bar_width)
            .attr('fill', '#999')
            .attr('x', function(d, i){return i * bar_width * 4 - bar_width;})
            .attr('height', function(d){return trial_scale_zero_h(d['0'])});

            var labels_0 = trials_container.append('g')
            .attr('id', 'trials-labels-0')
            .selectAll('text')
            .data(trial_data)
            .enter()
            .append('text')
            .attr('fill', '#999')
            .attr('font-size', font_size)
            .attr('text-anchor', 'middle')
            .text(function(d){return d['0'];})
            .attr('x', function(d, i){return i * bar_width * 4 - bar_width / 2;})
            .attr('y', function(d){return trial_scale_zero_h(d['0']) + PADDING;});
        }

        function addOnes() {
            // ones
            var o = trials_container.append('g')
            .attr('id', 'one-trials');

            o.selectAll('rect')
            .data(trial_data)
            .enter()
            .append('rect')
            .attr('width', bar_width)
            .attr('fill', 'red')
            .attr('x', function(d, i){return i * bar_width * 4 + bar_width;})
            .attr('height', function(d){return trial_scale_zero_h(d['1'])});

            var labels_1 = trials_container.append('g')
            .attr('id', 'trials-labels-1')
            .selectAll('text')
            .data(trial_data)
            .enter()
            .append('text')
            .attr('fill', 'red')
            .attr('font-size', font_size)
            .attr('text-anchor', 'middle')
            .text(function(d){return d['1'];})
            .attr('x', function(d, i){return i * bar_width * 4 + bar_width + (bar_width / 2);})
            .attr('y', function(d){return trial_scale_zero_h(d['1']) + PADDING;});
        }

        function addTrialMarkers() {
            trials_container.append('g')
            .attr('id', 'trial-makers')
            .selectAll('text')
            .data(trial_data)
            .enter()
            .append('text')
            .attr('font-size', font_size)
            .attr('fill', '#444')
            .text(function(d, i){return 'T' + i;})
            .attr('x', function(d, i){return i * 40 + bar_width / 5.4;})
            .attr('y', -4);
        }

        addOnes();
        addZeroes();
        addTrialMarkers();
    }

    return {
        'init': init
    };
})();

window.onload = binarychoice.init;
