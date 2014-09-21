/* @pjs pauseOnBlur="true"; */
rings          = new ArrayList();
int width      = screen.width;
int height     = screen.height;
int MAX_SEED   = 100;
int MAX_SIZE   = 100;
int MAX_RADIUS = 100;
int MAX_COLOR  = 75;
int MAX_SPEED  = 10;
int r          = random(MAX_COLOR);
int g          = random(MAX_COLOR);
int b          = random(MAX_COLOR);
int current    = 0;

void setup() {
	size(constrain(width, 100, 2000), constrain(height, 100, 2000), 'P2D');
	newBg();
	seedRings();
}

void seedRings() {
	for(int i = 0; i < MAX_SEED; i++) {
		rings.add(new Ring(width / 2, height / 2, random(10)));
	}
}

class Ring {
	public int x;
	public int y;
	public int count;
	public float speed = random(3.4);
	public int _size = random(MAX_SIZE);
	public float radius = 0.5;
	public boolean filled = false;
	public int opacity = random(100);

	public Ring(int x, int y, int count) {
		// Init all settable properties.
		this.x = x;
		this.y = y;
		this.count = count;
		// randomize fill vs. stroke
		if(random(10) > 5) {
			this.filled = true;
		}
	}

	public void move() {
		if(this.filled) {
			noStroke();
			fill(200, this.opacity);
		} else {
			noFill();
			stroke(200, this.opacity);
		}
		for(int i = 0; i < this.count * 10; i += 10) {
			ellipse(this.x + i, this.y + i, this._size, this._size);
			this.x += this.speed;
			this.y += this.speed;
		}
		// wrap x, y around canvas
		if(this.y < 0 || this.y > height) {
			this.y = 0;
		}
		if(this.x < 0 || this.x > width) {
			this.x = 0;
		}
	}
}

void newBg() {
	fill(r, g, b);
	rect(0, 0, width, height);
}

void draw() {
	newBg();
	int len = rings.size();
	for(int i = 0; i < len; i++) {
		// Fucking... java.
		Ring ring = (Ring) rings.get(i);
		ring.move();
	}
}
