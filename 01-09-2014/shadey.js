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
var dotScreenEffect;
var material_shiny;
var meshes;
var kaleidoEffect;
var kaleidoShader;
var tSizeVar = 0;

function animateShaders() {
    testShaderPass.uniforms.scale.value += Math.sin(testShaderPass.uniforms.scale.value) * 0.1;
    testShaderPass.uniforms.tSize.value = new THREE.Vector2(tSizeVar, tSizeVar);
    testShaderPass.uniforms.center.value = new THREE.Vector2(tSizeVar, tSizeVar);

    tSizeVar += 0.1;

    // defer rendering to
    // composer instead of renderer
    composer.render(0.1);
}

function renderCallback(elem, opts) {
    elem.position.x = opts.x;
    elem.position.z = opts.z;
    elem.rotation.x = opts.rotation_x;
    elem.rotation.z = opts.rotation_z;
}

function addTweens(elem) {
    var tween_opts = {
        x: elem.position.x,
        z: elem.position.z,
        rotation_z: elem.rotation.z,
        rotation_x: elem.rotation.x
    };
    tween = new TWEEN.Tween(tween_opts)
    .to({
        x: elem.position.x / 2,
        y: elem.position.z / 2,
        rotation_z: elem.rotation.y / 2,
        rotation_x: elem.rotation.z / 2
    }, 1000)
    .delay(100)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(function(){
        renderCallback(elem, tween_opts);
    });
    tweenBack = new TWEEN.Tween(tween_opts)
    .to({
        x: tween_opts.x,
        y: tween_opts.z,
        rotation_y: tween_opts.rotation_z,
        rotation_x: tween_opts.rotation_x
    }, 3000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(function(){
        renderCallback(elem, tween_opts);
    });

    tween.chain(tweenBack);
    tweenBack.chain(tween);
    tween.start();
}

function animate() {
    controls.update();
    animateShaders();
    TWEEN.update();
    requestAnimationFrame(animate);
}

function addLights() {
    var light = new THREE.HemisphereLight(0xFF0000, 0xFFFFFF, 0.8);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.HemisphereLight(0xFF0000, 0xFFFFFF, 0.4));
}

function addShaders() {
    // add custom shaders
    testShader = THREE.TestShader;
    testShaderPass = new THREE.ShaderPass(testShader);
    testShaderPass.renderToScreen = true;

    // add default render pass first
    composer.addPass(new THREE.RenderPass(scene, camera));

    // use composer to add shader passes
    composer.addPass(testShaderPass);
}

function addMeshes() {
    for(var i = 0; i <= 200; i++) {
        geometry = (rando(10) > 5 ? new THREE.TorusGeometry(rando(150) + 100) : new THREE.SphereGeometry(rando(50) + 50));
        material_shiny   = new THREE.MeshPhongMaterial({
            ambient: 0xFFFFFF,
            color: 0xFFFFFF,
            specular: 0xFFFFFF,
            shininess: 10,
            wireframe: (rando(10) > 5 ? true : false),
            shading: THREE.FlatShading
        });
        meshes[i] = new THREE.Mesh(geometry, material_shiny);
        meshes[i].castShadow = true;
        meshes[i].receiveShadow = true;
        meshes[i].position.set(rando(SCENE_FOV_MAX / 1.2), rando(SCENE_FOV_MAX / 1.5), rando(SCENE_FOV_MAX / 1.5));
        addTweens(meshes[i]);
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

    camera.position.z = -50;
    camera.position.y = -100;
    camera.position.x = -50;
    camera.lookAt(scene.position);
    controls.userRotate = false;
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
