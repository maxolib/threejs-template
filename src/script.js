"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var THREE = __importStar(require("three"));
var OrbitControls_js_1 = require("three/examples/jsm/controls/OrbitControls.js");
var dat = __importStar(require("dat.gui"));
var stats_js_1 = __importDefault(require("stats.js"));
/**
 * Stats
 */
var stats = new stats_js_1.default();
stats.showPanel(0);
document.body.appendChild(stats.dom);
/**
 * Base
 */
// Debug
var gui = new dat.GUI();
// Canvas
var canvas = document.querySelector('canvas.webgl');
// Scene
var scene = new THREE.Scene();
/**
 * Models
 */
var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({
    color: 0x0066ff
}));
gui.add(cube.material, 'wireframe');
scene.add(cube);
/**
 * Lights
 */
var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(1, 3, 3);
scene.add(directionalLight);
/**
 * Sizes
 */
var sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
window.addEventListener('resize', function () {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
/**
 * Camera
 */
// Base camera
var camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 0, 2);
scene.add(camera);
// Controls
var controls = new OrbitControls_js_1.OrbitControls(camera, canvas);
controls.enableDamping = true;
/**
 * Renderer
 */
var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/**
 * Animate
 */
var clock = new THREE.Clock();
var prevElapsed = 0;
var tick = function () {
    stats.begin();
    // Calculate time
    var elapsedTime = clock.getElapsedTime();
    var delta = elapsedTime - prevElapsed;
    prevElapsed = elapsedTime;
    // Update controls
    controls.update();
    // Render scene
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
    stats.end();
};
tick();
