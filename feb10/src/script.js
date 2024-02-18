import * as THREE from 'three'
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { generateGalaxy } from './galaxy';
import { Axes } from './tools';

import { XRPlanes } from 'three/examples/jsm/webxr/XRPlanes';

// Scene
const scene = new THREE.Scene()
scene.add(Axes())

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100);
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





const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
light.position.set(0.5, 1, 0.25);
scene.add(light);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function render() {

    renderer.render(scene, camera);

}

