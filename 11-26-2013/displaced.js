// declare all vars
var loader        = document.getElementById('loader');
var scene         = new THREE.Scene();
var SCENE_FOV_MIN = 1;
var SCENE_FOV_MAX = 1000;
var SCREEN_WIDTH  = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var camera        = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, SCENE_FOV_MIN, SCENE_FOV_MAX);
var renderer      = new THREE.WebGLRenderer();
var plane_texture = new THREE.ImageUtils.loadTexture('cat.jpg');
var shader        = THREE.ShaderLib['normalmap'];
var displacement  = 25;
var uniforms      = THREE.UniformsUtils.clone(shader.uniforms);
var parameters    = {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: uniforms,
    lights: true,
    wireframe: false
};
var shader        = new THREE.ShaderMaterial(parameters);
var geometry      = new THREE.PlaneGeometry(500, 281, 500, 281);
var plane         = new THREE.Mesh(geometry, shader);
var tween;


function init() {
    // first time init of WebGl business
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.body.appendChild(renderer.domElement);

    // set some defaults
    camera.position.z = -300;
    camera.position.y = -220;
    camera.lookAt(scene.position);

    // setup light
    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    // do the first time calculation
    calculateDisplacementMap();

    // make it easy to see the image by rotating to center canvas
    plane.rotation.y = Math.PI;
    scene.add(plane);
    return;
}

function calculateDisplacementMap() {
    // separete displacement map values into a
    // for isolated updates and computation
    uniforms['enableDisplacement'].value = true;
    uniforms['enableDiffuse'].value      = true;
    uniforms['tDisplacement'].value      = plane_texture;
    uniforms['tDiffuse'].value           = plane_texture;
    uniforms['uDisplacementScale'].value = displacement;
    geometry.computeTangents();
    return;
}

function animate() {
    // event loop
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    return;
}

function initDOMControls() {
    // init image picker, reload map on click
    var pics = $('#pics');
    pics.on('click', 'a', function(e){
        globalLoader.load('Loading image map...');
        e.preventDefault();

        // re-init image map with new texture since points
        // need to be recalculated
        var img = $(this).find('img').attr('src');
        plane_texture = new THREE.ImageUtils.loadTexture(img);
        calculateDisplacementMap();
        globalLoader.unload();
    });
    return;
}

function demControls() {
    // create object for dat.gui reference
    this.message       = 'Adjust Displacement';
    this.scale         = displacement;
    this.camera_z      = -200;
    this.camera_x      = -220;
    this.camera_y      = -220;
    this.rotation      = 0;
    this.autoplay      = false;
    this.map_light     = '#ffffff';
    this.wire_border   = 2;
    this.use_wireframe = false;
    return;
}

function initControls() {
    // create controls for each reference to demControls
    var gui  = new dat.GUI();
    var controls = new demControls();
    var autoplay_interval;

    // dat.gui controllers
    var camera_rot_slider;
    var camera_z_slider;
    var camera_y_slider;
    var camera_x_slider;
    var displacement_slider;
    var autoplay;
    var toggle_wireframe;
    var wireframe_border;
    var map_light;

    // add the controls object
    gui.add(controls, 'message');

    // add individual toggles
    toggle_wireframe = gui.add(controls, 'use_wireframe');
    toggle_wireframe.onChange(function(value) {
        shader.wireframe = value;
    });
    wireframe_border = gui.add(controls, 'wire_border', 1, 100);
    wireframe_border.onChange(function(value) {
        uniforms['uDisplacementScale'].value = value;
    });
    map_light = gui.addColor(controls, 'map_light');
    map_light.onChange(function(value) {
        ambientLight.color.setHex('0x' + value.replace('#', ''));
    });
    autoplay = gui.add(controls, 'autoplay');
    autoplay.onChange(function(is_autoplay) {
        if(is_autoplay) {
            autoplay_interval = setInterval(function(){
                uniforms['uDisplacementScale'].value = rando(200);
                return;
            }, 1000);
        } else {
            clearInterval(autoplay_interval);
        }
    });
    displacement_slider = gui.add(controls, 'scale', -200, 200);
    displacement_slider.onChange(function(value) {
        uniforms['uDisplacementScale'].value = value;
    });
    camera_z_slider = gui.add(controls, 'camera_z', -300, 100);
    camera_z_slider.onChange(function(value) {
        camera.position.z = value;
    });
    camera_y_slider = gui.add(controls, 'camera_y', -320, 200);
    camera_y_slider.onChange(function(value) {
        camera.position.y = value;
    });
    camera_x_slider = gui.add(controls, 'camera_x', -320, 200);
    camera_x_slider.onChange(function(value) {
        camera.position.x = value;
    });
    camera_rot_slider = gui.add(controls, 'rotation', -360, 360);
    camera_rot_slider.onChange(function(value) {
        camera.rotation.z = value * 0.001;
        camera.updateProjectionMatrix();
    });
    return;
}

window.onload = function() {
    // load all the first time on windowload
    globalLoader.load('Loading image map...');

    // init all controls
    initDOMControls();
    initControls();
    init();

    // trigger event loop
    requestAnimationFrame(animate);
    globalLoader.unload();
    return;
};
