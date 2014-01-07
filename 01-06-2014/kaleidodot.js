var dims;
var scene;
var SCENE_FOV_MIN;
var SCENE_FOV_MAX;
var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var camera;
var renderer;
var shader;
var parameters = {};
var shader;
var composer;
var dotScreenShader;
var dotScreenEffect;
var object;
var geometry;
var material;
var dir_light;
var controls;
var mesh;

function init() {
    dims            = getViewportDimensions();
    scene           = new THREE.Scene();
    SCENE_FOV_MIN   = 1;
    SCENE_FOV_MAX   = 1000;
    SCREEN_WIDTH    = dims.width;
    SCREEN_HEIGHT   = dims.height;
    camera          = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, SCENE_FOV_MIN, SCENE_FOV_MAX);
    renderer        = new THREE.WebGLRenderer();
    composer        = new THREE.EffectComposer(renderer);
    controls        = new THREE.OrbitControls(camera, renderer.domElement);

    // add custom shaders
    kaleidoShader   = THREE.KaleidoShader;
    dotScreenShader = THREE.DotScreenShader;
    kaleidoEffect   = new THREE.ShaderPass(kaleidoShader);
    dotScreenEffect = new THREE.ShaderPass(dotScreenShader);

    // set some new values
    kaleidoShader.uniforms.tDiffuse = rando(10);

    // use composer to add shader passes
    composer.addPass(new THREE.RenderPass(scene, camera));
    composer.addPass(kaleidoEffect);
    composer.addPass(dotScreenEffect);

    dotScreenEffect.renderToScreen = true;

    // first time init of WebGl business
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(renderer.domElement);

    // set some defaults
    camera.position.z = -200;
    camera.position.y = -220;
    camera.lookAt(scene.position);

    scene.fog = new THREE.Fog(0x000000, 1, 1000);
    dir_light = new THREE.DirectionalLight(0xffffff);
    object    = new THREE.Object3D();
    geometry  = new THREE.SphereGeometry(1, 2, 2);
    material  = new THREE.MeshPhongMaterial({
        ambient: 0xFFFFFF,
        color: 0xFFFFFF,
        specular: 0xFFFFFF,
        shininess: 4,
        shading: THREE.FlatShading
    });

    // setup light
    dir_light.position.set(1, 1, 1);
    scene.add(dir_light);
    scene.add(new THREE.AmbientLight(0x555555));

    for (var i = 0; i < 100; i ++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(rando(1) - 0.5, rando(1) - 0.5, rando(1) - 0.5).normalize();
        mesh.position.multiplyScalar(rando(400));
        mesh.rotation.set(rando(2), rando(2), rando(2));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
        object.add(mesh);
    }
    scene.add(object);
}

function animate() {
    // event loop
    requestAnimationFrame(animate);

    kaleidoShader.uniforms.tDiffuse = rando(10);
    kaleidoShader.uniforms.angle = rando(360);

    object.rotation.x += 0.005;
    object.rotation.y += 0.01;

    controls.update();

    // defer rendering to
    // composer instead of renderer
    composer.render();
}

window.onload = function() {
    init();
    animate();
};
