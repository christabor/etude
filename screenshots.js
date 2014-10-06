// Requires node.js and casperjs (npm install casperjs)
var _casper  = require('casper');
var xpath    = _casper.selectXPath;
var casper   = _casper.create();
var mouse    = require('mouse').create(casper);
var root     = 'http://localhost:8001/';
var root_dir = 'screenshots/';
var links    = [];
var DEBUG    = false;
var OPTS     = {top: 0, left: 0, 'width': 1024, 'height': 768};

function rando(max) {
    return Math.floor(Math.random() * max);
}

function getHrefs() {
    // Taken wholesale from casperjs
    // http://docs.casperjs.org/en/latest/quickstart.html
    var links = document.querySelectorAll('.days li > a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

function captureLinks(links) {
    casper.echo('= SCREEN CAPTURING LINKS ====');
    casper.each(links, function(self, link) {
        var filename = root_dir + link.replace('/index.html', '') + '.png';
        this.viewport(OPTS.width, OPTS.height);
        self.thenOpen(root + link, function() {
            // slight delay for external libraries and init loading
            self.wait(1000, function(){
                // move mouse randomly for some projects that
                // rely on mouse movement data.
                // also click randomly for some projects that might use it
                // as input for events.
                for(var i = 0; i < 10; i++) {
                    self.mouse.move(rando(OPTS.width), rando(OPTS.height));
                }

                // click all the internal links that may be used by js events
                var _links = document.querySelectorAll('a[href="#"]');
                if(self.exists('a[href="#"]')) {
                    self.mouseEvent('click', 'a[href="#"]');
                }

                if(self.exists('canvas')) {
                    self.click('canvas');
                }

                // submit some form data for pages that might require it.
                if(self.exists('form') && self.exists('form button')) {
                    if(self.exists(xpath('input[type="text"]'))) {
                        document.querySelector('input')
                        .setAttribute('value', 'FOOTEST');
                    }
                    self.click('form button');
                }
                self.capture(filename, OPTS);
            });
        });
    });
}

casper.start(root, function() {
    links = links.concat(this.evaluate(getHrefs));
    this.echo('= GETTING LINKS ====');
    if(DEBUG) this.echo(links.join('\n'));
    captureLinks(links);
});

casper.run();
