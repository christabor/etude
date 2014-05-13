
float radsize = 12;
float RANDOM_SEED = 100;
float r = random(RANDOM_SEED);
float g = random(RANDOM_SEED);
float b = random(RANDOM_SEED);
float w = screen.width;
float MAX = 300;
float ATTRACTION_THRESHOLD = 100;
float states[] = new float[0];
float prevx = 0;
float prevy = 0;

void setup() {
    size(screen.width, screen.height);
    smooth();
    background(20);
    // create initial positions.
    for(float i = 0; i <= MAX; i++) {
        float x = random(screen.width);
        float y = random(screen.height);
        states[i] = [x, y];
    }
}

void draw() {
    stroke(r, g, b);
    for(float i = 0; i <= MAX; i++) {
        float closest_diff = width;
        float x = states[i][0];
        float y = states[i][1];
        diff = dist(x, y, mouseX, mouseY);
        // set the closest diff to the current diff if it's
        // less than the previous calculation and within the threshold of 'attraction'.
        if(diff < closest_diff && diff <= ATTRACTION_THRESHOLD) {
            // complement color
            stroke(255 - r, 255 - g, 255 - b);
            closest_diff = diff;
            // connect the line
            line(x, y, mouseX, mouseY);
            // light up the circle as if 'active'
            fill(255 - r, 255 - g, 255 - b);
        } else {
            // otherwise keep it dark
            fill(r, g, b);
        }
        // remove stroke - purely aesthetic.
        stroke(0, 0);
        ellipse(x, y, radsize, radsize);
    }
}

