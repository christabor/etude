/*
@pjs pauseOnBlur="true";
*/

int GRID_SPACING  = 40;
int _width        = screen.width;
int _height       = screen.height;
int center_w      = _width / 2;
int center_h      = _height / 2;

void setup() {
    background(0);
    size(_width, _height);
    mouseY = center_h;
}

void newBg() {
    noStroke();
    fill(0, 8);
    rect(0, 0, _width, _height);
}

void drawGrid() {
    strokeWeight(1);
    stroke(0, 255, 100, 2);
    for(int x = 0; x < _width; x += GRID_SPACING) {
        line(x, 0, x, _height);
    }
    for(int y = 0; y < _height; y += GRID_SPACING) {
        line(0, y, _width, y);
    }
}

void branch(int x, int y) {
    int B_LENGTH = 100;
    int B_HEIGHT = 40;
    int B_PADDING = B_LENGTH * 1.2;
    int B_BAR_WIDTH = B_LENGTH + B_LENGTH * 0.5;
    int RADIUS = 4;

    strokeWeight(1);
    stroke(255);

    // normalize to center
    x = x - B_BAR_WIDTH;

    int x2 = x + B_LENGTH;
    int y2 = y;
    int l2_x1 = x + B_LENGTH + B_PADDING;
    int l2_x2 = x + B_LENGTH * 2 + B_PADDING;

    // left side
    line(x, y, x2, y2);
    line(x2, y2, x + B_BAR_WIDTH, y - B_HEIGHT);

    // right side
    line(l2_x1, y, l2_x2, y);
    line(l2_x1, y, l2_x2 - B_BAR_WIDTH, y - B_HEIGHT);

    // left side - bottom
    line(x, y, x2, y2);
    line(x2, y2, x + B_BAR_WIDTH, y + B_HEIGHT);

    // right side - bottom
    line(l2_x1, y, l2_x2, y);
    line(l2_x1, y, l2_x2 - B_BAR_WIDTH, y + B_HEIGHT);

    strokeWeight(2);
    fill(255, 50);

    stroke(255, 0, 0, 100);

    ellipse(x, y, RADIUS, RADIUS);
    ellipse(x2, y2, RADIUS, RADIUS);

    ellipse(x + B_BAR_WIDTH, y - B_HEIGHT, RADIUS, RADIUS);
    ellipse(l2_x2 - B_BAR_WIDTH, y - B_HEIGHT, RADIUS, RADIUS);

    ellipse(x + B_BAR_WIDTH, y + B_HEIGHT, RADIUS, RADIUS);
    ellipse(l2_x2 - B_BAR_WIDTH, y + B_HEIGHT, RADIUS, RADIUS);

    ellipse(l2_x1, y, RADIUS, RADIUS);
    ellipse(l2_x2, y, RADIUS, RADIUS);

    // Big center circle
    noFill();
    int large_radius = RADIUS * 10;
    ellipse(x + B_BAR_WIDTH + large_radius / 4, y, large_radius, large_radius);

    stroke(255, 0, 0, 10);
    ellipse(x + B_BAR_WIDTH + large_radius / 4, y, large_radius / 2, large_radius / 2);
    ellipse(x + B_BAR_WIDTH + large_radius / 4, y, large_radius / 4, large_radius / 4);
}

void lineGroup(int sx, int sy, int line_length, int count) {
    for(int i = 0; i < count; i++) {
        int sy_offset = sy + i * 10;
        line(sx, sy_offset, sx + line_length, sy_offset);
    }
}

void draw() {
    float DAMPENING = 0.4;
    newBg();
    drawGrid();
    for(int i = 0; i < 10; i++) {
        branch(center_w, i * ((mouseY * DAMPENING)));
    }
    stroke(255, 0, 0, 100);
    lineGroup(center_w - mouseX, 0, 5, 100);
    lineGroup(center_w + mouseX, 0, 5, 100);

    lineGroup(mouseX, center_h - mouseY, 5, 100);
    lineGroup(_width - mouseX, center_h - mouseY, 5, 100);
}
