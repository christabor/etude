var container = $('#results');
var loader  = {
    msg: 'Calculating',
    css: {
        'background': '#61b0ae',
        'color': 'white',
        'z-index': '9999',
        'font-size': '40px'
    }
};
var funcs = {
    plain: function(x) {
        return x;
    },
    cos: function(x) {
        return Math.cos(x);
    },
    acos: function(x) {
        return Math.acos(x * 0.01);
    },
    sin: function(x) {
        return Math.sin(x);
    },
    asin: function(x) {
        return Math.asin(x * 0.01);
    },
    tan: function(x) {
        return Math.tan(x);
    },
    atan: function(x) {
        return Math.atan(x);
    },
    square: function(x) {
        return x * x;
    },
    cube: function(x) {
        return x * x * x;
    },
    quab: function(x) {
        return x * x * x * x;
    },
    log: function(x) {
        return x * Math.log(x);
    },
    n_log2: function(x) {
        return x * Math.LN2;
    },
    b_log10e: function(x) {
        return x * Math.LOG10E;
    },
    pi: function(x) {
        return x * Math.PI;
    },
    tau: function(x) {
        return x * (Math.PI * 2);
    },
    wat1: function(x) {
        return (x * x) / (x - x + 1);
    },
    wat2: function(x) {
        return ((x * x) / x) * Math.PI * (x / x * 0.5);
    },
    window: function(x) {
        // from Steven Wittens' lecture.
        // http://youtu.be/Zkx1aKv2z8o?t=33m55s
        return 0.5 + 0.5 * Math.cos(Math.max(-Math.PI, Math.min(Math.PI, x)));
    }
};

function addContainers() {
    for(var func in funcs) {
        var code = '<code>' + funcs[func] + '</code>';
        container.append('<div class="container" id="' + func + '"><h3>' + (func.split('_').join(' ')) + '</h3>' + code + '<ul></ul></div>');
    }
}

function init() {
    'use strict';
    globalLoader.load(loader);

    // add containers for each type
    // for storing the results
    addContainers();

    // populate an array with
    // numbers for use in demos
    var nums = [];
    var accumulator = 1;
    doSomethingABunch(function(){
        nums.push(accumulator);
        accumulator += 1;
    }, 25);

    // run each demo
    for(var key in nums) {
        for(var func in funcs) {
            var result = funcs[func](nums[key]);
            container.find('#' + func).find('ul').append('<li>' + '<span>' + key + '</span> '+ result + '</li>');
        }
    }
    globalLoader.unload();
}

$(document).ready(init);
