// Create an object that will be exported to a ar scene. 
import * as THREE from 'three'

const dots = new THREE.Group()

class Dots {
    constructor(scene) {

        this.matrix = new THREE.Matrix4(); 
        this.scene = scene; 
        this.dots = [];
        this.count = 200;
        this.radius = 1.5; 
        this.init(); 
    }
    init() {
        for (let i = 0; i < this.count; i++) {

            const phi = Math.acos(-1 + (2 * i) / this.count);
            const theta = Math.sqrt( this.count * Math.PI) * phi;

            var x = this.radius * Math.sin(phi) * Math.cos(theta);
            var y = this.radius * Math.sin(phi) * Math.sin(theta);
            var z = this.radius * Math.cos(phi);

            x = Math.sin(x)*Math.random();
            y = Math.sin(y)*Math.random();
            z = Math.sin(z) * Math.random();

            var position = new THREE.Vector3(x, y, z);

            var distanceToCenter = position.length(); 

            const colorA = new THREE.Color("black"); 
            const colorB = new THREE.Color("red");
            
            const geometry = new THREE.SphereGeometry(1 / 40, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: colorB.lerp(colorA, distanceToCenter) });
  
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(x, y, z);
        
            this.dots.push(sphere);
            this.scene.add(sphere);
        }


    }

    update(time) {

        
        this.dots.forEach((dot) => {

    
        })
    }
}


export default Dots;