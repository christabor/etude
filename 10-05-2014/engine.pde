/*
@pjs pauseOnBlur="true";
*/

int MIN_RADIUS = 8;
int MAX_RADIUS = 100;
int half_w = screen.width / 2;
int half_h = screen.height / 2;
float intensity = 10;
float thetaX = 0.1;
float thetaY = 0.4;
float thetaZ = 0.2;
int piston_size = 20;
bool wipe_bg = false;

void setup() {
    size(constrain(screen.width, 100, 2000), constrain(screen.height, 100, 2000), P3D);
    background(0);
    noStroke();
}

void draw() {
    thetaX += 0.1;
    // allow some control
    thetaY = mouseX;
    thetaZ += 0.2;

    if(wipe_bg) {
        background(0);
    }
    shininess(1.0);

    int specularity = mouseX * 0.1;
    intensity = constrain(dist(mouseX, mouseY, half_w, half_h), 20, 100);

    directionalLight(intensity, intensity, intensity, 0, 0, -1);
    lightSpecular(specularity, specularity, specularity);

    translate(half_w, half_h);

    rotateX(radians(thetaX));
    rotateY(radians(thetaY));
    rotateZ(radians(thetaZ));

    ambientLight(intensity, 0, 0);
    box(60);

    for(int i = 0; i < 100; i++) {
        box(piston_size, piston_size, random(i));
        box(piston_size, random(i), piston_size);
        box(random(i), piston_size, piston_size);
    }

    emissive(0, 0, 255);
    ambientLight(intensity, intensity, intensity);

    for(int i = 0; i < 100; i++) {
        pushMatrix();
        translate(cos(i) * half_w / 1.2, sin(i) * half_h / 1.2, random(5));
        sphere(constrain(dist(mouseX, mouseY, half_w, half_h), 1, 50));
        popMatrix();
    }
}

void mousePressed() {
    wipe_bg = !wipe_bg;
}
