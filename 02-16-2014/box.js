var ca_presets = {
    // a much more obvious and intuitive (and simple)
    // way to map rulesets -- data as code!
    container: $('#canvii'),
    players: [],
    rulesets:[
    {
        '000': [1, 1, 1],
        '001': [1, 0, 0],
        '010': [1, 0, 0],
        '011': [0, 1, 0],
        '111': [0, 1, 0],
        '100': [0, 0, 1],
        '110': [1, 0, 0],
        '101': [1, 1, 1]
    },
    {
        '000': [0, 0, 1],
        '001': [1, 0, 0],
        '010': [1, 1, 1],
        '011': [0, 0, 0],
        '111': [0, 1, 1],
        '100': [0, 1, 1],
        '110': [1, 1, 0],
        '101': [1, 0, 1]
    },
    {
        '000': [1, 0, 1],
        '001': [1, 0, 1],
        '010': [0, 1, 1],
        '011': [1, 1, 0],
        '111': [0, 1, 0],
        '100': [0, 1, 0],
        '110': [1, 0, 0],
        '101': [1, 1, 1]
    },
    {
        '000': [0, 1, 0],
        '001': [1, 0, 0],
        '010': [1, 0, 1],
        '011': [0, 1, 0],
        '111': [1, 0, 0],
        '100': [1, 0, 1],
        '110': [0, 0, 1],
        '101': [1, 1, 0]
    },
    {
        '000': [1, 1, 0],
        '001': [1, 1, 0],
        '010': [1, 0, 1],
        '011': [0, 0, 1],
        '111': [1, 1, 0],
        '100': [1, 1, 1],
        '110': [0, 1, 1],
        '101': [1, 1, 1]
    },
    {
        '000': [0, 1, 1],
        '001': [0, 1, 0],
        '010': [1, 0, 1],
        '011': [0, 1, 1],
        '111': [1, 0, 0],
        '100': [0, 0, 1],
        '110': [1, 1, 0],
        '101': [0, 1, 0]
    },
    {
        '000': [1, 1, 1],
        '001': [1, 0, 0],
        '010': [1, 0, 0],
        '011': [0, 0, 1],
        '111': [1, 1, 1],
        '100': [0, 1, 0],
        '110': [1, 0, 0],
        '101': [1, 1, 0]
    },
    {
        '000': [0, 1, 0],
        '001': [0, 1, 1],
        '010': [1, 0, 0],
        '011': [0, 0, 1],
        '111': [1, 0, 1],
        '100': [0, 0, 1],
        '110': [1, 1, 0],
        '101': [1, 1, 0]
    }
    ]
};

var CanvasAutomota = function() {
    var self = this;
    this.speed      = 100;
    this.states     = [];
    this.size       = 4;
    this.width      = 250;
    this.height     = 250;
    this.generation = 0;
    this.container  = $('<div></div>');
    this.gen        = $('<p></p>');
    this.stop_btn   = $('<button class="btn stop-btn">Stop</button>');
    this.start_btn  = $('<button class="btn start-btn">Start</button>');
    this.container.attr({
        'class': 'canvas',
        'id': uuid()
    });
    this.updateBox = function(x, y, state) {
        var states_map = {
            0: '#fff',
            1: '#000'
        };
        self.ctx.fillStyle = states_map[state];
        self.ctx.fillRect(x, y, self.size, self.size);
        self.ctx.fill();
    }
    this.seedAll = function() {
        for(var y = 0, i = 0;  y <= self.height; y += self.size, i += 1) {
            for(var x = 0; x <= self.width; x += self.size) {
                var state = rando(10) === rando(10) ? 1 : 0;
                self.states.push([x, y, state]);
                self.updateBox(x, y, state);
            }
        }
    }
    this.updateState = function(i, x, y, state) {
        self.states[i] = [x, y, state];
    }
    this.addAll = function() {
        for(var y = 0, i = 0;  y <= self.height; y += self.size, i += 1) {
            for(var x = 0; x <= self.width; x += self.size) {
                try {
                    var pattern = [self.states[i - 1][2], self.states[i][2], self.states[i + 1][2]].join('');
                    var rule = self.ruleset[pattern];
                    var x1 = x - self.size;
                    var y1 = y - self.size;
                    var x2 = x + self.size;
                    var y2 = x + self.size;

                    self.updateBox(x1, y1, rule[0]);
                    self.updateBox(x, y, rule[1]);
                    self.updateBox(x2, y2, rule[2]);
                    self.updateState(i - 1, x1, y1, rule[0]);
                    self.updateState(i, x, y, rule[1]);
                    self.updateState(i + 1, x2, y2, rule[2]);
                    self.updateState(i + 1, x2, y2, rule[2]);

                }
                catch(e) {}
            }
        }
    }
    this.step = function() {
        // adds all states,
        // then draws, before next step
        self.addAll();
        self.generation += 1;
        self.gen.text('Generation: ' + self.generation);
    }
    this.startPlaying = function() {
        self.interval = setInterval(self.step, self.speed);
    }
    this.stopPlaying = function() {
        clearInterval(self.interval);
    }
    this.clearCanvas = function(){
        self.ctx.fillStyle = 'white';
        self.ctx.fillRect(0, 0, self.size, self.size);
        self.ctx.fill();
    }
    this.registerToGlobal = function() {
        ca_presets.players.push(self);
    }
    this.restart = function() {
        self.stopPlaying();
        self.clearCanvas();
        self.states = [];
        self.generation = 0;
        self.gen.text('Generation: ' + self.generation);
        self.seedAll();
        self.startPlaying();
    }
    this.init = function(canvas, ruleset) {
        ca_presets.container.append(self.container);
        self.canvas_elem        = canvas[0];
        self.ruleset            = ruleset;
        self.canvas_elem.width  = self.width;
        self.canvas_elem.height = self.height;
        self.ctx                = self.canvas_elem.getContext('2d');
        self.container.wrapInner(self.canvas_elem);
        self.seedAll();
        self.container.prepend(self.gen);
        self.container.prepend(self.stop_btn);
        self.container.prepend(self.start_btn);
        self.start_btn.on('click', self.startPlaying);
        self.stop_btn.on('click', self.stopPlaying);
        self.gen.text('Generation: ' + self.generation);
        self.startPlaying();
        self.registerToGlobal();
    }
};

var elem_ca = (function(){
    function initAll() {
        var restart = $('#restart-all');
        restart.on('click', function(){
            $(ca_presets.players).each(function(k, player){
                player.restart();
            });
        });
        $('canvas').each(function(k, canvas){
            var ca = new CanvasAutomota();
            ca.init($(canvas), ca_presets.rulesets[k]);
        });
    }

    // might as well privatize it
    return {
        'init': initAll
    };
})();

$(document).ready(elem_ca.init);
