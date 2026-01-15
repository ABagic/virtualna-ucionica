import "../style.css";
import * as THREE from "three";
import {
  createScene,
  createCamera,
  createRenderer,
  addLighting,
  handleResize,
} from "./scene.js";
import { createRoom, createObjects } from "./room.js";
import { MovementControls } from "./controls.js";
import { CollisionDetector } from "./collision.js";
import { showInstructions } from "./instructions.js";

function init() {
  const scene = createScene();
  const camera = createCamera(0, 2, 0);
  const renderer = createRenderer();

  document.body.appendChild(renderer.domElement);

  addLighting(scene);
  createRoom(scene);

  const objects = createObjects(scene);

  const controls = new MovementControls(camera, renderer.domElement);

  const collisionDetector = new CollisionDetector(camera);

  handleResize(camera, renderer);

  const clock = new THREE.Clock();

  showInstructions(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const movement = controls.update(delta);

    const collidedObject = collisionDetector.applyMovement(movement, objects);

    if (collidedObject) {
      window.location.href = collidedObject.url;
    }

    renderer.render(scene, camera);
  }

  animate();
}

init();
