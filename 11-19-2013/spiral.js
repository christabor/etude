var c = getDocumentDimensions();
var w = c.width;
var h = c.height;
var start = Date.now();
var rings = [];

for(var i = 0; i <= 20; i++) {
    rings.push({
        radius: i * i,
        width: i,
        speed: i
    });
}

var svg = d3
.select('body')
.append('svg:svg')
.attr('width', w)
.attr('height', h)
.append('svg:g')
.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')scale(1.3)');

var ring = svg.selectAll("g")
.data(rings)
.enter().append('svg:g')
.attr('class', 'ring')
.each(ringInit);

function ringInit(d, i) {
    var n = Math.floor(4 * Math.PI * d.radius / d.width * Math.SQRT1_2);
    var k = 360 / n;

    d3.select(this).selectAll('g')
    .data(d3
        .range(n)
        .map(function() {
            return d;
        }))
    .enter()
    .append('svg:g')
    .attr('class', 'square')
    .attr('transform', function(_, i) {
        return 'rotate(' + i * k + ')translate(' + d.radius * 2 + ')';
    })
    .append('svg:rect')
    .attr('x', -d.width)
    .attr('y', -d.width)
    .attr('width', d.width)
    .attr('height', d.width);
}

function rotate(d) {
    var elapsed = Date.now() - start;
    return 'rotate(' + d.speed * elapsed * 0.05 + ')';
}

function rotateRing() {
    ring
    .attr('transform', rotate)
    .selectAll('rect')
    .attr('transform', rotate);
}

d3.timer(rotateRing);
