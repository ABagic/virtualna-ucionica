import * as THREE from "three";
import { ROOM_SIZE } from "./room.js";

// Provjera i obrada sudara igrača s zidovima sobe i interaktivnim objektima
export class CollisionDetector {
  constructor(camera) {
    this.camera = camera;
    this.playerRadius = 0.7;
  }

  // Sudar s zidovima sobe
  checkWallCollision(newX, newZ) {
    const halfWidth = ROOM_SIZE.width / 2 - this.playerRadius;
    const halfDepth = ROOM_SIZE.depth / 2 - this.playerRadius;

    const clampedX = Math.max(-halfWidth, Math.min(halfWidth, newX));
    const clampedZ = Math.max(-halfDepth, Math.min(halfDepth, newZ));

    return { x: clampedX, z: clampedZ };
  }

  // Sudar s interaktivnim objektima
  checkObjectCollision(objects) {
    const playerBox = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(this.camera.position.x, 1, this.camera.position.z),
      new THREE.Vector3(this.playerRadius * 2, 2, this.playerRadius * 2)
    );

    for (const obj of objects) {
      obj.boundingBox.setFromObject(obj.mesh);

      if (playerBox.intersectsBox(obj.boundingBox)) {
        return obj;
      }
    }

    return null;
  }

  // Kretanje igrača s obradom sudara
  applyMovement(movement, objects) {
    const newX = this.camera.position.x + movement.x;
    const newZ = this.camera.position.z + movement.z;

    const clamped = this.checkWallCollision(newX, newZ);

    this.camera.position.x = clamped.x;
    this.camera.position.z = clamped.z;

    const collidedObject = this.checkObjectCollision(objects);

    return collidedObject;
  }
}
