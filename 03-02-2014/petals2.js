var petalArt = (function(){
    var dims         = getViewportDimensions();
    var height       = dims.height;
    var width        = dims.width;
    var canvas_elem  = document.querySelector('canvas');
    var angle        = 0;

    function generate(radius) {
        canvas.clear();
        canvas.backgroundColor = randomColor(255);
        complexFlower({
            radius: radius / 4,
            petals: rando(radius / 4),
            x: width / 2,
            y: height / 2,
            increment: 50,
            total: 20,
            opacity: 0.5,
            center: true,
            division: rando(radius / 2)
        });
    }

    function init() {
        bootstrapCanvas(null, true);
        addCanvasUI();
        canvas.on('mouse:move', function(e){
            var amt = e.e.clientX / 10;
            generate(amt);
            angle = amt;
        });
    }

    return {
        init: init
    };

})();

$(document).ready(petalArt.init);
