float x      = screen.width / 2;
float y      = screen.height / 2;
float radius = 0.01;
float theta  = 0;

void setup() {
	background(#243189);
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	smooth();
	fill(#ffa500, 20);
	stroke(#000000, 30);
}

void draw() {
	for(int i = 0; i < 10; i++) {
		float dx = sin(theta) * radius + width / 2;
		float dy = cos(theta) * radius + height / 2;
		ellipse(dx, dy / i, radius, radius);
		rotate(PI / theta);
	}
	theta += 0.1;
	radius += 0.15;
	if(radius > 50) {
		// reset all, in a new direction.
		x = random(screen.width);
		y = random(screen.height);
		radius = 0.01;
	}
}
