var snippets = (function(){
    var container = $('#words');
    var form      = $('#form');

    function init() {
        form.on('submit', function(e) {
            e.preventDefault();
            var vals = $(this).find('input, textarea');
            addSnippet(vals);
        });
    }

    function createTag(tag_name, val) {
        return [
            '&lt;', tag_name, '&gt;', val,
            '&lt;/', tag_name, '&gt;'
        ].join('');
    }

    function addSnippet(vals) {
        // vals = content, tabtrigger, scope, description
        // <snippet>
        //     <content><![CDATA[Some code snippet:${1:1.10.2}]]></content>
        //     <tabTrigger>pdb</tabTrigger>
        //     <scope>source.extension</scope>
        //     <description>My Snippet Description</description>
        // </snippet>
        var snippet = [];
        container.empty();
        vals.each(function(k, input){
            var tag_name = $(input).attr('name');
            var val = $(input).val();
            var tag = createTag(tag_name, val);
            snippet.push(tag);
            log(input);
        });
        snippet = snippet.join('<br />')
        container.append(snippet);
    }
    return {
        init: init
    };

})();

$(document).ready(snippets.init);
