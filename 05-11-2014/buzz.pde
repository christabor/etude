
int positions = new int[20];

void setup(){
    size(screen.width, screen.height);
    smooth();
}

class Bouncer {
    int basex = random(width);
    int basey = random(height);
    int currx = basex;
    int curry = basey;
    int max = 100;
    public int getEls() {
        return [currx, curry];
    }
    void bounce(){
        pushMatrix();
        for(var i = 0; i <= 4; i++) {
            ellipse(currx + noise(40), curry + noise(40), mouseX / 10, mouseY / 10);
            rotate(i);
        }
        popMatrix();
        stroke(0);
    }
}

void checkPos() {
    for(var i = 0; i <= 20; i++) {
        ellipse(mouseX + noise(30), mouseY + noise(30), i, i);
    }
}

void draw() {
    background(100, 100, 100);
    moveIt();
    fill(100, 255, 0);
    checkPos();
}

void moveIt() {
    fill(0, 0);
    for(var i = 0; i <= 20; i++) {
        if(i === 20) {
            stroke(100, 255, 0);
        } else {
            stroke(random(255));
        }
        el = new Bouncer();
        el.bounce();
        positions[i] = el.getEls();
        pushMatrix();
        rotate(360/i);
        ellipse(mouseX - 100, mouseY, 10, 10);
        ellipse(mouseX + 100, mouseY, 10, 10);
        ellipse(mouseX, mouseY - 100, 10, 10);
        ellipse(mouseX, mouseY + 100, 10, 10);
        popMatrix();
        if(positions[i + 2]) {
            curve(positions[i][0], positions[i][1], mouseX, mouseY, positions[i + 1][1], positions[i + 1][0], positions[i + 2][0], positions[i + 2][1]);
        }
    }
}
