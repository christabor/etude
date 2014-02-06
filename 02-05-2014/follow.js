var dims        = getDocumentDimensions();
var height      = dims.height;
var width       = dims.width;
var canvas_elem = document.querySelector('canvas');
var max         = 100;
var current     = 0;


function addCircle(x, y) {
	var circ = new fabric.Circle({
		radius: x / y * 40,
		fill: randomColor(255),
		selectable: false,
		opacity: 0.3,
		top: y,
		left: x
	});
	canvas.add(circ);
	circ.animate({
		radius: 0,
		duration: 1000,
		onChange: canvas.renderAll.bind(canvas),
		onComplete: function(){
			circ.remove();
		}
	});
}

function add(e) {
	var x = 0;
	var y = 0;
	if(current === max) {
		canvas.clear();
		current = 0;
	}
	x = e.e.clientX;
	y = e.e.clientY;
	addCircle(x, y);
	current += 1;
}

function init() {
	canvas_elem.width  = width;
	canvas_elem.height = height;
	canvas             = new fabric.Canvas('canvas');
	canvas.selection   = false;
	canvas.on('mouse:move', add);
}

$(document).ready(init);
