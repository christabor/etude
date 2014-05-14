void setup() {
    background(0);
    size(screen.width, screen.height);
    smooth();
}

void draw() {
    for(int i = 0; i <= mouseX / 4; i++) {
        fill(mouseX / 2, mouseY / 2, mouseX / 2);
        ellipse(sin(i) * mouseX + screen.width / 2, cos(i) * mouseY + screen.height / 2, 10, 10);
    }
}
