let isKeyPressed = new Array(256).fill(0), time = 0;

let obstacles = [];
class Obstacle {
    constructor(x, colona, sizeX, sizeY, sizeZ) {
        this.x = x;
        this.colona = colona;
        this.geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        this.material = new THREE.MeshPhongMaterial({color: "Red"});
    }

    init() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(this.x, -4 + this.colona*4, 0);
        scene.add(this.mesh);
    }
}

for(let i = 0; i < 100; i++) {
    obstacles.push(new Obstacle(i * 10, randomInteger(0, 2), 4, 4, 2));
}

function update() {
    if(time == 0) {
        for(let i = 0; i < obstacles.length; i++) {
            obstacles[i].init();
        }
    }
    time++;

    ground1.position.x -= 0.2;
    ground2.position.x -= 0.2;

    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].mesh.position.x -= 0.2;
    }
}

function keydown(key) {
    if(key == 65 && player.position.y != 4) {
        player.position.y += 4;
    }

    if(key == 68 && player.position.y != -4) {
        player.position.y -= 4;
    }
}

function keyup(key) {

}

window.addEventListener("keydown", function(e) {
    isKeyPressed[e.keyCode] = 1;
    if(isFunction(keydown)) {
        keydown(e.keyCode);
    }
});
window.addEventListener("keyup", function(e) {
    isKeyPressed[e.keyCode] = 0;
    if(isFunction(keyup)) {
        keyup(e.keyCode);
    }
});

function isFunction(f) {
    return typeof(f) == "function";
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}