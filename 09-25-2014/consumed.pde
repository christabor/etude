/* @pjs pauseOnBlur="true"; */

boolean mouseMode = false;
float MAX_BOX_SIZE = 200;
float box_size     = 50;
int r              = random(255);
int g              = random(255);
int b              = random(255);
float SPEED        = 0.1;
float multiplier   = 0.01;
int max_w          = screen.width;
int max_h          = screen.height;

void setup() {
	newBg();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
}

void grid() {
	float mid_x = box_size / 4;
	float mid_y = box_size / 4;
	for(int x = mid_x; x < max_w; x += box_size;) {
		for(int y = mid_y; y < max_h; y += box_size) {
			fill(255);
			rect(x, y, box_size, box_size);
			fill(0);
			float _size = dist(x, y, max_w / 2, max_h / 2) * multiplier;
			rect(x - _size / 2, y - _size / 2, _size, _size);
			fill(255);
			ellipse(x, y, _size / 2, _size / 2);
		}
	}
}

void newBg() {
	background(255);
	fill(255, 0, 0);
}


void draw() {
	newBg();
	grid();
	if(mouseMode) {
		multiplier = dist(mouseX, mouseY, max_w / 2, max_h / 2) * 0.0005;
	} else {
		multiplier += 0.01;
	}
	if(multiplier >= 1) multiplier = 0;
}

void mousePressed() {
	mouseMode = !mouseMode;
}
