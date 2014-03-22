var svg;
var width;

function wiggle() {
	if(!svg) return;
	svg.style.top = rando(100);
	svg.style.left = rando(100);
}
function checkWidth(event) {
	width = window.innerWidth;
	if(width <= 500) {
		setInterval(wiggle, 100);
	} else {
		clearInterval(wiggle);
	}
}

window.onload = function(){
	var interval;
	svg = document.querySelector('svg');
	window.onresize = checkWidth;
	checkWidth();
};
