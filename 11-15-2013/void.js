var canvas;
var height = $(window).height();
var width = $(window).width();
var animation_opts;

$('canvas').attr({
	'width': width,
	'height': height
});

canvas = new fabric.Canvas('void');

// performance tweak
canvas.renderOnAddRemove = false;

// get visible window for canvas size
animation_opts = {
	duration: 20,
	onChange: canvas.renderAll.bind(canvas),
	easing: fabric.util.ease.easeOut
};

function addShape(opts) {
	var circle = new fabric.Circle({
		radius: opts.radius,
		left: width / 2,
		top: height / 2,
		selectable: false
	});
	circle.setGradient('fill', {
		x1: 0,
		y1: rando(circle.height),
		x2: rando(circle.width),
		y2: rando(circle.width),
		colorStops: {
			0: randomColor(255),
			1: randomColor(255)
		}
	});
	canvas.add(circle);
	return;
}

function wiggleCircles() {
	$(canvas._objects).each(function(k, object){
		if(object.radius >= width) {
			object.remove();
			addShape({
				radius: 10
			});
		} else {
			object.animate('radius', '+=10', animation_opts);
		}
	});
	canvas.renderAll();
	return;
}

function recursiveShapes(num, times) {
	if(times !== 0 && num > 0)  {
		num = Math.floor(num/2);
		addShape({
			left: num,
			top: num,
			radius: num
		});
		return recursiveShapes(num - 10, times - 1);
	} else {
		return;
	}
}

recursiveShapes(width, 10);
setInterval(wiggleCircles, 10);
