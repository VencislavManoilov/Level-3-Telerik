let ground, maze_walls, maze_wall_material, box_geom, coins = [], coins_material, cylinder_geom, time = 0, viewX = 0, viewY = 0, x= -5, y = 10, z = 1, dz = 0, sprint = false ;
let sensitivity = 0.25, slx = 0, sly = 0, slz = 0;
let mouseX = 0, mouseY = 0;
let playerGeo, playerMat, playerMesh;
let isKeyPressed = new Array(256).fill(0);

const breathing = new Audio('public/sounds/loop.mp3');

// Ambient light
const l2 = new THREE.AmbientLight("white", 0.05);
// const l2 = new THREE.AmbientLight("white", 1);

const spotLight = new THREE.SpotLight(0xffffff, 1, 5);
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 256;
spotLight.shadow.mapSize.height = 256;

spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 200;
spotLight.shadow.camera.fov = 30;

function init() {
    renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });

   // Adjust camera
    camera.position.set(-5,10, 3);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 0, 1);

    // We will use the same geometry for all boxes
    // Meshes can be scaled to change size
    const box_geom = new THREE.BoxGeometry( 1, 1, 1 );
    cylinder_geom = new THREE.CylinderGeometry( 0.15, 0.15, 0.015, 24 );

    // Grass texture
    const grass_texture = new THREE.TextureLoader().load("./public/images/grass.jpg");
    grass_texture.wrapS = THREE.RepeatWrapping;
    grass_texture.wrapT = THREE.RepeatWrapping;
    grass_texture.repeat.set(300, 300);

    // Iron wall texture
    const iron_texture = new THREE.TextureLoader().load("./public/images/iron.jpg");
    iron_texture.wrapS = THREE.RepeatWrapping;
    iron_texture.wrapT = THREE.RepeatWrapping;
    iron_texture.repeat.set(1, 1);

    const grass_mat = new THREE.MeshPhongMaterial({ color: "white", map: grass_texture});
    coins_material = new THREE.MeshPhongMaterial({color: "yellow"});

    // Create ground
    ground = new THREE.Mesh(box_geom, grass_mat);
    ground.scale.set(1000, 1000, 1);

    // box =

    playingLevel = 0;
    maze = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],[1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1],[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1],[1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1],[1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0],[1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],[1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1],[1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1],[1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1],[1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],[1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1],[1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1],[0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1],[1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],[1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],[1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1],[1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    maze_walls = [];
    maze_wall_material = new THREE.MeshPhongMaterial({color: "white", map: iron_texture});
    for(let x = 0; x < maze.length; x++) {
        maze_walls[x] = [];
        for(let y = 0; y < maze[x].length; y++) {
            if (maze[x][y]) {
                maze_walls[x][y] = new THREE.Mesh(box_geom, maze_wall_material);
                // maze_walls[x][y].scale.set(1,1,2);
                maze_walls[x][y].position.set(x - maze.length / 2 + 0.5, y - maze.length / 2 + 0.5, 1);
                scene.add(maze_walls[x][y]);
            } else {
                a = Math.floor(Math.random() * 100);
                if(a < 25) {
                    coins.push(new THREE.Mesh(cylinder_geom, coins_material));
                    coins[coins.length - 1].position.set(x - maze.length / 2 + 0.5, y - maze.length / 2 + 0.5, 1);
                    scene.add(coins[coins.length - 1]);
                }
            }
        }
    }

    playerMat = new THREE.MeshPhongMaterial({color: "Green"});
    playerGeo = new THREE.BoxGeometry(1, 1, 1);
    playerMesh = new THREE.Mesh(playerGeo, playerMat);

    // Add all objects to scene
    scene.add(l2, spotLight, spotLight.target, ground, playerMesh);
    breathing.load();
}

function update() {
    breathing.play();
    time++;
    // controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    if(viewY > -1) {
        viewY = -1;
    } else if(viewY < -179) {
        viewY = -179;
    }

    // z = 15;

    let normalSpeed = 0.01, speed = normalSpeed;

    if(isKeyPressed[16]) {
        speed = 0.02;
        sprint = true;
    } else {
        sprint = false;
    }

    if(isKeyPressed[65]) {
        y -= speed * Math.sin(Math.PI/180 * (viewX + 90));
        x -= speed * Math.cos(Math.PI/180 * (viewX + 90));
    } if(isKeyPressed[68]) {
        y += speed * Math.sin(Math.PI/180 * (viewX + 90));
        x += speed * Math.cos(Math.PI/180 * (viewX + 90));
    }

    if(isKeyPressed[87]) {
        y -= speed * Math.sin(Math.PI/180 * viewX);
        x -= speed * Math.cos(Math.PI/180 * viewX);
    } if(isKeyPressed[83]) {
        y += speed * Math.sin(Math.PI/180 * viewX);
        x += speed * Math.cos(Math.PI/180 * viewX);
    }

    for(let i = 0; i < maze.length; i++) {
        for(let j = 0; j < maze[i].length; j++) {
            if(maze[i][j]) {
                while(areColliding(i, j, 1, 1,  x + 10.25, y + 10.25, 0.5, 0.5)) {
                    let angle = angleBetweenTwoPoints(x + 10.75, y + 10.75,  i + 0.5, j + 0.5);
                    x -= Math.cos(angle) * 0.01;
                    y -= Math.sin(angle) * 0.01;
                }
            }
        }
    }

    for(let i = 0; i < coins.length; i++) {
        if(areColliding(coins[i].position.x - 0.15, coins[i].position.y - 0.15, 0.3, 0.3,  x, y, 0.5, 0.5)) {
            scene.remove(coins[i]);
            coins.splice(i, 1);
            let coinSound = new Audio('public/sounds/coin.mp3');
            coinSound.play();
        }
    }

    playerMesh.position.set(x, y, z - 0.25 + 0.25 * 0.5);
    playerMesh.scale.set(0.5, 0.5, 0.75);
    camera.position.set(x, y, z);
    camera.up.set(0, 0, 1);
    let lookAtX = Math.cos(Math.PI/180 * viewX) * Math.sin(Math.PI/180 * viewY) + x, lookAtY = Math.sin(Math.PI/180 * viewX) * Math.sin(Math.PI/180 * viewY) + y, lookAtZ = Math.cos(Math.PI/180 * viewY) + z
    camera.lookAt(lookAtX, lookAtY, lookAtZ);
    // camera.rotation.set(Math.PI/180 * (90 + viewX), Math.PI/180 * (-90 + viewY), 0);

    for(let i = 0; i < coins.length; i++) {
        coins[i].rotation.set(0, 0, time/100 + i/10);
        coins[i].position.z = Math.sin((time + i*5) / 60)/10 + 0.8;
    }

    spotLight.penumbra = 0.33;
    spotLight.angle = Math.PI/180 * 35;

    let smooth = 10;
    slx += (lookAtX - slx) / smooth;
    sly += (lookAtY - sly) / smooth;
    slz += (lookAtZ - slz) / smooth;
    spotLight.target.position.set(slx, sly, slz);

    spotLight.position.set(x, y, z);

    z += dz;
    dz -= 0.0005;

    if(z < 1) {
        z = 1;
    }
}

function updateMousePosition(e) {
    let boundingRect = renderer.domElement.getBoundingClientRect();
    mouseX = e.pageX - boundingRect.x;
    mouseY = e.pageY - boundingRect.y;
    viewX -= e.movementX * sensitivity;
    viewY -= e.movementY * sensitivity;
}

window.addEventListener("mousemove", function(e) {
    updateMousePosition(e);
});

window.addEventListener("keydown", function(e) {
    isKeyPressed[e.keyCode] = 1;
    keydown(e.keyCode);
});

window.addEventListener("keyup", function(e) {
    isKeyPressed[e.keyCode] = 0;
});

function keydown(key) {
    if(key == 32 && z == 1) {
        dz = 0.02;
    }

    // console.log(key);
}

function areColliding(Ax, Ay, AsizeX, AsizeY, Bx, By, BsizeX, BsizeY) {
    if (Bx <= Ax + AsizeX) {
        if (Ax <= Bx + BsizeX) {
            if (By <= Ay + AsizeY) {
                if (Ay <= By + BsizeY) {
                    return 1;
                }
            }
        }
    }
    return 0;
}

function areCollidingCirclSquare(cX, cY, r, x, y, sizeX, sizeY) {
    return dist(cX, cY, x, y) < r || dist(cX, cY, x + sizeX, y) < r || dist(cX, cY, x, y + sizeY) < r || dist(cX, cY, x + sizeX, y + sizeY) < r
        ||areColliding(cX, cY, 1, 1, x, y - r, sizeX, sizeY + r * 2) ||areColliding(cX, cY, 1, 1, x - r, y, sizeX + r * 2, sizeY);
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(x1**2 + y2**2);
}

function angleBetweenTwoPoints(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}