import * as THREE from "three";
import {
  createScene,
  createCamera,
  createRenderer,
  addLighting,
  handleResize,
} from "./scene.js";
import { createRoom, createObjects } from "./physicsWorld.js";
import { freeFall } from "./freeFall.js";
import { freeFallControls } from "./experimentControll.js";

async function init() {
  const scene = createScene();
  const camera = createCamera(0, 10, 25, 0, 15, 0);
  const renderer = createRenderer();
  document.body.appendChild(renderer.domElement);

  addLighting(scene);

  await createRoom(scene);
  const objects = createObjects();

  handleResize(camera, renderer);

  const ballMesh = objects.find(
    (obj) => obj.geometry.type === "SphereGeometry"
  );
  const ballState = {
    physics: {
      initialHeight: ballMesh.position.y,
      gravity: 9.8,
      time: 0,
      velocity: 0,
      distanceFallen: 0,
      hasHitFloor: false,
      isRunning: true,
    },
  };

  const controls = new freeFallControls(ballMesh, ballState);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    if (controls.isRunningState()) {
      freeFall(ballMesh, ballState, deltaTime);
    }

    // Update display
    document.getElementById("time").textContent =
      ballState.physics.time.toFixed(2);
    document.getElementById("height").textContent =
      ballState.physics.distanceFallen.toFixed(2);
    document.getElementById("speed").textContent =
      ballState.physics.velocity.toFixed(2);

    renderer.render(scene, camera);
  }

  animate();
}

init();
