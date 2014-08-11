function GrapherWidget(container, dims){
    var parent             = this;
    var width              = dims.width;
    var height             = dims.height;
    var elements           = [];
    var BOX_WIDTH          = 200;
    var BOX_HEIGHT         = 100;
    var HANDLE_SIZE        = 10;
    var CIRCLE_SIZE        = BOX_WIDTH / 2.5;
    var open_connection    = false;
    var boxes              = [];
    var edges              = container.append('g').attr('id', 'edges');
    var active_edge        = {'x': rando(width), 'y': rando(height)};
    var drag               = d3.behavior.drag().on('drag', moveElement)
    var lock_drag          = false;
    var active_count       = 0;
    var edge               = d3.svg.line()
    .interpolate('cardinal-closed')
    .x(function(d){return d.x})
    .y(function(d){return d.y});

    function moveElement() {
        // drag behavior.
        if(lock_drag) return;
        d3.select(this)
        .attr('transform', translation(d3.event.x - BOX_WIDTH / 2, d3.event.y - BOX_HEIGHT / 2));

        // redraw all the connected vertices
    }

    function randCoords() {
        // for testing
        var x = clamp(rando(width) - BOX_WIDTH, BOX_WIDTH, width);
        var y = clamp(rando(height) - BOX_HEIGHT, BOX_HEIGHT, height);
        return {'x': x, 'y': y};
    }

    function objectify(x, y) {
        // object from args
        return {'x': x, 'y': y};
    }

    function Vertex(x1, y1, x2, y2) {
        var data = [objectify(x1, y1), objectify(x2, y2)];

        edges.selectAll('.edgepath')
        .data([data])
        .enter()
        .append('path')
        .classed('.edgepath', true)
        .attr('stroke-width', 4)
        .attr('stroke', '#444')
        .attr('fill', 'none')
        .attr('d', function(d){
            return edge(d) + 'Z';
        });
    }

    function Node(x, y) {
        // generic element
        var self = this;
        self.root = container.append('g')
        .attr('id', uuid(2))
        .attr('transform', translation(x, y));

        self.x = x;
        self.y = y;
        self.edges = [];

        self.group = self.root
        .classed('graph-element', true).call(drag);

        function makeCorner(el, x, y, label) {
            var css = {'handle': true};
            css[label] = true;
            el.append('rect')
            .attr('x', x - HANDLE_SIZE / 2)
            .attr('y', y - HANDLE_SIZE / 2)
            .attr('width', HANDLE_SIZE)
            .attr('height', HANDLE_SIZE)
            .attr('fill', 'black')
            .attr('stroke', 'black')
            .classed(css)
            .attr('stroke-width', 1)
            .on('mousedown', function(){
                if(active_count < 2) {
                    active_count += 1;
                    d3.select(this)
                    .classed('active-handle', true);
                }
                if(active_count > 2) return;

                // reset active coordinate to current edge.
                var self = d3.select(this);
                var ev = d3.event;
                var data = [];
                var els = d3.selectAll('.active-handle')[0];
                // check if active or if number of edges is 2
                if(self.is_active || els.length !== 2) return;
                lock_drag = true;
                return; // for now...
                addEdge(
                    d3.select(els[0]).attr('x'),
                    d3.select(els[0]).attr('y'),
                    d3.select(els[1]).attr('x'),
                    d3.select(els[1]).attr('y'));
            })
            .on('mouseup', function(){
                // d3.select(this)
                // .classed('active-handle', false);
                is_active = true;
                lock_drag = false;
            });
        }

        function addEdge(x1, y1, x2, y2) {
            // prevent adding edges for only one node.
            if(elements.length < 2) return;
            var _id  = uuid(1);
            var el = new Vertex(x1, y1, x2, y2);
            self.edges.push({_id: el});
            // reset count
            active_count = 0;
            // reset active handles
            d3.selectAll('.active-handle').forEach(function(active, _){
                d3.select(this).classed('active-handle', false);
            });
        }

        function removeEdge(edgename) {
            log('removing edge... ' + edgename);
        }

        self.addEdge = addEdge;
        self.removeEdge = removeEdge;
        self.makeCorner = makeCorner;
        return this;
    }

    function Box(x, y) {
        var self = new Node(x, y);
        self.group.append('rect')
        .attr('width', BOX_WIDTH)
        .attr('height', BOX_HEIGHT)
        .attr('fill', 'white')
        .classed('graph-element', true)
        .attr('stroke', 'black')
        .attr('stroke-width', 4);

        // Corners
        self.tl = self.makeCorner(self.group, 0, 0, 'left'); // tl
        self.tr = self.makeCorner(self.group, BOX_WIDTH, 0, 'right'); // tr
        self.bl = self.makeCorner(self.group, 0, BOX_HEIGHT, 'left'); // bl
        self.br = self.makeCorner(self.group, BOX_WIDTH, BOX_HEIGHT, 'right'); // br
        self.tc = self.makeCorner(self.group, BOX_WIDTH / 2, 0, 'top'); // tc
        self.bc = self.makeCorner(self.group, BOX_WIDTH / 2, BOX_HEIGHT, 'bottom'); // bc
        return self;
    }

    function Oval(x, y) {}

    function Diamond(x, y) {}

    function Circle(x, y) {
        var self = new Node(x, y);
        self.group.append('circle')
        .attr('r', CIRCLE_SIZE)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 4);

        // Corners
        self.lc = self.makeCorner(self.group, -CIRCLE_SIZE, 0, 'left'); // lc
        self.rc = self.makeCorner(self.group, CIRCLE_SIZE, 0, 'right'); // rc
        self.tc = self.makeCorner(self.group, 0, -CIRCLE_SIZE, 'top'); // tc
        self.bc = self.makeCorner(self.group, 0, CIRCLE_SIZE, 'bottom'); // bc
        return self;
    }

    this.addElement = function(el_type, x1, y1) {
        // Adapter for all element types.
        // Adds a new element to the global list, then returns
        // that single element.
        var el = null;
        if(el_type === 'box') {
            el = new Box(x1, y1);
        } else if (el_type === 'circle') {
            el = new Circle(x1, y1);
        } else {
            throw new TypeError('Must specify an element type.');
        }
        elements.push(el);
        return el;
    };
}
