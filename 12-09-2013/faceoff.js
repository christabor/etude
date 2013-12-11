$(document).ready(function(){
    var container     = $('#container');
    var options       = $('#options-panel');
    var indicatrix    = $('#indicatrix');
    var flip          = $('#flip');
    var export_button = $('#export');
    var send_back     = $('#send-back');
    var thumbs        = $('#imgs-picker').find('img');
    var canvas_elem   = document.querySelector('canvas');
    var sliders       = options.find('.slider');
    var height        = canvas_elem.height;
    var width         = canvas_elem.width;
    var root_dir      = 'imgs/';
    var filetype      = '.jpeg';
    var remove_btn    = $('#remove');
    var max_per_img   = 3;
    var loader   = {
        msg: 'Loading canvas and options...',
        css: {
            'background-color': 'black',
            'font-family': '\'Exo 2\', sans-serif',
            'font-size': '40px'
        }
    };
    var slider_funcs  = {
        rotateMe: function(event, ui) {
            prop('angle', ui.value);
        },
        scaleMe: function(event, ui) {
            prop(['scaleX', 'scaleY'], ui.value);
        },
        opacitMe: function(event, ui) {
            prop('opacity', ui.value);
        }
    };

    globalLoader.load(loader);

    function addImage(file) {
        fabric.Image.fromURL(file, function(img) {
            img.angle = 180;
            img.selectable = true;
            img.top = rando(height);
            img.left = rando(width);
            canvas.add(img);
            canvas.renderAll();
        });
        return;
    }

    function addImageGroup(group_name) {
        for(var i = 1; i <= max_per_img; i++) {
            var file = [root_dir, group_name, i, filetype].join('');
            fabric.Image.fromURL(file, function(img) {
                img.angle = 180;
                img.selectable = true;
                img.top = rando(height);
                img.left = rando(width);
                canvas.add(img);
                canvas.renderAll();
            });
        }
    }

    function prop(propname, value) {
        // update inidicator
        var is_single_prop = typeof propname !== 'string';
        var prop_text = is_single_prop ? propname : propname.split(',').join(' ');
        indicatrix.text(prop_text + ' changed to: ' + (value || 'none'));

        // return if no value
        if(!value) return;

        // loop through canvas objects
        // and adjust only selected
        $(canvas._objects).each(function(k, object) {
            if(object.active) {
                if(typeof propname !== 'string') {

                    // if multiple properties need to be set,
                    // loop through them
                    for(var prop in propname) {
                        object[propname[prop]] = value;
                    }
                } else {
                    // otherwise update like normal
                    object[propname] = value;
                }
            }
            // always re-render to get live updates
            canvas.renderAll();
        });
        return;
    }

    function init() {
        canvas_elem.width = width;
        canvas_elem.height = height;
        canvas = new fabric.Canvas('faceoff', {
            backgroundColor: '#EEE'
        });

        sliders.each(function(k, slider){

            // declarative approach to sliders.
            var func = slider_funcs[$(this).attr('data-func')];
            $(slider).slider({
                slide: func,
                value: $(this).attr('data-value'),
                step: parseFloat($(this).attr('data-step'), 10) || 1,
                min: $(this).attr('data-min'),
                max: $(this).attr('data-max')
            });
        });
        flip.on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(canvas._objects).each(function(k, object) {
                if(object.active) {
                    var is_flipped = object.flipX;
                    if(!is_flipped) {
                        object.flipX = true;
                    } else {
                        object.flipX = false;
                    }
                    canvas.renderAll();
                }
            });
        });
        remove_btn.on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            $(canvas._objects).each(function(k, object) {
                if(object.active) {
                    canvas.remove(object);
                    canvas.renderAll();
                }
            });
        });
        thumbs.on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            addImage($(this).attr('src'));
        });
        send_back.on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            $(canvas._objects).each(function(k, object) {
                if(object.active) {
                    object.sendToBack();
                    canvas.renderAll();
                }
            });
        });
        export_button.on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            window.open(canvas.toDataURL('png'));
        });
        return;
    }

    init();
    setTimeout(function(){
        container.css('visibility', 'visible');
        globalLoader.unload();
    }, 100);
});
