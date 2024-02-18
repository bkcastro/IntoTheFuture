import * as THREE from 'three'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

let time = 0;

class Galaxy extends THREE.Object3D {

    constructor() {
        super();

        this.parameters = {}
        this.parameters.count = 10000
        this.parameters.size = 1
        this.parameters.radius = .5
        this.parameters.branches = 80
        this.parameters.spin = 1
        this.parameters.randomness = 0.08
        this.parameters.randomnessPower = .01
        this.parameters.insideColor = '#36dede'//'#0d0909'
        this.parameters.outsideColor = '#f21ee2' //'#95e8e6'
        this.parameters.translate = new THREE.Vector3(0, 0, 0);

        this.galaxy = generateGalaxy(this.parameters);
        this.bindingBox = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 1), new THREE.MeshBasicMaterial({ wireframe: true, visible: true }));
        this.add(this.galaxy);
        this.add(this.bindingBox);

    }

    translate(x, y, z) {
        this.parameters.translate.set(x, y, z);


    }

    update() {

        if (this.galaxy.material != null) {
            this.galaxy.material.uniforms.uTime.value += 0.0001;
            this.galaxy.material.needsUpdate = true;
            //console.log(time)
        }
    }
}

const generateGalaxy = (parameters) => {

    /**
     * Geometry
     */
    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count * 1)
    const random = new Float32Array(parameters.count * 3)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius

        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        positions[i3] = Math.cos(branchAngle) * radius;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = Math.sin(branchAngle) * radius;

        // Random 
        const randomX = (Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius)
        const randomY = (Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius)
        const randomZ = (Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius)

        random[i3] = randomX
        random[i3 + 1] = randomY
        random[i3 + 2] = randomZ

        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        // Scale
        scales[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(random, 3))

    const rotation = new THREE.Matrix4();
    rotation.makeRotationY(Math.PI / 2);

    let material = new THREE.ShaderMaterial({
        depthWrite: false,
        //blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
            uSize: { value: 1 },
            uTime: { value: 1 },
            uTran: { value: parameters.translate },
            uYaw: { value: rotation },
        }
    })

    return new THREE.Points(geometry, material);
}




export default Galaxy;