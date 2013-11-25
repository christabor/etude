// boilerplate
var loader         = document.getElementById('loader');
var scene          = new THREE.Scene();
var ROTATION_SPEED = 0.01;
var SCENE_FOV_MIN  = 1;
var SCENE_FOV_MAX  = 10000;
var SCREEN_WIDTH   = window.innerWidth;
var SCREEN_HEIGHT  = window.innerHeight;
var camera         = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, SCENE_FOV_MIN, SCENE_FOV_MAX);
var renderer       = new THREE.WebGLRenderer();
var controls       = new THREE.OrbitControls(camera, renderer.domElement);
var tweens         = [];
var sphere_groups  = [];
var hemi_light     = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.8);
var shiny_material = new THREE.MeshPhongMaterial({
    ambient: 0xFFFFFF,
    color: 0xFFFFFF,
    specular: 0xFFFFFF,
    shininess: 4,
    map: THREE.ImageUtils.loadTexture('mtn.jpg'),
    // wireframe: true,
    shading: THREE.SmoothShading
});
var moon;
var moon_mesh;
var mtns = [];

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.body.appendChild(renderer.domElement);

function updateTween(){
    log('done animating a tween!');
    return;
}

function createTween(opts) {
    // create tweening classes
    tween_test = new TWEEN.Tween(opts.from)
    .to(opts.to, opts.duration || 1000)
    .easing(opts.easing)
    .onUpdate(opts.onupdate())
    .onComplete(opts.oncomplete());

    // start
    tween_test.start();
    return;
}

function addGroups() {
    moon           = new THREE.SphereGeometry(100, 100, 100);
    moon_mesh      = new THREE.Mesh(moon, shiny_material);

    scene.add(moon_mesh);
    moon_mesh.position.set(0, 1000, 0);

    // CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
    for(var i = 0; i <= 400; i++) {
        var geo = new THREE.CylinderGeometry(rando(10), rando(1000) + 100, rando(1000), 200);
        mtns[i] = new THREE.Mesh(geo, shiny_material);
        mtns[i].castShadow = true;
        scene.add(mtns[i]);

        // x, y, z
        mtns[i].position.set(rando(SCENE_FOV_MAX), 0, rando(SCENE_FOV_MAX));
    }
    return;
}

function animateAll() {
    moon_mesh.rotation.z += 0.01;
    return;
}

function renderLoopCallback() {
    animateAll();
    return;
}

function render() {
    // render loop that defers to
    // native method
    requestAnimationFrame(render);

    // update all tweens
    // -- needs to happen right after rAF, before render
    TWEEN.update();

    renderer.render(scene, camera);
    controls.update();

    // a secondary callback
    // encapsulated elsewhere
    renderLoopCallback();
    return;
}

function addLights() {
    scene.add(hemi_light);
    hemi_light.position.z = 500;
    // return;
}

function init() {
    addLights();

    // x, y, z
    camera.position.set(0, 400, 0);
    camera.updateProjectionMatrix();

    // add all objects to the stage
    addGroups();

    var tween_test = new TWEEN.Tween({
        pos: SCENE_FOV_MIN
    })
    .to({
        pos: SCENE_FOV_MAX - 100
    }, 20000)
    // .easing(TWEEN.Easing.Linear.In)
    .onUpdate(function(){
        camera.position.z = this.pos;
        camera.position.x = this.pos;
    })
    .onComplete(function(){
        log('done animating!');
    })
    .start();

    // loop render --
    // should always be last
    render();
    return;
}

init();
