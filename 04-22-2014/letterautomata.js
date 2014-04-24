var letterautomata = (function(){
    var dims        = getViewportDimensions();
    var height      = dims.height;
    var width       = dims.width;
    var $links      = document.querySelectorAll('.btn');
    var $textbox    = document.getElementById('text');
    var canvas_elem = document.querySelector('canvas');
    var increment   = 2;
    var padding     = 10;
    var MAX         = 10;
    var travelers   = [];
    var global_x    = 0;
    var global_y    = 0;
    var texts       = {
        'rev': 'And after these things I heard a great voice of much people in heaven, saying, Alleluia; Salvation, and glory, and honour, and power, unto the Lord our God: 2For true and righteous are his judgments: for he hath judged the great whore, which did corrupt the earth with her fornication, and hath avenged the blood of his servants at her hand. 3And again they said, Alleluia. And her smoke rose up for ever and ever. 4And the four and twenty elders and the four beasts fell down and worshipped God that sat on the throne, saying, Amen; Alleluia. 5And a voice came out of the throne, saying, Praise our God, all ye his servants, and ye that fear him, both small and great. 6And I heard as it were the voice of a great multitude, and as the voice of many waters, and as the voice of mighty thunderings, saying, Alleluia: for the Lord God omnipotent reigneth. 7Let us be glad and rejoice, and give honour to him: for the marriage of the Lamb is come, and his wife hath made herself ready. 8And to her was granted that she should be arrayed in fine linen, clean and white: for the fine linen is the righteousness of saints. 9And he saith unto me, Write, Blessed are they which are called unto the marriage supper of the Lamb. And he saith unto me, These are the true sayings of God. 10And I fell at his feet to worship him. And he said unto me, See thou do it not: I am thy fellowservant, and of thy brethren that have the testimony of Jesus: worship God: for the testimony of Jesus is the spirit of prophecy. 11And I saw heaven opened, and behold a white horse; and he that sat upon him was called Faithful and True, and in righteousness he doth judge and make war. 12His eyes were as a flame of fire, and on his head were many crowns; and he had a name written, that no man knew, but he himself. 13And he was clothed with a vesture dipped in blood: and his name is called The Word of God. 14And the armies which were in heaven followed him upon white horses, clothed in fine linen, white and clean. 15And out of his mouth goeth a sharp sword, that with it he should smite the nations: and he shall rule them with a rod of iron: and he treadeth the winepress of the fierceness and wrath of Almighty God. 16And he hath on his vesture and on his thigh a name written, KING OF KINGS, AND Lord OF LORDS. 17And I saw an angel standing in the sun; and he cried with a loud voice, saying to all the fowls that fly in the midst of heaven, Come and gather yourselves together unto the supper of the great God; 18That ye may eat the flesh of kings, and the flesh of captains, and the flesh of mighty men, and the flesh of horses, and of them that sit on them, and the flesh of all men, both free and bond, both small and great. 19And I saw the beast, and the kings of the earth, and their armies, gathered together to make war against him that sat on the horse, and against his army. 20And the beast was taken, and with him the false prophet that wrought miracles before him, with which he deceived them that had received the mark of the beast, and them that worshipped his image. These both were cast alive into a lake of fire burning with brimstone. 21And the remnant were slain with the sword of him that sat upon the horse, which sword proceeded out of his mouth: and all the fowls were filled with their flesh.',
        'pok': 'Squirtle used tackle - it\'s super effective!',
        'roz': 'Nay, their endeavour keeps in the wonted pace: but there is, sir, an aery of children, little eyases, that cry out on the top of question, and are most tyrannically clapped for\'t: these are now the fashion, and so berattle the common stages--so they call them--that many wearing rapiers are afraid of goose-quills and dare scarce come thither.'
    };
    var map         = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3,
        'e': 4,
        'f': 5,
        'g': 6,
        'h': 7,
        'i': 8,
        'j': 9,
        'k': 0,
        'l': 1,
        'm': 2,
        'n': 3,
        'o': 4,
        'p': 5,
        'q': 6,
        'r': 7,
        's': 8,
        't': 9,
        'u': 0,
        'v': 1,
        'w': 2,
        'x': 3,
        'y': 4,
        'z': 5
    };

    function translateLetters(words) {
        // Start at N, then go clockwise:
        // N, E, S, W
        var directions = ['N', 'E', 'S', 'W'];
        var movements  = [];
        var letters    = words.split('');
        var current    = 0;

        for(var i = 0, len = letters.length - 1; i <= len; i++) {
            var key = map[letters[i]];
            // check and iterate directions
            if(current === directions.length) {
                // reset direction
                current = 0;
            }
            if(!key) {
                key = 0;
            }
            movements.push([directions[current], key]);
            current += 1;
        }
        return movements;
    }

    function reset() {
        ctx.fillStyle = '#dfffdc';
        ctx.fillRect(0, 0, width, height);
    }

    function processLetters(event) {
        reset();
        var text = this.value;
        var size   = 4;
        var coords = translateLetters(text);
        var curr_x = width / 2;
        var curr_y = height / 2;
        for(var i = 0, len = coords.length - 1; i <= len; i++) {
            // get distance, increase magnitude for effect
            var distance = coords[i][1] * 3;
            if(coords[i][0] === 'N') {
                curr_y += distance;
            } else if(coords[i][0] === 'S') {
                curr_y -= distance;
            } else if(coords[i][0] === 'W') {
                curr_x += distance;
            } else {
                curr_x -= distance;
            }
            ctx.fillStyle = '#e70047';
            ctx.moveTo(curr_x, curr_y);
            ctx.fillRect(curr_x, curr_y, size, size);
            ctx.fill();
        }
    }

    function processLink(event) {
        event.preventDefault();
        var text = this.getAttribute('id');
        $textbox.value = texts[text];
        $textbox.onkeypress();
    }

    function init() {
        bootstrapCanvas(null, false);
        $textbox.onkeydown = processLetters;
        $textbox.onkeyup = processLetters;
        $textbox.onkeypress = processLetters;
        for(var $link in $links) {
            $links[$link].onclick = processLink;
        }
    }

    return {
        'init': init
    };

})();

window.onload = letterautomata.init;
