window.onload = function() {
    var dims           = getDocumentDimensions();
    var height         = dims.height;
    var width          = dims.width;
    var canvas_elem    = document.querySelector('canvas');
    var curr_operation = '1';
    var active_color   = '#22df9c';
    var max_iterations = 10;
    var p1             = 0;
    var p2             = 0;
    var p3             = 0;
    var p4             = 0;
    var operations     = {
        '1': function(data) {
            data.push('M', p1 * 10, p2 * 10, p3 * 10, p4 * 10);
            data.push([p1, p2, 360, 1, 0, p3, p4].join(','));
            return data;
        },
        '2': function(data) {
            data.push(randomSVGMoveTo(p1));
            data.push(randomSVGCurveTo(p2));
            data.push(randomSVGLineTo(p3));
            data.push(randomSVGArcTo(p4));
            return data;
        },
        '3': function(data) {
            data.push(randomPrecisePath(p1 + p2 + p3 + p4));
            return data;
        },
        '4': function(data) {
            data.push('M', p1 * 10, p2 * 10);
            data.push([p1, p2, rando(p1 + p2 + p3 + p4), 1, 1, p3, p4].join(','));
            data.push([p1, p2, p3, p4].join(','));
            return data;
        }
    };

    function smartPath() {
        var data = [];
        for (var i = 0; i < max_iterations; i++) {
            data = operations[curr_operation](data);
        }
        data.push(',z');
        return data.join(',');
    }

    function addPath() {
        canvas.clear();
        var pathdata = smartPath();
        var path = new fabric.Path(pathdata);
        path.set({
            fill: active_color,
            left: dims.width / 2,
            top: dims.height / 3,
            selectable: false
        });
        canvas.add(path);
        canvas.renderAll();
    }

    function setType(event) {
        event.preventDefault();
        var text = $(this).attr('id');
        curr_operation = text;
        $('a').removeClass('active');
        $(this).addClass('active');
        log(curr_operation);
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;
        $('#color').on('change', function(e){
            active_color = $(this).val();
        });
        $('#controls').find('li a').on('click', setType);
        $('#controls').find('li a').first().click();
        $('.slider').slider({
            min: 0,
            max: 100,
            slide: function(e, ui) {
                var type = $(this).attr('id');
                if(type === '1') {
                    p1 = ui.value;
                } else if(type === '2') {
                    p2 = ui.value;
                } else if(type === '3') {
                    p3 = ui.value;
                } else {
                    p4 = ui.value;
                }
                addPath(p1, p2, p3, p4);
                $(this).find('.val').text(ui.value);
            }
        });
        $('#all').slider({
            min: 0,
            max: 100,
            slide: function(e, ui) {
                $(this).find('.val').text(ui.value);
                $('.val').text(ui.value);
                $('.slider').slider('value', ui.value);
                p1 = p2 = p3 = p4 = ui.value;
                addPath(p1, p2, p3, p4);
            }
        });
    }
    init();
};
