var paper = (function(){
    var $message = $('#message');
    var $generate = $('#generate');
    var numeral_count = 1;
    var equations = [
    '\\alpha(x) \\infty',
    '\\[\\left [ - \\frac{\\hbar^2}{2 m} \\frac{\\partial^2}{\\partial x^2} + V \\right ] \\Psi= i \\hbar \\frac{\\partial}{\\partial t} \\Psi\\]',
    '\\(J_\\alpha(x) = \\sum\\limits_{m=0}^\\infty \\frac{(-1)^m}{m! \\, \\Gamma(m + \\alpha + 1)}{\\left({\\frac{x}{2}}\\right)}^{2 m + \\alpha}\\)',
    'When $a \\ne 0$, there ar e two solutions to' +
    ' \\(ax^2 + bx + c = 0\\) and they are' +
    '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
    ];
    // hack to get some data in cheaply.
    var ipsum = 'Science ipsum. 1917 Einstein also investigated the universal gravitation at z > 1 25 and quantum electrodynamics provides evidence for the structure of a pressing issue despite shortcomings general theory is enhanced by the foundation of universal. Scheme〈U F. This led to study. The laws of light when the reality a universal relation scheme. Where F this is the current epoch of the populations which the mid 1970\'s there is not approach the first phase III vaccine properties. Particularly mode of black holes is an element corresponding to dark energy it is the orientation of these analyses designed. To use.Principle of Bernstein and it is developed our analysis of vaccinal efficacy and other major sub-field. Of making predictions that is argued here that. D has both the orientation of sample size and population. Growth rates from deceleration that in spatially. Homogeneous spacetimes. Which reconciles the degree of the only. Have simultaneous reality a fixed-point semantics that the righthand side of the Hawking black-hole evaporation process causes a pair presents a set of classical mechanics. In. A system that the behaviour and body. Size calculations will be developed our analysis of multivariate selection. On brain sizes it becomes necessary.'.split(' ');

    $generate.on('click', regenerate);

    function randomStringText(max) {
        var str = '';
        for(var i = 0; i <= max; i++) {
            str += ' ' + randomArrayValue(ipsum);
        }
        return str;
    }

    function generateSource(count) {
        // use a real numbering system, relative to the number of
        // headings so it looks semi-legit.
        var source = '<sup>' + count + '</sup>' + ' ' + randomStringText(rando(30));
        return source;
    }

    function addSources() {
        var sources = $('<ul id="sources"></ul>');
        for(var i = 0; i <= numeral_count; i++) {
            var li = $('<li></li>');
            li.html(generateSource(i));
            sources.append(li);
        }
        return sources;
    }

    function randomLatex() {
        return randomArrayValue(equations);
    }

    function addPage() {
        var title = $('<h4 class="title"></h4>');
        var page = $('<div class="message"></div>');
        title.text(multiCopyToString(numeral_count, 'I', '') + '. ' + randomStringText(5));
        doSomethingABunch(function(){
            var p = $('<p></p>');
            p.text(randomStringText(rando(100)));
            if(rando(10) > 5) {
                var latex = $('<span class="latex"></span>');
                latex.text(randomLatex());
                p.append(latex);
            }
            page.append(p);
        }, 10);
        page.prepend(title);
        $message.append(page);

        // set numeral count
        numeral_count += 1;
    }

    function regenerate(e) {
        if(e) {
            e.preventDefault();
            $(this).text('Regenerate it again.');
        }
        $message.empty();
        numeral_count = 0;
        doSomethingABunch(addPage, 4);
        $message.find('.message').last().append(addSources());
        // re-run MathJax
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }

    function init() {
        regenerate();
    }

    return {
        'init': init
    };

})();

$(document).ready(paper.init);
