var spiraldynamics = (function(){
    var dims    = getViewportDimensions();
    var W       = dims.width;
    var H       = dims.height;
    var results = $('#results');
    var data    = $('#data');
    var tiers   = [
        {
            'color': 'beige',
            'title': 'Instinctive',
            'name': 'Survival/Sense. The "Instinctive"',
            'qualities': [
                'Automatic, autistic, reflexive',
                'Centers around satisfaction',
                'Driven by deep brain programs, instincts and genetics',
                'Little awareness of self as a distinct being (undifferentiated)',
                'Lives "off the land" much as other animals',
                'Minimal impact on or control over environment'
            ]
        },
        {
            'color': 'purple',
            'title': 'Clannish',
            'name': 'Kin Spirits. The "Clannish"',
            'qualities': [
                'Obey desires of the mystical spirit beings',
                'Show allegiance to elders, custom, clan',
                'Preserve sacred places, objects, rituals',
                'Bond together to endure and find safety',
                'Live in an enchanted, magical village',
                'Seek harmony with nature\'s power'
            ]
        },
        {
            'color': 'red',
            'title': 'Egocentric',
            'name': 'PowerGods. The "Egocentric"',
            'qualities': [
                'In a world of haves and have-nots, it\'s good to be a have',
                'Avoid shame, defend reputation, be respected',
                'Gratify impulses and sense immediately',
                'Fight remorselessly and without guilt to break constraints',
                'Don\'t worry about consequences that may not come'
            ]
        },
        {
            'color': 'blue',
            'title': 'Purposeful',
            'name': 'TruthForce. The "Purposeful"',
            'qualities': [
                'Find meaning and purpose in living',
                'Sacrifice self to the Way for deferred reward',
                'Bring order and stability to all things',
                'Control impulsivity and respond to guilt',
                'Enforce principles of righteous living',
                'Divine plan assigns people to their places'
            ]
        },
        {
            'color': 'orange',
            'title': 'Strategic',
            'name': 'StriveDrive. The "Strategic"',
            'qualities': [
                'Strive for autonomy and independence',
                'Seek out "the good life" and material abundance',
                'Progress through searching out the best solutions',
                'Enhance living for many through science and technology',
                'Play to win and enjoy competition',
                'Learning through tried-and-true experience'
            ]
        },
        {
            'color': 'green',
            'title': 'Relativistic',
            'name': 'HumanBond. The "Relativistic"',
            'qualities': [
                'Explore the inner beings of self and others',
                'Promote a sense of community and unity',
                'Share society\'s resources among all',
                'Liberate humans from greed and dogma',
                'Reach decisions through consensus',
                'Refresh spirituality and bring harmony'
            ]
        },
        {
            'color': 'yellow',
            'title': 'Systemic',
            'name': 'FlexFlow. The "Systemic"',
            'qualities': [
                'Accept the inevitability of nature\'s flows and forms',
                'Focus on functionality, competence, flexibility, and spontaneity',
                'Find natural mix of conflicting "truths" and "uncertainties"',
                'Discovering personal freedom without harm to others or excesses of self-interest',
                'Experience fullness of living on an Earth of such diversity in multiple dimensions',
                'Demand integrative and open systems'
            ]
        },
        {
            'color': 'turquoise',
            'title': 'Holistic',
            'name': 'GlobalView. The "Holistic"',
            'qualities': [
                'Blending and harmonizing a strong collective of individuals',
                'Focus on the good of all living entities as integrated systems',
                'Expanded use of human brain/mind tools and competencies',
                'Self is part of larger, conscious, spiritual whole that also serves self',
                'Global (and whole-spiral!) networking seen as routine',
                'Acts for minimalist living so less actually is more'
            ]
        }
    ];

    function processResults() {
        var buckets = {};
        $('form').find('input:checked').each(function(_, el){
            var key = $(el).data('title');
            // count title by key to process results
            if(buckets[key] === undefined) {
                buckets[key] = 0;
            } else {
                buckets[key] += 1;
            }
        });
        return buckets;
    }

    function getMaxColorBucket(buckets) {
        // returns the title of the object with the highest
        // number of color counts
        var max = null;
        var title = null;

        $.each(buckets, function(_title, bucket){
            if(max) {
                if(bucket.color > max.color) {
                    max = bucket;
                    title = _title;
                }
            } else {
                title = _title;
                max = bucket;
            }
        });
        // return correct object by max count
        return _.filter(tiers, function(d){
            return d.title === title;
        });
    }

    function populateResults(buckets) {
        // toggle results
        $('form').fadeOut(100);
        results.fadeIn(100);
        // show primary type (by max colors)
        var type = getMaxColorBucket(buckets)[0];
        $('#primary-type').addClass('type-color ' + type.color).find('span').html(type.name);
        // load all attributes and weights
        $.each(buckets, function(title, key){
            results.find('#types')
            .find('#' + title)
            .find('p').text(key + 1);
        });
    }

    function loadTypes(types) {
        $.each(types, function(_, type){
            $('#types').append('<div class="type-color ' + type.color + '" id="' + type.title + '"><h4>' + type.name + '</h4><p>0</p></div>');
        });
    }

    function gradeForm(e) {
        e.preventDefault();
        // decouple processes
        populateResults(processResults());
    }

    function generateTier(tiername) {
        // generates all the html for all tiers
        // for initial form setup
        $.each(tiername, function(_, el){
            var html = '';
            var opts = {'color': el.color, 'title': el.title};
            for(var i = 0; i < el.qualities.length; i++) {
                html += strToHTMLCheckBox(el.qualities[i], i, opts);
            }
            data.append(html);
        });
    }

    function loadFormData() {
        // get each tiers data loaded as html
        generateTier(tiers);
    }

    function init() {
        // generate form data
        loadFormData();
        // put examples in results container
        loadTypes(tiers);
        $('form').on('submit', gradeForm);
    }

    return {
        'init': init
    };

})();

$(document).ready(spiraldynamics.init);
