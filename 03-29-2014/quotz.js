var quotes = (function(){
    var $generate = $('#generate');
    var $quote    = $('#quote').find('span');
    var $original = $('#original');
    var disabled  = false;
    var quotes    = {
        'You can do anything, but not everything.': 'David Allen',
        'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.': 'Antoine de Saint-Exupery',
        'The richest man is not he who has the most, but he who needs the least.': 'Unknown Author',
        'You miss 100 percent of the shots you never take.': 'Wayne Gretzky',
        'Courage is not the absence of fear, but rather the judgement that something else is more important than fear.': 'Ambrose Redmoon',
        'You must be the change you wish to see in the world.': 'Gandhi',
        'When hungry, eat your rice; when tired, close your eyes. Fools may laugh at me, but wise men will know what I mean.': 'Lin-Chi',
        'The third-rate mind is only happy when it is thinking with the majority. The second-rate mind is only happy when it is thinking with the minority. The first-rate mind is only happy when it is thinking.': 'A. A. Milne',
        'To the man who only has a hammer, everything he encounters begins to look like a nail.': 'Abraham Maslow',
        'We are what we repeatedly do; excellence, then, is not an act but a habit.': 'Aristotle',
        'A wise man gets more use from his enemies than a fool from his friends.': 'Baltasar Gracian',
        'Do not seek to follow in the footsteps of the men of old; seek what they sought.': 'Basho',
        'Everyone is a genius at least once a year. The real geniuses simply have their bright ideas closer together.': 'Georg Christoph Lichtenberg',
        'What we think, or what we know, or what we believe is, in the end, of little consequence. The only consequence is what we do.': 'John Ruskin',
        'The real voyage of discovery consists not in seeking new lands but seeing with new eyes.': 'Marcel Proust',
        'Work like you don\'t need money, love like you\'ve never been hurt, and dance like no one\'s watching': 'Unknown Author',
        'Try a thing you haven\'t done three times. Once, to get over the fear of doing it. Twice, to learn how to do it. And a third time, to figure out whether you like it or not.': 'Virgil Garnett Thomson',
        'Even if you\'re on the right track, you\'ll get run over if you just sit there.': 'Will Rogers',
        'People often say that motivation doesn\'t last. Well, neither does bathing - that\'s why we recommend it daily.': 'Zig Ziglar',
        'Before I got married I had six theories about bringing up children; now I have six children and no theories.': 'John Wilmot',
        'What the world needs is more geniuses with humility, there are so few of us left.': 'Oscar Levant',
        'Always forgive your enemies; nothing annoys them so much.': 'Oscar Wilde',
        'Ive gone into hundreds of [fortune-teller\'s parlors], and have been told thousands of things, but nobody ever told me I was a policewoman getting ready to arrest her.': 'New York City detective',
        'When you go into court you are putting your fate into the hands of twelve people who weren\'t smart enough to get out of jury duty.': 'Norm Crosby',
        'Those who believe in telekinetics, raise my hand.': 'Kurt Vonnegut',
        'Just the fact that some geniuses were laughed at does not imply that all who are laughed at are geniuses. They laughed at Columbus, they laughed at Fulton, they laughed at the Wright brothers. But they also laughed at Bozo the Clown.': 'Carl Sagan',
        'My pessimism extends to the point of even suspecting the sincerity of the pessimists.': 'Jean Rostand',
        'Sometimes I worry about being a success in a mediocre world.': 'Lily Tomlin',
        'I quit therapy because my analyst was trying to help me behind my back.': 'Richard Lewis',
        'We\'ve heard that a million monkeys at a million keyboards could produce the complete works of Shakespeare; now, thanks to the Internet, we know that is not true.': 'Robert Wilensky',
        'If there are no stupid questions, then what kind of questions do stupid people ask? Do they get smart just in time to ask questions?': 'Scott Adams',
        'If the lessons of history teach us anything it is that nobody learns the lessons that history teaches us.': 'Anon',
        'When I was a boy I was told that anybody could become President. Now I\'m beginning to believe it.': 'Clarence Darrow',
        'Laughing at our mistakes can lengthen our own life. Laughing at someone else\'s can shorten it.': 'Cullen Hightower',
        'There are many who dare not kill themselves for fear of what the neighbors will say.': 'Cyril Connolly',
        'There\'s so much comedy on television. Does that cause comedy in the streets?': 'Dick Cavett',
        'All men are frauds. The only difference between them is that some admit it. I myself deny it.': 'H. L. Mencken',
        'I don\'t mind what Congress does, as long as they don\'t do it in the streets and frighten the horses.': 'Victor Hugo',
        'I took a speed reading course and read ‘War and Peace\' in twenty minutes. It involves Russia.': 'Woody Allen',
        'The person who reads too much and uses his brain too little will fall into lazy habits of thinking.': 'Albert Einstein',
        'Believe those who are seeking the truth. Doubt those who find it.': 'André Gide',
        'It is the mark of an educated mind to be able to entertain a thought without accepting it.': 'Aristotle',
        'I\'d rather live with a good question than a bad answer.': 'Aryeh Frimer',
        'We learn something every day, and lots of times it\'s that what we learned the day before was wrong.': 'Bill Vaughan',
        'I have made this letter longer than usual because I lack the time to make it shorter.': 'Blaise Pascal',
        'Don\'t ever wrestle with a pig. You\'ll both get dirty, but the pig will enjoy it.': 'Cale Yarborough',
        'An inventor is simply a fellow who doesn\'t take his education too seriously.': 'Charles F. Kettering',
        'Asking a working writer what he thinks about critics is like asking a lamppost how it feels about dogs.': 'Christopher Hampton',
        'Better to write for yourself and have no public, than to write for the public and have no self.': 'Cyril Connolly',
        'Never be afraid to laugh at yourself, after all, you could be missing out on the joke of the century.': 'Dame Edna Everage',
        'I am patient with stupidity but not with those who are proud of it.': 'Edith Sitwell',
        'Normal is getting dressed in clothes that you buy for work and driving through traffic in a car that you are still paying for - in order to get to the job you need to pay for the clothes and the car, and the house you leave vacant all day so you can afford to live in it.': 'Ellen Goodman',
        'The cure for boredom is curiosity. There is no cure for curiosity': 'Ellen Parr',
        'Advice is what we ask for when we already know the answer but wish we didn\'t.': 'Erica Jong',
        'Some people like my advice so much that they frame it upon the wall instead of using it.': 'Gordon R. Dickson',
        'The trouble with the rat race is that even if you win, you\'re still a rat.': 'Lily Tomlin',
        'Never ascribe to malice, that which can be explained by incompetence.': 'Napoleon (Hanlon\'s Razor)',
        'Imagination was given to man to compensate him for what he is not, and a sense of humor was provided to console him for what he is.': 'Oscar Wilde',
        'When a person can no longer laugh at himself, it is time for others to laugh at him.': 'Thomas Szasz'
    };

    function init() {
        $generate.on('click', function(e){
            var original = Object.keys(randomObjValue(quotes))[0];
            var updated = original.toLowerCase();
            var cite = quotes[original];
            e.preventDefault();
            if(disabled) {
                return;
            }
            disabled = true;
            $(this).addClass('subdued');
            $quote.empty();
            $original.empty();
            simpleLetterSequence({
                container: $original,
                word: updated + ' -' + cite,
                fade: 100,
                css_before: {
                    'color': 'black',
                },
                css_after: {
                    'color': 'white',
                },
                timing: 50 / 2
            });
            simpleLetterSequence({
                container: $quote,
                word: replaceAll(updated),
                fade: 40,
                css_before: {
                    'color': 'black',
                },
                css_after: {
                    'color': 'white',
                },
                timing: 100 / 2,
                callback: function(){
                    $generate.removeClass('subdued');
                    disabled = false;
                }
            });
        });
$generate.click();
}

function replaceAll(word) {
    word = word.replace(/you/g, 'u');
    word = word.replace(/for /g, '4 ');
    word = word.replace(/too /g, '2 ');
    word = word.replace(/to /g, '2 ');
    word = word.replace(/with/g, 'wit');
    word = word.replace(/ing/g, 'in');
    word = word.replace(/are/g, 'r');
    word = word.replace(/was/g, 'wuz');
    word = word.replace(/not/g, 'n0t');
    word = word.replace(/serious/g, 'srs');
    word = word.replace(/know/g, 'kno');
    word = word.replace(/through/g, 'thru');
    word = word.replace(/never/g, 'nvr');
    word = word.replace(/like/g, 'lyke');
    word = word.replace(/I\'ve/g, 'iv');
    word = word.replace(/ is/g, ' iz');
    word = word.replace(/the/g, 'teh');
    return word;
}

return {
    'init': init
};

})();

$(document).ready(quotes.init);
