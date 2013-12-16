window.onload = function() {
    var INTERSECTED;
    var SELECTED;
    var container;
    var objects         = [];
    var projector       = new THREE.Projector();
    var mouse           = new THREE.Vector2();
    var offset          = new THREE.Vector3();
    var fov_start       = 1;
    var fov_end         = 10000;
    var camera          = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, fov_start, fov_end);
    var scene           = new THREE.Scene();
    var renderer        = new THREE.WebGLRenderer({
        antialias: true
    });
    var shader_lib      = THREE.ShaderLib['normalmap'];
    var displacement    = 25;
    var uniforms        = THREE.UniformsUtils.clone(shader_lib.uniforms);
    var parameters      = {
        fragmentShader: shader_lib.fragmentShader,
        vertexShader: shader_lib.vertexShader,
        uniforms: uniforms,
        lights: true,
        wireframe: false
    };
    var fog             = new THREE.Fog(0xbd20f4, 1, 5000);
    var shader          = new THREE.ShaderMaterial(parameters);
    var light           = new THREE.SpotLight(0xffffff, 0.8);
    var bumpmap         = new THREE.ImageUtils.loadTexture('img/bark.jpg');
    var controls        = new THREE.OrbitControls(camera, renderer.domElement);
    var green_light     = new THREE.PointLight(0x39f400, 1, 2000);
    var red_light       = new THREE.PointLight(0xff0000, 1, 2000);
    var blue_light      = new THREE.PointLight(0x00ef1e, 1, 2000);
    var skybox_dim      = 2000;
    var skybox_geometry = new THREE.SphereGeometry(skybox_dim, 20, 20);
    var skybox_material = new THREE.MeshBasicMaterial({
        color: 0x510693,
        map: THREE.ImageUtils.loadTexture('img/space.jpg'),
        side: THREE.BackSide
    });
    var skybox          = new THREE.Mesh(skybox_geometry, skybox_material);


    function guiControls() {
        // create object for dat.gui reference
        this.camera_z      = 0;
        this.camera_x      = 0;
        this.camera_y      = 0;
        this.map_light     = '#ffffff';
        this.use_wireframe = false;
        this.blocks        = 10;
        this.displacement  = 20;
        return;
    }

    function initGuiControls(){
        // create controls for each reference to demControls
        var gui = new dat.GUI();
        var controls = new guiControls();
        var last_blocks_delta = 0;

        var update_map_light = gui.addColor(controls, 'map_light').listen();
        var update_block_amount = gui.add(controls, 'blocks',  5, 400);
        var update_displacement = gui.add(controls, 'displacement', 5, 100);
        var update_camera_z = gui.add(controls, 'camera_z', camera.position.z, 4000);
        var update_camera_x = gui.add(controls, 'camera_x', camera.position.x, 4000);
        var update_camera_y = gui.add(controls, 'camera_y', camera.position.y, 4000);

        // add individual toggles
        update_map_light.onChange(function(value) {
            light.color.setHex('0x' + value.replace('#', ''));
            return;
        });
        update_block_amount.onChange(function(value) {
            addBlock();
            return;
        });
        update_camera_y.onChange(function(value) {
            camera.position.y = value;
            return;
        });
        update_camera_x.onChange(function(value) {
            camera.position.x = value;
            return;
        });
        update_camera_z.onChange(function(value) {
            camera.position.z = value;
            return;
        });
        update_displacement.onChange(function(value){
            for(var i = 0, len = objects.length; i <= len; i++) {
                uniforms['uDisplacementScale'].value = value;
            }
            return;
        });
        return;
    }

    function removeBlock() {
        scene.remove(objects[0]);
        objects.unshift();
        return;
    }

    function addBlock() {
        var phong_material = new THREE.MeshPhongMaterial({
            bumpMap: bumpmap,
            color: Math.random() * 0xffffff
        });
        var radius = rando(40);
        var geometry  = new THREE.SphereGeometry(radius, 20, 20);
        var object;

        // determine whether or not
        // to use displacement map or standard texture
        if(rando(10) > 5) {

            // standard sphere
            object = new THREE.Mesh(geometry, phong_material);
        } else {

        // spiky object
        object = new THREE.Mesh(geometry, shader);
        uniforms['enableDisplacement'].value = true;
        uniforms['enableDiffuse'].value      = true;
        uniforms['tDisplacement'].value      = bumpmap;
        uniforms['tDiffuse'].value           = bumpmap;
        uniforms['uDisplacementScale'].value = displacement;
        geometry.computeTangents();
    }

    object.material.ambient = object.material.color;
    object.position.x       = Math.random() * 1500 - 500;
    object.position.y       = Math.random() * 600 - 300;
    object.position.z       = Math.random() * 800 - 400;
    object.castShadow       = true;
    object.receiveShadow    = true;

    scene.add(object);
    objects.push(object);
    return;
}

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    controls.userRotate = false;
    controls.userPan = true;
    controls.autoRotate = true;

    camera.position.z = 1000;

    light.position.set(0, 500, 2000);
    light.castShadow = true;

    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;

    light.shadowBias = -0.00022;
    light.shadowDarkness = 0.5;

    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    green_light.position.set(60, 60, 60);
    red_light.position.set(50, 50, 50);
    blue_light.position.set(-50, -50, -50);

    scene.add(green_light);
    scene.add(blue_light);
    scene.add(red_light);
    scene.add(light);
    scene.add(skybox);

    scene.fog = fog;

    initGuiControls();

    for(var i = 0; i < 50; i++) {
        addBlock();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement);

    // tween around first time
    var tween_length = 5000;
    var tween_delay = 500;
    var tweenie = new TWEEN.Tween({
        pos: camera.position.z
    })
    .to({
        pos: fov_start
    }, tween_length)
    .onUpdate(function(){
        camera.position.z = this.pos;
    })
    .delay(tween_delay)
    .start();

    // tween up and over
    tweenie = new TWEEN.Tween({
        pos: camera.position.y
    })
    .to({
        pos: camera.position.y - 500
    }, tween_length)
    .onUpdate(function(){
        camera.position.y = this.pos;
    })
    .delay(tween_length * 2 + tween_delay)
    .start();
    return;
}

function moveObjs() {
    for(var i = 0; i <= objects.length - 1; i++) {
        objects[i].rotation.x += 0.01;
        objects[i].position.x += 0.1;
        objects[i].position.y += 0.2;
    }
    return;
}

function animateLights() {

    // only delay only some of the time
    // (lower delta to 10 means less frequent)
    if(rando(10) > 8) {
        light.color.setHex(randomColorHex(true));
        skybox_material.color.setHex(randomColorHex(true));
    }
    return;
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    moveObjs();
    animateLights();
    render();
    return;
}

function render() {
    controls.update();
    renderer.render(scene, camera);
    return;
}

init();
animate();

};
