let canvas; // Declare canvas globally

function setup() {
    canvas = createCanvas(1200, 600, WEBGL); // Create the canvas
    canvas.parent('p5-container'); // Attach it to the correct container
    angleMode(DEGREES);
}

function draw() {
    background(0);
    rotateX(60);
    noFill();
    stroke(255);

    for (let i = 0; i < 120; i++) {
        let r = map(sin(frameCount / 4), -1, 1, 100, 255);
        let g = map(i, 0, 200, 100, 255);
        let b = map(cos(frameCount), -1, 1, 255, 100);
        stroke(r, g, b);

        beginShape();
        for (let j = 0; j < 360; j += 90) {
            let rad = i * 8;
            let x = rad * cos(j);
            let y = rad * sin(j);
            let z = sin(frameCount * 2 + i * 10) * 50;
            vertex(x, y, z);
        }
        endShape(CLOSE);
    }
}
