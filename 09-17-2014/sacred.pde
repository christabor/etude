/* @pjs pauseOnBlur="true"; */

float color   = 0.1;
int r         = random(255);
int g         = random(255);
int b         = random(255);
float theta   = 0.1;
float bubble  = 0.1;
int MAX       = 100;
int max_items = 0;

void setup() {
	newBg();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	noFill();
	stroke(255, 40);
}

void newBg() {
	background(r, g, b, 100);
}

void draw() {
	translate(screen.width / 2, screen.height / 2);
	newBg();
	for(int i = 0; i < max_items; i++) {
		float x = sin(i) * theta;
		float y = cos(i) * theta;
		stroke(theta, i, i, 40);

		// pull up, left
		ellipse(x - theta, y - theta, i, i);

		// push down, right
		ellipse(x + theta, y + theta, i, i);

		bezier(x + theta, y + theta, x - y, y - x, -x, -y, -y - theta, -x - theta);
	}
	theta += 0.4;
	bubble += 0.1;
	max_items += 1;
	if(theta > 1000) {
		max_items = constrain(random(MAX), 10, MAX);
		bubble = 1;
		theta = 0
	};
}
