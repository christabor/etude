/*
@pjs pauseOnBlur="true";
*/

int GRID_SPACING        = 40;
int MAX_SPIKES          = 4;
int X_SPEED             = 10;
int DIST_THRESHOLD      = 50;
int RANDOM_Y_MAX        = 300;
int CLUSTER_VICINITY    = 100;

int line_thickness      = 4;
int x_pos               = 0;
int _width              = screen.width;
int _height             = screen.height;
int center_h            = _height / 2;
int current_spike_index = 0;
int[] spikes            = new int[MAX_SPIKES];
int random_y            = 0;

void setup() {
    background(0);
    size(_width, _height);
    noiseSeed(center_h);
    resetSpikePositions();
    textSize(30);
}

void resetSpikePositions() {
    for(int i = 0; i < MAX_SPIKES; i++) {
        spikes[i] = new PVector(random(_width), center_h);
    }
}

void pulse() {
    // Get "active" spikes position
    Pvector coords = curr_spike = spikes[current_spike_index];
    // Get distance from marker
    int spike_distance = int(dist(x_pos, center_h, coords.x, coords.y));

    stroke(255);

    if(spike_distance < DIST_THRESHOLD) {
        beginShape();
        noStroke();
        fill(255);
        for(int i = 0 ; i < 10; i++) {
            int y_pos = center_h - ((mouseY / i) / 2);
            curveVertex(x_pos, y_pos);
            ellipse(x_pos + random(CLUSTER_VICINITY), y_pos + random(CLUSTER_VICINITY), 4, 4);
        }
        endShape();
        triggerPoint(coords.x, coords.y, spike_distance);

    } else {
        beginShape();
        strokeWeight(2);
        stroke(255, 0, 0);
        for(int i = 0; i < 10; i ++) {
            int x_off = random(random_y) + (i * 10) - (mouseY / 2);
            int y_pos = coords.y - x_off;
            curveVertex(x_pos, y_pos);
        }
        endShape();
    }

    // reset to beginning
    if(current_spike_index >= MAX_SPIKES) current_spike_index = 0;
    if(x_pos >= _width) x_pos = 0;
    if(random_y >= RANDOM_Y_MAX) random_y = 0;
    x_pos += X_SPEED;
    random_y += 10;
}

void triggerPoint(x, y, distance) {
    strokeWeight(4);
    noFill();
    stroke(255);
    ellipse(x, y, distance, distance);
}

void newBg() {
    fill(0, 20);
    rect(0, 0, _width, _height);
}

void drawGrid() {
    strokeWeight(1);
    stroke(0, 255, 0, 10);
    for(int x = GRID_SPACING; x < _width; x += GRID_SPACING) {
        line(x, 0, x, _height);
    }
    for(int y = GRID_SPACING; y < _height; y += GRID_SPACING) {
        line(0, y, _width, y);
    }
}

void draw() {
    newBg();
    drawGrid();
    resetSpikePositions();
    pulse();
    text('collision', 40, 60);
}
