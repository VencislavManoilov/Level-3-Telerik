let time = 0, coordinates = [], mesh, friquensy = 25, mat, vertices, asdf = 500;

noise.seed(Math.random());

function init() {
    // Adjust camera
    camera.position.set(-5, 3, 10);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 1, 0);
    // camera = localStorage.camera;

    // Ambient light
    const l2 = new THREE.AmbientLight("white", 1);
    l2.rotation.set(180/Math.PI * 45, 180/Math.PI * 45, 180/Math.PI * 45);

    const geometry = new THREE.BufferGeometry();

    let coordinates = [];
    matSqr = [];
    for(let x = 0; x < 250; x++) {
        matSqr[x] = [];
        for(let y = 0; y < 250; y++) {
            coordinates.push(-1 + x*2);
            coordinates.push(noise.perlin2(x/friquensy, y/friquensy)*10 + noise.perlin3(x * 10, y * 10, 25) * 1000000);
            coordinates.push(-1 + y*2);
            coordinates.push(1 + x*2);
            coordinates.push(noise.perlin2((x + 1)/friquensy, y/friquensy)*10 + noise.perlin3(x * 10 + 1, y * 10, 25) * 1000000);
            coordinates.push(-1 + y*2);
            coordinates.push(1 + x*2);
            coordinates.push(noise.perlin2((x + 1)/friquensy, (y + 1)/friquensy + time/asdf)*10 + noise.perlin3(x * 10 + 1, y * 10 + 1, 25) * 1000000);
            coordinates.push(1 + y*2);
            coordinates.push(1 + x*2);
            coordinates.push(noise.perlin2((x + 1)/friquensy, (y + 1)/friquensy)*10 + noise.perlin3(x * 10 + 1, y * 10 + 1, 25) * 1000000);
            coordinates.push(1 + y*2);
            coordinates.push(-1 + x*2);
            coordinates.push(noise.perlin2(x/friquensy, (y + 1)/friquensy)*10 + noise.perlin3(x * 10, y * 10 + 1, 25) * 1000000);
            coordinates.push(1 + y*2);
            coordinates.push(-1 + x*2);
            coordinates.push(noise.perlin2(x/friquensy, y/friquensy)*10 + noise.perlin3(x * 10, y * 10, 25) * 1000000);
            coordinates.push(-1 + y*2);
        }
    }

    vertices = new Float32Array(coordinates);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    mat = new THREE.MeshBasicMaterial({color:'hsl(' + time + ', 100%, 50%)', wireframe: true});

    // const texture = new THREE.TextureLoader().load("public/images/water.jpg");
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 400, 400 );

    // mat = new THREE.MeshBasicMaterial({map: texture})
    mesh = new THREE.Mesh(geometry, mat);

    scene.add(mesh);

    // Add all objects to scene
    scene.add(l2);
}
function update() {
    // camera.position.set(-7, -7, 20);
    // scene.remove(mesh);
    // time++;

    // const geometry = new THREE.BufferGeometry();

    // let coordinates = [];
    // matSqr = [];
    // for(let x = 0; x < 250; x++) {
    //     matSqr[x] = [];
    //     for(let y = 0; y < 250; y++) {
    //         coordinates.push(-1 + x*2);
    //         coordinates.push(noise.perlin2(x/friquensy + time/asdf, y/friquensy + time/asdf)*10);
    //         coordinates.push(-1 + y*2);
    //         coordinates.push(1 + x*2);
    //         coordinates.push(noise.perlin2((x + 1)/friquensy + time/asdf, y/friquensy + time/asdf)*10);
    //         coordinates.push(-1 + y*2);
    //         coordinates.push(1 + x*2);
    //         coordinates.push(noise.perlin2((x + 1)/friquensy + time/asdf, (y + 1)/friquensy + time/asdf)*10);
    //         coordinates.push(1 + y*2);
    //         coordinates.push(1 + x*2);
    //         coordinates.push(noise.perlin2((x + 1)/friquensy + time/asdf, (y + 1)/friquensy + time/asdf)*10);
    //         coordinates.push(1 + y*2);
    //         coordinates.push(-1 + x*2);
    //         coordinates.push(noise.perlin2(x/friquensy + time/asdf, (y + 1)/friquensy + time/asdf)*10);
    //         coordinates.push(1 + y*2);
    //         coordinates.push(-1 + x*2);
    //         coordinates.push(noise.perlin2(x/friquensy + time/asdf, y/friquensy + time/asdf)*10);
    //         coordinates.push(-1 + y*2);
    //     }
    // }

    // vertices = new Float32Array(coordinates);
    // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // mat = new THREE.MeshBasicMaterial({color:'hsl(' + time + ', 100%, 50%)', wireframe: true});

    // // const texture = new THREE.TextureLoader().load("public/images/water.jpg");
    // // texture.wrapS = THREE.RepeatWrapping;
    // // texture.wrapT = THREE.RepeatWrapping;
    // // texture.repeat.set( 400, 400 );

    // // mat = new THREE.MeshBasicMaterial({map: texture})
    // mesh = new THREE.Mesh(geometry, mat);

    // scene.add(mesh);
}