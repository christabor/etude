var onedegree = (function(){
    var dims  = getViewportDimensions();
    var W     = dims.width;
    var form1 = $('#check-symptoms');
    var H     = dims.height;
    var all   = {
        'stomach_pain': ['stomach cancer', 'tapeworms', 'crohn\'s disease'],
        'headache': ['brain cancer', 'aneurysm', 'meningitis', 'multiple sclerosis'],
        'muscle tension': ['rigor mortis', 'gangrene', 'muscular dystrophy', 'Lou Gehrig\'s disease'],
        'anxious_worrisome': ['schizophrenia', 'severe depression', 'dissociative amnesia', 'post-traumatic stress disorder'],
        'sneezing': ['acute viral infection', 'H1N1 virus'],
        'cold_tired': ['chronic anemia', 'skin cancer']
    };

    function update() {
        $(this).parent().toggleClass('checked');
    }

    function diagnose(e) {
        e.preventDefault();
        var diagnoses = $('#diagnoses');
        var list      = diagnoses.find('ul');
        var checked   = $(this).find('input:checked');
        var symptoms  = [];

        // empty any existing items
        list.find('li').remove();

        $.each(checked, function(k, item){
            var _symptom = $(item).attr('name');
            // get the matching diagnoses for the checked symptom
            if(all[_symptom]) {
                var _diagnoses = all[_symptom];
                list.append(makeDiagnosisList(_symptom, _diagnoses));
            }
        });
        diagnoses.hide().fadeIn(100);
    }

    function makeDiagnosisList(symptom, diagnoses) {
        var html = '<li class="title">' + symptom.split('_').join(' ') + ':</li>';
        $.each(diagnoses, function(k, diagnosis){
            html += '<li>' + diagnosis + (k !== diagnoses.length - 1 ? ', &nbsp;' : '') +'</li>';
        });
        return html;
    }

    function betaDiagnosis(e) {
        e.preventDefault();
        $('#beta-diagnoses').hide().fadeIn(100);
    }

    function makeCheckbox(name) {
        return '<label>' +
               '<input type="checkbox" name="' + name + '">' +
               name.split('_').join(', ') +
               '</label>';
    }

    function populateInputs() {
        $.each(all, function(symptom, diagnoses){
            form1.find('legend').after(makeCheckbox(symptom));
        });
    }

    function init() {
        populateInputs();
        $('label').find('input').on('change', update);
        form1.on('submit', diagnose);
        $('#search').on('submit', betaDiagnosis)
    }

    return {
        'init': init
    };

})();

$(document).ready(onedegree.init);
