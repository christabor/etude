
function init() {
    var dims = getViewportDimensions();
    $('.img-holder').imageScroll({
        coverRatio: 0.6,
        mediaWidth: dims.width,
        mediaHeight: 800 + rando(10)
    });
    $('body').hide().fadeIn(4000);
}

$(document).ready(init);
