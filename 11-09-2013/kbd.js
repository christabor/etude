$(document).ready(function(){
    var keys_list = $('#keys');
    var output = $('#output').find('p');
    var keyboard = '`~1234567890-=!""\'@#$%^&*()_+QWERTYUIOPqwertyuiop[]\\{}|ASDFGHJKLasdfghjkl;:ZXCVBNMzxcvbnm,./<>?';

    function setupKeyboard() {
        for(var key in keyboard) {
            var item = $('<li></li>')
            .attr('data-id', 'key-' + keyboard[key])
            .text(keyboard[key]);
            keys_list.append(item);
        }
        return;
    }

    function addEvents() {
        $(document).on('keypress', function(e){
            var current_key = keys_list.find('[data-id="key-' + String.fromCharCode(e.which) + '"]');
            e.preventDefault();
            e.stopImmediatePropagation();

            current_key.clearQueue().css('background-color', randomColor(100));
            setTimeout(function(){
                current_key.css('background-color', 'white');
            }, 100);
            output.append(String.fromCharCode(e.which) + ' ');
        });
        return;
    }

    setupKeyboard();
    addEvents();
    return;
});
