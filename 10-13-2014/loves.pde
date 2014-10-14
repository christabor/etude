/*
@pjs pauseOnBlur="true";
*/

int MAX_FONT_SIZE = 200;
int _width  = screen.width;
int _height = screen.height;
int curr_font_size = 10;

void setup() {
    size(_width, _height);
}

void newBg() {
    fill(0, 20);
    rect(0, 0, _width, _height);
}

void draw() {
    newBg();
    curr_font_size += 1;
    textSize(curr_font_size);
    fill(int(random(255)));
    text('I', int(random(_width)), int(random(_height)));
    text('Love', int(random(_width)), int(random(_height)));
    text('Ella', int(random(_width)), int(random(_height)));
    if(curr_font_size > MAX_FONT_SIZE) curr_font_size = 10;
}
