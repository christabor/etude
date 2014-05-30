
var ANIMATION_SPEED = 1000,
snap = Snap(),
els = {},
container,
els_map = {};
Snap.load('face.svg', add);

function add(fragment) {
	snap.append(fragment);
	container = snap.select('g');
	container.drag();
	setElements();
	animateAll();
}

function setElements() {
	els = {
		lefteye: snap.select('#moon #left-eye'),
		righteye: snap.select('#moon #right-eye'),
		mouth: snap.select('#moon #mouth'),
		nose: snap.select('#moon #nose'),
		body: snap.select('#moon #body')
	};
	els_map = {
		lefteye: {
			d: 'M182.665,140.929c0,0,1.334-10-44.666-10s-46,10-46,10s9.731-39.428,45.041-39.428 C172.351,101.501,182.665,140.929,182.665,140.929z'
		},
		righteye: {
			d: 'M375.329,140.929c0,0,1.334-10-44.666-10s-46.002,10-46.002,10 s9.732-39.428,45.043-39.428S375.329,140.929,375.329,140.929z'
		},
		mouth: {
			d: 'M51.999,212.167h363.333c0,0-60.832,118-180.5,118 C115.166,330.167,51.999,212.167,51.999,212.167z'
		},
		nose: {
			d: 'M232.01,100c0,0,9.832,68.999,9.666,77s-18.334,13-18.334,13s32.5,3.999,36.334-1.667 S232.01,100,232.01,100z'
		},
		body: {
			d: 'M588.167,292.167H951.5c0,0-60.833,118-180.5,118S588.167,292.167,588.167,292.167z',
			fill: '#EDD64F'
		}
	};
}

function animateAll() {
	// set slight timeout so it doesn't
	// animate as soon as the page loads.
	setTimeout(function(){
		for(var el in els) {
			animate(el, els_map[el]);
		}
	}, 1000);
}

function animate(elem, attrs) {
	els[elem].animate(attrs, ANIMATION_SPEED);
}
