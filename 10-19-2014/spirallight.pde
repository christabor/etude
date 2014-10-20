/*
@pjs pauseOnBlur="true";
*/

int MIN_RADIUS  = 8;
int MAX_RADIUS  = 100;
int _width      = screen.width;
int _height     = screen.height;
int center_w    = _width / 2;
int center_h    = _height / 2;
int shade       = 1;
float intensity = 10;
float thetaX    = 0.4;
float thetaZ    = 0.4;
float thetaY    = 0.4;
int PRIM_SIZE   = 100;
bool stroke_mode = false;

void setup() {
    size(constrain(_width, 100, 2000), constrain(_height, 100, 2000), P3D);
    background(0);
    noStroke();
    strokeWeight(3);
}

int r() {
    return int(random(255));
}

void draw() {
    if(shade > 200) {
        shade = 0;
    }
    thetaY += 0.01;
    thetaX += 0.002;
    thetaZ += 0.05;

    translate(center_w, 0, thetaZ);
    if(stroke_mode) {
        stroke(0, 100);
    } else {
        noStroke();
    }

    fill(255);

    directionalLight(0, 255, 0, -thetaX, 0, -thetaZ);
    directionalLight(255, 0, 0, -thetaX, -thetaY, 0);
    directionalLight(0, 0, 255, 0, -thetaY, -thetaZ);

    for(int x = PRIM_SIZE; x < _width; x += PRIM_SIZE) {
        pushMatrix();
        rotateX(x + thetaX);
        for(int y = PRIM_SIZE; y < _height; y += PRIM_SIZE) {
            rotateY(y + thetaY);
            translate(x + sin(x), y + cos(y), 0);
            sphere(PRIM_SIZE / 5);
        }
        popMatrix();
    }

    rotateZ(thetaZ);
    shade += 1;
}

void mousePressed() {
    stroke_mode = !stroke_mode;
}