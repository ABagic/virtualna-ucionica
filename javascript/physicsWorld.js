import * as THREE from "three";

const collisionMeshes = [];

const floorMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });

function createBox(scene, w, h, d, x, y, z, mat) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y + h / 2, z);
  scene.add(mesh);

  // Collision box
  mesh.userData.box = new THREE.Box3().setFromObject(mesh);
  collisionMeshes.push(mesh);
}

function createSphere(scene, radius, x, y, z, mat = sphereMat) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  // Collision box
  mesh.userData.box = new THREE.Box3().setFromObject(mesh);
  mesh.userData.radius = radius; // store radius for gravity logic
  collisionMeshes.push(mesh);
}

export async function createRoom(scene) {
  collisionMeshes.length = 0;

  // Create floor
  createBox(scene, 10, 0.5, 10, 0, 0, 0, floorMat);

  // Create sphere at height 2
  createSphere(scene, 1, 0, 20, 0);
}

export function createObjects() {
  return collisionMeshes;
}
