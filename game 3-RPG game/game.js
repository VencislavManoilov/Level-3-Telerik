let items = [], inventoryX = 10, inventoryY = 6, showInventory = false, hoverX = -1, hoverY = -1, allItems = [], selectItem = 0, worldSizeX = 8000, worldSizeY = 6000, cameraX = worldSizeX/2 - windowSizeX/2, cameraY = worldSizeY/2 - windowSizeY/2;
let goToPlayer = [];

let player = {
    x: worldSizeX/2,
    y: worldSizeY/2,
    sizeX: 50,
    sizeY: 50
}

class Item {
    constructor(x, y, type, inInventory, inventoryX, inventoryY, description) {
        // type is index of items[]

        this.x = x;
        this.y = y;
        this.type = type;
        this.inInventory = inInventory;
        this.inventoryX = inventoryX;
        this.inventoryY = inventoryY;
        this.sizeX = 50;
        this.sizeY = 50;
        this.description = description;
    }

    draw() {
        if(!this.inInventory) {
            drawImage(items[this.type], this.x - cameraX, this.y - cameraY, this.sizeX, this.sizeY, 0);
        }
    }
}

for(let i = 0; i < 48; i++) {
    items[i] = gem[i];
}

for(let i = 0; i < 10; i++) {
    a = randomInteger(0, 47)
    allItems.push(new Item(randomInteger(cameraX, cameraX + windowSizeX), randomInteger(cameraY, cameraY + windowSizeY), a, false, 0, 0, 'Image' + items[a]));
}

allItems[0].inInventory = true;

function update() {
    let timesItCollides = 0;
    for(let x = 0; x < inventoryX; x++) {
        for(let y = 0; y < inventoryY; y++) {
            if(areColliding(mouseX, mouseY, 1, 1,  50 + x * 55, 200 + y * 55, 50, 50)) {
                hoverX = x;
                hoverY = y;
                timesItCollides++;
            }
        }
    }

    if(timesItCollides == 0) {
        hoverX = -1;
        hoverY = -1
    }

    if(Input.GetKey(KeyCode.W)) {
        player.y -= 3;
    }
    if(Input.GetKey(KeyCode.S)) {
        player.y += 3;
    }
    if(Input.GetKey(KeyCode.A)) {
        player.x -= 3;
    }
    if(Input.GetKey(KeyCode.D)) {
        player.x += 3;
    }

    cameraX = player.x - windowSizeX/2;
    cameraY = player.y - windowSizeY/2;

    for(let i = 0; i < allItems.length; i++) {
        if(!allItems[i].inInventory && areColliding(allItems[i].x - cameraX, allItems[i].y - cameraY, allItems[i].sizeX, allItems[i].sizeY,  player.x - cameraX, player.y - cameraY, player.sizeX, player.sizeY)) {
            let a = 0;
            for(let j = 0; j < goToPlayer.length; j++) {
                if(goToPlayer[j] == i) {
                    a++;
                }
            }

            if(a == 0) {
                goToPlayer.push(i);
            }
        }
    }

    for(let i = 0; i < goToPlayer.length; i++) {
        allItems[goToPlayer[i]].x += (player.x + player.sizeX/2 - allItems[goToPlayer[i]].x) / 10
        allItems[goToPlayer[i]].y += (player.y + player.sizeY/2 - allItems[goToPlayer[i]].y) / 10
        allItems[goToPlayer[i]].sizeX += (0 - allItems[goToPlayer[i]].sizeX) / 15
        allItems[goToPlayer[i]].sizeY += (0 - allItems[goToPlayer[i]].sizeY) / 15

        if(allItems[goToPlayer[i]].sizeX < 3) {
            for(let x = 0; x < inventoryX; x++) {
                for(let y = 0; y < inventoryY; y++) {
                    console.log(x, y);
                    for(let j = 0; j < allItems.length; j++) {
                        if(allItems[j].inInventory) {
                            if(allItems[j].inventoryX != x || allItems[j].inventoryY != y) {
                                console.log(goToPlayer[i], j);
                                allItems[goToPlayer[i]].inInventory = true;
                                allItems[goToPlayer[i]].inventoryX = x;
                                allItems[goToPlayer[i]].inventoryY = y;

                                goToPlayer.splice(i, 1);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
}

function draw() {
    drawImage(backDesert, -cameraX, -cameraY, worldSizeX, worldSizeY, 0);
    if(showInventory) {
        for(let i = 0; i < 48; i++) {
            drawImage(items[i], 25 + i * 30, 50, 25, 25, 0);
        }

        for(let x = 0; x < inventoryX; x++) {
            for(let y = 0; y < inventoryY; y++) {
                if(hoverX == x && hoverY == y) {
                    transparent(25);
                    fillRect(50 + x * 55, 200 + y * 55, 50, 50, 'grey');
                    transparent(100);
                }
                strokeRect(50 + x * 55, 200 + y * 55, 50, 50, 1, 'black');
            }
        }

        drawImage(arrowUp, 25 + selectItem * 30, 75, 25, 25, 0);

        for(let i = 0; i < allItems.length; i++) {
            if(allItems[i].inInventory) {
                drawImage(items[allItems[i].type], 50 + allItems[i].inventoryX * 55, 200 + allItems[i].inventoryY * 55, 50, 50);

                if(areColliding(50 + allItems[i].inventoryX * 55, 200 + allItems[i].inventoryY * 55, 50, 50,  mouseX, mouseY, 1, 1)) {
                    fillText(allItems[i].description, 50 + allItems[i].inventoryX * 55, 200 + allItems[i].inventoryY * 55, 25, "Arial", "white");
                }
            }
        }
    } else {
        for(let i = 0; i < allItems.length; i++) {
            allItems[i].draw();
        }

        drawImage(kufte, player.x - cameraX, player.y - cameraY, player.sizeX, player.sizeY, 0);
    }
}

function keydown(key) {
    if(KeyCode.ArrowLeft == key || KeyCode.A == key) {
        if(selectItem > 0) {
            selectItem--;
        }
    } if(KeyCode.ArrowRight == key || KeyCode.D == key) {
        if(selectItem < 47) {
            selectItem++;
        }
    }
}

function keyup(key) {
    if(KeyCode.E == key) {
        showInventory = !showInventory;
    }
}

function mouseup() {
    // if(hoverX != -1 && hoverY != -1) {
    //     for(let i = 0; i < allItems; i++) {
    //         if(allItems[i].)
    //     }
    // }
}