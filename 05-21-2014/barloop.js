var barloop = (function(){
    'use strict';

    var $container = $('#container');
    var $btn = $('a');

    function logIt(msg) {
        $container.append(msg);
    }

    function loopBars(e) {
        e.preventDefault();
        $container.empty();
        var seed = rando(20) + 10;
        var sum = 0;
        var color;
        var comp;
        var i, j, z;
        for(i = 0; i < seed; i++) {
            for(j = 0; j < seed; j++) {
                for(z = 0; z < seed; z++) {
                    sum += z + j + i;
                }
                color = '';
                comp = Math.abs(255 - sum);
                sum = Math.round(sum / 10);
                color = ['rgb(', sum, ',', sum, ',', sum, ')'].join('');
                comp = ['rgb(', comp, ',', comp, ',', comp, ')'].join('');
                if(sum % 2 === 0) {
                    if(sum % 4 === 0) {
                        color = 'purple';
                    } else {
                        color = 'green';
                    }
                } else if(sum % 3 === 0) {
                    color = 'red';
                } else if(sum % 5 === 0) {
                    color = 'orange';
                }
                logIt('<div class="bar" style="font-size:'+clamp(sum/4, 10, 50)+'px;border-right:1px solid '+comp+';background-color:'+color+';width:'+sum+'px;">'+sum * 10+'</div>');
            }
            logIt('<br /><br />');
        }
        $container.fadeIn(100);
    }

    function init() {
        $btn.on('click', loopBars);
        $btn.click();
    }

    return {
        init: init
    };

})();

$(document).ready(barloop.init);
