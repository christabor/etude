int bullets = new int[0];
int bombs = new int[0];
int score = 0;
float dirx = mouseX;
float diry = mouseY;

class Base {
	float x = mouseX;
	float y = mouseY;
	float is_dead = false;
}

class Bomb extends Base {
	float x = random(width);
	float y = random(height);
	float size = 40;
	void init() {
		if(is_dead) {
			return;
		}
		fill(10, 200, 10);
		// add bomb-esque shape
		ellipse(x, y, size, size);
		ellipse(x + 10, y + 10, size / 2, size / 2);
		ellipse(x - 10, y - 10, size / 2, size / 2);
	}
	void destroy() {
		if(is_dead) {
			return;
		}
		is_dead = true;
		fill(100, 200, 10);
		textSize(40);
		// explode effect
		text('BOOOOM!', x - size * 2, y + size * 2);
		ellipse(x, y, 80, 80);
	}
}

class Bullet extends Base {
	float x = mouseX;
	float y = mouseY;
	float rad = 5;
	float wall_padding = rad / 2;
	boolean is_dead = false;
	void init() {
		// kill 'em all, let god sort 'em out
		if(is_dead) {
			return;
		}
		// check if its hit a bomb
		int len = bombs.length;
		for(int i = 0; i < len; i++) {
			diff = dist(x, y, bombs[i].x, bombs[i].y);
			boolean collision = diff < rad;
			if(collision) {
				score += 10;
				bombs[i].destroy();
				is_dead = true;
			}
		}
		fill(255, 0, 0);
		// check if it collides with the screen edges
		boolean hit_right = x > screen.width - wall_padding;
		boolean hit_left = x < wall_padding;
		boolean hit_top = y < wall_padding;
		boolean hit_bottom = y > screen.height - wall_padding;
		if(hit_right || hit_left || hit_top || hit_bottom) {
			is_dead = true;
			fill(0, 255, 255);
			ellipse(x, y, rad * 10, rad * 10);
			score += 1;
		} else {
			x += dirx * 0.01;
			y += diry * 0.01;
			rad += 0.04;
			ellipse(x, y, rad, rad);
			fill(255, 20);
			ellipse(x, y, rad * 4, rad * 4);
		}
	}
}

void adjustHeading() {
	// reset if heading gets out of hand
	if(abs(dirx) > 200) {
		dirx = 0;
	}
	if(abs(diry) > 200) {
		diry = 0;
	}
	// adjust heading
	if(mouseX < screen.width / 2) {
		dirx += 1;
	} else {
		dirx -= 1;
	}
	if(mouseY < screen.height / 2) {
		diry += 1;
	} else {
		diry -= 1;
	}
}

void setup() {
	background(0);
	size(screen.width, screen.height);
	smooth();
	stroke(0);
}

void animateProjectiles() {
	if(bullets) {
		int len = bullets.length;
		for(int i = 0; i < len; i++) {
			bullets[i].init();
		}
	}
	if(bombs) {
		int len = bombs.length;
		for(int i = 0; i < len; i++) {
			bombs[i].init();
		}
	}
}

void updateText() {
	fill(255);
	textSize(14);
	text('Click to drop bomb, mouse to accelerate/move', 50, 40);
	text('Score: ' + score, 50, 80);
	text('Heading: ' + dirx + ' / ' + diry, 50, 100);
}

void draw() {
	background(0);
	updateText();
	animateProjectiles();
}

void mousePressed() {
	bomb = new Bomb(mouseX, mouseY);
	append(bombs, bomb);
}

void mouseMoved() {
	bullet = new Bullet(mouseX, mouseY);
	append(bullets, bullet);
	adjustHeading();
}
