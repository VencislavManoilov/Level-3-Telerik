let balls = [], a = randomInteger(-2500, 2500) / 1000, b = windowSizeY/2;

class Ball {
    constructor(x, y, blue, index) {
        this.x = x;
        this.y = y;
        this.blue = blue;
        this.index = index;
        this.predictedBLue = true;
    }

    draw() {
        if(this.blue) {
            fillArc(this.x, this.y, 12.5, "DodgerBlue");
        } else {
            fillArc(this.x, this.y, 12.5, "tomato");
        }

        if(this.predictedBLue) {
            fillArc(this.x, this.y, 5, "DodgerBlue");
        } else {
            fillArc(this.x, this.y, 5, "tomato");
        }
    }

    update() {
        // for(let i = 0; i < balls.length; i++) {
        //     if(i != this.index) {
        //         if(distance(this.x, this.y, balls[i].x, balls[i].y) < 25) {
        //             let angle = getAngleFrom2Points(this.x, this.y, balls[i].x, balls[i].y);
        //             this.x += Math.cos(angle);
        //             this.y += Math.sin(angle);

        //             balls[i].x -= Math.cos(angle);
        //             balls[i].y -= Math.sin(angle);
        //         }
        //     }
        // }

        let asdf = a * this.x + b;
        if(asdf > this.y) {
            this.predictedBLue = false;
        } else {
            this.predictedBLue = true;
        }
    }
}

let secondA = randomInteger(-100, 100) / 100, secondB = windowSizeY/2 + randomInteger(-windowSizeY/4, windowSizeY/4);
for(let i = 0; i < 500; i++) {
    balls.push(new Ball(randomInteger(12.5, windowSizeX - 12.5), randomInteger(12.5, windowSizeY - 12.5), false, i));

    let hello = secondA * balls[i].x + secondB;
    if(balls[i].y > hello) {
        balls[i].blue = true;
    } else {
        balls[i].blue = false
    }
}

function update() {
    for(let i = 0; i < balls.length; i++) {
        balls[i].update();
    }

    if(isKeyPressed[KeyCode.W]) {
        a -= 0.005;
    } if(isKeyPressed[KeyCode.S]) {
        a += 0.005;
    }

    if(isKeyPressed[KeyCode.ArrowDown]) {
        b += 5;
    } if(isKeyPressed[KeyCode.ArrowUp]) {
        b -= 5;
    }
}

function draw() {
    for(let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }

    drawLine(0, a * 0 + b, 5000, a * 5000 + b, 1, "black");

    let killyourself = 0;
    for(let i = 0; i < balls.length; i++) {
        let isItRight = a * balls[i].x + b;
        if(isItRight > balls[i].y && !balls[i].blue) {
            killyourself++;
        }

        if(isItRight < balls[i].y && balls[i].blue) {
            killyourself++;
        }
    }

    killyourself = balls.length - killyourself;

    fillText("ERROR: " + killyourself, 10, 10, 50, "Arial", "black");
}

function getAngleFrom2Points(x1, y1, x2, y2) {
    Math.atan2(y1 - y2, x1 - x2);
}