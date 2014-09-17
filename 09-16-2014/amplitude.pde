/* @pjs pauseOnBlur="true"; */

float color     = 0.1;
float period    = 1;
int r           = random(255);
int g           = random(255);
int b           = random(255);
int MAX_PERIOD  = 50;
int line_stroke = abs(r - 255);
int bg_width    = 50;
int bg_offset   = bg_width / 2;

char words[] = [
	'Hey', 'sup', 'omg', 'LOL',
	'russian hacker', 'dude', 'I lvoe you',
	'terrorist NSA backdoor', 'rofl', 'lmao',
	'cya', 'bye', 'wtf'
];

void setup() {
	newBg();
	size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
	noStroke();
	// text updates are extremely performance
	// intensive, so update only once
	textSize(random(30, 110));
}

void newBg() {
	background(r, g, b, 100);
}

public String randWord() {
	index = round(random(words.length()));
	return words[index];
}

void soundWave() {
	float amplitude = 0.1;
	beginShape();
	for(int i = 0; i < screen.width; i += period) {
		// add bg markers for visual effect
		float offset = noise(i / 20) * amplitude;
		// divide offset to visually center
		float y = (screen.height / 2) - (offset / 2);
		curveVertex(i, y);
		if(i % 3 == 0) amplitude = random(screen.height);
	}
	endShape();
}

void draw() {
	newBg();
	noFill();

	stroke(line_stroke, 50);
	strokeWeight(1);
	for(int j = 1; j < screen.width - bg_offset; j += bg_width) { // prevent edges
		line(j, 0, j, screen.height);
	}

	stroke(255);
	strokeWeight(random(4));
	soundWave();

	// limit text so it's not happening so often
	if(random(10) > 8) {
		text(randWord(), random(screen.width), screen.height / 2 - random(300));
	}

	period += 0.5;
	// "Scramble" the signal after a while, with a random period.
	if(period > MAX_PERIOD) period = random(1, MAX_PERIOD);
}
