var playdrawr = (function(){
    var dims        = getViewportDimensions();
    var canvas_elem = document.querySelector('canvas');
    var height      = dims.height/1.4;
    var width       = dims.width/2;
    var $save       = $('#save');
    var $log        = $('#log');
    var $comments   = $('#comments');
    var $timeline   = $('#timeline');
    var $play       = $('#play');
    var $range      = $('#range');
    var $lastedit   = $('#last-edit');
    var states      = {};

    function saveState(e) {
        e.preventDefault();
        var id = uuid();
        // add unique data diff
        states[id] = {
            'time': new Date(),
            'comments': $comments.val() || 'No notes',
            'data': JSON.stringify(canvas),
        };
        // update log
        addToLog(id);
        $lastedit.text('Last edit: ' + states[id].time);
        addCanvasFrame(id);
    }

    function loadState(e) {
        e.preventDefault();
        var state = states[$(this).attr('id')].data;
        canvas.loadFromJSON(state);
    }

    function addToLog(id) {
        var state = states[id];
        var link = '<li><a href="#" id="' + id + '">' + state.time  + '</a><br /><span class="subdued">' + state.comments + '</span></li>';
        $log.append(link);
    }

    function addCanvasFrame(id) {
        // adds a mini frame to view the most recent save as snapshot
        var img = $('<img src="" alt="" />');
        img.attr('src', canvas.toDataURL());
        img.width(width / 10);
        img.height(height / 10);
        $timeline.append(img);
    }

    function playTimeline(e) {
        e.preventDefault();
        canvas.clear();
        var counter = 1;
        $.each(states, function(k, state){
            (function(k){
                setTimeout(function(){
                    canvas.loadFromJSON(state.data);
                }, counter * 500);
            })(k);
            counter += 1;
        });
    }

    function init() {
        bootstrapCanvas(null, true, null, {'height': height, 'width': width});
        canvas.selection = true;
        canvas.backgroundColor = 'white';
        canvas.on('mouse:move', function(e){
            canvas.add(new fabric.Circle({
                radius: rando(20),
                fill: randomColor(255),
                left: e.e.layerX,
                top: e.e.layerY
            }));
            canvas.renderAll();
        });
        $save.on('click', saveState);
        $log.on('click', 'a', loadState);
        $play.on('click', playTimeline);
    }

    return {
        init: init
    };

})();

window.onload = playdrawr.init;
