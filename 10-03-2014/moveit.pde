/*
@pjs pauseOnBlur="true";
*/

float jitter = 1;
float buildup = 0;
float MAX_JITTER = 80;
float DECREASE_AMT = 0.3;
float INCREASE_AMT = DECREASE_AMT * 2.5;

void setup() {
    size(screen.width, screen.height);
    noStroke();
}

char[] getResults() {
    char word;
    color bg;
    if(jitter >= MAX_JITTER / 4) {
        if(jitter > MAX_JITTER / 2) {
            word = 'C R A C K';
            bg = color(224, 0, 0);
        } else {
            word = 'C a f f e i n e';
            bg = color(224, 182, 0);
        }
    } else {
        if(jitter >= MAX_JITTER / 8) {
            word = 'Tea';
            bg = color(120, 168, 0);
        } else {
            word = 'water';
            bg = color(55, 155, 255);
        }
    }
    return [word, bg];
}

void move() {
    textSize(120);
    char[] res = getResults();
    background(res[1]);
    fill(255, 100);
    for(int i = 0; i < 4; i++) {
        text(res[0], mouseX - random(jitter), mouseY - random(jitter));
    }
}

void draw() {
    background(100);
    move();
    textSize(20);
    text('Move mouse to speed up, stop to slow down', 20, 30);
    text('Jitter:' + jitter, 20, 60);
    // constantly decrease jitter to baseline (0).
    if(jitter > 0) {
        jitter -= DECREASE_AMT;
    }
}

void mouseMoved() {
    jitter += INCREASE_AMT;
}
