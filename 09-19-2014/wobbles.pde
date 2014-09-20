/* @pjs pauseOnBlur="true"; */
int width        = screen.width;
int height       = screen.height;
int MAX          = 100;
int OPACITY      = 255;
int SEED_INDEX   = 1;
int active_type  = 0;
boolean DEBUG    = true;
float theta = 0.1;
Pvector[] points = new Pvector[MAX];

int r = random(120);
int g = random(120);
int b = random(120);

int r1 = abs(r - 255);
int g1 = abs(g - 255);
int b1 = abs(b - 255);

void setup() {
	size(constrain(width, 100, 2000), constrain(height, 100, 2000));
	stroke(r1, g1, b1);
	newBg();
	textSize(16);
}

void newBg() {
	fill(r, g, b, 70);
	rect(0, 0, width, height);
}

void draw() {
	newBg();
	int max_x = map(mouseX, 0, width, -width / 2, width / 2);
	int max_y = map(mouseY, 0, height, -width / 2, width / 2);
	translate(width / 2, height / 2);

	beginShape();
	for(int i = 0; i < 180; i++) {
		float x1 = sin(i) * max_x;
		float y1 = cos(i) * max_y;
		float x2 = sin(theta) * max_x;
		float y2 = cos(theta) * max_y;
		switch(active_type) {
			case 0:
			curveVertex(x1, y1 - x1);
			curveVertex(x1 - y2, y1 - x2);
			break;

			case 1:
			curveVertex(x1, y2);
			curveVertex(x2, y1);
			break;

			case 2:
			curveVertex(x1, y1);
			curveVertex(x2 / 2, y2 / 2);
			break;

			case 3:
			curveVertex(x1 - y1, y1 - x1);
			curveVertex(x2 + y2, y2 + x2);
			break;

			case 4:
			curveVertex(x1 + i, y1 + i);
			curveVertex(x1 - i, y1 - i);
			curveVertex(x2 + i, y2 + i);
			curveVertex(x2 - i, y2 - i);
			break;

			case 5:
			curveVertex(x1 + i, y1 + i);
			curveVertex(-x2 + i, -y2 + i);
			break;

			case 6:
			curveVertex(x1 + i, y1 + i);
			curveVertex(-x1 + i, -y1 + i);
			curveVertex(x2 + i, y2 + i);
			// divide to "trim" some out-of-bounds cases
			curveVertex(-x2 + i / 3, -y2 + i / 3);
			break;

			default:
			continue;
			break;
		}
	}
	endShape();
	theta += 0.02;
	if(DEBUG) {
		translate(-screen.width / 2, -screen.height / 2);
		fill(255, 40);
		text('Theta: ' + theta, 25, 50);
		text('x1: ' + x1, 25, 75);
		text('y1: ' + x2, 25, 100);
		text('x2: ' + x1, 25, 125);
		text('y2: ' + y2, 25, 150);
		text('Slide: ' + active_type, 25, 175);
	}
}

void mousePressed() {
	active_type += 1;
	// max types reset -- based on number of switch statements.
	if(active_type > 6) active_type = 0;
}
