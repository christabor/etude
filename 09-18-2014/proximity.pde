/* @pjs pauseOnBlur="true"; */

int width        = screen.width;
int height       = screen.height;
color bg         = color(#4f1c65);
int MAX          = 100;
int OPACITY      = 255;
int SEED_INDEX   = 1;
Pvector[] points = new Pvector[MAX];

void setup() {
	newBg();
	size(constrain(width, 100, 2000), constrain(height, 100, 2000));
	fill(bg, 30);
	stroke(255, 80);
	seedVectors();
}

void newBg() {
	fill(255);
	textSize(80);
	text('Proximity', 50, height - 200);
	textSize(12);
	text('(move mouse around)', 55, height - 280);
	fill(bg, 140);
	rect(0, 0, width, height);
}

void seedVectors() {
	for(int i = 0; i < MAX; i++) {
		points[i] = new PVector(random(width), random(height));
	}
}

void draw() {
	newBg();
	for(int i = 0; i < MAX; i++) {
		int x1 = points[i].x;
		int y1 = points[i].y;
		if(points[i] && points[i + 1]) {
			int x2 = points[i + 1].x;
			int y2 = points[i + 1].y;
			// calculate closeness for neighbors.
			int distance = dist(x1, y1, x2, y2);
			// increase thickness for closer bonds
			int thickness = map(distance, 1, 100, 1, 5);
			int radius = map(dist(x1, y1, x2, y2), 1, width, 10, 40);


			if(distance < 300) {
				strokeWeight(thickness);
				stroke(255, 0, 0, OPACITY);
				if(i == SEED_INDEX) {
					stroke(0, 255, 0, OPACITY);
				}
			} else {
				strokeWeight(1);
				stroke(255, 30);
			}

			line(x1, y1, x2, y2);

			if(distance < 300) {
				fill(255, 0, 0, OPACITY);
			} else {
				fill(255, OPACITY);
			}

			noStroke();

			// Always fill active dot green
			if(i == SEED_INDEX) fill(0, 255, 0, OPACITY);
			ellipse(x1, y1, radius, radius);
			// throw in a random point based on current mouse position;
			points[SEED_INDEX] = new PVector(mouseX, mouseY);
		}

		// reset slideshow for 'infinite panning'
		if(x1 > width) points[i].x = 0;
		if(y1 < 0) points[i].y = random(height);
		points[i].x += random(8);
		points[i].y -= random(1);
	}
}
