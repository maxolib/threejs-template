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
var threeHandler_1 = __importDefault(require("./modules/threejs-utils/handlers/threeHandler"));
// Scene
var scene = new THREE.Scene();
// Canvas
var canvas = document.querySelector('canvas.webgl');
// Camera
var sizes = { width: window.innerWidth, height: window.innerHeight };
var camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 1, 2.5);
scene.add(camera);
// Renderer
var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Three Handler
var handler = new threeHandler_1.default({
    scene: scene,
    canvas: canvas,
    renderer: renderer,
    camera: camera,
    enableStats: false,
    enableOrbitControls: true,
    enableFullscreen: true,
    enableEffectComposer: true,
    enableResponsive: true,
});
// Objects
var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({
    color: 0xffffff
}));
scene.add(cube);
// Lights
var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(1, 3, 3);
scene.add(directionalLight);
console.log(handler.scene);
handler.onStartTick(function () {
});
