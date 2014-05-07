var truthabunga = (function(){
    var $table = $('#table');
    var $btn   = $('.btn');
    var values = '!@#$%^&*()_+'.split('');
    var truthy = ['+','1', 'true', 'on', 'true'];
    var falsy = ['-', 'nil', 'undefined', 'null', 'none', 'not', '0', 'false', 'off', 'false'];
    var rav = randomArrayValue;

    function generateCell(type) {
        return '<' + type + '>' + (rando(10) > 5 ? rav(falsy) + rav(values) : rav(values) + rav(truthy)) + '</' + type + '>';
    }

    function generateTR(type, max) {
        var tds = ['<tr>'];
        for(var i = 0; i <= max; i++) {
            tds.push(generateCell(type));
        }
        tds.push('</tr>');
        return tds.join('');
    }

    function generateTableData(max) {
        var ths  = [];
        var trs  = [];
        var tr   = '';
        var html = '';
        for(var i = 0; i <= max; i++) {
            ths.push(generateCell('th'));
            trs.push(generateTR('td', max));
        }
        html += '<thead><tr>' + ths.join('') + '</tr></thead>';
        html += '<tbody>' + trs.join('') + '</tbody>';
        return html;
    }

    function generateTable(e) {
        e.preventDefault();
        var html = ['<table class="table table-striped table-bordered">',
                    generateTableData(4),
                    '</table>'].join('');
        $table.html(html);
    }

    function init() {
        $btn.on('click', generateTable);
        $btn.click();
    }

    return {
        init: init
    };

})();
$(document).ready(truthabunga.init);
