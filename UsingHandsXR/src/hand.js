
import * as THREE from 'three';

class Hand extends THREE.Object3D {
    constructor(renderer) {
        super();

        this.controller1 = renderer.xr.getController(0);
        this.controller1.addEventListener('selectstart', this.onSelectStart);
        this.controller1.addEventListener('selectend', this.onSelectEnd);
        this.add(this.controller1);



        //const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -.3)]);
        //const line = new THREE.Line(geometry);
        this.projectiles = [];
        this.currentProjectileIndex = 0;

        this.Cones(10);


    }

    shootProjectile() {

        if (this.currentProjectileIndex < this.projectiles.length) {
            const projectile = this.projectiles[this.currentProjectileIndex];
            const direction = new THREE.Vector3();
            this.controller1.getWorldDirectio(direction);
            projectile.velocity = direction.clone().multiplyScalar(0.01); // Change the velocity to shoot in the correct direction
            projectile.position.copy(this.controller1.position); // Set the position of the projectile to the controller position
            projectile.visible = true; // Make the projectile visible
            this.currentProjectileIndex += 1;
        } else {

            // var angle = 2 * Math.PI / this.projectiles.length;
            // var theta = 0;
            // this.currentProjectileIndex = 0;
            // this.projectiles.forEach((projectile,) => {
            //     projectile.position.set(Math.cos(theta) / 4, Math.sin(theta) / 4, 0);
            //     projectile.visible = true;
            //     theta += angle;
            // })

        }
    }

    onSelectStart(event) {
        console.log("selecting")
        this.shootProjectile();

    }

    onSelectEnd(event) {

    }

    Cones(n = 1, r = 5) {

        var geometry = new THREE.ConeGeometry(.05, .1, 32);
        var material = new THREE.MeshPhysicalMaterial({ color: new THREE.Color("red") })
        material.metalness = 1
        material.roughness = 1
        material.ior = 1.5
        material.thickness = 0.5

        var angle = 2 * Math.PI / n;
        var theta = 0;

        for (var i = 0; i < n; i++) {

            const cone = new THREE.Mesh(geometry, material);
            cone.rotateX(-Math.PI / 2)
            cone.position.set(Math.cos(theta) / 4, Math.sin(theta) / 4, 0);
            //this.add(cone);
            this.projectiles.push(cone);
            this.controller1.add(cone);
            theta += angle;
        }
    }

    update() {
        //this.rotateZ(0.04);

        for (let i = 0; i < this.currentProjectileIndex; i++) {
            const projectile = this.projectiles[i];

            if (projectile.visible == true) {
                if (projectile.length > 30) {
                    projectile.visible = false;
                } else {
                    projectile.position.add(projectile.velocity);
                }
            }
        }
    }

}

export default Hand;