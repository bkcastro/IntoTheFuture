import * as THREE from 'three'
import { ARButton } from 'three/addons/webxr/ARButton.js';
import Galaxy from './galaxy';
import { Axes } from './tools';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene()
scene.add(Axes(4, 4))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(render);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

document.body.appendChild(ARButton.createButton(renderer, {
    requiredFeatures: ['plane-detection']
}));

window.addEventListener('resize', onWindowResize);

const galaxy = new Galaxy();
galaxy.scale.set(.5, .5, .5);


scene.add(galaxy);
galaxy.translate(0, 0, 4);

const controls = new OrbitControls(camera, renderer.domElement);


const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
light.position.set(0.5, 1, 0.25);
scene.add(light);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function render() {

    controls.update();
    galaxy.update();
    renderer.render(scene, camera);

}

