import * as THREE from 'three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('canvas.myScene')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
document.body.appendChild(renderer.domElement);
renderer.setSize(sizes.width, sizes.height);


// update canvas size
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// create objects
const geometry = new THREE.BoxGeometry(2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x += 0.5;
scene.add(cube);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();