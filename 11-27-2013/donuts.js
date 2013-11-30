// boilerplate
var scene            = new THREE.Scene();
var SCENE_HEIGHT     = window.innerHeight;
var SCENE_WIDTH      = window.innerWidth;
var camera           = new THREE.PerspectiveCamera(45, SCENE_WIDTH / SCENE_HEIGHT, 0.1, 10000);
var renderer         = new THREE.WebGLRenderer();
var hemi_light       = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.6);

// base object for all donut materials
var donut_cover_base = {
    ambient: 0xff84a0,
    color: 0xFFFFFF,
    specular: 0xFFFFFF,
    shininess: 12,
    shading: THREE.SmoothShading
};

// set up all donut types,
// inherit from the same material options
var donuts = {
    dot_cover: new THREE.MeshPhongMaterial(donut_cover_base),
    sprinkled_cover: new THREE.MeshPhongMaterial(donut_cover_base),
    pink_cover: new THREE.MeshPhongMaterial(donut_cover_base),
    chocolate_cover: new THREE.MeshPhongMaterial(donut_cover_base),
    white_cover: new THREE.MeshPhongMaterial(donut_cover_base),
    bacon_cover: new THREE.MeshPhongMaterial(donut_cover_base),
    glazed_cover: new THREE.MeshPhongMaterial(donut_cover_base)
};

// reassign proper donut textures
for(var texture in donuts) {
    donuts[texture].map = THREE.ImageUtils.loadTexture('img/' + texture + '.jpg');
}

// create donut geometries
// TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
var donut_shape = new THREE.TorusGeometry(100, 40, 20, 50);

// individual donut meshes
var donut_meshes = {
    donut_glazed: new THREE.Mesh(donut_shape, donuts.glazed_cover),
    donut_dot: new THREE.Mesh(donut_shape, donuts.dot_cover),
    donut_sprinkled: new THREE.Mesh(donut_shape, donuts.sprinkled_cover),
    donut_pink: new THREE.Mesh(donut_shape, donuts.pink_cover),
    donut_chocolate: new THREE.Mesh(donut_shape, donuts.chocolate_cover),
    donut_white: new THREE.Mesh(donut_shape, donuts.white_cover),
    donut_bacon: new THREE.Mesh(donut_shape, donuts.bacon_cover)
};

// add them fellas to the scene
addDonutSet();

renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);
document.body.appendChild(renderer.domElement);

camera.position.set(10, 0, 1000);
hemi_light.position.z = 200;

function addDonutSet() {
    for(var donut_mesh in donut_meshes) {
        donut_meshes[donut_mesh].position.set(rando(SCENE_WIDTH), rando(SCENE_HEIGHT / 4), rando(SCENE_HEIGHT / 2));
        scene.add(donut_meshes[donut_mesh]);
    }
    return;
}

function renderCallback() {
    for(var donut_mesh in donut_meshes) {
        donut_meshes[donut_mesh].rotation.z += 0.03;
        donut_meshes[donut_mesh].position.x += 4;
        if(donut_meshes[donut_mesh].position.x > SCENE_WIDTH) {
            donut_meshes[donut_mesh].position.x = -rando(SCENE_WIDTH);
        }
    }
    return;
}

function render() {
    // render loop that defers to
    // native method
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    // a secondary callback
    // encapsulated elsewhere
    renderCallback();
    return;
}

addLights();

function addLights() {
    scene.add(hemi_light);
    return;
}

render();
