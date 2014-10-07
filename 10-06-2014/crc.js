var crc_builder = (function(){
    var $cards            = $('#cards');
    var $add              = $('#add');
    var $export_btn       = $('#export');
    var $json             = $('#json');
    var $collaborators    = $('#collaborators');
    var $responsibilities = $('#responsibilities');
    var $classname        = $('#classname');
    var data              = {};

    function exportJSON(e) {
        e.preventDefault();
        $json.val(JSON.stringify(data));
    }

    function buildCardDisplay() {
        $cards.empty();
        $collaborators.empty();

        $.each(data, function(_classname, card_data){
            var classname = $('<h2 class="classname"></h2>');
            var collaborators = $('<section class="collaborators"><p><strong>Collaborators</strong></p><ul class="item"></ul></div>');
            var responsibilities = $('<section class="responsibilities"><p><strong>Responsibilities</strong></p><ul class="item"></ul></section>');
            var card = $('<div class="card"></div>');

            responsibilities.find('.item')
            .html(card_data.responsibilities ? arrayToHTMList(card_data.responsibilities): '');

            collaborators.find('.item')
            .html(card_data.collaborators ? arrayToHTMList(card_data.collaborators) : '');

            classname.text(_classname);

            card.append(classname).append(responsibilities).append(collaborators);

            $cards.append(card);

            $collaborators.append('<option value="' + _classname + '">' + _classname + '</option>');
        });
    }

    function addCard(e) {
        e.preventDefault();
        var _collaborators_val = $collaborators.val();
        var _responsibilities_val = $responsibilities.val().split('\n');
        var _classname_val = $classname.val();

        data[(_classname_val ? _classname_val : 'CLASSTITLE')] = {
            'responsibilities': _responsibilities_val,
            'collaborators': _collaborators_val
        };

        // Clear out form.
        $classname.val('');
        $responsibilities.val('');
        // Rebuild display to prevent duplicates or bad data.
        buildCardDisplay();
    }

    function loadCard(e) {
        e.preventDefault();
        $classname.val($(this).find('.classname').text());
        var respons = $(this)
        .find('.responsibilities ul')
        .find('li').map(function(){
            return $(this).text();
        }).get().join('\n');

        $responsibilities.val(respons);
    }

    function init() {
        $add.on('submit', addCard);
        $export_btn.on('click', exportJSON);
        $cards.on('click', '.card', loadCard);
    }

    return {
        'init': init
    };

})();

$(document).ready(crc_builder.init);
