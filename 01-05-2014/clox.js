window.onload = function() {
    var dims              = getViewportDimensions();
    var height            = dims.height;
    var width             = dims.width;
    var $hours            = document.querySelector('#hours span');
    var $minutes          = document.querySelector('#minutes span');
    var $seconds          = document.querySelector('#seconds span');
    var $milliseconds     = document.querySelector('#milliseconds span');
    var $microseconds     = document.querySelector('#microseconds span');
    var canvas_elem       = document.querySelector('canvas');
    var HOURS             = 360000;
    var MINUTES           = 60000;
    var SECONDS           = 1000;
    var MILLISECONDS      = 10;
    var MICROSECONDS      = 1;
    var angle_hour        = 0;
    var angle_millisecond = 0;
    var angle_microsecond = 0;
    var angle_minute      = 0;
    var angle_second      = 0;
    var y_pos             = height / 2 - 40;
    var x_pos             = width / 2;
    var clockhand_base    = 4;
    var clockbody;
    var clockcenter;
    var clockhand_hour;
    var clockhand_minute;
    var clockhand_second;
    var clockhand_millisecond;
    var clockhand_microsecond;

    function hourInterval() {
        setInterval(function(){
            if(angle_hour === 360) {
                angle_hour = 0;
            }
            clockhand_hour.set('angle', angle_hour);
            angle_hour += 1;
            canvas.renderAll();
        }, HOURS);
    }

    function minuteInterval() {
        setInterval(function(){
            if(angle_minute === 360) {
                angle_minute = 0;
            }
            clockhand_minute.set('angle', angle_minute);
            angle_minute += 1;
            $minutes.innerText = angle_minute;
            canvas.renderAll();
        }, MINUTES);
    }

    function secondInterval() {
        setInterval(function(){
            if(angle_second === 360) {
                angle_second = 0;
            }
            clockhand_minute.set('angle', angle_second);
            angle_second += 1;
            $seconds.innerText = angle_second;
            canvas.renderAll();
        }, SECONDS);
    }

    function milliSecondInterval() {
        setInterval(function(){
            if(angle_millisecond === 360) {
                angle_millisecond = 0;
            }
            clockhand_millisecond.set('angle', angle_millisecond);
            $milliseconds.innerText = angle_millisecond;
            angle_millisecond += 1;
            canvas.renderAll();
        }, MILLISECONDS);
    }

    function microSecondInterval() {
        setInterval(function(){
            if(angle_microsecond === 360) {
                angle_microsecond = 0;
            }
            clockhand_microsecond.set('angle', angle_microsecond);
            $microseconds.innerText = angle_microsecond;
            angle_microsecond += 1;
            canvas.renderAll();
        }, MICROSECONDS);
    }

    function setIntervals() {
        hourInterval();
        minuteInterval();
        secondInterval();
        milliSecondInterval();
        microSecondInterval();
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection  = false;

        height = height - 50;

        clockbody = new fabric.Circle({
            stroke: randomColor(255),
            radius: width / 4,
            opacity: 0.2,
            selectable: false,
            fill: randomColor(255),
            top: y_pos,
            left: x_pos
        });
        clockcenter = new fabric.Circle({
            radius: width / 80,
            selectable: false,
            top: y_pos,
            left: x_pos
        });
        clockhand_hour = new fabric.Rect({
            top: y_pos,
            selectable: false,
            left: x_pos,
            fill: randomColor(255),
            width: clockhand_base * 5,
            height: height / 5.5
        });
        clockhand_minute = new fabric.Rect({
            top: y_pos,
            left: x_pos,
            selectable: false,
            fill: randomColor(255),
            width: clockhand_base * 4,
            height: height / 3.5
        });
        clockhand_second = new fabric.Rect({
            top: y_pos,
            left: x_pos,
            selectable: false,
            fill: randomColor(255),
            width: clockhand_base * 3,
            height: height / 2.5
        });
        clockhand_millisecond = new fabric.Rect({
            top: y_pos,
            left: x_pos,
            selectable: false,
            fill: randomColor(255),
            width: clockhand_base * 2,
            height: height / 2
        });
        clockhand_microsecond = new fabric.Rect({
            top: y_pos,
            left: x_pos,
            selectable: false,
            fill: randomColor(255),
            width: clockhand_base,
            height: height / 1.2
        });

        canvas.add(clockbody);
        canvas.add(clockhand_hour);
        canvas.add(clockhand_minute);
        canvas.add(clockhand_second);
        canvas.add(clockhand_millisecond);
        canvas.add(clockhand_microsecond);
        canvas.add(clockcenter);
        canvas.renderAll();
        setIntervals();
    }

    init();
};
