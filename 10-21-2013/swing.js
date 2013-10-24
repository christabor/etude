;(function(){
    function rnd(num) {
        return Math.floor(Math.random() * num);
    }
    function rand() {
        return rnd(255) + ', ' + rnd(255) + ', ' + rnd(255);
    }

    var canvas = new fabric.Canvas('my-canvas');

    // update h/w
    $('div, canvas').css({
        'width': $(window).width(),
        'height': $(window).height()
    });

    // add elements
    for(var i = 0; i <= 20; i++) {
        canvas.add(new fabric.Rect({
            fill: 'red',
            width: i,
            height: i,
            angle: i,
            left: i * i,
            top: i * i
        }));
    }

    // adjust on mousemove
    canvas.on('mouse:move', function(data){
        var objects = canvas.getObjects();
        $(objects).each(function(k, object){
            object.height = data.e.layerX;
            object.width = data.e.layerY;
            object.fill = 'rgb(' + rand() + ')';
            canvas.renderAll();
        });
    });
})();
