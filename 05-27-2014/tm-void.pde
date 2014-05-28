// a static, pre-generated short version of Thue-Morse sequence.
void bits = [0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1];
int rotation = 0;
int curr_idx = 0;
int r = random(255);
int g = random(255);
int b = random(255);

void setup() {
	background(r, g, b);
	size(screen.width, screen.height);
	smooth();
	stroke(0, 100);
}

void draw() {
	float offset = 10;
	float x = 0;
	float y = 0;

	for(int i = 0; i < bits.length; i++) {
		if(bits[curr_idx] !== undefined) {
			step(x, y);
			curr_idx += 1;
		} else {
			// reset index to a random state, 0 or 1.
			// less realistic, more for effect.
			curr_idx = random(10) > 5 ? 0 : 1;
		}
		x += offset;
		y += offset;
		offset += offset / log(offset);
	}
}

void step(int x, int y) {
	float distance = 100;
	// translate matrix space to be localized
	// use the TM sequence to determine course of action.
	pushMatrix();
	if(bits[curr_idx] === 0) {
		if(rotation >= 360 ) {
			rotation = 0;
		} else {
			rotation += 3;
		}
	} else {
		translate(width / 2, height / 2);
		rotate(radians(rotation));
		// complementary color
		fill(abs(255 - r), abs(255 - g), abs(255 - b));
		text(rotation + ' deg', x, y - 10);
		fill(random(255), 30);
		triangle(x, y, x + x / 4, y, x + x, y / y);
	}
	popMatrix();
}
