var canvas = new fabric.Canvas('magic');

// get visible window for canvas size
var height = $(window).height();
var width = $(window).width();

// update h/w
stretchCanvas($('div, canvas'));

function getValue(i) {
	if(i % 2 === 0) {
		val = (i * i) * 10;
	} else {
		val = (i * i + i * 2) + 10;
	}
	return val;
}

function makeLines() {
	var val;
	for(var i = 2; i <= 50; i++) {
		val = getValue(i);
		canvas.add(new fabric.Circle({
			fill: 'none',
			strokeWidth: 2,
			left: rando(width),
			top: rando(height),
			radius: val,
			selectable: false,
			stroke: randomColor(255)
		}));
	}
	return;
}

function wiggleCircles(event) {
	$(canvas._objects).each(function(k, object){
		object.left = rando(width);
		object.top = rando(height);
		object.radius = event.e.clientX;
	});
	canvas.renderAll();
	return;
}

makeLines();

canvas.on('mouse:move', function(event){
	wiggleCircles(event);
});
