import * as THREE from './three/build/three.module.js';
import { GUI } from './three/examples/jsm/libs/dat.gui.module.js';
import { HorizontalBlurShader } from './three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from './three/examples/jsm/shaders/VerticalBlurShader.js';

var scene, camera, canvas, renderer, sizes, container, gui, guiGeneral;
var cube;
var targetRotation = 0;
var targetRotationOnPointerDown = 0;
var pointerX = 0;
var pointerXOnPointerDown = 0;

var windowHalfX = window.innerWidth / 2;

const state = {
    shadow: {
        blur: 3.5,
        darkness: 1,
        opacity: 1,
    },
    plane: {
        color: '#ffffff',
        opacity: 1,
    },
    showWireframe: false,
};


createGUI();
init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    canvas = document.querySelector('canvas.myScene')
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });


    sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    document.body.appendChild(renderer.domElement);
    renderer.setSize(sizes.width, sizes.height);
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    // // add lighting
    // const pointLight1 = new THREE.PointLight(0xffffff);
    // pointLight1.position.set(500, 500, 500);
    // scene.add(pointLight1);

    // const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
    // pointLight2.position.set(- 500, - 500, - 500);
    // scene.add(pointLight2);

    // create objects
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x += 0.5;
    scene.add(cube);



    container = document.createElement('div');
    document.body.appendChild(container);
    container.style.touchAction = 'none';
    document.addEventListener('pointerdown', onPointerDown);

}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.y += (targetRotation - cube.rotation.y) * 0.01;

    renderer.render(scene, camera);
};

function createGUI() {
    gui = new GUI();
    guiGeneral = gui.addFolder('general');
    guiGeneral.open();
    guiGeneral.add({ target: targetRotation }, "target", -100, 100)
}

function onPointerDown(event) {

    if (event.isPrimary === false) return;

    pointerXOnPointerDown = event.clientX - windowHalfX;
    targetRotationOnPointerDown = targetRotation;

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

}

function onPointerMove(event) {

    if (event.isPrimary === false) return;

    pointerX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp() {

    if (event.isPrimary === false) return;

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
}
