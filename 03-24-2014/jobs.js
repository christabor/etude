var htmlz = (function(){
    'use strict';
    var ipsum = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Ut vel semper ante. Donec nec tincidunt magna. Vestibulum ',
    'iaculis pulvinar est, eu bibendum nibh malesuada non. ',
    'Mauris mollis lacinia varius. Morbi sit amet sagittis nulla, ac ',
    'malesuada risus. Maecenas vel magna lorem. ',
    'Pellentesque ornare nunc vel dui fringilla dictum. ',
    'Sed mauris tortor, accumsan in sapien at, vulputate congue ligula.',
    'Duis sed magna vestibulum, eleifend arcu vitae, laoreet eros.',
    'Aenean sodales sapien erat, nec placerat risus fringilla sed.',
    'Nullam hendrerit pellentesque ante. Nullam congue felis mi, ',
    'eget consectetur sapien laoreet at.'
    ].join('');
    var container = $('#container');
    var jobs = {
        extension: '.atm',
        types: {
            'Car Technician': {
                size: rando(999) + 'kb',
            },
            'Waitress': {
                size: rando(999) + 'kb',
            },
            'Programmer': {
                size: rando(999) + 'kb',
            },
            'Graphic Artist': {
                size: rando(999) + 'kb',
            },
            'Marketing Specialist': {
                size: rando(999) + 'kb',
            },
            'Auto Repair Technician': {
                size: rando(999) + 'kb',
            },
            'Neurologist': {
                size: rando(999) + 'kb',
            },
            'Philanthropist': {
                size: rando(999) + 'kb',
            }
        }
    };

    function loadJob(event) {
        var self = $(this);
        var id = $(this).attr('id');
        var key = jobs.types[id];
        event.preventDefault();
        container.find('.job-type').removeClass('active');
        container.find('.info, .description').empty().hide();
        $(this).addClass('active').find('.info').show();
        simpleLetterSequence({
            container: $(this).find('.info'),
            word: 'Loading... ' + id + jobs.extension,
            fade: 200,
            css_before: {
                'text-shadow': '0 0 10px #d21c67'
            },
            css_after: {
                'color': 'white',
                'text-shadow': '0 0 10px white'
            },
            callback: function(){
                setTimeout(function(){
                    self.find('.info').html('Loading completed.')
                    .delay(500).slideToggle(100);
                    self.find('.description').show();
                    simpleLetterSequence({
                        container: self.find('.description'),
                        word: 'Job program description: ' + ipsum,
                        fade: 80,
                        css_before: {
                            'background-color': '#05351b',
                            'text-shadow': '0 0 10px #d21c67',
                            'color': 'white'
                        },
                        css_after: {
                            'background-color': 'transparent',
                            'text-shadow': '0 0 10px white'
                        },
                        timing: 40
                    });
                }, 1200);
            },
            timing: 200 / 2
        });
}

function init() {
    $.each(jobs.types, function(k, job_name){
        var titles = '<h2>' + k + jobs.extension + '</h2><p>Program Size: ' + this.size + '</p>';
        container
        .append('<div class="job-type" id="' + k + '">' + titles + '<div class="info" style="display:none;"></div><div class="description"></div></div>')
    });
    container.on('click', '.job-type', loadJob);
}

return {
    'init': init
};
})();

window.onload = htmlz.init;
