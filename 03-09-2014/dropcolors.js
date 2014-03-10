var layout = (function(){
    var fonts         = global_config.basic_fonts;
    var $generate_btn = $('#generate');
    var $container    = $('#layout-gen');
    var $swatches     = $('#swatches');

    function addColorBlock(color) {
        var block = $('<div class="color"></div>');
        block.css('background-color', color.toHexString());
        return block;
    }

    function resetDragging() {
        $swatches.find('.color-scheme').draggable({
            revert: true,
            stop: function(event) {
                var colors = $(this)
                .find('.color');
                $(colors).each(function(k, color){
                    setTimeout(function(){
                        var _color = $(color).css('background-color');
                        var compl  = tinycolor
                        .lighten(tinycolor.complement(_color), 20)
                        .toHexString();
                        $container.css({
                            'background-color': _color,
                            'color': compl
                        });
                        $container.find('.btn').css({
                            'border-color': compl,
                            'color': compl
                        });
                    }, k * 500);
                });
            }
        });
        $container.droppable({
            accept: '.color-scheme',
            hoverClass: 'active'
        });
    }

    function addColorBlocks(base, colors, title) {
        var scheme = $('<div class="color-scheme"></div>');
        var heading = $('<h4></h4>');
        heading.text(title);
        scheme.append(heading);
        $(colors).each(function(k, color){
            scheme.append(addColorBlock(color));
        });
        $swatches.append(scheme);
    }

    function addAllColors() {
        var rand = randomColor(255);
        var base = tinycolor(rand).toHexString();
        $swatches.empty();
        addColorBlocks(base, tinycolor.analogous(base, 5), 'analogous');
        addColorBlocks(base, tinycolor.complement(base), 'complement');
        addColorBlocks(base, tinycolor.triad(base), 'triadic');
        addColorBlocks(base, tinycolor.splitcomplement(base), 'split-complement');
        addColorBlocks(base, tinycolor.tetrad(base), 'tetradic');
        resetDragging();
    }

    function generate() {
        addAllColors();
    }

    function init() {
        generate();
        $generate_btn.on('click', generate);
    }

    return {
        init: init
    };

})();

$(document).ready(layout.init);
