var sequence = (function(){
    'use strict';
    var $random     = $('#random');
    var $output     = $('#output');
    var acids       = {
        'F': 'Phenyalanine',
        'L': 'Leucine',
        'I': 'Isoleucine',
        'M': 'Methionine',
        'V': 'Valine',
        'S': 'Serine',
        'P': 'Propyline',
        'T': 'Threonine',
        'A': 'Alanine',
        'Y': 'Tyrine',
        'H': 'Histidine',
        'Q': 'Glutamine',
        'N': 'Asparagine',
        'K': 'Lysine',
        'D': 'Aspartic Acid',
        'E': 'Glutamic Acid',
        'C': 'Cysteine',
        'W': 'Tryptophan',
        'R': 'Arginine',
        'G': 'Glycine'
    };
    var ref        = {
        'F': ['UUU', 'UUC'],
        'I': ['AUU', 'AUC', 'AUA', 'AUA'],
        'V': ['GUU', 'GUC', 'GUA', 'GUG'],
        'S': ['UCU', 'UCC', 'UCA', 'UCG', 'AGU', 'AGC'],
        'P': ['CCU', 'CCC', 'CCA', 'CCG'],
        'T': ['ACU', 'ACC', 'ACA', 'ACG'],
        'A': ['GCU', 'GCC', 'GCA', 'GCG'],
        'Y': ['UAU', 'UAC'],
        'STOP': ['UAA', 'UAG', 'UGA'],
        'H': ['CAU', 'CAC'],
        'Q': ['CAA', 'CAG'],
        'N': ['AAU', 'AAC'],
        'K': ['AAA', 'AAG'],
        'START': ['AUG'],
        'D': ['GAU', 'GAC'],
        'E': ['GAA', 'GAG'],
        'C': ['UGU', 'UGC'],
        'W': ['UGG'],
        'G': ['GGU', 'GGC', 'GGA', 'GGG'],
        'R': ['CGU', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'],
        'L': ['UUA', 'UUG', 'CUU', 'CUC', 'CUA', 'CUG'],
    };

    function trigramify(seq) {
        var tri = [];
        for(var i = 0, len = seq.length; i < len; i += 3) {
            // check if it's undefined
            if(seq[i + 2]) {
                tri.push(seq[i] + seq[i + 1] + seq[i + 2]);
            }
        }
        return tri;
    }

    function transcribe(e) {
        var trigrams;
        var encoding = [];
        // clean up data and replace T with U
        // since it's RNA, not DNA
        var sequence = $('input').val()
        .replace(/\T/g, 'U')
        .replace(/[^U|u|C|c|A|a|G|g]/g, '')
        .toUpperCase().split('');
        e.preventDefault();
        // create trigrams for comparisons -- offset "leftover"
        // bits are thrown away (e.g. ACGU => ACG])
        // START codons are automatically added for brevity.
        trigrams = trigramify(sequence);
        // go through each trigram and see which amino acid it matches.
        $.each(trigrams, function(k0, trigram){
            // go through each set of amino acids
            $.each(ref, function(k1, codes){
                // go through all codes for each amino acid
                $.each(codes, function(k2, code){
                    // if any match is found within the set of codes
                    // for a given amino acid, add it to the sequence.
                    if(trigram === code) {
                        if(k1 === 'STOP') {
                            // stop adding when stop is called.
                            return false;
                        } else if(k1 === 'START') {
                            // ignore starts
                            return;
                        } else {
                            encoding.push(k1);
                        }
                    }
                });
            });
        });
        // convert to a human-readable format.
        $output.html(convertCodes(encoding)).hide().fadeIn(100);
        return encoding;
    }

    function convertCodes(codes) {
        // converts codes separately into a nice name
        // modular for separation purposes.
        $.each(codes, function(k, code){
            // just re-assign the value
            codes[k] =  '<span><span class="letter">(' + code + ')</span> ' + acids[code] + '</span>';
        });
        return codes.join('');
    }

    function randomSequence() {
        $('input').val(randomAlternatingString('UCGA', 50));
        $('form').submit();
    }

    function init() {
        // throw in some random values.
        $('form').on('submit', transcribe);
        $random.on('click', randomSequence);
        randomSequence();
    }

    return {
        init: init
    };

})();

$(document).ready(sequence.init);
