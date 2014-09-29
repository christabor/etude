/* @pjs pauseOnBlur="true"; */

int r              = random(255);
int g              = random(255);
int b              = random(255);
int max_w          = screen.width;
int max_h          = screen.height;
int half_w         = max_w / 2;
int half_h         = max_h / 2;
float pos          = 0;
bool vertical_mode = true;
float period       = 2;
float amplitude    = 100;

void setup() {
	newBg();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
}

void grid() {
	noFill();
	// determine amplitude of wave
	// based on mouses' distance from center of screen
	float ampl2 = constrain(dist(mouseX, mouseY, half_w, half_h), 1, 200);
	beginShape();
	// increment points across the screen
	for(int i = 0; i < max_w + pos; i += 10) {
		// check for collision with "radar" and mouse
		float x = pos + noise(i, period) * ampl2;
		float y = i;
		if(vertical_mode) {
			curveVertex(y, x);
		} else {
			curveVertex(x, y);
		}
	}
	endShape();
}

void newBg() {
	fill(r, g, b, 20);
	rect(0, 0, max_w, max_h);
}

void reset() {
	pos = 0;
	vertical_mode = !vertical_mode;
}

void draw() {
	newBg();
	grid();
	stroke(255, 0, 0);
	// determine radius of reference circle in the same manner as above;
	// distance from center of screen and current mouse position.
	float radius = constrain(dist(mouseX, mouseY, half_w, half_h), 2, 100);
	ellipse(mouseX, mouseY, radius, radius);
	stroke(0);
	pos += 5;
	period += 0.2;
	// reset position once scanning pass across
	// the screen has completed.
	if(vertical_mode) {
		if(pos >= max_h - 100) reset();
	} else {
		if(pos >= max_w - 100) reset();
	}
}
