window.onload = function() {
    var dims        = getDocumentDimensions();
    var img         = document.querySelector('img');
    var canvas_elem = document.querySelector('canvas');
    var main_img    = new fabric.Image(img);
    var red_img     = new fabric.Image(img);
    var blue_img    = new fabric.Image(img);
    var img_width   = dims.width - 200;
    var img_height  = dims.height - 200;
    var img_opacity = 0.4;


    function applyBlue() {
        blue_img.filters.push(new fabric.Image.filters.Bluify());
        blue_img.applyFilters(canvas.renderAll.bind(canvas));
        return;
    }

    function applyRed() {
        red_img.filters.push(new fabric.Image.filters.Redify());
        red_img.applyFilters(canvas.renderAll.bind(canvas));
        return;
    }

    function addImage(img) {
        canvas.selection = false;
        canvas.allowTouchScrolling = true;
        canvas.add(img);

        img.set({
            selectable: false,
            top: dims.height / 2,
            left: dims.width / 2
        });
        canvas.renderAll();
        return;
    }

    function registerFilters() {
        fabric.Image.filters.Redify = fabric.util.createClass({
            type: 'Redify',
            applyTo: function(elem) {
                var ctx        = elem.getContext('2d');
                var image_data = ctx.getImageData(0, 0, elem.width, elem.height);
                var data       = image_data.data;

                for (var i = 0, len = data.length; i < len; i += 4) {
                    data[i + 2] = 0;
                    data[i + 1] = 0;
                }
                ctx.putImageData(image_data, 0, 0);
                return;
            }
        });

        fabric.Image.filters.Bluify = fabric.util.createClass({
            type: 'Bluify',
            applyTo: function(elem) {
                var ctx        = elem.getContext('2d');
                var image_data = ctx.getImageData(0, 0, elem.width, elem.height);
                var data       = image_data.data;

                for (var i = 0, len = data.length; i < len; i += 4) {
                    data[i + 0] = 0;
                    data[i + 1] = 0;
                }
                ctx.putImageData(image_data, 0, 0);
                return;
            }
        });

        fabric.Image.filters.Redify.fromObject = function(object) {
            return new fabric.Image.filters.Redify(object);
        };

        fabric.Image.filters.Bluify.fromObject = function(object) {
            return new fabric.Image.filters.Bluify(object);
        };
        return;
    }

    function init() {
        // add canvas
        canvas_elem.width = dims.width;
        canvas_elem.height = dims.height;
        canvas = new fabric.Canvas('canvas');
        canvas.selectable = false;

        // register filters
        registerFilters();

        // add images
        addImage(main_img);
        addImage(blue_img);
        addImage(red_img);

        main_img.set({
            width: img_width,
            height: img_height
        });
        blue_img.set({
            opacity: img_opacity,
            width: img_width,
            height: img_height,
            left: dims.width / 2 + 100,
            top: dims.height / 2 + 100
        });
        red_img.set({
            opacity: img_opacity,
            width: img_width,
            height: img_height,
            left: dims.width / 2 - 100,
            top: dims.height / 2 - 100
        });

        // apply stereovision
        // esque filters
        applyBlue();
        applyRed();

        document.addEventListener('mousemove', function(e){
            var multiplier = 0.1;
            var x = e.layerX * multiplier;
            var y = e.layerY * multiplier;
            var w = dims.width / 2;
            var h = dims.height / 2;

            var r_x = w + x;
            var r_y = h + y;
            var b_x = w - x;
            var b_y = h - y;

            blue_img.set({
                left: r_x,
                top: r_y
            });
            red_img.set({
                left: b_x,
                top: b_y
            });
            canvas.renderAll();
        });
        return;
    }

    init();
    return;
};
