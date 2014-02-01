function addElements() {
    $('.dropcap, .post-dropcap, blockquote')
    .prepend('<ul class="fonts" data-typey-font-list></ul>')
    .append('<div class="font-name"></div>')
    .attr('data-typey-editable', '')
    .addClass('typer');
}

function randomizeAll() {
    var styles = [
        'boxy',
        'boxy2',
        'corners',
        'rounded',
        'underline'
    ];
    $('.typer').each(function(k, el){
        var list = $(el).find('.fonts > .font-dropdown').find('li');
        var len = list.length;
        var rand = list.eq(rando(len)).find('a').first();
        var font = rand.text();
        $(el).find('.font-name').text(font);
        rand.click();
    });
    $('.dropcap')
    .css('font-size', (rando(100) + 20) + 'px')
    .removeClass(styles.join(' '))
    .addClass('dropcap ' + randomArrayValue(styles));
}

function init() {
    var load_opts;
    var myTypeLibrary;
    addElements();
    load_opts = {
        css: {
            'background-color': '#222',
            'color': '#fff7b0',
            'z-index': '9999',
            'opacity': '0.8',
            'font-size': '40px'
        }
    };
    $('#random').on('click', function(e){
        e.preventDefault();
        globalLoader.load(load_opts);
        setTimeout(function(){
            randomizeAll();
            globalLoader.unload();
        }, 200);
    }).click();

    myTypeLibrary = fonTypey({
        // public, limited access only for github.com/christabor
        api_key: 'AIzaSyAM4K04yxd6F2-M6w8rEm4p97PMN6y2r0w'
    });
    myTypeLibrary.initAllFeatures('body');
}

$(document).ready(init);
