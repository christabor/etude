var oldskool = (function(){
    'use strict';
    var dims      = {
        'width': 737,
        'height': 557
    };
    var direction = null;
    var directions     = [
        'topleft', 'topright', 'bottomleft', 'bottomright',
        'up', 'down', 'left', 'right'
    ];
    var posx      = dims.width / 2;
    var posy      = dims.height / 2;
    var INCREMENT = 5;
    var RADIUS    = 30;
    var container = d3.select('#container');
    var canvas    = container.append('canvas');
    var ctx       = canvas.node().getContext('2d');

    function addCircle() {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(posx,posy);
        ctx.quadraticCurveTo(posy / 2, posx / 2, posx, posy);
        ctx.stroke();
    }

    function init() {
        canvas
        .attr('width', dims.width)
        .attr('height', dims.height);

        setInterval(changeDirection, 400);
        d3.timer(function(){
            // handle... edge cases (oh I crack myself up)
            if(posx <= 0 || posx >= dims.width) {posx = 0;}
            if(posy <= 0 || posy >= dims.height) {posy = 0;}

            // handle all normal directions
            switch(direction) {
                case 'up':
                    posy += INCREMENT;
                    break;
                case 'down':
                    posy -= INCREMENT;
                    break;
                case 'left':
                    posy -= INCREMENT;
                    break;
                case 'right':
                    posy += INCREMENT;
                    break;
                case 'bottomleft':
                    posy -= INCREMENT;
                    posx -= INCREMENT;
                    break;
                case 'bottomright':
                    posy -= INCREMENT;
                    posx += INCREMENT;
                    break;
                case 'topleft':
                    posy += INCREMENT;
                    posx -= INCREMENT;
                    break;
                case 'topright':
                    posy += INCREMENT;
                    posx += INCREMENT;
                    break;
            }
            addCircle();
        });
    }

    function changeDirection() {
        ctx.strokeStyle = randomColor(255);
        direction = randomArrayValue(directions);
    }

    return {
        'init': init
    };
})();

window.onload = oldskool.init;
