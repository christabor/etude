var convos = (function(){
    'use strict';
    var is_conversing = false;
    var $convo = $('#conversation');
    var $person_a = $('#person_a');
    var $person_b = $('#person_b');
    var filler = [
        'lol. ',
        'Oh really? ',
        'Hahaha ',
        'OMG so... ',
        'Wowwww ',
        'Heh. ',
        'LOL ',
        'rofl! ',
        'lmao, yep - ',
        'I was just thinking... ',
        'Ya, I think '
    ];
    var attributions = {
        'frank_zappa': [
            'You can\'t be a real country unless you have a beer and an airline. It helps if you have some kind of a football team, or some nuclear weapons, but at the very least you need a beer.',
            'Some scientists claim that hydrogen, because it is so plentiful, is the basic building block of the universe. I dispute that. I say there is more stupidity than hydrogen, and that is the basic building block of the universe.',
            'All the good music has already been written by people with wigs and stuff.',
            'It isn\'t necessary to imagine the world ending in fire or ice. There are two other possibilities: one is paperwork, and the other is nostalgia.'
        ],
        'h.p._lovecraft': [
            'The world is indeed comic, but the joke is on mankind.',
            'The most merciful thing in the world... is the inability of the human mind to correlate all its contents.',
            'To the scientist there is the joy in pursuing truth which nearly counteracts the depressing revelations of truth.',
            'Ocean is more ancient than the mountains, and freighted with the memories and the dreams of Time.',
            'I fear my enthusiasm flags when real work is demanded of me.'
        ],
        'mahatma_gandhi': [
            'An eye for an eye only ends up making the whole world blind.',
            'The best way to find yourself is to lose yourself in the service of others.',
            'You must be the change you wish to see in the world.',
            'Jesus is ideal and wonderful, but you Christians - you are not like him.',
            'The greatness of a nation can be judged by the way its animals are treated.',
            'Anger and intolerance are the enemies of correct understanding.'
        ],
        'albert_einstein': [
            'Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.',
            'Try not to become a man of success, but rather try to become a man of value.',
            'You have to learn the rules of the game. And then you have to play better than anyone else.',
            'The world is a dangerous place to live; not because of the people who are evil, but because of the people who don\'t do anything about it.',
            'Only a life lived for others is a life worthwhile.',
            'Imagination is more important than knowledge.',
            'If you can\'t explain it simply, you don\'t understand it well enough.',
            'Look deep into nature, and then you will understand everything better.',
            'We cannot solve our problems with the same thinking we used when we created them.'
        ],
        'malcolm_x': [
            'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
            'A man who stands for nothing will fall for anything.',
            'I\'m for truth, no matter who tells it. I\'m for justice, no matter who it\'s for or against.',
            'Without education, you are not going anywhere in this world.'
        ],
        'walt_disney': [
            'You can design and create, and build the most wonderful place in the world. But it takes people to make the dream a reality.',
            'A man should never neglect his family for business.',
            'It\'s kind of fun to do the impossible.',
            'I only hope that we don\'t lose sight of one thing - that it was all started by a mouse.',
            'I would rather entertain and hope that people learned something than educate people and hope they were entertained.',
            'When you\'re curious, you find lots of interesting things to do.'
        ],
        'lewis_carroll': [
            'If you don\'t know where you are going, any road will get you there.',
            'I can\'t go back to yesterday - because I was a different person then.',
            'Why, sometimes I\'ve believed as many as six impossible things before breakfast.',
            'It\'s a poor sort of memory that only works backwards.'
        ],
        'julius_caesar': [
            'I came, I saw, I conquered.',
            'Experience is the teacher of all things.',
            'Cowards die many times before their actual deaths.',
            'Men freely believe that which they desire.'
        ],
        'jimi_hendrix': [
            'When the power of love overcomes the love of power the world will know peace.',
            'The story of life is quicker then the blink of an eye, the story of love is hello, goodbye.',
            'Music is my religion.',
            'Excuse me while I kiss the sky.',
            'Blues is easy to play, but hard to feel.'
        ],
        'franz_kafka': [
            'Anyone who keeps the ability to see beauty never grows old.',
            'A first sign of the beginning of understanding is the wish to die.',
            'From a certain point onward there is no longer any turning back. That is the point that must be reached.',
            'Start with what is right rather than what is acceptable.',
            'It is often safer to be in chains than to be free.',
            'Every revolution evaporates and leaves behind only the slime of a new bureaucracy.'
        ],
        'antoin_de_saint-exupery': [
            'A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.',
            'True happiness comes from the joy of deeds well done, the zest of creating things new.',
            'For true love is inexhaustible; the more you give, the more you have. And if you go to draw at the true fountainhead, the more water you draw, the more abundant is its flow.',
            'I know but one freedom, and that is the freedom of the mind.'
        ],
        'carl_sagan': [
            'Science is a way of thinking much more than it is a body of knowledge.',
            'Somewhere, something incredible is waiting to be known.',
            'Imagination will often carry us to worlds that never were. But without it we go nowhere.',
            'Absence of evidence is not evidence of absence.',
            'If you wish to make an apple pie from scratch, you must first invent the universe.'
        ],
        'ernest_hemingway': [
            'Courage is grace under pressure.',
            'The best way to find out if you can trust somebody is to trust them.',
            'The world breaks everyone, and afterward, some are strong at the broken places.',
            'Happiness in intelligent people is the rarest thing I know.',
            'I like to listen. I have learned a great deal from listening carefully. Most people never listen.',
            'A man can be destroyed but not defeated.',
            'There is no friend as loyal as a book.',
            'Always do sober what you said you\'d do drunk. That will teach you to keep your mouth shut.'
        ],
        'robert_a_heinlein': [
            'Women and cats will do as they please, and men and dogs should relax and get used to the idea.',
            'May you live as long as you wish and love as long as you live.',
            'One man\'s \'magic\' is another man\'s engineering. \'Supernatural\' is a null word.',
        ],
        'mitch_hedberg': [
            'A waffle is like a pancake with a syrup trap.',
            'An escalator can never break: it can only become stairs.',
            'I don\'t have a girlfriend. But I do know a woman who\'d be mad at me for saying that.',
            'I had a stick of CareFree gum, but it didn\'t work. I felt pretty good while I was blowing that bubble, but as soon as the gum lost its flavor, I was back to pondering my mortality.',
            'Rice is great if you\'re really hungry and want to eat two thousand of something.',
            'Fettucini alfredo is macaroni and cheese for adults.'
        ],
        'douglas_adams': [
            'To give real service you must add something which cannot be bought or measured with money, and that is sincerity and integrity.',
            'I love deadlines. I like the whooshing sound they make as they fly by.',
            'A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools.',
            'I seldom end up where I wanted to go, but almost always end up where I need to be.',
            'He was a dreamer, a thinker, a speculative philosopher... or, as his wife would have it, an idiot.',
            'It is a mistake to think you can solve any major problems just with potatoes.',
            'Time is an illusion. Lunchtime doubly so.',
            'Anyone who is capable of getting themselves made President should on no account be allowed to do the job.'
        ]
    };

    function formatName(name) {
        return name.split('_').join(' ');
    }

    function populateMenus(menu) {
        $.each(attributions, function(author, quotes){
            // populate the menu with all author options
            $(menu).append('<option value="' + author + '">' + formatName(author) + '</option>');
        });
    }

    function addMessageBlock(author, msg, is_first) {
        // add the message block
        var html = ['<div class="message-outer">',
                    '<div class="animated ' + (is_first ? 'fadeInLeft': 'fadeInRight') + ' message">',
                    '<cite class="subdued attribution">',
                    formatName(author), '</cite>', msg,
                    '</div></div>'].join('')
        $convo.append(html);
    }

    function converse(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if(is_conversing) {
            $('button').addClass('disabled');
            return;
        }
        is_conversing = true;
        $('button').removeClass('disabled');
        var length_of_convo = rando(6) + 1;
        var author_a = $person_a.val();
        var author_b = $person_b.val();
        // set the active quotes
        var quotes_a = attributions[author_a];
        var quotes_b = attributions[author_b];
        // clear convo
        $convo.empty();
        for(var i = 1; i <= length_of_convo - 1; i++) {
            addMessageBlock(author_a, randomArrayValue(filler) + randomArrayValue(quotes_a), true);
            addMessageBlock(author_b, randomArrayValue(filler) + randomArrayValue(quotes_b), false);
        }
        is_conversing = false;
    }

    function init() {
        $('form').on('submit', converse);
        populateMenus('#person_a');
        populateMenus('#person_b');
    }

    return {
        init: init
    };

})();

$(document).ready(convos.init);
