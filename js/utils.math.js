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

var mathUtils = {
    std: {},
    // http://en.wikipedia.org/wiki/Series_(mathematics)
    // Note: All series functions return a list
    // which can then be summed or manipulated as desired.
    series: {
        powers: {
            taylor: {}
        }
    },
};

mathUtils.std.factorial = function(num) {
    if(num === 0) return 1;
    return num * mathUtils.std.factorial(num - 1);
};

mathUtils.series.harmonic = function(max) {
    // Returns a standard harmonic series
    return d3.range(max).map(function(d){
        return 1 / (d + 1);
    });
};

mathUtils.series.harmonicAlternating = function(max) {
    // Returns an alternating harmonic series
    return d3.range(max).map(function(d){
        return d / Math.exp(-1, d + 1);
    });
};

mathUtils.series.harmonicAlternatingSquareRoot = function(max) {
    // Returns an alternating harmonic series
    // with respect to the square root of each element.
    return d3.range(max).map(function(d){
        return Math.pow(-1, d) / Math.sqrt(d + 1);
    });
};

mathUtils.series.powers.taylor.hyperbolicCosine = function(max, y) {
    // Returns a series using the hyperbolic cosine function
    // f(y) = sinh y
    return d3.range(max).map(function(d){
        return Math.pow(y, 2 * d + 1) / mathUtils.std.factorial(2 * d + 1);
    });
};

mathUtils.series.powers.taylor.binomial = function() {
    // TODO
};

mathUtils.series.powers.taylor.standard = function(max, x, c) {
    // Returns a standard taylor power series, with given constant c. TODO
};

mathUtils.series.powers.taylor.maclaurin = function(max, x) {
    // Taylor power series centered around 0. TODO
};
