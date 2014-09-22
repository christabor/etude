/* @pjs pauseOnBlur="true"; */
int width      = screen.width;
int height     = screen.height;
int MAX_COLOR  = 75;
int MAX_SPEED  = 10;
int PROXIMITY  = width / 8;
int r          = random(MAX_COLOR);
int g          = random(MAX_COLOR);
int b          = random(MAX_COLOR);
int current    = 0;
float theta    = 0.1;
int radius     = 20;
int cols       = height / radius;
int rows       = width / radius;

rings = new ArrayList(cols * rows);

void setup() {
	size(constrain(width, 100, 2000), constrain(height, 100, 2000), 'P2D');
	newBg();
	seedRings();
}

class Vec2 {
	public int radius2 = random(radius);
	public Vec2(int x, int y) {
		this.x = x;
		this.y = y;
		this.opacity = random(255);
		this.radius2 = radius2;
	}
	public void update(int r1, int r2) {
		if(r1 > r2) {
			this.radius2 += 1;
		} else {
			this.radius2 -= 1;
		}
		if(r2 == r1) {
			this.radius2 = 1;
		}
		// reset if it gets stale after a while
		if(r2 == r1 && r1 == this.radius2) this.radius2 = random(radius);
		if(this.radius2 >= radius || this.radius2 <= 0) this.radius2 = 1;
	}
}

void seedRings() {
	int i = 0;
	for(int x = 0; x < width; x += radius) {
		for(int y = 0; y < height; y += radius) {
			i++;
			rings[i] = new Vec2(x, y);
		}
	}
}

void newBg() {
	fill(r, g, b);
	rect(0, 0, width, height);
}

void draw() {
	newBg();
	int i = 0;
	for(int x = 0; x < width; x += radius) {
		for(int y = 0; y < height; y += radius) {
			i++;
			noStroke();
			if(rings[i - 1] && rings[i + 1]) {
				Vec2 vec2_b = rings[i - 1];
				Vec2 vec2_a = rings[i + 1];
				Vec2 vec2 = rings[i];
				// map brightness by proximity
				// to mouse vector and current vector
				int clr = map(dist(mouseX, mouseY, vec2.x, vec2.y), PROXIMITY * 2, PROXIMITY, 255, 10);
				fill(clr, vec2.opacity);
				ellipse(vec2.x, vec2.y, vec2.radius2, vec2.radius2);
				vec2.update(vec2_a.radius2, vec2_b.radius2);
			}
		}
	}
}
