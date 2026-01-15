import * as THREE from "three";

// Konrole za kretanje
export class MovementControls {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.euler = new THREE.Euler(0, 0, 0, "YXZ");
    this.PI_2 = Math.PI / 2;

    this.moveSpeed = 5.0;

    this.isLocked = false;

    this.init();
  }

  init() {
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
    document.addEventListener("mousemove", (e) => this.onMouseMove(e));

    this.domElement.addEventListener("click", () => {
      this.domElement.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
      this.isLocked = document.pointerLockElement === this.domElement;
    });
  }

  onKeyDown(event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        this.moveForward = true;
        break;
      case "KeyS":
      case "ArrowDown":
        this.moveBackward = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.moveLeft = true;
        break;
      case "KeyD":
      case "ArrowRight":
        this.moveRight = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        this.moveForward = false;
        break;
      case "KeyS":
      case "ArrowDown":
        this.moveBackward = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.moveLeft = false;
        break;
      case "KeyD":
      case "ArrowRight":
        this.moveRight = false;
        break;
    }
  }

  onMouseMove(event) {
    if (!this.isLocked) return;

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    this.euler.setFromQuaternion(this.camera.quaternion);
    this.euler.y -= movementX * 0.002;
    this.euler.x -= movementY * 0.002;
    this.euler.x = Math.max(-this.PI_2, Math.min(this.PI_2, this.euler.x));

    this.camera.quaternion.setFromEuler(this.euler);
  }

  // Update kamere i vraća vektor kretanja
  update(delta) {
    if (!this.isLocked) return { x: 0, z: 0 };

    const moveDistance = this.moveSpeed * delta;
    const direction = new THREE.Vector3();

    this.camera.getWorldDirection(direction);
    const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
    const right = new THREE.Vector3()
      .crossVectors(forward, new THREE.Vector3(0, 1, 0))
      .normalize();

    const movement = new THREE.Vector3(0, 0, 0);

    if (this.moveForward) movement.add(forward);
    if (this.moveBackward) movement.sub(forward);
    if (this.moveRight) movement.add(right);
    if (this.moveLeft) movement.sub(right);

    if (movement.length() > 0) {
      movement.normalize().multiplyScalar(moveDistance);
    }

    return { x: movement.x, z: movement.z };
  }
}
