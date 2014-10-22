/*
@pjs pauseOnBlur="true";
*/

int GRID_SPACING = 40;
int MIN_RADIUS  = 8;
int MAX_RADIUS  = 100;
int _width      = screen.width;
int _height     = screen.height;
int center_w    = _width / 2;
int center_h    = _height / 2;
int ypos;
int xpos;

void setup() {
    size(constrain(_width, 100, 2000), constrain(_height, 100, 2000));
    background(0);
    textSize(int(center_h / 3));
    textAlign(CENTER, BASELINE);
    noStroke();
}

int r() {
    return int(random(255));
}

void newBg() {
    noStroke();
    fill(0, r());
    rect(0, 0, _width, _height);
}

void addWord() {
    int res = floor(map(mouseX, 0, width, 5, 40));
    fill(255, 0, 0, 40);
    text('Goodbye!', mouseX, center_h);
    loadPixels();
    fill(255, 0, 0, 200);
    int offset_size = map(mouseY, 0, _height, 2, 12);

    for(int i = 0; i < width; i += 10){
        for(int j = 0; j < height; j += 10){
            rect(i, j, _height);
            if(brightness(pixels[i + (j * width)]) > 10){
                if(dist(i, j, mouseX, mouseY) > 10) {
                    int xpos = offset_size + random(12);
                    int ypos = offset_size + random(12);
                    ellipse(i, j, xpos, ypos);
                }
            }
        }
    }
}

void draw(){
    newBg();
    addWord();
    ypos += 2;
}
