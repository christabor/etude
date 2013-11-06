$(document).ready(function(){
    var message = $('#message'),
    been_redacted = false;

    function reredact() {
        log('re-redacting');
        // redact a second time, skip some unnecessary steps.
        message.find('span').each(function(k, span){
            if(Math.random() * 10 > 5) {
                $(span).removeClass('redacted');
            } else {
                $(span).addClass('redacted');
            }
        });
        return;
    }

    function redact() {
        log('redacting');
        message.find('p').each(function(){
            // split each paragraph by newline
            var redacted = '',
            text = $(this).text().split('\n');
            $(text).each(function(k, line){
                var chunks = line.split(' ');
                $(chunks).each(function(k, chunk){
                    if(Math.random() * 10 > 5) {
                        redacted += ' <span>' + $.trim(chunk) + '</span> ';
                    } else {
                        redacted += ' <span class="redacted">' + $.trim(chunk) + '</span> ';
                    }
                });
            });
            // update html
            $(this).html(redacted);
        });
        message.find('span:empty').remove();
        been_redacted = true;
        return;
    }
    $('#redactor').on('click', function(){
        // check if it's been done already
        if(been_redacted) {
            reredact();
        } else {
            redact();
        }
        $(this).text('Redact it again.');
    });
});
