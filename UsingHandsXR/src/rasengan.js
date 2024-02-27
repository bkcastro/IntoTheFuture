import * as THREE from 'three';
import { TextureLoader } from 'three';
import vertexOut from './shaders/outer/vertex.glsl';
import fragmentOut from './shaders/outer/fragment.glsl';
import vertexAura from './shaders/aura/vertex.glsl';
import fragmentAura from './shaders/aura/fragment.glsl';
import vertexAura2 from './shaders/aura/vertex.glsl';
import fragmentAura2 from './shaders/aura/fragment.glsl';

class Rasengan extends THREE.Object3D {
    constructor() {
        super();

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('textures/rasengan.png');


        const geometry = new THREE.SphereGeometry(5, 60, 60);
        const outerMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color("red") }
            },
            vertexShader: vertexOut,
            fragmentShader: fragmentOut,
            transparent: true,
            opacity: 0.5,
        }) 
        
        const outerSphere = new THREE.Mesh(geometry, outerMaterial);
        this.add(outerSphere);

        const auraMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color("red") }
            },
            vertexShader: vertexAura,
            fragmentShader: fragmentAura,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
        }) 
        
        const auraSphere = new THREE.Mesh(geometry, auraMaterial);
        auraSphere.scale.set(.4, .4, .4);
        this.add(auraSphere);

        this.sphereRadius = 9;

        this.particleCount = 600;
        const particleGeometry = new THREE.BufferGeometry();
        const particleMaterial = new THREE.PointsMaterial({color: 0xffffff, size: .25});
        this.positions = new Float32Array(this.particleCount * 3);
        this.velocities = [];

        for (let i = 0; i < this.particleCount; i++) {
            const vertex = new THREE.Vector3(
                (Math.random() - 0.5) * this.sphereRadius,
                (Math.random() - 0.5) * this.sphereRadius,
                (Math.random() - 0.5) * this.sphereRadius
            );
            vertex.toArray(this.positions, i * 3);

            this.velocities.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(.1));
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.add(this.particles);
    }

    update(time) {

        // Update particle positions
        const positionAttribute = this.particles.geometry.attributes.position;
        for (let i = 0; i < this.particleCount; i++) {
            const index = i * 3;
            const velocity = this.velocities[i];

            positionAttribute.array[index] += velocity.x;
            positionAttribute.array[index + 1] += velocity.y;
            positionAttribute.array[index + 2] += velocity.z;

            // Check for collision with the sphere and reflect the velocity
            const position = new THREE.Vector3(positionAttribute.array[index], positionAttribute.array[index + 1], positionAttribute.array[index + 2]);
            const directionToCenter = position.clone().negate().normalize();
            const gravityStrength = 0.001; // Adjust the strength of the gravitational pull
            velocity.add(directionToCenter.multiplyScalar(gravityStrength));

            if (position.length() >= this.sphereRadius) {
                const normal = position.clone().normalize();
                velocity.reflect(normal);
            }
        }

        positionAttribute.needsUpdate = true;


        this.rotateX(.05);
        this.rotateY(.05);
        //this.rotateZ(.05);
    }
}


export default Rasengan;