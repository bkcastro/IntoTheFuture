// Create an object that will be exported to a ar scene. 
import * as THREE from 'three'

const dots = new THREE.Group();


for (let i = 0; i < 100; i++) {
    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(1 / 10, 32, 32);

    // Create a material
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    var x = (Math.random() * 10) - 5;
    var y = (Math.random() * 10) - 5;
    var z = (Math.random() * 10) - 5;

    // Create a mesh and add it to the scene
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);

    dots.add(sphere)
}



export { dots }; 
