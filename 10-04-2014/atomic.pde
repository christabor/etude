/*
@pjs pauseOnBlur="true";
*/

int MAX_RADIUS    = 180;
int MIN_RADIUS    = MAX_RADIUS / 4;
int MAX_PETALS    = 6;
int MIN_PETALS    = 2;
int FADE_SPEED    = 20;
bool DEBUG        = false;

int bg_opacity    = 0;
int opacity       = 255;
int _div          = 0;

void setup() {
    size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000));
    if(DEBUG) frameRate(1);
}

void newBg() {
    fill(bg_opacity, 50);
    rect(0, 0, screen.width, screen.height);
}

void drawPetal(int lines_per_petal, int radius, int x, int y, int theta) {

    pushMatrix();
    translate(x, y);
    rotate(radians(360 / theta));

    // For each petal, draw a bunch of lines.
    for(int l = 0; l < lines_per_petal; l++) {
        // set midway-point y to be y + iteration
        ellipse(0, 0, radius, radius / l / _div);
    }
    popMatrix();
}

int BOX_SIZE = 10;

void draw() {
    newBg();
    noFill();
    opacity += FADE_SPEED;
    bg_opacity -= FADE_SPEED;

    _div += 1;

    if(bg_opacity <= 0) bg_opacity = 255;
    if(opacity >= 255) opacity = 10;

    if(_div > 10) _div = 1;
    stroke(opacity);

    // O(N^4) Ftw! :|
    for(int x = MAX_RADIUS / 2; x < screen.width + MAX_RADIUS / 2; x += MAX_RADIUS) {3
        for(int y = MAX_RADIUS / 2; y < screen.height + MAX_RADIUS / 2; y += MAX_RADIUS) {

            int lines_per_petal = int(random(3, 6));
            int num_petals = int(random(MIN_PETALS, MAX_PETALS));
            int radius = int(random(MIN_RADIUS, MAX_RADIUS));

            // draw each petal
            for(i = 0; i < num_petals; i++) {
                drawPetal(lines_per_petal, radius, x, y, i);
            }
        }
    }
}
