import * as THREE from "three";

export class InteractionDetector {
  constructor(camera, objects, interactDistance = 2) {
    this.camera = camera;
    this.objects = objects; // Array of meshes
    this.interactDistance = interactDistance;

    // Filter objects that are interactable
    this.interactiveObjects = this.objects.filter(
      (obj) => obj.userData.interactable
    );

    this.onInteract = null;

    window.addEventListener("keydown", (e) => {
      if (e.key === "e" || e.key === "E") {
        document.getElementById("info").style.display = "block";
        this.tryInteract();
      }
    });
  }

  tryInteract() {
    const playerPos = this.camera.position;

    for (const obj of this.interactiveObjects) {
      let box;

      // Use the object's bounding box if available
      if (obj.userData.box instanceof THREE.Box3) {
        box = obj.userData.box;
      } else {
        // fallback: make a small box around object
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        box = new THREE.Box3().setFromCenterAndSize(
          pos,
          new THREE.Vector3(1, 1, 1)
        );
      }

      // Get distance from player to the closest point on the box
      const closestPoint = box.clampPoint(playerPos, new THREE.Vector3());
      const distance = playerPos.distanceTo(closestPoint);

      if (distance <= this.interactDistance) {
        document.getElementById("title").innerText = obj.userData.title;
        document.getElementById("description").innerText =
          obj.userData.description;
        if (this.onInteract) this.onInteract(obj);
        break;
      }
    }
  }

  updateHints(cameraPos) {
    let hintShown = false;
    for (const obj of this.interactiveObjects) {
      let box;

      // Use the object's bounding box if available
      if (obj.userData.box instanceof THREE.Box3) {
        box = obj.userData.box;
      } else {
        // fallback: make a small box around object
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        box = new THREE.Box3().setFromCenterAndSize(
          pos,
          new THREE.Vector3(1, 1, 1)
        );
      }

      // Get distance from player to the closest point on the box
      const closestPoint = box.clampPoint(cameraPos, new THREE.Vector3());
      const distance = cameraPos.distanceTo(closestPoint);

      if (distance <= this.interactDistance) {
        document.getElementById("hint").innerText = "Press E to interact";
        hintShown = true;
        break; // show hint for the first close object
      }
    }
    if (!hintShown) {
      document.getElementById("hint").innerText = "";
      document.getElementById("info").style.display = "none";
    }
  }
}
