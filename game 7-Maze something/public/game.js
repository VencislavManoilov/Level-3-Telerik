
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener("resize", ()=>{
    renderer.setSize( window.innerWidth, window.innerHeight );
});
document.body.appendChild( renderer.domElement );

let cubes = [], camx = 1.5;

let labirint = [
    [1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 0, 1, 1]
];

let material = new THREE.MeshPhongMaterial({color: "green"})

class Cube {
    constructor(x, y, z, sizeX, sizeY, sizeZ, rotationX, rotationY, rotationZ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeZ = sizeZ;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;

        this.geometry = new THREE.BoxGeometry(this.sizeX, this.sizeY, this.sizeZ);
        this.cube = new THREE.Mesh(this.geometry, material);

        scene.add(this.cube);

        this.cube.position.set(this.x, this.y, this.z);
        this.cube.rotation.set(this.rotationX, this.rotationY, this.rotationZ);
    }
}


for(let x = 0; x < labirint.length; x++) {
    for(let y = 0; y < labirint[x].length; y++) {
        if(labirint[x][y]) {
            cubes.push(new Cube(x, 0, y, 1, 1, 1, 0, 0, 0));
        }
    }
}

let pod = new THREE.Mesh(new THREE.BoxGeometry(10, 0.1, 10), new THREE.MeshPhongMaterial({color:"red"}));
pod.position.set(2, -0.5, 2);
scene.add(pod);

const l1 = new THREE.PointLight("white", 5)
l1.position.set(7, 8, 3)
scene.add(l1)
camera.position.set(camx, 3, 6)
camera.lookAt(1.5,0,0)
camera.up.set(0,0,1)

function update() {
    if(Input.GetKey(KeyCode.A)) {
        camera.position.set(camx++, 0, 0);
    }
}

function redraw() {
	requestAnimationFrame( redraw);
	renderer.render( scene, camera );
}

redraw();
setInterval(update, 10);