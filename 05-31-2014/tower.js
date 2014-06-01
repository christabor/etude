var tower = (function(){
    'use strict';

    var $results = $('#results');
    var $one     = $('#step1');
    var $two     = $('#step2');
    var $three   = $('#step3');

    function updateExponents(e) {
        var match = findIn(e.which, [50, 51, 52, 53, 54, 55, 56, 57, 48, 49]);
        if(!match) {
            e.preventDefault();
            return;
        }
        var res  = Math.pow($one.val(), Math.pow($two.val(), $three.val()));
        var size = (10 - res.toString().length) * 10;
        $results.find('p').html(res).css('font-size', clamp(size, 30, 200) + 'px');
    }

    function init() {
        $one.on('change keyup', updateExponents);
        $two.on('change keyup', updateExponents);
        $three.on('change keyup', updateExponents);
    }

    return {
        init: init
    };

})();

$(document).ready(tower.init);
