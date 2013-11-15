$(document).ready(function(){
    var dims = getDocumentDimensions();

    // because the placekitten service shows specific images based on size,
    // randomize the subtracted value so there are a possible 20 picture options
    $('img').each(function(k, img){
        var size = Math.floor(((dims.height / 3) - rando(20)));
        $(img).attr('src', 'http://placekitten.com/' + size + '/' + size);
        $(img).tiltShift();
    });
});
