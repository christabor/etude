var width                 = window.innerWidth;
var height                = window.innerHeight;
var renderer              = new THREE.WebGLRenderer();
var scene                 = new THREE.Scene();
var camera                = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
var material_base         = {
    ambient: 0xff84a0,
    color: 0xFFFFFF,
    specular: 0xFFFFFF,
    shininess: 20,
    map: THREE.ImageUtils.loadTexture('snow.jpg'),
    shading: THREE.SmoothShading
};
var controls              = new THREE.OrbitControls(camera, renderer.domElement);
var light                 = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.8);
var nose_material         = new THREE.MeshPhongMaterial(material_base);
var eye_material          = new THREE.MeshPhongMaterial(material_base);
var material              = new THREE.MeshPhongMaterial(material_base);
var snowball_small        = 40;
var snowman               = {
    geometries: {},
    meshes: {}
};
var skybox_geometry       = new THREE.CubeGeometry(10000, 10000, 10000);
var skybox_material       = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide
});
var skybox                = new THREE.Mesh(skybox_geometry, skybox_material);
var particles             = new THREE.Geometry();
var particle_texture      = new THREE.ImageUtils.loadTexture('snowflake.png');
var particle_material     = new THREE.ParticleBasicMaterial({
    map: particle_texture,
    transparent: true,
    opacity: 0.8,
    size: 30
});
var particle_system       = new THREE.ParticleSystem(particles, particle_material);
var max_particles         = 4000;
var particle_speed        = 0.1;


controls.autoRotate = true;
controls.autoRotateSpeed = 5;

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
camera.position.set(10, 0, 1000);

function initGeometries() {
    eye_material.color        = new THREE.Color(0x000000);
    nose_material.color       = new THREE.Color(0xff672b);
    snowman.geometries.nose   = new THREE.CylinderGeometry(5, 0, 40);
    snowman.geometries.eye    = new THREE.SphereGeometry(snowball_small / 10);
    snowman.geometries.head   = new THREE.SphereGeometry(snowball_small);
    snowman.geometries.middle = new THREE.SphereGeometry(snowball_small * 2);
    snowman.geometries.bottom = new THREE.SphereGeometry(snowball_small * 3);

    snowman.meshes.nose       = new THREE.Mesh(snowman.geometries.nose, nose_material);
    snowman.meshes.eye_l      = new THREE.Mesh(snowman.geometries.eye, eye_material);
    snowman.meshes.eye_r      = new THREE.Mesh(snowman.geometries.eye, eye_material);
    snowman.meshes.head       = new THREE.Mesh(snowman.geometries.head, material);
    snowman.meshes.middle     = new THREE.Mesh(snowman.geometries.middle, material);
    snowman.meshes.bottom     = new THREE.Mesh(snowman.geometries.bottom, material);
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

function init() {
    initGeometries();

    for(var mesh in snowman.meshes) {
        scene.add(snowman.meshes[mesh]);
    }
    scene.add(camera);
    scene.add(particle_system);
    scene.add(light);

    particle_system.position.set(-width, 0, 0);

    snowman.meshes.eye_l.position.set(35, snowball_small + 210, snowball_small / 2);
    snowman.meshes.eye_r.position.set(35, snowball_small + 210, -snowball_small / 2);
    snowman.meshes.nose.position.set(snowball_small + 13, snowball_small + 200, 0);
    snowman.meshes.nose.rotation.z = -30;
    snowman.meshes.head.position.set(0, snowball_small + 200, 0);
    snowman.meshes.middle.position.set(0, snowball_small + 100, 0);
    snowman.meshes.bottom.position.set(0, 0, 0);
    initParticles();
    return;
}

function renderLoop() {
    controls.update();
    particle_system.position.y -= particle_speed;
    particle_system.rotation.z -= particle_speed * 0.006;
    return;
}

function render() {
    renderLoop();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    return;
}

init();
render();
