var camera;
var scene;
var renderer;
var geometry;
var WIDTH       = window.innerWidth;
var HEIGHT      = window.innerHeight;
var group;
var mouseX      = 0;
var mouseY      = 0;
var count       = 0;
var counter     = document.querySelector('#instructions span');
var windowHalfX = WIDTH / 2;
var windowHalfY = HEIGHT / 2;
var red_light   = new THREE.Light(0xFF0000, 0.5);
var material    = new THREE.MeshNormalMaterial();
var hemi_light  = new THREE.HemisphereLight(0xFF0000, 0xFFFFFF, 0.8);
var planet      = new THREE.MeshPhongMaterial({
    ambient: 0xFFFFFF,
    color: 0x4f4cef,
    specular: 0xFFFFFF,
    shininess: 5,
    map: THREE.ImageUtils.loadTexture('jupitermap.jpg'),
    shading: THREE.SmoothShading
});

function onClickEvent() {
    addMesh(3);
    return;
}

function addMesh(times) {
    for ( var i = 0; i < times; i ++ ) {
        setTimeout(function(){
            var pop_in;
            var geometry = new THREE.SphereGeometry(rando(200), 30, 30);

            // random material
            var mesh = new THREE.Mesh(geometry, (rando(10) > 4 ? planet : material));

            mesh.position.x = rando(2000) - 1000;
            mesh.position.y = rando(2000) - 1000;
            mesh.position.z = rando(2000) - 1000;

            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();

            // start tween with 'pop in effect'
            pop_in = new TWEEN.Tween({
                scale: 0
            })
            .to({
                scale: 100
            }, 1000)
            .onUpdate(function(){
                mesh.scale = this.scale;
            })
            .onComplete(function(){
            })
            .start();

            // add individual mesh to group
            group.add(mesh);

            // update live counter and html
            count++;
            counter.innerHTML = 'Total Count: ' + count;
        }, i * 100);
}
return;
}

function init() {
    // add to container
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // add environment stuff
    camera            = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
    camera.position.z = 500;
    scene             = new THREE.Scene();
    scene.fog         = new THREE.Fog(0xffffff, 1, 10000);
    group             = new THREE.Object3D();
    renderer          = new THREE.WebGLRenderer();

    // add some
    renderer.setClearColor(0xffffff);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.sortObjects = false;

    // set group options
    group.castShadow = true;
    group.receiveShadow = true;
    group.matrixWorldNeedsUpdate = true;

    // add to DOM
    container.appendChild(renderer.domElement);

    // initial seeding of 10 meshes
    addMesh(10);

    // and light and group
    scene.add(red_light);
    scene.add(hemi_light);
    scene.add(group);

    // add events for camera controls
    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('click', onClickEvent, false);
    document.addEventListener('resize', onWindowResize, false);
    return;
}

function onWindowResize() {
    windowHalfX   = WIDTH / 2;
    windowHalfY   = HEIGHT / 2;
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
    return;
}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;
    return;
}

function animate() {
    requestAnimationFrame( animate );
    render();
    return;
}

function render() {
    var time = Date.now() * 0.001;
    var rx   = Math.sin( time * 0.7 ) * 0.5;
    var ry   = Math.sin( time * 0.3 ) * 0.5;
    var rz   = Math.sin( time * 0.2 ) * 0.5;

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

    camera.lookAt(scene.position);
    group.rotation.set(rx, ry, rz);
    renderer.render(scene, camera);
    return;
}

init();
animate();
