let player, player_geometry, ground1, ground2;

function addGround(x, width) {
    // Player texture
    let ground_texture = new THREE.TextureLoader().load("./public/images/grass.jpg");
    ground_texture.wrapS = THREE.RepeatWrapping;
    ground_texture.wrapT = THREE.RepeatWrapping;
    ground_texture.repeat.set(20, 1);

    // Create player mesh
    let ground_material = new THREE.MeshPhongMaterial({color:"white", map: ground_texture});
    let ground_geometry = new THREE.BoxGeometry(width,12,2);
    let ground = new THREE.Mesh(ground_geometry, ground_material);

    ground.position.set(x, 0, -2);
    return ground;
}
function addLight() {
    // Point light
    const l1 = new THREE.AmbientLight("white", 1);
    l1.position.set(-1, -2, 4);

    scene.add(l1);
}
function addPlayer() {
    // Create player mesh
    let player_material = new THREE.MeshPhongMaterial({color:"blue"});
    let player_geometry = new THREE.BoxGeometry(2,2,2);
    player = new THREE.Mesh(player_geometry, player_material);

    player.position.set(9, 0, 0);
    scene.add(player);
}
function init() {
    renderer.setClearColor( "hotpink", 1);
    renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });

    camera.up.set(0, 0, 1);
    camera.position.set(0,0,4);
    camera.lookAt(7, 0, 0);
    addLight();
    addPlayer();
    ground1 = addGround(1000, 2000);
    ground2 = addGround(3000, 2000);
    scene.add(ground1, ground2);
}