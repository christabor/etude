$(document).ready(function(){
    var myTypeLibrary = fonTypey({
        api_key: global_config.GOOGLE_API_KEY
    });
    myTypeLibrary.initAllFeatures('body');
});
