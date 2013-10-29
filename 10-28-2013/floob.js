var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(250, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function getKey(arr) {
    return Math.floor(Math.random() * arr.length);
}

var colors = [0xff0000, 0xccff00, 0x2abff6, 0xce11f7],
textures = ['cat1.jpg', 'cat2.jpg'];

function addGeometry(val) {
    var geometry = new THREE.CubeGeometry(val, val, val);
    var material = new THREE.MeshBasicMaterial({
        color: colors[getKey(colors)],
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.6,
        map: THREE.ImageUtils.loadTexture(textures[getKey(textures)])
    });
    var shape = new THREE.Mesh(geometry, material);
    shape.rotation.x = val / 2;
    shape.rotation.y = val / 2;
    scene.add(shape);
    setInterval(function(){
        shape.rotation.y += 0.1;
        shape.rotation.x += 0.1;
    }, 40);
    return;
}

function createCluster() {
    for(var i = 0; i <= 21; i++) {
        addGeometry(i);
    }
    return;
}

createCluster();

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set(50, 50, 50);
scene.add(light);

var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    camera.position.z += 0.01;
};

setTimeout(function(){
    $(window).on('mousemove', function(e){
        light.position.set(e.clienX, e.clientX, 50);
        camera.position.z = e.clientX * 0.1;
    });
}, 2000);

render();
