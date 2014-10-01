/*
@pjs pauseOnBlur="true";
@pjs preload="puppy.jpg, kitty.jpg";
*/

PImage img_puppy;
PImage img_kitty;

char modes[] = [
    BLEND, ADD, SUBTRACT, LIGHTEST, DARKEST, DIFFERENCE,
    EXCLUSION, MULTIPLY, SCREEN, OVERLAY, HARD_LIGHT,
    SOFT_LIGHT, DODGE, BURN
];

int x;
int dx;
int dwidth;
int dheight;
int SPEED = 5;
int _width = 600;
int _height = 400;

int w1;
int h1;
int w2;
int h2;

float damping = 0.1;
float count;

void setup() {
    img_puppy = loadImage('puppy.jpg');
    img_kitty = loadImage('kitty.jpg');
    size(_width, _height);
    textSize(20);
}

void blendAll() {
    int rand_mode_i = int(random(modes.length));
    char rand_mode = modes[rand_mode_i];

    img_kitty.blend(
    img_puppy,
    x, 0,
    w1, h1,
    dx, 0,
    w2, h2,
    rand_mode);
}

void draw() {
    blendAll();
    image(img_kitty, 0, 0);
    translate(_width / 2, _height / 2);

    // rotate(count * damping);
    // text('Acid pup', 0, count);

    count += 10;
    x += SPEED;
    dx += SPEED;

    w1 += 1;
    h1 += 1;

    w2 += 1;
    h2 += 1;

    if(x > _width) resetPos();
    if(count > _width || count > _height) count = 0;
    if(w1 > _width) resetSizes();
}

void resetSizes() {
    w1 = 0;
    w2 = 0;
    h1 = 0;
    h2 = 0;
}

void resetPos() {
    x = 0;
    y = 0;
    dx = 0;
    dy = 0;
}
