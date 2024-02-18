import * as THREE from 'three'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 100000
parameters.size = 1
parameters.radius = .03
parameters.branches = 80
parameters.spin = 1
parameters.randomness = 0.08
parameters.randomnessPower = .01
parameters.insideColor = '#36dede'//'#0d0909'
parameters.outsideColor = '#f21ee2' //'#95e8e6'
parameters.translate = [0, 0, 0];

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {

    if (points !== null) {
        geometry.dispose()
        material.dispose()
        //scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

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

    material = new THREE.ShaderMaterial({
        depthWrite: false,
        //blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
            uSize: { value: 1 },
            uTime: { value: 0 },
            uTran: { value: new THREE.Vector3(0, 0, 0) },
            uYaw: { value: rotation },
        }
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)

    //points.position.set(0, 1, 1);
    // points.scale.set(.1, .1, .1);

    //points.rotateX(Math.PI/10)
    //scene.add(points)

    return points;
}


class Galaxy {
    constructor() {

    }

    update() {

        if (material != null) {
            material.uniforms.uTime += 0.01;
        }

    }
}


export { generateGalaxy }