let raztoqniq = [], steni = [], clicked = false, mousePosX, mousePosY, sizeX = 20, sizeY = 20;

let startX = Math.floor(sizeX/2), startY = Math.floor(sizeY/2);

for(let x = 0; x < sizeX; x++) {
    steni[x] = [];
    raztoqniq[x] = [];
    for(let y = 0; y < sizeY; y++) {
        steni[x][y] = 0;
        raztoqniq[x][y] = -1;

        if(x == 0 || x == sizeX - 1 || y == 0 || y == sizeY - 1) {
            steni[x][y] = 1;
        }
    }
}

reset();
bavnoBFC(0);
function update() {
    reset();
    bavnoBFC();

    if(clicked) {
        if(mouseX < (sizeX - 1) * 25 && mouseY < (sizeY - 1) * 25 && mouseX > 25 && mouseY > 25) {
            if(Input.GetKey(KeyCode.Space)) {
                steni[Math.floor(mouseX/25)][Math.floor(mouseY/25)] = 0;
            } else {
                steni[Math.floor(mouseX/25)][Math.floor(mouseY/25)] = 1;
            }
        }

    }
}

function draw() {
    mousePosX = Math.floor(mouseX/25);
    mousePosY = Math.floor(mouseY/25);
    goTo0();

    for(let x = 0; x < sizeX; x++) {
        for(let y = 0; y < sizeY; y++) {
            strokeRect(x * 25, y * 25, 25, 25, 1, "black");
            if(steni[x][y]) {
                fillRect(x * 25, y * 25, 25, 25, "black");
            } else if(raztoqniq[x][y] > -1) {
                fillText(raztoqniq[x][y], x * 25, y * 25, 15, "Arial", "black");
            }
        }
    }
}

function goTo0() {
    if(mousePosX > 0 && mousePosY > 0 && mousePosX < sizeX && mousePosY < sizeY) {
        if(!steni[mousePosX][mousePosY]) {
            let goX = mousePosX, goY = mousePosY;
            for(let y = 0; y < Math.floor(sizeX * 178/2); y++) {
                for(let i = -1; i <= 1; i++) {
                    for(let j = -1; j <= 1; j++) {
                        if(i == 0 && j == 0) {} else {
                            if(i == 0 || j == 0) {
                                if(!steni[goX + i][goY + j]) {
                                    if(raztoqniq[goX + i][goY + j] < raztoqniq[goX][goY]) {
                                        goX = goX + i;
                                        goY = goY + j;
                                        i = 100;
                                        j = 100;
                                    }
                                }
                            }
                        }
                    }
                }
                // console.log("step");
                fillRect(goX * 25, goY * 25, 25, 25, "red");
                if(startX == goX && startY == goY) {
                    y = 10000;
                }
            }
        }
    }
}

function bavnoBFC() {
    for(let lookingFor = 0; lookingFor < Math.floor(sizeX * 178/2); lookingFor++) {
        for(let x = 0; x < sizeX - 1; x++) {
            for(let y = 0; y < sizeY - 1; y++) {
                if(!steni[x][y]) {
                    if(x == startX && y == startY) {} else {
                        if(raztoqniq[x][y] < 0) {
                            for(let x2 = -1; x2 <= 1; x2++) {
                                for(let y2 = -1; y2 <= 1; y2++) {
                                    if(x2 == 0 || y2 == 0) {
                                        if(raztoqniq[x + x2][y + y2] == lookingFor) {
                                            raztoqniq[x][y] = lookingFor + 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // bavnoBFC(lookingFor + 1);
}

function reset() {
    for(let x = 0; x < sizeX; x++) {
        raztoqniq[x] = [];
        for(let y = 0; y < sizeY; y++) {
            raztoqniq[x][y] = -1;
        }
    }

    raztoqniq[startX][startY] = 0;
}

function mousedown() {
    clicked = true;
}

function mouseup() {
    clicked = false;
}