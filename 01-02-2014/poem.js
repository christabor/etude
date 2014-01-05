function init() {
    var dims = getDocumentDimensions();
    var container = $('#edit');

    successionPlugin($('#edit'), 100);
}

$(document).ready(init);
