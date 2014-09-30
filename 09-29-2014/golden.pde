/*
@pjs pauseOnBlur="true";
@pjs preload="goldens.jpg";
*/

int r              = random(255);
int g              = random(255);
int b              = random(255);
int max_w          = screen.width;
int max_h          = screen.height;
int ratio          = 2;
int _size          = 10;
int DOTS_PER_CYCLE = 4000;
PImage img;

void setup() {
    fill(255);
    size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
    img = loadImage('goldens.jpg');
    noStroke();
}

void drawPoint() {
    // draw a point on the screen based on the color
    // of the loaded image
    int x = int(random(img.width));
    int y = int(random(img.height));
    color pix = img.get(x, y);
    fill(pix);
    noStroke();
    rect(x, y, int(random(_size)), int(random(_size)));
    stroke(255, 0, 0);
}

void draw() {
    for(int i = 0; i < DOTS_PER_CYCLE; i ++) {
        drawPoint();
    }
}

void mouseMoved() {
    // add overlay bubbly effect while 'doodling'
    color active_shade = img.get(mouseX, mouseY);
    fill(active_shade);
    rect(mouseX - _size * 1.5, mouseY - _size * 1.5, _size * 3, _size * 3);
}
