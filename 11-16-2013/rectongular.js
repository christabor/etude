var canvas;
var height = $(window).height();
var width = $(window).width();
var animation_opts;
var animation_speed = 1000;

$('canvas').attr({
	'width': width,
	'height': height
});

canvas = new fabric.Canvas('void');

// performance tweak
canvas.renderOnAddRemove = false;

// get visible window for canvas size
animation_opts = {
	duration: animation_speed,
	onChange: canvas.renderAll.bind(canvas),
	easing: fabric.util.ease.easeOut
};

function addItem() {
	canvas.add(new fabric.Rect({
		width: rando(width),
		top: rando(width),
		left: rando(width),
		selectable: false,
		angle: rando(width),
		opacity: 0.8,
		strokeWidth: (rando(10) > 5 ? 0: 10),
		stroke: (rando(10) > 5 ? 'none': 'red'),
		fill: (rando(10) > 5 ? 'none': 'red'),
		height: 300
	}));
	return;
}

function animate() {
	$(canvas._objects).each(function(k, object){
		if(object.width < 10) {
			object.width = rando(width);
		}
		if(object.height < 10) {
			object.height = rando(height);
		}
		object.animate('height', rando(object.height), animation_opts);
		object.animate('angle', rando(360), animation_opts);
		object.animate('width', rando(object.width), animation_opts);
	});
	return;
}

doSomethingABunch(addItem, 25, null);

setInterval(animate, animation_speed + 100);
