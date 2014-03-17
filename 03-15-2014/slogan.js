var slogans = (function(){
    var container    = $('#words').find('.generated');
    var generate     = $('#btn');
    var count_picker = $('#maxcount');
    var iterations   = 5;
    var slogans      = {
        '-Harley Davidson': '""American by Birth. Rebel by Choice."',
        '-Volkswagen': '"Think Small."',
        '-Porsche': '"There is no substitute."',
        '-Aston Martin': '"Power, beauty and soul."',
        '-Walmart': '"Save Money. Live Better."',
        '-Reebok': '"I am what I am."',
        '-Nike': '"Just do it."',
        '-Adidas': '"Impossible is Nothing."',
        '-Calvin Klein': '"Between love and madness lies obsession."',
        '-Marks & Spencer': '"The customer is always and completely right!',
        '-Levis': '"Quality never goes out of style."',
        '-Tag Heuer': '"Success. It\'s a Mind Game."',
        '-3M': '"Innovation."',
        '-IBM': '"Solutions for a smart planet."',
        '-Sony': '"Make Believe."',
        '-IMAX': '"Think big."',
        '-DuPont': '"The miracles of science."',
        '-Energizer': '"Keeps going and going and going."',
        '-PlayStation': '"Live in your world. Play in ours."',
        '-EA': '"Challenge everything."',
        '-Blogger': '"Push button publishing."',
        '-Canon': '"See what we mean."',
        '-Nikon': '"At the heart of the image."',
        '-Kodak': '"Share moments. Share life."',
        '-Olympus': '"Your vision. Our future."',
        '-FedEx': '"When there is no tomorrow."',
        '-Red Cross': '"The greatest tragedy is indifference."',
        '-Disneyland': '"The happiest place on earth."',
        '-Holiday Inn': '"Pleasing people the world over."',
        '-Hallmark': '"When you care enough to send the very best."',
        '-Fortune': '"For the men in charge of change."',
        '-Ajax': '"Stronger than dirt."',
        '-Yellow Pages': '"Let your fingers do the walking."',
        '-McDonalds': '"Im loving it."',
        '-KFC': '"Finger lickin good."',
        'Burger King': '"Have it your way."',
        '-M&Ms': '"Melts in your mouth, not in your hands."',
        '-Nokia': '"Connecting people."',
        '-Vodafone': 'Make the most of now."',
        '-Coca Cola': '"Open Happiness."',
        '-Solex': '"Its Style".'
    };

    function switchCount() {
        iterations = clamp($(this).val(), 2, 20);
    }

    function init() {
        generate.on('click', function(e){
            e.preventDefault();
            addWord();
        });
        count_picker.on('change', switchCount);

        // add menu references
        populateMenu(slogans, $('#all-slogans').find('ul'), '<li>', true);
        addWord();
    }

    function cleanWord(arr) {
        return randomArrayValue(arr)
        .replace(/[^a-zA-Z]/g, '').toLowerCase();
    }

    function getRandomWords(slogan, new_slogan) {
        $.each(slogan, function(k, word){
            new_slogan.push(cleanWord(word.split(' ')));
        });
        return new_slogan;
    }

    function getSlogan() {
        var new_slogan = [];
        doSomethingABunch(function(){
            new_slogan = getRandomWords(randomObjValue(slogans), new_slogan);
        }, iterations);
        return new_slogan.join(' ') + '.';
    }

    function addWord() {
        container.empty();
        container.append('<p> ' + getSlogan() + ' </p>');
    }

    return {
        'init': init
    };

})();

$(document).ready(slogans.init);
