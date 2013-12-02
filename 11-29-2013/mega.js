var width             = window.innerWidth;
var height            = window.innerHeight;
var renderer          = new THREE.WebGLRenderer({
    antialias: true
});
var scene             = new THREE.Scene();
var camera            = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
var skybox_geometry   = new THREE.CubeGeometry(10000, 10000, 10000);
var skybox_material   = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide
});
var skybox            = new THREE.Mesh(skybox_geometry, skybox_material);
var particles         = new THREE.Geometry();
var particle_texture  = new THREE.ImageUtils.loadTexture('megaman.png');
var particle_material = new THREE.ParticleBasicMaterial({
    map: particle_texture,
    transparent: true,
    size: 20
});
var particle_system   = new THREE.ParticleSystem(particles, particle_material);
var max_particles     = 4000;
var particle_speed    = 0.1;


renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
camera.position.set(width / 2, width / 2, height / 2);


function init() {
    scene.add(skybox);
    scene.add(camera);
    scene.add(particle_system);
    return;
}

function generateParticle() {
    return new THREE.Vector3(rando(width), rando(width), rando(width));
}

function initParticles() {
    for(var i = 0; i < max_particles; i++) {
        particles.vertices.push(generateParticle());
    }
    return;
}

function renderLoop() {
    particle_material.size = rando(6) + 20;
    particle_system.position.z += particle_speed;
    particle_system.position.x += particle_speed;
    particle_system.rotation.z += particle_speed * 0.01;
    return;
}

function render() {
    renderLoop();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    return;
}

init();
initParticles();
render();
