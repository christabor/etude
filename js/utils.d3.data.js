/********************* d3.js *********************/

// Dependencies: d3.js

function randomNodeLink(max, max_value) {
    // Creates a flattened set of nodes
    // and links, randomly connected.
    var nodeLinks = {'links': [], 'nodes': []};
    max = max || 20;
    for(var i = 0; i < max; i++) {
        nodeLinks.links.push({
            'name': randomFixedString(10),
            // assign to a random group
            // within the maximum number of groups.
            'group': rando(max)
        });
        nodeLinks.nodes.push({
            'source': rando(max),
            'target': rando(max),
            'value': rando(max_value || 400)
        });
    }
    return nodeLinks;
}

function randomCoordsGroup(max, x_max, y_max) {
    return d3.range(max || 10).map(function(d) {
        return randomCoords(x_max || 20, y_max || 20);
    });
}

function randomIntVal(obj, key, max_val) {
    // populate an obj with a random value in a specific key
    obj[key] = rando(max_val);
    return obj;
}

function randomGroupValue(max_val) {
    // random grouped values for use in d3 layouts
    var x = randomIntVal({}, 'name', max_val);
    return randomIntVal(x, 'value', max_val);
}

function randomChildrenGroupValues(max, max_val) {
    // random child values for hierarchical layouts
    var children = [];
    for(var i = 0; i < max; i++) {
        var group = randomGroupValue(max_val);
        // weighted to be less likely
        if(rando(10) > 8) {
            group.children = randomChildrenGroupValues(1, max_val);
        }
        children.push(group);
    }
    return children;
}

function randomHierarchical(breadth, depth, max_val) {
    // Creates a random hierarchical style
    // start with parent el
    var hierarchy = randomGroupValue(max_val);
    for(var i = 0; i < breadth; i++) {
        if(rando(10) > 5) {
            hierarchy.children = randomChildrenGroupValues(i, max_val);
        }
    }
    return hierarchy;
}

function smoothData(max, min_clamp, dims){
    // returns a reasonable wavy pattern, good for svg area paths
    if(!dims) return [];
    return d3.range(max).map(function(d){
        return [clamp(d + Math.sqrt(d), min_clamp, dims.w),
        clamp(d * rando(d / 2), min_clamp, dims.h)];
    });
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
