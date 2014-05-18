var countdowns = (function(){
    'use strict';

    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height;
    var width       = dims.width;
    var $container  = $('#container');
    var intervals   = [];

    function Clock(start) {
        var self = this;
        var val = rando(255);
        this.paused = false;
        this.el = $('<p></p>')
        .css('font-size', clamp(rando(200), 8, 100) + 'px');
        setTimeout(function(){
            $container.append(self.el);
            self.el.hide().fadeIn(100);
        }, start);
        this.draw = function() {
            requestAnimFrame(self.draw);
            // pause if updating
            if(self.paused) return;
            self.el.text(self.time);
            if(self.type === 'up') {
                self.time += 1;
            } else {
                self.time -= 1;
            }
        };
        this.setVals = function() {
            self.type = rando(10) > 5 ? 'up' : 'down';
            self.time = self.type === 'up' ? start : clamp(rando(10000), 1000, 10000);
            self.el.addClass(self.type);
        };
        this.reset = function() {
            self.paused = true;
            setTimeout(function(){
                self.el.hide().fadeIn(1000);
                self.paused = false;
            }, start);
        };
        self.setVals();
        self.draw();
    }

    function reset() {
        for(var i = 0, len = intervals.length; i < len; i++) {
            intervals[i].time = rando(1000);
            intervals[i].reset();
        }
    }

    function init() {
        for(var i = 0; i <= 20; i++) {
            // At least we can take solace in the fact these aren't
            // all running when the tab ISN'T in focus.
            intervals[i] = new Clock(rando(1000));
        }
        $('a').on('click', reset);
    }

    return {
        init: init
    };

})();

window.onload = countdowns.init;
