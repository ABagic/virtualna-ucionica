import "../style.css";
import * as THREE from "three";
import {
  createScene,
  createCamera,
  createRenderer,
  addLighting,
  handleResize,
} from "./scene.js";
import { createRoom, createObjects } from "./egyptworld.js";
import { MovementControls } from "./controls.js";
import { CollisionDetector } from "./collision2.js";
import { InteractionDetector } from "./interaction.js";
import { showInstructions } from "./instructions.js";

async function init() {
  const scene = createScene();
  const camera = createCamera(0, 2, 2);
  const renderer = createRenderer();

  document.body.appendChild(renderer.domElement);

  addLighting(scene);
  await createRoom(scene);

  const objects = createObjects(scene);

  const controls = new MovementControls(camera, renderer.domElement);
  const collisionDetector = new CollisionDetector(camera);
  const interactionDetector = new InteractionDetector(camera, objects);

  handleResize(camera, renderer);

  const clock = new THREE.Clock();

  showInstructions(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const movement = controls.update(delta);
    collisionDetector.applyMovement(movement, objects);

    interactionDetector.updateHints(camera.position);

    renderer.render(scene, camera);
  }

  animate();
}

init();
