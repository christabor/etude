int bg_stars = [0];
int asteroids = [0];
float growth = 50;
color asteroid_color = color(200, 50, 20);
boolean DEBUG = false;

void setup() {
    if(DEBUG) {
        frameRate(1);
        size(screen.width / 1.5, screen.height / 1.5);
    } else {
        smooth();
        size(screen.width, screen.height);
    }
    background(0);
    seedStars();
    seedAsteroids();
}

void seedStars() {
    int max_size = 6;
    // add some initial star bg data
    for(int i = 0; i < 150; i++) {
        fill(random(100) + 1);
        int size = random(max_size);
        bg_stars[i] = [random(width), random(height), size];
    }
}

void seedAsteroids() {
    fill(asteroid_color);
    // add the fg asteroids
    for(int i = 0; i < 10; i++) {
        int rast = randomAsteroid();
        ellipse(rast[1], rast[2], rast[0], rast[0]);
    }
}

void drawStars() {
    int len = bg_stars.length;
    // draw the stars out
    for(int i = 0; i < len; i++) {
        // twinkle by randomizing same color
        fill(random(100));
        if(random(10) > 9) {
            bg_stars[i][1] += 1;
        }
        ellipse(bg_stars[i][0], bg_stars[i][1], bg_stars[i][2], bg_stars[i][2]);
    }
}

void randomAsteroid() {
    int max_asteroid = 60;
    int size = constrain(random(max_asteroid), 30, max_asteroid);
    int x = random(width);
    int y = random(height);
    int id = random(9999);
    int rast = [size, x, y, id];
    append(asteroids, rast);
    return rast;
}

void mousePressed() {
    int rast = randomAsteroid()
    ellipse(rast[0], rast[1], rast[2], rast[2]);
}

void moveAsteroids() {
    // copy to temp
    fill(asteroid_color);
    int temp = [0];
    int len = asteroids.length;
    for(int i = 0; i < len; i++) {
        asteroids[i][1] += growth + random(6);
        asteroids[i][2] += growth + random(6);
        for(int j = 0; j < len; j++) {
            float diff2 = dist(asteroids[i][1], asteroids[i][2], asteroids[j][1], asteroids[j][2]);
            // check for collisions, but not for the same id
            if(diff2 < asteroids[i][0] * 4 && asteroids[i][3] !== asteroids[j][3]) {
                stroke(255, 100);
                line(asteroids[i][1], asteroids[i][2], asteroids[j][1], asteroids[j][2]);
            }
        }
        // check if mouse is nearby, and run away
        float diff = dist(asteroids[i][1], asteroids[i][2], mouseX, mouseY);
        if(diff <= asteroids[i][0]) {
            asteroids[i][1] -= diff / 2;
            asteroids[i][2] -= diff / 4;
        }
        // wrap around edges
        if(asteroids[i][1] > width) {
            asteroids[i][1] = 0;
        }
        if(asteroids[i][2] > height) {
            asteroids[i][2] = 0;
        }
        int size = asteroids[i][0];
        // redraw on screen
        stroke(0);
        ellipse(asteroids[i][1], asteroids[i][2], size, size);
    }
    growth = growth / 1.2;
}

void draw() {
    background(0);
    drawStars();
    moveAsteroids();
}
