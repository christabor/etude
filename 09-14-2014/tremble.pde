float x       = screen.width / 2;
float y       = screen.height / 2.4;
float radius  = 2;
float amt     = 0.1;
float color   = 0.1;
float theta   = 0;
float theta_2 = 0;
int _size2    = 1;
int count     = 0;
int r         = random(255);
int g         = random(255);
int b         = random(255);
int r1        = abs(r - 255);
int g1        = abs(g - 255);
int b1        = abs(g - 255);

void setup() {
	background(r, g, b, 100);
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	fill(r1, g1, b1, 100);
	stroke(10);
}

void draw() {
	fill(color, color / 2,  color / 2, 10);
	for(int i = 0; i < 100; i += 10) {
		float dx = cos(theta) * i + width / 2;
		float dy = sin(theta) * i + height / 2;
		float _size = map(count, 1, i, 10, screen.width);
		ellipse(dx + random(10), dy, _size, _size);
		ellipse(dx, dy + random(10), _size, _size);
	}
	fill(255, 0, 0);
	ellipse(dx, dy, 10, 10);
	count += 0.1;
	theta += 0.01;
	color += 1;
	_size2 += 1;
	if(count > 30) {
		count = 1;
		color = 0;
		fill(count, 4);
	}
}
