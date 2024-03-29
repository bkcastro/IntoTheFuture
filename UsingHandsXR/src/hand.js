
import * as THREE from 'three';
import { Axes, Dot } from './tools';
import Rasengan from './rasengan';

class Hand {
    constructor(scene, renderer) {

        this.controller = renderer.xr.getController(0);
        this.controller.addEventListener('selectstart', this.onSelectStart.bind(this));
        this.controller.addEventListener('selectend', this.onSelectEnd.bind(this));

        //this.controller.add(Axes(.02, .02));
        // this.controller.add(Dot(.01));
        scene.add(this.controller);

        this.scene = scene;
        this.projectiles = [];

        var geometry = new THREE.BoxGeometry(.1 / 2, .1 / 2, .1 / 2);
        var material = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("red"), wireframe: true })
        //this.projectile = new THREE.Mesh(geometry, material);
        //this.projectile.rotateX(-Math.PI / 2);
        //this.projectile.position.set(0, .2, 0);

        this.currentIndex = 0;

        this.intervalCheck = null;
        this.rasengan = null;

        // Iron Sight 
    }

    repeat() {
        var velocity = new THREE.Vector3(0, 0, -1).applyQuaternion(this.controller.quaternion).multiplyScalar(.01);

        var temp = this.projectile.clone();
        temp.position.copy(this.controller.position);
        temp.userData.velocity = velocity;
        this.projectiles.push(temp);
        this.scene.add(temp);
    }

    onSelectStart() {
        console.log("selecting");

        // if (this.intervalCheck == null) {
        //     this.intervalCheck = setInterval(this.repeat(), 250);
        // }

        if (this.rasengan == null) {
            this.rasengan = new Rasengan();
            this.controller.add(this.rasengan);
        }

    }

    onSelectEnd() {
        console.log("ending select start");

        // if (this.intervalCheck != null) {
        //     clearInterval(this.intervalCheck);
        //     this.intervalCheck = null;
        // }
    }

    update(time) {

        // Remove the projectiles that are old. 
        if (this.rasengan != null) {
            this.rasengan.update(time);
        }

        // Apply the velocity to each projectile
        // this.projectiles.forEach((projectile) => {
        //     projectile.position.add(projectile.userData.velocity);
        //     projectile.rotation.x += .01;
        //     projectile.rotation.y += .01;
        // })

        // this.projectile.rotation.x += 0.1;
        // this.projectile.rotation.y += 0.1;
        // this.projectile.rotation.z += 0.1;
    }

}

export default Hand;