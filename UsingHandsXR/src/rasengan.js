import * as THREE from 'three';
import { TextureLoader } from 'three';
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl';

class Rasengan extends THREE.Object3D {
    constructor() {
        super();

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('textures/rasengan.png');


        const geometry = new THREE.SphereGeometry(1, 32, 32);
        // const material = new THREE.ShaderMaterial({
        //     // uniforms: {
        //     //     time: { value: 1 },
        //     //     color: { value: new THREE.Color("blue") }
        //     // },
        //     // // vertexShader: vertex,
        //     // fragmentShader: fragment,
        //     toneMapped: text
        // })


        const material = new THREE.MeshBasicMaterial();
        const sphere = new THREE.Mesh(geometry, material);


        const innerMaterial = new THREE.MeshPhysicalMaterial({})

        this.add(sphere);
    }

    update() {
        this.rotateX(.05);
        this.rotateY(.05);
        this.rotateZ(.05);
    }
}


export default Rasengan;