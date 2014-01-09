/* boilerplate */
var dims;
var scene;
var SCENE_FOV_MIN;
var SCENE_FOV_MAX;
var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var camera;
var renderer;
var shader;
var geometry;
var material;
var controls;

/* non-standard */
var rgbShader;
var dir_light;
var dotScreenEffect;
var hemi_light;
var material_shiny;
var icosa_geometry;
var icosa;
var meshes;


function animateComposers() {
    rgbShader.uniforms.angle.value = rando(100);

    // defer rendering to
    // composer instead of renderer
    composer.render(0.1);
}

function animate() {
    // event loop
    requestAnimationFrame(animate);

    // rotate objects
    for(var mesh in meshes) {
        meshes[mesh].rotation.y += 0.1;
    }
    controls.update();
    animateComposers();
}

function addLights() {
    scene.add(new THREE.PointLight(0x0d244d));
    scene.add(new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.8));
    scene.add(new THREE.PointLight(randomColorHex(true)));
}

function addShaders() {
    // add custom shaders
    rgbShader = THREE.RGBShiftShader;
    rgbShader = new THREE.ShaderPass(rgbShader);
    rgbShader.renderToScreen = true;

    // use composer to add shader passes
    composer.addPass(new THREE.RenderPass(scene, camera));
    composer.addPass(rgbShader);
}

function addMeshes() {
    icosa_geometry = new THREE.IcosahedronGeometry(rando(400));
    for(var i = 0; i <= 100; i++) {
        material_shiny   = new THREE.MeshPhongMaterial({
            ambient: 0xFFFFFF,
            color: 0xFFFFFF,
            specular: 0xFFFFFF,
            shininess: 10,
            wireframe: (rando(10) > 5 ? true : false),
            shading: THREE.FlatShading
        });
        meshes[i] = new THREE.Mesh(icosa_geometry, material_shiny);
        meshes[i].position.set(rando(SCENE_FOV_MAX / 2), rando(SCENE_FOV_MAX / 2), rando(SCENE_FOV_MAX / 2));
        scene.add(meshes[i]);
    }
}

function setupDefaults() {
    dims            = getViewportDimensions();
    scene           = new THREE.Scene();
    SCENE_FOV_MIN   = 1;
    SCENE_FOV_MAX   = 10000;
    SCREEN_WIDTH    = dims.width;
    SCREEN_HEIGHT   = dims.height;
    renderer        = new THREE.WebGLRenderer();
    camera          = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, SCENE_FOV_MIN, SCENE_FOV_MAX);
    renderer        = new THREE.WebGLRenderer();
    controls        = new THREE.OrbitControls(camera, renderer.domElement);
    composer        = new THREE.EffectComposer(renderer);
    scene.fog       = new THREE.Fog(0x000000, SCENE_FOV_MIN, SCENE_FOV_MAX - 100);
    meshes          = [];

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(renderer.domElement);

    camera.position.z = -100;
    camera.position.y = -100;
    camera.lookAt(scene.position);

    controls.userRotate = false;
    // controls.userPan = true;
    // controls.autoRotate = true;
}

function init() {
    setupDefaults();
    addLights();
    addMeshes();
    addShaders();
    animate();
}

window.onload = function() {
    init();
};
