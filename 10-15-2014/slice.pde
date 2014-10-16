/*
@pjs pauseOnBlur="true";
*/

int GRID_SPACING = 40;
int CROSS_OFFSET = GRID_SPACING * 4;
float DEBUG      = 10;
int _width       = screen.width;
int _height      = screen.height;
int center_w     = _width / 2;
int center_h     = _height / 2;

void setup() {
    background(0);
    size(_width, _height);
}

void newBg() {
    noStroke();
    fill(0, 4);
    rect(0, 0, _width, _height);
}

void drawGrid() {
    strokeWeight(1);
    stroke(0, 255, 100, 4);
    for(int x = 0; x < _width; x += GRID_SPACING) {
        line(x, 0, x, _height);
    }
    for(int y = 0; y < _height; y += GRID_SPACING) {
        line(0, y, _width, y);
    }
    for(int x = GRID_SPACING / 2; x < _width; x += CROSS_OFFSET) {
        for(int y = GRID_SPACING / 2; y < _height; y += CROSS_OFFSET) {
            line(x, y - 10, x, y + 10);
            line(x - 10, y, x + 10, y);
        }
    }
}

void slash() {
    stroke(255, 0, 0);
    int thickness = map(dist(mouseX, mouseY, pmouseX, pmouseY), 0, _width, 1, 200);
    strokeWeight(thickness);
    line(mouseX, mouseY, pmouseX, pmouseY);

    strokeWeight(thickness * 0.10);
    line(pmouseX, pmouseY, pmouseX - thickness, pmouseY - thickness);
    line(pmouseX, pmouseY, pmouseX + thickness, pmouseY + thickness);

    fill(255);
    ellipse(pmouseX, pmouseY, thickness, thickness);
    line(pmouseX - thickness, pmouseY - thickness, mouseX - thickness, mouseY - thickness);
}

void addIndicator(thickness) {
    fill(255);
    text(thickness, center_w, center_h);
    stroke(200, 200, 10);
    strokeWeight(2);
    noFill();
    ellipse(center_w, center_h, thickness * 2, thickness * 2);
}

void draw() {
    newBg();
    drawGrid();
    slash();
}
