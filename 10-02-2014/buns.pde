/*
@pjs pauseOnBlur="true";
@pjs preload="buns.jpg";
*/

int img_w;
int img_h;
PImage img;

void setup() {
    img = loadImage('buns.jpg');
    size(830, 623);
    noStroke();
}

void draw() {
    img_w = img.width;
    img_h = img.height;
    int _size = img_w / 8;
    image(img, 0, 0);
    int x = mouseX;
    int y = mouseY;
    if(x > img_w) x = img_w / 2;
    if(y > img_h) y = img_h / 2;
    for(int i = 0; i < 8; i++) {
        copy(img, 0, 0, mouseX, mouseY, int(mouseX * 0.1), i * _size, _size, _size);
    }
}
