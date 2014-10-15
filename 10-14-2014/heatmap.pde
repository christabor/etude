/*
@pjs pauseOnBlur="true";
*/

int _width        = screen.width;
int _height       = screen.height;
int radius        = 20;
int MIN_RADIUS    = 10;
int MAX_RADIUS    = 200;
int HEAT_INCREASE = 100;
int FILL_OPACITY  = 50;
int _pixels       = int(_width * _height);
int[] heat_points = new int[_pixels];

void setup() {
    size(_width, _height);
    noStroke();
}

void newBg() {
    fill(255, 2);
    noStroke();
    rect(0, 0, _width, _height);
}

void draw() {
    newBg();
}

void translateShade(value) {
    if(value >= 200) {
        return color(255, 0, 0, FILL_OPACITY);
    }
    else if(value >= 100) {
        return color(255, 80, 0, FILL_OPACITY);
    }
    else if(value >= 50) {
        return color(255, 160, 0, FILL_OPACITY);

    } else if(value >= 25) {
        return color(10, 200, 10, FILL_OPACITY);
    }
    return color(0, 0, 0, FILL_OPACITY);
}

void mouseMoved() {
    noStroke();
    fill(translateShade(heat_points[mouseX + mouseY]));
    addPoint();
    heat_points[mouseX + mouseY] += HEAT_INCREASE;
}

void translateRadius(value) {
    return map(value, 0, _width, MIN_RADIUS, MAX_RADIUS);
}

void addPoint() {
    int _radius = translateRadius(heat_points[mouseX + mouseY]);
    ellipse(mouseX, mouseY, _radius, _radius);
}

void mousePressed() {
    fill(255);
    strokeWeight(10);
    stroke(translateShade(heat_points[mouseX + mouseY]));
    addPoint();
}
