// boilerplate
var scene    = new THREE.Scene();
var camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create the primary phong
// material for shiny goodness
var material_shiny = new THREE.MeshPhongMaterial({
    ambient: 0xFFFFFF,
    color: 0xFFFFFF,
    specular: 0xFFFFFF,
    shininess: 10,
    // wireframe: true,
    shading: THREE.FlatShading
});

// create the meshes and geometries
var torus_1_geometry = new THREE.TorusGeometry(28, 2, 100, 100);
var torus_1          = new THREE.Mesh(torus_1_geometry, material_shiny);
var torus_2          = new THREE.Mesh(torus_1_geometry, material_shiny);
var torus_3          = new THREE.Mesh(torus_1_geometry, material_shiny);
var pointLight_blue  = new THREE.PointLight(0x0d244d);
var hemi_light       = new THREE.HemisphereLight(0x2E8AEC, 0xFFFFFF, 0.8);
var icosa_geometry   = new THREE.IcosahedronGeometry(10);
var icosa            = new THREE.Mesh(icosa_geometry, material_shiny);

// add them fellas to the scene
scene.add(torus_1);
scene.add(torus_2);
scene.add(torus_3);
scene.add(icosa);

camera.position.z = 30;
hemi_light.position.z = 100;

function renderCallback() {
    // rotate lights
    pointLight_blue.rotation.y += 0.1;
    pointLight_blue.rotation.z += 0.1;

    // rotate objects
    icosa.rotation.x += 0.01;
    icosa.rotation.y += 0.01;

    torus_1.rotation.x += 0.01;
    torus_2.rotation.y += 0.01;
    torus_3.rotation.z += 0.01;
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
    scene.add(pointLight_blue);
    scene.add(hemi_light);
    return;
}

render();
