var punnett = (function(){
    var html           = '';
    var traits         = [];
    var mutations      = [];
    var square         = $('#square');
    var form           = $('#form');
    var submit         = form.find('button');
    var add_more       = $('#add-more');
    var thead          = square.find('thead');
    var results_holder = square.find('tbody');
    var loader         = {
        msg: 'Calculating all mutations...',
        css: {
            'background-color': 'green',
            'font-size': '40px',
            'color': '#fff'
        }
    };

    function addTrait() {
        var current = form.find('fieldset').last();
        var idx     = current.index();

        // limit to 5, since 5 factorial
        // is 120 combinations...
        if($('fieldset').length === 5) {
            $('#add-more').fadeOut(400, function(){
                $(this).remove();
            });
            return alert('Limiting to 5 traits, size exceeds: ' + Math.pow(5, 5));
        }

        $('fieldset').last().clone(false).insertBefore(submit);
        current.find('legend').text('Trait ' + idx);
    }

    function processInputs(e) {
        e.preventDefault();
        globalLoader.load(loader);

        // TEMP! load only 2 for now, but allow infinitely many
        // traits[0] = {
        //     f: female.val(),
        //     m: male.val()
        // };

        // calculate factorial of
        // combinations given N trait pairs
        globalLoader.load(loader);
        calculateMutations(traits, mutations);
        globalLoader.unload();

        // build the html
        loader.msg = 'Building table...';
        globalLoader.load(loader);
        buildTables(html);
        globalLoader.unload();
    }

    function setupEvents() {
        add_more.on('click', function(e){
            e.preventDefault();
            addTrait();
        });

        // form events
        form.on('submit', processInputs);
    }

    function allCaps(str) {
        return str.toUpperCase();
    }

    function swap(first, second) {
        return second + first;
    }

    function doubleArray(arr) {
        var arrs = [[], []];
        // Get one array, make two,
        // one original and one all-cap
        arrs[0] = arr;
        // map over allCaps function
        arrs[1] = _.map(arr, allCaps);
        return arrs;
    }

    function makeIteration(arr1, arr2) {
        var n = _.flatten(_.zip(arr1, arr2));
        mutations.push(n.join(''));
        return mutations; // ???
    }

    function calculateMutations(traits, mutations) {
        log('calculating mutations....');
        // Take a traits input, and mutations input
        // and populate the data with it. No point
        // in bothering with returning a value,
        // so concerns are separated.
        // Traits are mapped to the alphabet, one by one, so
        // trait one = A (dominant) or a (recessive),
        // trait two = B (dominant) or b (recessive), etc...
        // to Z
        // e.g.
        // D blue eyes, R brown eyes
        // D red hair, R blonde hair
        // = A a,  B b
        log(traits)
        log(mutations);
    }

    function buildTables(html) {
        // given a set of mutations,
        // build some html to represent it.
        log(html);
        thead.html();
        results_holder.html('<tr>fooo</tr>');
    }

    function init() {
        var str             = 'abcdef';
        var arr             = str.split('');
        var arr_caps        = str.toUpperCase().split('');
        var alternates      = doubleArray(arr);
        var alternates_caps = doubleArray(arr_caps);

        setupEvents();
        makeIteration(alternates[0], alternates[1]);
        makeIteration(alternates_caps[0], alternates_caps[1]);

        log(mutations);
        log('-----');

        var arrs = [];
        arrs[0] = arrs[1] = ['ab', 'aB', 'Ab', 'AB'];
        arrs[2] = [];

        for(arr in arrs[0]) {
            arrs[2].push(arrs[0][arr] + arrs[1][arr + 1]);
            arrs[1].push(arrs[0][arr][0] + arrs[0][arr][0] + arrs[0][arr][1] + arrs[0][arr][1]);
        }

        log(arrs[1]);
        log('abAB');
        log(swap('ab', 'AB'));
        log(swap('abc', 'cba'));
        log(swap('far', 'near'));
        log(swap('rad', 'cats'));
    }

    /*

    PUNNETT SQUARE

    *******************

    Traits:
    a, b, ....

    and dominant + recessive (A vs. a, B vs. b)
    combos = traits.length * 2
    mutations = combos factorial

    Example:
    =================================

    ab      aB      Ab      AB

    |--------|-------|-------|

    ab  aabb    aabB    aAbb    aAbB

    aB  aaBb    aaBB    aABb    aABB

    Ab  Aabb    AabB    AAbb    AAbB

    AB  AaBb    AaBB    AABb    AABB

    b    B

    a   ab   aB

    A   Ab   AB

    [a,A,b,B]
    [0,1,2,3]

    0, 0+1 = a,b
    1, 1+1 = A,B
    2, 2+1 = b,B

    [a,b,A,B]
    [0,1,2,3]

    ab = 0, 0+1
    aB = 0, 0+2
    Ab = 2, 2-1
    AB = 2, 2+1

    */

    return {
        'init': init
    };

})();

$(document).ready(punnett.init);
