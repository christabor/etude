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
    }

    function fmtStr(lb_before, oz_before, total_before) {
        return lb_before + 'lbs' + ' ' + oz_before + 'oz' + ' (Total: ' + total_before + 'lbs)';
    }

    function getData(k, el) {
        // add bg weight difference indicator
        // in-between if there is a before and after
        var data = null;
        var range_data = null;
        var val = null;
        var lb_before = null;
        var oz_before = null;
        var total_before = null;
        var oz_after = null;
        var total_after = null;
        var next_date = null;
        var start = null;
        var end = null;
        var _el = $(el);
        var el_after = $form.parent().find('.form-group').eq(k + 1);

        if(el_after.length === 0) {
            // Reassign ranges if this is the last element
            el_after = _el;
            _el = $form.parent().find('.form-group').eq(k);
        }

        lb_before = parseInt(_el.find('.nb-lb').val(), 10);
        oz_before = parseInt(_el.find('.nb-oz').val(), 10);
        total_before = convertWeight(lb_before, oz_before);

        lb_after = parseInt(el_after.find('.nb-lb').val(), 10);
        oz_after = parseInt(el_after.find('.nb-oz').val(), 10);
        total_after = convertWeight(lb_after, oz_after);

        start = _el.find('.nb-date').val();
        end = el_after.find('.nb-date').val();

        data = {
            start: start,
            content: fmtStr(lb_before, oz_before, total_before)
        };
        range_data = {
            start: start,
            end: end,
            type: 'background',
            content: getContent(total_before, total_after),
            className: getClass(total_before, total_after)
        };

        results.push(range_data);
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

    function addData(e) {
        e.preventDefault();
        $timeline.empty();
        results = [];
        // update data
        $form.find('.form-group').each(getData);
        var options  = {padding: 20};
        var data     = new vis.DataSet(results);
        var timeline = new vis.Timeline($timeline[0], data, options);
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
        $form.on('submit', addData);
        $add.on('click', addNewDate);
        $add.click();
    }

    return {
        init: init
    };

})();
$(document).ready(calc.init);
