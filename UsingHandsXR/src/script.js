import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { XRButton } from 'three/addons/webxr/XRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { Axes } from './tools';
import Hand from './hand';

import Rasengan from './rasengan';

import Dots from './dots';

const clock = new THREE.Clock();

let container;
let camera, scene, renderer;
let controller;

let hand = null;
let dots = null;

let currentProjectileIndex = 0;

const intersected = [];
const tempMatrix = new THREE.Matrix4();

let controls, group;

var user = { isSelecting: false };

let projectiles = [];

let rasengan = null;

console.log("init")

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    scene.add(Axes(.5, .5));

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 3, 3);

    controls = new OrbitControls(camera, container);
    controls.update();

    scene.add(new THREE.HemisphereLight(0xbcbcbc, 0xa5a5a5, 3));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    scene.add(light);

    const aLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 100);
    scene.add(aLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);

    document.body.appendChild(XRButton.createButton(renderer, { 'optionalFeatures': ['depth-sensing'] }));

    hand = new Hand(scene, renderer);

    //dots = new Dots();
    // dots.position.add(new THREE.Vector3(0, 1, 0))
    // scene.add(dots);

    rasengan = new Rasengan();

    scene.add(rasengan);

    window.addEventListener('resize', onWindowResize);
}

function animate() {

    renderer.setAnimationLoop(render);

}

function render() {

    // Get the elapsed time in seconds since the clock started
    const elapsedTime = clock.getElapsedTime();

    hand.update();
    rasengan.update(elapsedTime);
    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

