import * as THREE from "three";

export class CollisionDetector {
  constructor(camera) {
    this.camera = camera;
    this.playerRadius = 0.4;
    this.playerHeight = 2;
    this.playerHalfHeight = this.playerHeight / 2;
  }

  getPlayerBox(x, z) {
    return new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(x, this.camera.position.y, z),
      new THREE.Vector3(
        this.playerRadius * 2,
        this.playerHeight,
        this.playerRadius * 2
      )
    );
  }

  updateObjectBoxes(objects) {
    objects.forEach((mesh) => {
      if (mesh.userData.box) {
        mesh.userData.box.setFromObject(mesh);
      }
    });
  }

  applyMovement(movement, objects) {
    this.updateObjectBoxes(objects);

    let newX = this.camera.position.x;
    let newZ = this.camera.position.z;

    const testX = newX + movement.x;
    const boxX = this.getPlayerBox(testX, newZ);

    for (const mesh of objects) {
      if (mesh.userData.box && boxX.intersectsBox(mesh.userData.box)) {
        movement.x = 0;
        break;
      }
    }

    newX += movement.x;

    const testZ = newZ + movement.z;
    const boxZ = this.getPlayerBox(newX, testZ);

    for (const mesh of objects) {
      if (mesh.userData.box && boxZ.intersectsBox(mesh.userData.box)) {
        movement.z = 0;
        break;
      }
    }

    newZ += movement.z;

    this.camera.position.set(newX, this.camera.position.y, newZ);
  }
}
