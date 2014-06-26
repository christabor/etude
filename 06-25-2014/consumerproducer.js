var consumerproducer = (function(){
    'use strict';
    var dims              = getViewportDimensions();

    // dom nodes
    var $aux              = d3.select('#aux');
    var $producing        = d3.select('#producing');
    var $processing       = d3.select('#processing');
    var LOG_LEVEL         = 2;
    var main              = d3.select('body');
    var DEFAULT_BAR_WIDTH = 0;
    var MAX_BAR_WIDTH     = dims.width / 2;
    var MAX_BAR_HEIGHT    = 15;
    var BAR_PADDING       = MAX_BAR_HEIGHT / 2.2;

    // events keeper
    var events            = [];
    var completed         = [];
    var data_pool         = [];
    // all potential tranformation functions
    var trans_funcs       = [subtract, add, multiply];

    // dom buckets to hold logs of various types
    var buckets           = {
        'aux': $aux,
        'produce': $producing,
        'process': $processing
    };

    var visualizer = d3.select('#svg-container')
    .append('svg')
    .attr('width', MAX_BAR_WIDTH)
    .attr('height', 100)
    .append('g')
    .attr('id', 'main-group');

    visualizer.append('text')
    .attr('x', 0).attr('y', BAR_PADDING)
    .text('Processing:');

    visualizer.append('text')
    .attr('x', 0).attr('y', MAX_BAR_HEIGHT * 4 - BAR_PADDING)
    .text('Producing:');

    var proc_graph_bg = visualizer.append('rect')
    .attr('height', MAX_BAR_HEIGHT)
    .attr('width', MAX_BAR_WIDTH)
    .attr('x', 0)
    .attr('y', MAX_BAR_HEIGHT)
    .attr('fill', 'green')
    .attr('opacity', 0.2);

    var proc_graph = visualizer.append('rect')
    .attr('height', MAX_BAR_HEIGHT)
    .attr('width', 0)
    .attr('x', 0)
    .attr('y', MAX_BAR_HEIGHT)
    .attr('fill', 'green');

    var prod_graph_bg = visualizer.append('rect')
    .attr('height', MAX_BAR_HEIGHT)
    .attr('width', dims.width / 2)
    .attr('x', 0)
    .attr('y', MAX_BAR_HEIGHT * 4)
    .attr('opacity', 0.2)
    .attr('fill', 'red');

    var prod_graph = visualizer.append('rect')
    .attr('height', MAX_BAR_HEIGHT)
    .attr('width', 0)
    .attr('x', 0)
    .attr('y', MAX_BAR_HEIGHT * 4)
    .attr('fill', 'red');

    function init() {
        // Delay for user' sake
        setTimeout(start, 1000);
    }

    function start() {
        flushGraphs();
        startFlow();
        // Prevent it from endlessly running by timing it out.
        stopFlow(10000);
    }

    function stopFlow(delay) {
        setTimeout(clearEvents, delay);
    }

    function log(msg, bucket) {
        if(LOG_LEVEL <= 2) {
            console.log(msg);
            if(bucket) {
                var _bucket = buckets[bucket];
                _bucket.append('p')
                .attr('class', 'animated fadeInDown')
                .text(msg);
                // force a scroll to bottom.
                _bucket[0][0].scrollTop = _bucket[0][0].scrollHeight;
            }
        }
    }

    function startFlow() {
        log('[SYSTEM] Starting up data flow ...', 'aux');
        setEvent('Data producer', produceData, 200);
        setEvent('Data processor', processData, 600);
    }

    function add(chunk) {
        if(isNaN(chunk.data)) return chunk;
        chunk.data += 1;
        return chunk;
    }

    function subtract(chunk) {
        if(isNaN(chunk.data)) return chunk;
        chunk.data -= 1;
        return chunk;
    }

    function multiply(chunk) {
        if(isNaN(chunk.data)) return chunk;
        chunk.data = chunk.data * chunk.data;
        return chunk;
    }

    function dataGenerator() {
        return {'uuid': uuid(), 'data': rando(1000)};
    }

    function transformData(data_chunk, transform) {
        // Process new value
        data_chunk = transform(data_chunk);
        // Move to completed stack.
        completed.push({'data': data_pool.shift(data_chunk), 'completed': new Date()});

        // Debugging
        // console.log(completed);
        // console.log(data_pool);
        // console.log(data_chunk);
    }

    function produceData() {
        proc_graph.transition().attr('width', DEFAULT_BAR_WIDTH);
        prod_graph.transition().attr('width', MAX_BAR_WIDTH);
        // a misc "pluggable" data generator
        var data = dataGenerator();

        log('[PRODUCING] ... ' + JSON.stringify(data), 'produce');
        return data_pool.push(data);
    }

    function processData() {
        prod_graph.transition().attr('width', DEFAULT_BAR_WIDTH);
        proc_graph.transition().attr('width', MAX_BAR_WIDTH);
        // Some random transformation rules that
        // defer logic to the transformation engine
        var trans_func = randomArrayValue(trans_funcs);
        for(var i = 0; i < data_pool.length; i++) {
            // Parse all data chunks using the
            // specified transformation function
            transformData(data_pool[i], trans_func);
            log('[PROCESSING] ... ' + JSON.stringify(data_pool[i]) + ' with "' + String(trans_func).substr(0, 20) + '..."', 'process');
        }
    }

    function flushGraphs() {
        log('[INFO] Flushing graphs ...', 'aux');
        prod_graph.transition().attr('width', DEFAULT_BAR_WIDTH);
        proc_graph.transition().attr('width', DEFAULT_BAR_WIDTH);
    }

    function setEvent(name, func, interval) {
        log('[INFO] Added event: "' + name + '", running every ' + interval + ' seconds.', 'aux');
        var interval_func = setInterval(func, interval);
        // adds an interval to an event manager
        // and then runs it.
        return events.push({'name': name, 'func': interval_func, 'interval': interval});
    }

    function clearEvents() {
        log('[SYSTEM] Clearing all events from event manager...', 'aux');
        for(var ev in events) {
            clearInterval(events[ev].func);
        }
        flushGraphs();
    }

    return {
        'init': init
    };
})();

window.onload = consumerproducer.init;
