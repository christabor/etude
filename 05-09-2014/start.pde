float scale = 1;
float MAX = 10;
float mx[] = new float[MAX];
float my[] = new float[MAX];
float bgCircs[] = new float[MAX];
float CLOSENESS_THRESHOLD = 50;
float JUMPSIZE = CLOSENESS_THRESHOLD * 2;
float bg = 0;

void setup(){
    size(screen.width / scale, screen.height / scale);
    // noCursor();
    smooth();
    // setup the initial random bg circles
    for(int i = 0; i < 30; i++) {
        bgCircs[i] = [random(width), random(height)];
    }
}

void draw() {
    bg = mouseX/2;
    background(mouseX / 2, mouseY / 2, mouseX / 2);
    bgCircles();
}

void bgCircles() {
    // add the initially randomly generated circles
    // to the canvas for later use.
    for(int i = 0; i < bgCircs.length; i++) {
        // check if the mouse is near any of the circles.
        float diff = dist(mouseX, mouseY, bgCircs[i][0], bgCircs[i][1]);
        fill(255 - diff);
        if(diff <= CLOSENESS_THRESHOLD) {
            ellipse(bgCircs[i][0], bgCircs[i][1], JUMPSIZE, JUMPSIZE);
            println('Hit: ' + diff);
        } else {
            ellipse(bgCircs[i][0], bgCircs[i][1], diff / 2, diff / 2);
        }
        fill(diff, 255, 100);
        ellipse(bgCircs[i][0], bgCircs[i][1], i, i);
    }
}

void mouseMoved() {
    mx[mx.length - 1] = mouseX;
    my[mx.length - 1] = mouseY;
}
