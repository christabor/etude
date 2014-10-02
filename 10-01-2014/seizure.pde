/* @pjs pauseOnBlur="true"; */

int box_size = 50;
int max_w    = screen.width;
int max_h    = screen.height;
bool flipped = false;

void setup() {
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
}

void grid() {
	int mid_x = box_size / 4;
	int mid_y = box_size / 4;
	for(int x = 0; x < max_w; x += box_size;) {
		for(int y = 0; y < max_h; y += box_size) {
			if(x % 3 === 0) {
				if(flipped) {
					fill(0);
				} else {
					fill(255);
				}
				ellipse(x - box_size, y - box_size, box_size / 2, box_size / 2);
				ellipse(x + box_size, y, box_size / 2, box_size / 2);
				ellipse(x, y, box_size, box_size);
			}
		}
	}
	flipped = !flipped;
	box_size += 1;
}

void draw() {
	grid();
}
