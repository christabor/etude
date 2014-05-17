
void setup() {
	background(0, 0);
	size(screen.width, screen.height);
	smooth();
}

float last_x = null;
float last_y = null;

void mousePressed() {
	stroke(0, 0);
	float size = random(30);
	float bg_size = size * 2;
	fill(255, random(255), 0);
	ellipse(mouseX, mouseY, size, size);
	fill(255, 30);
	ellipse(mouseX, mouseY, bg_size, bg_size);
	// blur effect
	for(int i = 0; i <= 10; i++) {
		fill(255, i * 2);
		ellipse(mouseX, mouseY, bg_size + i * 2, bg_size + i * 2);
	}
	stroke(255, 255);
	if(last_x && last_y) {
		line(mouseX, mouseY, last_x, last_y);
		fill(255, 255, 255);
		text(mouseX + ' / ' + mouseY, mouseX + 10, mouseY + 10);
	}
	last_x = mouseX;
	last_y = mouseY;
}
