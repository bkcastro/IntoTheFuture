import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { XRButton } from 'three/addons/webxr/XRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { Axes } from './tools';
import Hand from './hand';

let container;
let camera, scene, renderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;

let raycaster;

let hand = null;

let currentProjectileIndex = 0;

const intersected = [];
const tempMatrix = new THREE.Matrix4();

let controls, group;

var user = { isSelecting: false };

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    scene.add(Axes());

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.set(0, 3, 3);

    controls = new OrbitControls(camera, container);
    controls.update();

    const floorGeometry = new THREE.PlaneGeometry(6, 6);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.25, blending: THREE.CustomBlending, transparent: false });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    //scene.add(floor);

    scene.add(new THREE.HemisphereLight(0xbcbcbc, 0xa5a5a5, 3));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    // light.shadow.camera.top = 3;
    // light.shadow.camera.bottom = - 3;
    // light.shadow.camera.right = 3;
    // light.shadow.camera.left = - 3;
    // light.shadow.mapSize.set(4096, 4096);
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

    // controllers

    // controller2 = renderer.xr.getController(1);
    // controller2.addEventListener('selectstart', onSelectStart);
    // controller2.addEventListener('selectend', onSelectEnd);
    // scene.add(controller2);

    // const controllerModelFactory = new XRControllerModelFactory();

    // controllerGrip1 = renderer.xr.getControllerGrip(0);
    // controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    // scene.add(controllerGrip1);

    // controllerGrip2 = renderer.xr.getControllerGrip(1);
    // controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
    // scene.add(controllerGrip2);

    hand = new Hand(renderer);

    scene.add(hand);

    // document.addEventListener('click', () => {
    //     hand.shootProjectile();
    //     console.log("clicked")
    // })

    raycaster = new THREE.Raycaster();

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


function animate() {

    renderer.setAnimationLoop(render);

}

function render() {

    if (hand != null) {
        hand.update();
    }

    renderer.render(scene, camera);

}