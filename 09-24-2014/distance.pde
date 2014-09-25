/* @pjs pauseOnBlur="true"; */

float SIZE = 100;
int r           = random(255);
int g           = random(255);
int b           = random(255);

void setup() {
	newBg();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	stroke(255, 40);
	noFill();

}

void grid() {
	for(int x = 0; x < screen.width; x += SIZE;) {
		for(int y = 0; y < screen.height; y+= SIZE) {
			strokeWeight(2);
			float _size = dist(x, y, mouseX, mouseY);
			ellipse(x, y, _size / 2, _size / 2);
			rect(x, y, _size, _size);
		}
	}
}

void newBg() {
	background(r, g, b, 100);
}

void draw() {
	newBg();
	grid();
}
