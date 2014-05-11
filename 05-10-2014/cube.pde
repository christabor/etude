void setup(){
    size(screen.width, screen.height, P3D);
    smooth();
    noStroke();
}

void draw() {
    background(mouseX / 4, mouseX / 4, mouseX / 4);
    float fov = PI / 4.0;
    float cameraZ = (height / 2.0) / tan(fov / 2.0);
    perspective(fov, float(mouseX) / float(mouseY), cameraZ / 10.0, cameraZ * 10.0);
    rotateX(-PI / 5);
    rotateZ(PI / mouseX);
    rotateY(PI / 3);
    directionalLight(100, 100, 100, mouseX / mouseY, 0, -10);
    ambientLight(10, 100, 100);
    for(int i = 0; i < 40; i++) {
        translate(width / 4, height / 2, i);
        box(mouseX / 2, mouseX / 2, i);
        translate(width / 5, height / 3, i);
        box(mouseX / 4, mouseX / 4, i);
    }
}
