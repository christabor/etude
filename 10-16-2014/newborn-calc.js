var calc = (function(){
    var DEBUG     = true;
    var $form     = $('form');
    var $add      = $('#add');
    var $timeline = $('#timeline');
    var results   = null;

    // TEST
    if(DEBUG) {
        arLog(convertWeight(1, 0));
        arLog(convertWeight(6, 12));
        arLog(convertWeight(7, 11));
        arLog(fmt('10/20/2014'));
        arLog(fmt('2014/10/20'));
        arLog(fmt(new Date()));
    }

    function fmt(date) {
        var d = new Date(date).toLocaleString().split(' ')[0].split('-');
        // fix reverse order
        if(d[0].length === 2) {
            d = [d[2], d[1], d[0]];
        }
        return d.join('-');
    }

    function getData(k, el) {
        var data;
        var val;

        el = $(el);

        var lb_before = el.find('.nb-lb').val();
        var oz_before = el.find('.nb-oz').val();
        var total_before = convertWeight(parseInt(lb_before, 10), parseInt(oz_before, 10));

        data = {
            start: el.find('.nb-date').val(),
            content: lb_before + 'lbs' + ' ' + oz_before + 'oz' + ' (Total: ' + total_before + 'lbs)'
        };

        // add bg weight difference indicator
        // in-between if there is a before and after
        if(k !== 0) {
            var el_after = $form.parent().find('.form-group').eq(k + 1);
            if(el_after.length < 1) {
                el_after = el;
            }
            var lb_after = el_after.find('.nb-lb').val();
            var oz_after = el_after.find('.nb-oz').val();
            var total_after = convertWeight(parseInt(lb_after, 10), parseInt(oz_after, 10));

            // Increase to next day for bg
            var next_date = new Date(data.start);
            next_date.setHours(24);
            results.push({
                start: fmt(data.start),
                end: fmt(next_date),
                type: 'background',
                content: getContent(total_before, total_after),
                className: getClass(total_before, total_after)
            });
        }
        results.push(data);
    }

    function getClass(before, after) {
        if(before > after) {
            return 'decrease';
        }
        if(before === after) {
            return 'no-change';
        }
        return 'increase';
    }

    function getContent(before, after) {
        if(before > after) {
            return 'lost';
        }
        if(before === after) {
            return 'no change';
        }
        return 'gained';
    }

    function addData() {
        $timeline.empty();
        results = [];
        // update data
        $form.find('.form-group').each(getData);
        var options  = {zoomable: false, padding: 20};
        var data     = new vis.DataSet(results);
        var timeline = new vis.Timeline($timeline[0], data, options);
    }

    function generateResults(e) {
        e.preventDefault();
        addData();
    }

    function convertWeight(lbs, oz) {
        // 1lb = 0.062500 oz
        return lbs + (oz * 0.062500);
    }

    function arLog(msg) {
        log('[DEBUG]: ' + msg);
    }

    function addNewDate(e) {
        e.preventDefault();
        var $last_item = $form.parent().find('.form-group:last');
        var idx        = $last_item.index() + 1;
        var $new_item  = $last_item.clone(false).insertAfter($last_item);
        var $last_date = $new_item.find('.nb-date');

        $last_date.attr('name', 'date-' + idx);
        $new_item.find('.nb-lb').attr('name', 'lb-' + idx)
        $new_item.find('.nb-oz').attr('name', 'oz-' + idx);
    }

    function init() {
        $form.on('submit', generateResults);
        $add.on('click', addNewDate);
        $add.click();
        if(DEBUG) {
            $add.click();
        }
    }

    return {
        init: init
    };

})();
$(document).ready(calc.init);
