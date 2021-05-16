import './style.css'
import * as THREE from 'three'
import ThreeHandler from './utils/handlers/threeHandler.js'

// Scene
const scene = new THREE.Scene()

// Canvas
var canvas = document.querySelector('canvas.webgl')

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(1, 0, 2)
scene.add(camera)

// Renderer
var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.5
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000);

// Three Handler
var handler = new ThreeHandler({
    scene: scene,
    canvas: canvas,
    renderer: renderer,
    camera: camera,
    enableGUI: true,
    enableStats: true,
    enableOrbitControls: true
})

const { sizes } = handler

// Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Objects
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
)
scene.add(cube)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(1, 3, 3)
scene.add(directionalLight)

console.log(handler.scene);
handler.onStartTick(() => {
})

handler.tick()