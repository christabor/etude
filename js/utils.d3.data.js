/********************* d3.js *********************/

// Dependencies: d3.js

function randomNodeLink(max, max_value) {
    // Creates a flattened set of nodes
    // and links, randomly connected.
    var node_links = {'links': [], 'nodes': []};
    max = max || 20;
    for(var i = 0; i < max; i++) {
        node_links.links.push({
            'name': randomFixedString(10),
            // assign to a random group
            // within the maximum number of groups.
            'group': rando(max)
        });
        node_links.nodes.push({
            'source': rando(max),
            'target': rando(max),
            'value': rando(max_value || 400)
        });
    }
    return node_links;
}

function randomCoordsGroup(max, x_max, y_max) {
    // creates an array of coord objects
    // e.g: [{x: 10, y: 20}, {x: 20, y: 40}]
    return d3.range(max || 10).map(function(d) {
        return randomCoords(x_max || 20, y_max || 20);
    });
}

function randomStackLayer(layers, max_values, max_x, max_y) {
    // Constructs a data structure suitable for stack layouts
    // https://github.com/mbostock/d3/wiki/Stack-Layout#stack
    return d3.range(layers).map(function(d){
        return {
            'name': randomFixedString(10),
            'values': bumpLayer(max_values)
        };
    });
}

function randomIntVal(obj, key, max_val) {
    // populate an obj with a random value in a specific key
    obj[key] = rando(max_val);
    return obj;
}

function randomGroupValue(max_val) {
    // random grouped values with keys
    // `name` and `value` for use in d3 layouts
    var x = randomIntVal({}, 'name', max_val);
    x = randomIntVal(x, 'value', max_val);
    return randomIntVal(x, 'size', max_val);
}

function randomChildrenGroupValues(max, max_val, weighting) {
    // random child values for hierarchical layouts
    var children = [];
    weighting = weighting || 8;
    for(var i = 0; i < max; i++) {
        var group = randomGroupValue(max_val);
        // weighted to be less likely - customizable
        if(rando(10) > weighting) {
            // recursively go down once, for further nesting
            group.children = randomChildrenGroupValues(1, max_val, weighting);
        }
        children.push(group);
    }
    return children;
}

function randomHierarchical(breadth, depth, max_val, weighting) {
    // Creates a random hierarchical style
    // for use in d3 hierarchical layouts.
    var root = randomGroupValue(max_val);
    weighting = weighting || 8;
    for(var i = 0; i < breadth; i++) {
        if(rando(10) > weighting) {
            root.children = randomChildrenGroupValues(i, max_val, weighting);
        }
    }
    return root;
}

function smoothData(max, min_clamp, dims){
    // returns a reasonable wavy pattern, good for svg area paths
    if(!dims) return [];
    return d3.range(max).map(function(d){
        return [clamp(d + Math.sqrt(d), min_clamp, dims.w),
        clamp(d * rando(d / 2), min_clamp, dims.h)];
    });
}

function randomMatrix(max_rows, cells_per_row, max_digit, uniform) {
    // Returns a random matrix of values for
    // use in certain layouts where this data structure
    // is most appropriate (e.g. the chord layout).
    // Defaults to a 4 x 4 matrix.
    // :uniform conforms the row and column to be the same
    // which may be required for some applications,
    // like the chord layout
    cells_per_row = cells_per_row || 4;
    max_rows = max_rows || 4;
    var matrix = [];
    if(uniform) {
        max_rows = cells_per_row;
    }
    for(var i = 0; i < max_rows; i++) {
        var row = []
        for(var j = 0; j < cells_per_row; j++) {
            row.push(rando(max_digit));
        }
        matrix.push(row);
    }
    return matrix;
}

// Taken from http://bl.ocks.org/mbostock/4060954
// Inspired by Lee Byron's test data generator.
function bumpLayer(n) {
    function bump(a) {
        var x = 1 / (0.1 + Math.random());
        var y = 2 * Math.random() - 0.5;
        var z = 10 / (0.1 + Math.random());
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }
    var a = [];
    var i;
    for (i = 0; i < n; ++i) a[i] = 0;
        for (i = 0; i < 5; ++i) bump(a);
            return a.map(function(d, i) {
                return {x: i, y: Math.max(0, d)};
            });
    }
