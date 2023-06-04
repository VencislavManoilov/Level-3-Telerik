let something1 = randomInteger(69, 125), something2 = randomInteger(75, 150), something3 = randomInteger(7, 35), color = [], y = [], size = 5, isShowing = [], tankX = 0, tankAngle = 0, minY = [], orydieAngle = 0;

for(let i = 0; i < windowSizeX/size; i++) {
    y[i] = windowSizeY - windowSizeY / 3 + Math.sin(i / something1 * 2) * something2 + Math.cos(something3 * 4 * i / 1000) * 15;
    color[i] = [];
    isShowing[i] = [];

    for(let j = 0; j < windowSizeY - y[i]; j++) {
        isShowing[i][j] = true;
        color[i][j] = "hsl(" + (-j * 5 + 500) * 0.2 + ", 100%, 50%)";
    }
}

function update() {
    if(Input.GetKey(KeyCode.D)) {
        tankX += 2;
    } if(Input.GetKey(KeyCode.A)) {
        tankX -= 2;
    }

    // if(Input.GetKey(KeyCode.Q)) {
    //     orydieAngle -= 2;
    // } if(Input.GetKey(KeyCode.E)) {
    //     orydieAngle += 2;
    // }

    orydieAngle = angleFromTwoPoints(tankX * size, mouseX, y[tankX] - 40, mouseY);

    tankAngle = angleFromTwoPoints(tankX * size, tankX * size + 100, y[tankX], y[tankX + Math.floor(100/size)]);

    if(tankX < 2) {
        tankX = 2;
    } if(tankX > Math.floor(windowSizeX/size - 102/size)) {
        tankX = Math.floor(windowSizeX/size - 102/size);
    }

    BlowIt(mouseX, mouseY, 50);
}

function draw() {
    for(let i = 0; i < windowSizeX/size; i++) {
        for(let j = 0; j < windowSizeY/size - y[i]/size; j++) {
            if(isShowing[i][j]) {
                if(j == 0) {
                    fillRect(i * size, y[i] + j * size, size, size, "black");
                } else {
                    fillRect(i * size, y[i] + j * size, size, size + 2, color[i][j]);
                }
            }
        }
    }

    drawImage(tank, tankX * size, y[tankX] - 40, 100, 50, tankAngle);
    drawImage(tank, tankX * size, y[tankX] - 40, 100, 20, orydieAngle);

    UpdateParticles();
}

function mousedown() {
    BlowIt(mouseX, mouseY, 50);
}

function BlowIt(x1, y1, radius) {
    for(let i = 0; i < windowSizeX/size; i++) {
        for(let j = 0; j < windowSizeY/size - y[i]/size; j++) {
            if(distance(i * size, y[i] + j * size, x1, y1) < radius) {
                isShowing[i][j] = false;
            }
        }
    }
}

function angleFromTwoPoints(x1, x2, y1, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}