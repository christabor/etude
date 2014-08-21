// Licensed under MIT.
// Copyright (c) 2014, Chris Tabor
// All rights reserved.

var mathGraph = {
    // See http://en.wikipedia.org/wiki/Parametric_equation
    // for all implementation equations.
    parametric: {}
};

mathGraph.parametric.circle = function(constant){
    // plain-jane x, y circular coordinate generator.
    // Returns x, y coords
    return [Math.cos(constant), Math.sin(constant)];
};

mathGraph.parametric.circleRational = function(constant){
    // A more sophisticated approach to the
    // parametric circle equation
    // Returns x, y coords
    return [(1 - constant * constant) / (1 + constant * constant),
            (2 * constant) / (1 + constant * constant)];
};

mathGraph.parametric.parabola = function(constant){
    // Standard parabolic function
    // Returns x, y coords
    return [constant, constant * constant];
};

mathGraph.parametric.ellipse = function(axis_a, axis_b, constant){
    // Standard ellipse, given an axis a and b (which can vary, thus
    // giving it the elliptical nature.)
    // Returns x, y coords
    return [axis_a * Math.cos(constant), axis_b * Math.cos(constant)];
};

mathGraph.parametric.hyperbolaSophisticated1 = function(axis_a, axis_b, constant){
    // A more sophisticated hyperbola, as described in the wikipedia article.
    // Returns x, y coords
    return [(axis_a - axis_b) * Math.cos(constant) + axis_b * Math.cos(constant * ((axis_a / axis_b) - 1)),
            (axis_a - axis_b) * Math.sin(constant) - axis_b * Math.cos(constant * ((axis_a / axis_b) - 1))];
};

mathGraph.parametric.hyperbolaSophisticated2 = function(axis_a, axis_b, constant, power_x, power_y){
    // A more sophisticated hyperbola, as described in the wikipedia article.
    // This one provides more constants, with *powers* of growth for x and y
    // Returns x, y coords
    return [Math.cos(axis_a * constant) - Math.pow(Math.cos(axis_b * constant), power_x),
           [Math.sin(axis_a * constant) - Math.pow(Math.sin(axis_b * constant), power_y)]
    ];
};
