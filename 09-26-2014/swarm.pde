/* @pjs pauseOnBlur="true"; */

int r               = random(255);
int g               = random(255);
int b               = random(255);
int max_w           = screen.width;
int max_h           = screen.height;
float theta         = -100;
int MAX_SIZE        = 300;
int RAD_BEGINNING   = MAX_SIZE / 2;
int rads            = RAD_BEGINNING;
float RAD_INCREMENT = 0.03;

void setup() {
	newBg();
	noFill();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
}

void grid() {
	stroke(0, 100);
	translate(max_w / 2, max_h / 2);
	for(int i = 0; i < 360; i += 10) {
		rotate(radians(rads));
		beginShape();
		for(int j = 1; j < 4; j ++) {
			float dx = cos(radians(j)) * rads;
			float dy = sin(dx) * rads;
			float dy2 = sin(radians(j)) * rads;
			float dx2 = cos(dx) * rads;
			curveVertex(-dy, -dx);
			curveVertex(-dx, -dy);
			curveVertex(dx, dy);
			curveVertex(dx2, dy2);
		}
		endShape();
	}
}

void newBg() {
	background(255);
}

void draw() {
	newBg();
	grid();
	rads += RAD_INCREMENT;
	if(rads >= MAX_SIZE) {
		while(rads > RAD_BEGINNING) {
			rads -= RAD_INCREMENT;
		}
	}
}
