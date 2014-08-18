var godmode = (function(){
    var toggle = true;
    var panel = $('#panel');

    var commands = {
        GODMODE: function() {
            alert('God mode activated...');
        },
        IDKFA: function() {
            alert('Mega armor, keys ammo, and weapons granted...');
        },
        IDCLIP: function() {
            alert('Noclip activated... you may now walk through walls...');
        },
        NOCLIP: function() {
            alert('Noclip activated... you may now walk through walls...');
        },
        GIVE_HEALTH: function() {
            alert('Extra health added...');
        },
        IDCHOPPERS: function() {
            alert('A chainsaw fan, eh?');
        },
        HODOR: function(){
            alert('HODOR!');
        }
    };

    function toggleConsole() {
        // slide up and down
        panel.css('top', (toggle ? 0 : -panel.outerHeight()) + 'px');
        toggle = !toggle;
    }

    function processCommand() {
        log('processing commands...');
        var _command = null;
        var recent_commands = $('textarea').val().toUpperCase().split('\n');
        var tail = recent_commands.length - 1;
        try {
            _command = recent_commands[tail].split(' ').join('_');
            commands[_command]();
        } catch(e) {
            $('textarea').val($('textarea').val() + '\n' + 'Invalid command: "' + recent_commands[tail] + '" ');
            throw new SyntaxError('Invalid game console command ... perhaps try "GODMODE", or dig deeper...');
        }
    }

    function init() {
        panel.css('top', -panel.outerHeight()).show();
        $(document).on('keypress', function(e){
            // tick / tilde
            if(e.which === 96 || e.which === 126) toggleConsole();
            if(e.which === 13) processCommand();
        });
    }

    return {
        'init': init
    }
})();

$(document).ready(godmode.init);
