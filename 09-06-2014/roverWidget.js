// Use module pattern for class widget
var RoverWidget = function(options){
    var DEBUG        = true;
    var INCREMENT    = 1;
    var CELL_SIZE    = 50;
    var total_rovers = 0;
    var width        = options.dims.width;
    var height       = options.dims.height;
    var output       = options.panel;
    var utils        = {
        log: function(msg) {
            var item = document.createElement('li');
            item.innerHTML = msg;
            output.appendChild(item);
            if(!DEBUG) return;
            try {
                console.log(msg);
            }
            catch(e) {}
        },
        uid: function() {
            return ~~(Math.random() * 9999);
        }
    };
    var transitions  = {
        // Encode states for terseness and easier updating
        // format: EL:N = East, Left --> North, etc
        'NL': 'W',
        'NR': 'E',
        'SL': 'E',
        'SR': 'W',
        'EL': 'N',
        'ER': 'S',
        'WL': 'S',
        'WR': 'N'
    };
    var heading_codes = {
        'N': 'North',
        'S': 'South',
        'E': 'East',
        'W': 'West'
    };
    var symbols = {
        'N': '^',
        'S': 'v',
        'E': '>',
        'W': '<'
    };

    function Rover(x, y, heading) {
        // Keep track of internal state (OOP style)
        var self            = this;
        this.id             = 'HAL-' + utils.uid();
        this.moving         = false;
        this.heading        = heading || 'N';
        this.pos            = {'x': x || 0, 'y': y || 0};
        this.last_pos       = {'x': x || 0, 'y': y || 0};
        this.delay          = options.delay; // milliseconds
        this.formatPosition = function() {
            // Helper to format position string for re-usability
            return ['Position ', '[' + self.pos.x, ',', self.pos.y + ']',
                    ' facing ', symbols[self.heading],
                    ' ', heading_codes[self.heading]].join('');
        };
        this.move = function(command) {
            if(!command) throw new Error('Need a command');
            // force uppercase to be safe.
            command = command.toUpperCase();
            // only render position if move command was sent.
            if(command === 'M') {
                self.render();
                return;
            }
            // update heading by encoding the current state
            self.heading = transitions[self.heading + command];
        };
        this.tour = function(commands) {
            if(!commands) throw new Error('Need a set of commands');
            self.moving = true;
            // Make sure commands input is uppercase, then setup sequence
            commands.toUpperCase().split('');
            for(var i = 0; i < commands.length; i++) {
                // capture current iteration in a closure
                // to allow offset timing
                // and "animate" -- strictly cosmetic
                // to show the queuing capability.
                (function(i){
                    setTimeout(function(){
                        // call each command in turn
                        self.move(commands[i]);
                        utils.log('[Rover ' + self.id + '] [Touring]: ' + commands[i] + ', ' + self.formatPosition());
                        if(i === commands.length - 1) {
                            var final_msg = '[Rover ' + self.id + '] [Tour complete] ' + commands[i] + ', ' + self.formatPosition() + '';
                            utils.log(final_msg);
                            self.moving = false;
                        }
                    }, i * self.delay);
                })(i);
            }
        };
        this.updatePosition = function() {
            var outside_boundary = null;
            // Update previous position with current
            self.last_pos.x = self.pos.x;
            self.last_pos.y = self.pos.y;
            // Convert heading into actual coordinate update.
            if(self.heading === 'N') {
                self.pos.y += INCREMENT;
            } else if(self.heading === 'S') {
                self.pos.y -= INCREMENT;
            } else if(self.heading === 'W') {
                self.pos.x -= INCREMENT;
            } else if(self.heading === 'E') {
                self.pos.x += INCREMENT;
            }
            // Check if new position is "out of bounds"
            outside_boundary = (self.pos.x < 0 || self.pos.y < 0 || self.pos.x > width || self.pos.y > height);
            if(outside_boundary) {
                // reset to previous "safe" configuration
                self.pos = self.last_pos;
                console.error('[Rover ' + self.id + '] I\'m sorry Dave, I\'m afraid I can\'t do that. [Out of Bounds Exception]');
            }
        };
        this.position = function() {
            // Returns current position data for testing,
            // reference, etc..
            return {
                'x': self.pos.x,
                'y': self.pos.y,
                'heading': self.heading
            };
        };
        this.render = function() {
            self.updatePosition();
        };
        this.init = function() {
            // update global rover count
            total_rovers += 1;
            utils.log('[Rover ' + self.id + '] A new rover born! New count: ' + total_rovers + ' ' + self.formatPosition());
        };
        self.init();
    }

    function RoverQueue() {
        // The RoverQueue is a manager that takes care of all rovers
        var self    = this;
        this.rovers = [];
        this.id     = 'RQ-' + utils.uid();

        this.add = function(rover) {
            if(!rover) throw new Error('Need a rover object to add.');
            // Adds new rovers to internal queue,
            // but doesn't run them
            // format required for rover:
            // {'rover': rover object, 'tour': commands-list string}
            utils.log('[RoverQueue] Added new rover: ' + rover.rover.id);
            self.rovers.push(rover);
            return self;
        };
        this.run = function() {
            // An event loop that runs forever until stopped.
            utils.log('[RoverQueue] Running...');
            for(var i = 0; i < self.rovers.length; i++) {
                (function(i){
                    var current_rover = self.rovers[i];
                    // Delay based on any arbitrary length,
                    // so individual rovers can have differing speeds
                    // and the calculation will still be correct.
                    // However, don't delay if it's the first item in the queue.
                    var delay = i === 0 ? 0 : current_rover.tour.split('').length * current_rover.rover.speed;
                    setTimeout(function(){
                        current_rover.rover.tour(current_rover.tour);
                    }, delay);
                })(i);
            }
        };
        utils.log('[RoverQueue] ' + self.id + ' created...');
    }

    return {
        'Rover': Rover,
        'Queue': RoverQueue
    };
};
