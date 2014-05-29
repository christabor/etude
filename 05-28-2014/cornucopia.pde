void bits     = [0];
int rotation  = 0;
int curr_idx  = 0;
float inc     = 0;
int MAX_BITS  = 400;
int r         = random(255);
int g         = random(255);
int b         = random(255);
int interp    = 0;
// demo 9
float incx = 0;
float incy = 0;
// demo 10
float rotated = 1;
float total = 1;
// demo 11
float twirl = 0;
int cycles = [cycleOne, cycleTwo, cycleThree,
              cycleFour, cycleFive, cycleSix, cycleSeven,
              cycleEight, cycleNine, cycleTen, cycleEleven];

int curr_cycle = 0;

void setup() {
    size(screen.width, screen.height);
    smooth();
    stroke(0, 100);
    noCursor();
    setCycleType();
}

void mouseMoved() {
    if(bits.length < MAX_BITS) {
        append(bits, [random(width), random(height)]);
    } else {
        reset();
    }
}

void setCycleType() {
    fill(255);
    text('Demo: ' + curr_cycle, 20, 20);
}

void mousePressed() {
    // reset on mousepress
    reset();
}

void draw() {
    cycles[curr_cycle]();
}

void reset() {
    // reset
    background(r, g, b);
    bits = [0];
    // reset cycle demo type
    if(curr_cycle === cycles.length - 1) {
        curr_cycle = 0;
    } else {
        curr_cycle += 1;
    }
    inc = 0;
    // set text indicator
    setCycleType();
}

void cycleOne() {
    color riff = color(random(255), random(255), random(255));
    for(int bit = 0; bit < bits.length; bit++) {
        if(bits[bit + 2] !== undefined) {
            stroke(0, 100);
            fill(255, 0);
            // add the wild wiggling triangles
            triangle(mouseX, mouseY, bits[bit + 1][0]/3, bits[bit + 1][1]/3, bits[bit + 2][0], bits[bit + 2][1]);
            float newx = random(10) > 5 ? -random(100) : random(100);
            float newy = random(10) > 5 ? -random(100) : random(100);
            // add red lines
            stroke(255, 0, 0);
            line(mouseX, mouseY, mouseX + newx, mouseY + newy);

            // add the outer nucleus
            stroke(255, 100, 10);
            ellipse(mouseX, mouseY, bit, bit);
            bits[bit][0] += random(10) > 5 ? -5 : 5;
            bits[bit][1] += random(10) > 5 ? -5 : 5;
        }
    }
    for(int i = 0;  i < 5; i++) {
        // add the inner nucleus
        fill(riff);
        stroke(0, 0);
        ellipse(mouseX + cos(i) * random(30), mouseY + sin(i) * random(30), 10, 10);
        textSize(i * 10);
    }
    fill(0, 10);
}

void recursocity(max, times) {
    // recursively add some boxes
    if(times > 0) {
        fill(0, 10);
        stroke(100, 100, 10);
        pushMatrix();
        for(int i = 0;  i < max; i++) {
            translate(mouseX, mouseY);
            rotate(360 / i);
            rect(mouseX, mouseY, max, max);
        }
        popMatrix();
        recursocity(max / 2, times - 1);
    }
}

void cycleTwo() {
    recursocity(100, 5);
}

void leafy(max, times) {
    fill(random(255), random(255), random(255));
    if(times > 0) {
        pushMatrix();
        translate(mouseX + max, mouseY + max);
        rotate(max);
        ellipse(mouseX + max, mouseY + max, random(max), random(max));
        ellipse(mouseX - max, mouseY - max, random(max), random(max));
        popMatrix();
        leafy(max / 2, times - 1);
    }
}

void cycleThree() {
    leafy(100, 5);
}

void cycleFour() {
    fill(mouseX / 10, mouseY / 10, random(255));
    for(int i = 0; i < 10; i++) {
        pushMatrix();
        translate(mouseX, mouseY);
        rotate(i);
        triangle(mouseX, mouseY, width / 2, height / 2, mouseX + 100, mouseY + 100);
        popMatrix();
    }
}

void cycleFive() {
    // some experimental color interpolation
    color from = color(interp, mouseX / 20, mouseY / 20);
    color to = color(interp, mouseX / 10, mouseY / 10);
    color interA = lerpColor(from, to, 0.25);
    color interB = lerpColor(from, to, 0.55);
    color interC = lerpColor(from, to, 0.80);

    fill(from);
    rect(mouseX, 0, 10, height);

    fill(interA);
    rect(mouseX + 10, 0, 10, height);

    fill(interB);
    rect(mouseX + 10, 0, 10, height);

    fill(interC);
    rect(mouseX + 10, 0, 10, height);

    fill(to);
    rect(mouseX + 10, 0, 10, height);

    if(interp > 255) {
        interp = 0;
    }
    interp += 1;
}

void cycleSix() {
    translate(width / 2, height / 2);
    pushMatrix();
    // create spirograph-esque squares based on arc tangent of the iterator
    // position + mouse coordinates
    for(int i = 0; i < 10; i++) {
        fill(0, i);
        float a = atan2(mouseX - i * 10, mouseY - i * 10);
        rotate(a);
        rect(mouseX / 2, mouseY / 2, i * 10, i * 10);
    }
    popMatrix();
}

void cycleSeven() {
    // reset increment
    if(inc > width || inc > height) {
        inc = random(width);
    }
    fill(0);
    pushMatrix();
    // add spiral pattern
    translate(width / 2, height / 2);
    // 6 gives a reasonable amount of density while
    // still maintaining the distinct spiral shape
    for(int i = 0;  i < 6; i++) {
        rotate(inc);
        fill(100, inc, inc);
        rect(i * 10, i + inc / 2, 5, 5);
        rect(i * 10, i / inc, 5, 5);
    }
    inc += 1;
    popMatrix();
}

void cycleEight() {
    // reset increment
    if(inc > 300) {
        inc = 0;
    }
    fill(0);
    background(255);
    float radius = inc;
    float sides = inc / 4;
    float arc = (Math.PI * 2) / sides;
    pushMatrix();
    translate(width / 2, height / 2);
    // draw network of lines around a circle, updated with mouse coords
    for (int i = 1; i < sides; i++) {
        stroke(0, i);
        rotate(i);
        ellipse(mouseX, mouseY, 5, 5);
        ellipse(radius * cos(arc * i), radius * sin(arc * i), 5, 5);
        line(radius * cos(arc * i), radius * sin(arc * i), mouseX, mouseY);
    }
    inc += 1;
    popMatrix();
}

void cycleNine() {
    if(incx > width / 2) {
        incx = 0;
    }
    if(incy > height / 2) {
        incy = 0;
    }
    int growth = 4;
    float mag = width / 4;
    float x = width / 2 + mag * cos(incx * 2);
    float y = height / 2 + mag / 1.3 * sin(incy * 2);
    fill(0, incx/10);
    int size = sqrt(incx);
    ellipse(x, y, size, size);
    incx += growth;
    incy += growth;
}

void cycleTen() {
    int color = random(255);
    int stroke_color = abs(255 - color);
    fill(color);
    stroke(stroke_color);
    if(rotated > 360) {
        rotated = 0;
    }
    if(total > 50) {
        total = 0;
    }
    pushMatrix();
    translate(random(width), random(height));
    for(int i = 0; i < total; i++) {
        rotate(rotated);
        rect(i, i, i/2, i/2);
        ellipse(i, i, i, i);
    }
    rotated +=1;
    total += 1;
    popMatrix();
}

void cycleEleven() {
    pushMatrix();
    translate(width / 2, height / 2);
    for(int i = 0; i < width; i+=100) {
        rotate(twirl);
        rect(0, i / 2, mouseX / 4, mouseY / 4);
        rect(0, i, mouseX / 10, mouseY / 10);
    }
    twirl += 1;
    popMatrix();
}
