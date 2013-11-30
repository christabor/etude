var canvas;
var export_button = document.querySelector('#export-image');
var height = window.innerHeight;
var width = window.innerWidth;
var canvas_elem = document.querySelector('canvas');
var ANIMATION_SPEED = 1000;
canvas_elem.setAttribute('width', width);
canvas_elem.setAttribute('height', height);

canvas = new fabric.Canvas('arts');
canvas.selection = false;

fabric.Image.fromURL('mona.jpg', function(img) {
	canvas.add(img);
	img.top = height / 2 - 40;
	img.left = width / 2;
	img.selectable = false;
	canvas.renderAll();
});

canvas.isDrawingMode = true;

export_button.addEventListener('click', function(e){
	e.preventDefault();
	window.open(canvas.toDataURL('png'));
});

