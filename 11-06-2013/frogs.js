$(document).ready(function(){
    stretchCanvas('#drawerin-time');

    //Create a stage by getting a reference to the canvas
    var stage = new createjs.Stage('drawerin-time');
    var queue = new createjs.LoadQueue();
    createjs.Touch.enable(stage);
    stage.enableMouseOver(5);
    queue.installPlugin(createjs.Sound);
    queue.addEventListener('complete', completed);
    queue.loadManifest([
    {
        id: 'bud',
        src: 'sounds/bud.mp3'
    },
    {
        id: 'weis',
        src: 'sounds/weis.mp3'
    },
    {
        id: 'er',
        src: 'sounds/er.mp3'
    },
    {
        id: 'frog_bud',
        src: 'images/frog_bud.png'
    },
    {
        id: 'frog_weis',
        src: 'images/frog_weis.png'
    },
    {
        id: 'frog_er',
        src: 'images/frog_er.png'
    }
    ]);

    function frogClick(sound) {
        createjs.Sound.play(sound);
        return;
    }

    function addItem(bitmap, sound, y, x) {
        stage.addChild(bitmap);
        bitmap.x = x;
        bitmap.y = y;
        bitmap.regX = bitmap.image.width / 2;
        bitmap.regY = bitmap.image.height / 2;
        bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
        bitmap.cursor = 'pointer';
        bitmap.addEventListener('click', function(event){
            frogClick(sound);
        });
        return;
    }

    function completed(event) {
        var frog_bud = new createjs.Bitmap(queue.getResult('frog_bud')),
        frog_weis = new createjs.Bitmap(queue.getResult('frog_weis')),
        frog_er = new createjs.Bitmap(queue.getResult('frog_er')),

        y_pos = Math.floor($(window).height()/4),
        x_pos = Math.floor(294 / 1.5);

        addItem(frog_bud, 'bud', y_pos, x_pos);
        addItem(frog_weis, 'weis', y_pos, x_pos * 2);
        addItem(frog_er, 'er', y_pos, x_pos * 3);

        stage.update();
        return;
    }
});
