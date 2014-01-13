window.onload = function() {
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var coords      = $('#coords').find('span');
    var menu        = $('#plain-menu');
    var tecniques   = {}
    var tau         = Math.PI * 2;
    var active;
    tecniques       = {
        original: function(data) {
            canvas.clear();
            var times = 4;
            var radius = 120;
            var x = data.e.clientX;
            var y = data.e.clientY;
            recursionDraw(5, times, radius, x, y);
            recursionDraw(10, times, radius, y, x);
        },
        gunship: function(data) {
            canvas.clear();
            var times = 2;
            var radius = 100;
            var x = data.e.clientX;
            var y = data.e.clientY;
            recursionDraw(5, times, radius, y, y);
            recursionDraw(5, times, radius, x, y);
            recursionDraw(5, times, radius, y, x);
            recursionDraw(5, times, radius, x, x);
        },
        spastic: function(data) {
            canvas.clear();
            var times = 4;
            var radius = rando(100);
            var x = data.e.clientX;
            var y = data.e.clientY;
            recursionDraw(5, times, radius, x, y);
            recursionDraw(5, times, radius, y, x);
        },
        vroom: function(data) {
            canvas.clear();
            var times = 12;
            var radius = ((data.e.clientX / data.e.clientY) * 0.5) + 10;
            var angle = 0.0;
            var step = 0.1;
            var x = data.e.clientX;
            var y = data.e.clientY;
            while(angle < tau) {
                addShape(radius, x * Math.tan(angle) + width / 2, y * Math.sin(angle) + height / 2);
                angle += step;
            }
        },
        vraam: function(data) {
            canvas.clear();
            var times = 12;
            var radius = data.e.clientX / data.e.clientY;
            var angle = 0.0;
            var step = 0.1;
            var x = data.e.clientX;
            var y = data.e.clientY;
            while(angle < tau) {
                addShape(radius + y * 0.1, x * Math.tan(angle) + width / 2, y * Math.cos(angle) + height / 2);
                angle += step;
            }
        },
        vriim: function(data) {
            canvas.clear();
            var times = 10;
            var radius = data.e.clientX / data.e.clientY;
            var angle = 0.0;
            var step = 0.1;
            var x = data.e.clientX;
            var y = data.e.clientY;
            while(angle < tau) {
                addShape(radius + x * 0.1, x * Math.sin(angle) + width / 2, y * Math.tan(angle) + height / 2);
                angle += step;
            }
        }
    };
    active = tecniques.original;

    function addShape(radius, x, y) {
        var color = 'rgb(' + rando(radius / 3) + ',' + rando(radius / 2)+ ',' + rando(radius + 50) + ')';
        canvas.add(new fabric.Circle({
            radius: Math.abs(radius),
            fill: color,
            opacity: 0.5,
            selectable: false,
            top: y,
            left: x
        }));
    }

    function recursionDraw(turns, amount, seed, x, y) {
        if(amount === 0) {

            // wait till recursion is
            // completed to render for performance
            canvas.renderAll();
            return;
        }
        for (var i = 0; i <= turns; i++) {
            addShape(seed / i, x * i, y * i);
            addShape(seed / i, x * i + 100, y * i + 100);
        }
        return recursionDraw(turns - 1, amount - 1, seed / 2, x / 2, y / 2);
    }

    function recursionDrawAlt(turns, amount, seed, x, y) {
        if(amount === 0) {

            // wait till recursion is
            // completed to render for performance
            canvas.renderAll();
            return;
        }
        for (var i = 0; i <= turns; i++) {
            addShape(seed / i, x * i, y * i);
        }
        return recursionDraw(turns - 1, amount - 1, seed / 2, x / 2, y / 2);
    }
    function populateMenu(menu, data) {
        for(var item in data) {
            menu.append('<li><a href="#" class="fn" id="' + item + '">' + (item.split('_').join(' ')) + '</a></li>');
        }
    }

    function updateCoords(x, y) {
        coords.text('x: ' + x + ' / y: ' + y);
    }

    function init() {
        canvas_elem.width  = width;
        canvas_elem.height = height;
        canvas             = new fabric.Canvas('canvas');
        canvas.selection   = false;

        populateMenu(menu, tecniques);
        menu.find('.fn').on('click', function(e){
            var title = $(this).attr('id');
            e.preventDefault();
            menu.find('.fn').removeClass('active');
            $(this).addClass('active');
            active = tecniques[title];
        });
        menu.find('.fn').first().click();
        canvas.on('mouse:move', function(data){
            active(data);
            updateCoords(data.e.clientX, data.e.clientY);
        });
    }

    init();
};
