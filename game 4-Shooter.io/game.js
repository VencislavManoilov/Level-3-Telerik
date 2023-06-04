let zombies = [];

let player = {
    x: windowSizeX/2,
    y: windowSizeY/2,
    r: 25,
    speed: 4
}

class Zombie {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.timeSpend = randomInteger(0, 99);
        this.pathX = [];
        this.pathY = [];
        this.distToGoCrazy = 150;
    }

    update() {
        this.timeSpend++;
        this.pathX.push(this.x);
        this.pathY.push(this.y);

        if(distance(this.x, this.y, player.x, player.y) < this.distToGoCrazy) {
            this.x += Math.cos(player.x + getAngleFromTwoPoints(player.x, player.y, this.x, this.y)) * this.speed;
            this.y += Math.sin(player.y + getAngleFromTwoPoints(player.x, player.y, this.x, this.y)) * this.speed;
            this.timeSpend = 0;
        } else {
            this.x += Math.cos(getAngleFromTwoPoints(player.x, player.y, this.x, this.y)) * this.speed + Math.sin(getAngleFromTwoPoints(player.x, player.y, this.x, this.y) + this.timeSpend / 10) * 2;
            this.y += Math.sin(getAngleFromTwoPoints(player.x, player.y, this.x, this.y)) * this.speed + Math.sin(getAngleFromTwoPoints(player.x, player.y, this.x, this.y) + this.timeSpend / 10) * 2;
        }
    }

    draw() {
        for(let i = 0; i < this.pathX.length; i++) {
            fillArc(this.pathX[i], this.pathY[i], 5, "black");
        }
        fillArc(this.x, this.y, this.r, "green");
        context.stroke();
    }
}

for(let i = 0; i < 2; i++) {
    // zombies.push(new Zombie(randomInteger(-500, windowSizeX - 25 + 500), randomInteger(-500, windowSizeY - 25 + 500), 25, randomOddInteger(1, 2)));
    zombies.push(new Zombie(randomInteger(0, windowSizeX - 25), randomInteger(0, windowSizeY - 25), 25, randomOddInteger(1, 2)));
}

function update() {
    player.x += Input.GetAxis("Horizontal") * player.speed;
    player.y += Input.GetAxis("Vertical") * player.speed;

    for(let i = 0; i < zombies.length; i++) {
        zombies[i].update();
    }
}

function draw() {
    context.lineWidth = 2;
    fillArc(player.x, player.y, player.r, "red");
    context.stroke();

    for(let i = 0; i < zombies.length; i++) {
        zombies[i].draw();
    }

    drawLine(player.x, player.y, player.x + Math.cos(getAngleFromTwoPoints(mouseX, mouseY, player.x, player.y)) * 50, player.y + Math.sin(getAngleFromTwoPoints(mouseX, mouseY, player.x, player.y)) * 50, 10, "black");
}

function getAngleFromTwoPoints(x1, y1, x2, y2) {
    return Math.atan2(y1-y2, x1-x2);
}