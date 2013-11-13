$(document).ready(function(){
    var socket = $('#socket');
    var grid_types = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2],
    [3,3,3,3],
    [4,4,4],
    [5,5,2],
    [6,6],
    [7,3,2],
    [8,4],
    [9,3],
    [10,2],
    [11,1],
    [12]
    ];

    function generateHeading(heading_size) {
        return '<h' + heading_size + '>Lorem ipsum doloatis esse dolorem.</h' + heading_size + '>';
    }

    function generateParagraph() {
        return '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, harum tenetur voluptate provident praesentium doloribus laboriosam distinctio aut voluptatibus reprehenderit necessitatibus ipsam perspiciatis esse dolorem voluptates. Aperiam suscipit quia natus.</p>';
    }

    function generateRandomRow(col_count) {
        // loop through a random column count
        // e.g. ( col[0] => [4, 4, 4] ),
        // generate the class name and random color
        var row = '<div class="row">';
        for(var column in col_count) {
            var col = col_count[column];
            var cols = 'col-md-' + col + ' col-sm-' + col + ' col-xs-' + col;
            row += '<div style="background-color:' + randomColor(255) + '" class="' + cols + '">' + generateHeading(rando(6)) + generateParagraph() + '</div>';
        }
        row += '</div>';
        return row;
    }

    function init() {
        // build three random rows
        var r = generateRandomRow;
        var row1 = r(grid_types[rando(grid_types.length)]);
        var row2 = r(grid_types[rando(grid_types.length)]);
        var row3 = r(grid_types[rando(grid_types.length)]);
        socket.html(row1 + row2 + row3);
        return;
    }

    init();
});
