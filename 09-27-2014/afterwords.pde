/* @pjs pauseOnBlur="true"; */

int r               = random(255);
int g               = random(255);
int b               = random(255);
int max_w           = screen.width;
int max_h           = screen.height;
int MAX_SIZE        = 200;
int RAD_BEGINNING   = MAX_SIZE / 2.5;
float theta         = -100;
int rads            = RAD_BEGINNING;
float RAD_INCREMENT = 0.05;
float theta = 0.1;

void setup() {
	newBg();
	noFill();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
}

void grid() {
	noFill();
	translate(max_w / 2, max_h / 2);
	rotate(radians(theta));
	for(int i = 0; i < 360; i += 20) {
		float dx = cos(radians(i)) * rads * 2;
		float dy = sin(radians(i)) + sin(dx) * rads * 2;
		float dy2 = sin(dx) * rads;
		group(dx, dy, dy2);
	}
}

void group(int dx, int dy, int dy2) {
	stroke(abs(255 - r), abs(255 - g), abs(255 - b));
	int radius = 10;
	beginShape();
	curveVertex(dx, dy);
	curveVertex(dy, dx);
	curveVertex(dx, dy2);
	endShape();

	stroke(abs(100 - r), abs(100 - g), abs(100 - b));
	ellipse(-dx, -dy, radius, radius);
	ellipse(-dy, -dx, radius, radius);
	ellipse(dx, dy, radius, radius);
	ellipse(dy, dx, radius, radius);

	ellipse(dx, dy2, radius, radius);
}

void newBg() {
	fill(r, g, b, 10);
	rect(0, 0, max_w, max_h);
}

void draw() {
	newBg();
	grid();
	theta += 0.4;
	rads += RAD_INCREMENT;
	if(rads > MAX_SIZE) {
		while(rads > 0) {
			rads -= RAD_INCREMENT;
		}
	}
}
