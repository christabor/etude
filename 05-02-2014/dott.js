var dott = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;

    function init() {
        bootstrapCanvas(null, true);
        canvas.on('mouse:move', function(e){
            var state1 = new MarkovState('red', height / 2, e.e.clientX, 40, e.e.clientX);
            var state2 = new MarkovState('blue', e.e.clientY, width / 2, 40, e.e.clientY);
            state1.connectTo(state2, e.e.clientY + 2, width / 2, 'right');
            state2.connectTo(state1, e.e.clientY + 2, width / 2, 'left');
        });
    }

    return {
        init: init
    };

})();

window.onload = dott.init;
