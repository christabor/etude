/*
@pjs pauseOnBlur="true";
*/

int _width     = screen.width;
int _height    = screen.height;
int center_w   = _width / 2;
int center_h   = _height / 2;
float theta2   = 0.1;
float theta    = 0.1;
int LINE_WIDTH = _width / 2;
int V_OFFSET   = 40;

void setup() {
    background(0);
    size(_width, _height);
}

void newBg() {
    noStroke();
    fill(0, 8);
    rect(0, 0, _width, _height);
}

void addCrosshairs() {
    line(0, center_h - V_OFFSET, _width, center_h - V_OFFSET);
    line(center_w, 0, center_w, _height);
}

void addFX() {
    int distance = 200;
    for(int r = 0; r < 10; r++) {
        int radius = r * distance;

        // main bg concentric circles
        ellipse(0, 0, radius, radius);

        // dancing arcs
        arc(0, 0, radius, sin(theta) * _height, 0, theta);
        arc(0, 0, radius, cos(theta) * _width, 0, theta);

        // static circles left and right
        ellipse(-r * 100, cos(theta), r * 10, r * 10);
        ellipse(r * 100, cos(theta), r * 10, r * 10);
    }
}

void draw() {

    newBg();
    noFill();
    strokeWeight(2);
    stroke(100, 255, 0, 50);

    pushMatrix();
    translate(center_w, center_h - V_OFFSET);
    addFX();
    rotate(theta);
    stroke(255, 100, 0, 50);
    line(0, 0, LINE_WIDTH, 0);
    popMatrix();

    addCrosshairs();

    pushMatrix();
    translate(center_w, center_h - V_OFFSET);
    rotate(theta2);
    line(0, 0, LINE_WIDTH, 0);
    popMatrix();

    theta += 0.01;
    theta2 -= 0.01;
}
