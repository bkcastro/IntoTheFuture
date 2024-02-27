import * as THREE from 'three';
import { TextureLoader } from 'three';
import vertex from './shaders/inner/vertex.glsl'
import fragment from './shaders/inner/fragment.glsl';

class Rasengan extends THREE.Object3D {
    constructor() {
        super();

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('textures/rasengan.png');


        const geometry = new THREE.SphereGeometry(1, 60, 60);
        const outerMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color("blue") }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            opacity: 0.5,
        })
        const outerSphere = new THREE.Mesh(geometry, outerMaterial);

        const innerMaterial = new THREE.MeshPhongMaterial({
            color: 0xdefdff, // Blue color
            emissive: 0x26f2ff, // Emissive color (glow)
            emissiveIntensity: 10 // Adjust the intensity of the glow
        });

        this.innerSphere = new THREE.Mesh(geometry, innerMaterial);
        this.innerSphere.scale.set(.1, .1, .1);
        this.innerSphere.alpha = 0
        this.innerSphere.position2 = new THREE.Vector3(1, 1, 0);

        //this.innerSphere.rotation.set(1, 0, 1);
        this.add(this.innerSphere);

        this.add(outerSphere);
    }

    update(time) {



        if (this.innerSphere.position == this.innerSphere.position2) {
            this.innerSphere.position2.set(Math.random(), Math.random().Math.random());
            this.innerSphere.alpha = 0;
        }
        this.innerSphere.alpha += .001

        console.log(this.innerSphere.alpha)
        this.innerSphere.position.lerp(this.innerSphere.position2, this.innerSphere.alpha);

        // this.rotateX(.05);
        // this.rotateY(.05);
        // this.rotateZ(.05);
    }
}


export default Rasengan;