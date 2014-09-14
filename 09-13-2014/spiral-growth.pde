float x      = screen.width / 2;
float y      = screen.height / 2.4;
float radius = 2;
float theta  = 0;
float theta_2 = 0;

void setup() {
	int r = random(255);
	int g = random(255);
	int b = random(255);

	int r1 = abs(r - 255);
	int g1 = abs(g - 255);
	int b1 = abs(g - 255);

	background(r, g, b, 100);
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	fill(r1, g1, b1, 100);
	stroke(0, 0);
}

void draw() {
	for(int i = 0; i < theta; i++) {
		float dx = sin(theta) * radius +  x;
		float dy = cos(theta) * radius + y;
		float _radius = random(5, i);
		ellipse(dx, dy, _radius, _radius);
		ellipse(dx, dy, _radius / 2, _radius / 2);
		ellipse(dx, dy, _radius / 4, _radius / 4);
		theta += 0.4;
		radius += 0.2;
	}
	theta = 0 ;
	theta += theta_2;
	theta_2 += 0.2;
	if(theta_2 > 100) theta_2 = 0;
}
