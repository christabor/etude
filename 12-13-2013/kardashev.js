$(document).ready(function () {
    if(!global_config.is_mobile) {
        skrollr.init();
        $(window).on('scroll', function(e){
            console.log($(window).scrollTop());
        });
    }
    return;
});
