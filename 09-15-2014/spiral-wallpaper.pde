float color   = 0.1;
float theta   = 0;
float magnitude = 0.1;

int _size = 3;
int current = 0;
int MAX_CNT = 400;
int LENGTH = screen.height / 6;

void setup() {
	newBg();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	noStroke();
}

void newBg() {
	int r = random(255);
	int g = random(255);
	int b = random(255);
	background(r, g, b, 100);
}

void draw() {
	float startx = random(screen.width);
	float starty = random(screen.height);
	int color = map(magnitude, 0, MAX_CNT, 2, 255);
	int color2 = frameCount % 360;
	fill(color2, color2, color2, 200);
	// create all circles
	for(int i = 0; i < LENGTH; i++) {
		float dx = cos(theta) * magnitude + (i % 2) + startx;
		float dy = sin(theta) * magnitude + i + starty;
		ellipse(dx, dy, _size, _size);
		theta += magnitude;
	}
	magnitude += 0.1;
	if(current > MAX_CNT) reset();
	current += 1;
}

void reset() {
	newBg();
	theta = 0.1;
	magnitude = 0;
	current = 0;
}
