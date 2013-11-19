var canvas;
var height = $(window).height();
var width = $(window).width();
var animation_opts;
var animation_speed = 50;

$('canvas').attr({
	'width': width,
	'height': height
});

canvas = new fabric.Canvas('void');

// get visible window for canvas size
animation_opts = {
	duration: animation_speed,
	onChange: canvas.renderAll.bind(canvas),
	easing: fabric.util.ease.easeOut
};

function loadSVG() {
	fabric.loadSVGFromURL('eye.svg', function(objects, options){
		var svg_obj = fabric.util.groupSVGElements(objects, options);
		svg_obj.selectable = false;
		svg_obj.top = height / 4;
		svg_obj.left = width / 4;
		svg_obj.centeredScaling = true;
		canvas.add(svg_obj);
	});
	canvas.renderAll();
}

doSomethingABunch(loadSVG, 1);

setInterval(function(){
	$(canvas._objects).each(function(k, object){
		var obj = object;
		obj.animate('top', rando(height), {
			onChange: canvas.renderAll.bind(canvas)
		});
		obj.animate('left', rando(width), {
			onChange: canvas.renderAll.bind(canvas)
		});
	});
}, 200);
