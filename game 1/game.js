// Images for buildings/ arrows
const kartinki = [arrowRight, arrowDownRight, arrowDown, arrowDownLeft, arrowLeft, arrowUpLeft, arrowUp, arrowUpRight, explosion1, building[3]];

// Dvumeren masiv (2d array)
let tipNaKletka;
let w, h, squareW, squareH;
let itemKartinki = [bird, bee, cherry];
let itemX, itemY, itemType, itemCount, dX, dY, timer;
let itemSize;
let itemSpeed;
let spawnerX = [],
    spawnerY = [];

// Zadavane na promenlivite
function init() {
    tipNaKletka = []; w = 6; h = 4; squareW = canvas.width / w; squareH = canvas.height / h;
    itemX = [];
    itemY = [];
    itemType = [];
    dX = [];
    dY = [];
    timer = [];
    itemCount = 0;
    itemSize = squareW / 3;
    itemSpeed = 2;

    // Create 2d array tipNaKletka
    // Suzdavame dvumerniq masiv tipNaKletka
    for (let i = 0; i < w; i++) {
        tipNaKletka[i] = [];
        for (let j = 0; j < h; j++) {
            tipNaKletka[i][j] = normalRandomInteger(0, 8);
        }
    }
}

let t = 0;
// Edin pyt na 10 milisecundi
function update() {
    t++;
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            // Nov item
            if (t % 40 == 0 && tipNaKletka[i][j] == 8) {
                syzdajItem((i + 0.5) * squareW - itemSize / 2, (j + 0.5) * squareH - itemSize / 2, 0);
            }
            if (tipNaKletka[i][j] == 9) {
                let brResursi = 0;
                for (let h = 0; h < itemCount; h++) {
                    if (timer[h] <= 0 && itemType[h] == 0 && areColliding(itemX[h], itemY[h], itemSize, itemSize, i * squareW, j * squareH, squareW, squareH)) {
                        brResursi++;
                    }
                }
                if (brResursi >= 2) {
                    syzdajItem((i + 0.5) * squareW - itemSize / 2, (j + 0.5) * squareH - itemSize / 2, 1);
                    for (let h = 0; h < itemCount - 1 && brResursi > 0; h++) {
                        if (timer[h] <= 0 && itemType[h] == 0 && areColliding(itemX[h], itemY[h], itemSize, itemSize, i * squareW, j * squareH, squareW, squareH)) {
                            itemX[h] = NaN;
                            brResursi--;
                        }
                    }
                }
            }
            for (let h = 0; h < itemCount; h++) {
                if (timer[h] <= 0 && areColliding(itemX[h], itemY[h], itemSize, itemSize, i * squareW, j * squareH, squareW, squareH)) {
                    let squareDiag = Math.sqrt(squareH * squareH + squareW * squareW);

                    // Grozen copy-paste na dvijenieto na itemite
                    if (itemType[h] == 1 && tipNaKletka[i][j] == 9) {
                        dX[h] = itemSpeed;
                        dY[h] = 0;
                        timer[h] = squareW / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 0 || tipNaKletka[i][j] == 8) {
                        dX[h] = itemSpeed;
                        dY[h] = 0;
                        timer[h] = squareW / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 1) {
                        dX[h] = itemSpeed;
                        dY[h] = itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
                    }
                    if (tipNaKletka[i][j] == 2) {

                        dX[h] = 0;
                        dY[h] = itemSpeed;

                        timer[h] = squareH / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 3) {
                        dX[h] = -itemSpeed;
                        dY[h] = itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);

                    }
                    if (tipNaKletka[i][j] == 4) {
                        dX[h] = -itemSpeed;

                        dY[h] = 0;
                        timer[h] = squareW / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 5) {
                        dX[h] = -itemSpeed;
                        dY[h] = -itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
                    }
                    if (tipNaKletka[i][j] == 6) {
                        dX[h] = 0;
                        dY[h] = -itemSpeed;
                        timer[h] = squareH / itemSpeed;
                    }
                    if (tipNaKletka[i][j] == 7) {
                        dY[h] = -itemSpeed;
                        dX[h] = itemSpeed;
                        timer[h] = squareDiag / (Math.sqrt(2) * itemSpeed);
                    }
                }
            }
        }
    }
    for (let h = 0; h < itemCount; h++) {
        if (timer[h] <= 0) {
            dX[h] = 0;
            dY[h] = 0;
        } else {
            timer[h]--;
            itemX[h] += dX[h];
            itemY[h] += dY[h];
        }
    }
}

// Tova risuva neshta
function draw() {
    // Draw 2d table
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            drawImage(kartinki[tipNaKletka[i][j]], i * squareW, j * squareH, squareW, squareH);
        }
    }
    for (let h = 0; h < itemCount; h++) {
        drawImage(itemKartinki[itemType[h]], itemX[h], itemY[h], itemSize, itemSize);
    }
}

// kogato natisnesh mishkata
function mouseup() {
    // Reda i kolonata, na koito e kliknato
    // Row, column that has been clicked
    let kliknatKol = Math.floor(mouseX / squareW);
    let kliknatRed = Math.floor(mouseY / squareH);
    console.log(kliknatKol, kliknatRed)

    // Dali sme kliknali vurhu strelka
    // Check if the clicked cell contains an arrow
    if (tipNaKletka[kliknatKol][kliknatRed] < 8) {
        // 0 -> 1 -> 2 -> 3 .... -> 6 -> 7 -> 0 -> 1 -> 2 -> 3 -> 4 -> .... -> 6 -> 7 -> 0 -> ....
        tipNaKletka[kliknatKol][kliknatRed] = (tipNaKletka[kliknatKol][kliknatRed] + 1) % 8;
    }
}

// Kogato se natisne klavish
function keyup(key) {
    let kliknatKol = Math.floor(mouseX / squareW);
    let kliknatRed = Math.floor(mouseY / squareH);
    if (key == 32) {
        tipNaKletka[kliknatKol][kliknatRed] = 8;
    }
    if (key == 66) {
        tipNaKletka[kliknatKol][kliknatRed] = 9;
    }
}

// Syzdava nov Item
function syzdajItem(x, y, itemTipe) {
    itemX[itemCount] = x;
    itemY[itemCount] = y;
    dX[itemCount] = 0;
    dY[itemCount] = 0;
    timer[itemCount] = 0;
    itemType[itemCount] = itemTipe;
    itemCount++;
}