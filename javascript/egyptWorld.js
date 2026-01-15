import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { hallwaySettings, roomModels } from "./listis.js";

const floorMat = new THREE.MeshStandardMaterial({ color: 0x555555 });
const wallMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
const ceilMat = new THREE.MeshStandardMaterial({ color: 0x666666 });
const torchMat = new THREE.MeshStandardMaterial({ color: 0x442200 });
const flameMat = new THREE.MeshStandardMaterial({
  color: 0xffaa33,
  emissive: 0xff6600,
  emissiveIntensity: 1,
});

const collisionMeshes = [];
const loader = new GLTFLoader();
const modelCache = {};

function loadModel(url) {
  if (modelCache[url]) return Promise.resolve(modelCache[url]);

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        modelCache[url] = gltf.scene;
        resolve(gltf.scene);
      },
      undefined,
      reject
    );
  });
}

function createBox(scene, w, h, d, x, y, z, mat) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y + h / 2, z);
  scene.add(mesh);

  mesh.userData.box = new THREE.Box3().setFromObject(mesh);
  collisionMeshes.push(mesh);
}

function createTorch(scene, x, y, z, normalX) {
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.6),
    torchMat
  );

  handle.position.set(x + normalX * 0.3, y, z);
  handle.rotation.z = normalX * -THREE.MathUtils.degToRad(25);
  scene.add(handle);

  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), flameMat);
  flame.position.set(x + normalX * 0.45, y + 0.35, z);
  scene.add(flame);

  const light = new THREE.SpotLight(
    0xffff00,
    5.5,
    20,
    THREE.MathUtils.degToRad(90),
    0.2,
    1
  );

  light.position.copy(flame.position);
  light.target.position.set(
    flame.position.x,
    flame.position.y + 0.2,
    flame.position.z
  );

  scene.add(light);
  scene.add(light.target);
}

/* LAYOUT CALCS */

const maxRooms = Math.max(
  hallwaySettings.roomsLeft,
  hallwaySettings.roomsRight
);
const usableLength =
  hallwaySettings.hallwayLength - hallwaySettings.spacing * 2;
const slotSize = usableLength / maxRooms;

function getRoomZ(index) {
  return hallwaySettings.spacing + slotSize * index + slotSize / 2;
}

function buildHallway(scene) {
  createBox(
    scene,
    hallwaySettings.hallwayWidth,
    0.2,
    hallwaySettings.hallwayLength,
    0,
    0,
    hallwaySettings.hallwayLength / 2,
    floorMat
  );
  createBox(
    scene,
    hallwaySettings.hallwayWidth,
    0.2,
    hallwaySettings.hallwayLength,
    0,
    hallwaySettings.height,
    hallwaySettings.hallwayLength / 2,
    ceilMat
  );

  createBox(
    scene,
    hallwaySettings.hallwayWidth,
    hallwaySettings.height,
    hallwaySettings.wallThickness,
    0,
    0,
    -hallwaySettings.wallThickness / 2,
    wallMat
  );
  createBox(
    scene,
    hallwaySettings.hallwayWidth,
    hallwaySettings.height,
    hallwaySettings.wallThickness,
    0,
    0,
    hallwaySettings.hallwayLength + hallwaySettings.wallThickness / 2,
    wallMat
  );
}

function buildHallwayWall(scene, side, roomCount) {
  const wallX =
    side === "LEFT"
      ? -hallwaySettings.hallwayWidth / 2 - hallwaySettings.wallThickness / 2
      : hallwaySettings.hallwayWidth / 2 + hallwaySettings.wallThickness / 2;

  let currentZ = 0;
  const firstRoomZ = getRoomZ(0);

  const entranceWallLength = firstRoomZ - hallwaySettings.doorWidth / 2;
  if (entranceWallLength > 0) {
    createBox(
      scene,
      hallwaySettings.wallThickness,
      hallwaySettings.height,
      entranceWallLength,
      wallX,
      0,
      entranceWallLength / 2,
      wallMat
    );
    createTorch(
      scene,
      wallX,
      hallwaySettings.height * 0.6,
      entranceWallLength / 2,
      side === "LEFT" ? 1 : -1
    );
  }

  currentZ = firstRoomZ + hallwaySettings.doorWidth / 2;

  for (let i = 1; i < roomCount; i++) {
    const roomZ = getRoomZ(i);
    const segmentLength = roomZ - hallwaySettings.doorWidth / 2 - currentZ;

    if (segmentLength > 0) {
      createBox(
        scene,
        hallwaySettings.wallThickness,
        hallwaySettings.height,
        segmentLength,
        wallX,
        0,
        currentZ + segmentLength / 2,
        wallMat
      );
      createTorch(
        scene,
        wallX,
        hallwaySettings.height * 0.6,
        currentZ + segmentLength / 2,
        side === "LEFT" ? 1 : -1
      );
    }

    currentZ = roomZ + hallwaySettings.doorWidth / 2;
  }

  const exitWallLength = hallwaySettings.hallwayLength - currentZ;
  if (exitWallLength > 0) {
    createBox(
      scene,
      hallwaySettings.wallThickness,
      hallwaySettings.height,
      exitWallLength,
      wallX,
      0,
      currentZ + exitWallLength / 2,
      wallMat
    );
    createTorch(
      scene,
      wallX,
      hallwaySettings.height * 0.6,
      currentZ + exitWallLength / 2,
      side === "LEFT" ? 1 : -1
    );
  }
}

async function buildRoom(scene, side, index) {
  const z = getRoomZ(index);
  const x =
    side === "LEFT"
      ? -(hallwaySettings.hallwayWidth / 2 + hallwaySettings.roomDepth / 2)
      : hallwaySettings.hallwayWidth / 2 + hallwaySettings.roomDepth / 2;

  createBox(
    scene,
    hallwaySettings.roomDepth,
    0.2,
    hallwaySettings.roomWidth,
    x,
    0,
    z,
    floorMat
  );
  createBox(
    scene,
    hallwaySettings.roomDepth,
    0.2,
    hallwaySettings.roomWidth,
    x,
    hallwaySettings.height,
    z,
    ceilMat
  );

  buildRoomWalls(scene, side, x, z);
  await addModelsForRoom(scene, side, index);
}

function buildRoomWalls(scene, side, x, z) {
  const w = hallwaySettings.roomWidth;
  const d = hallwaySettings.roomDepth;
  const h = hallwaySettings.height;
  const t = hallwaySettings.wallThickness;

  createBox(scene, d, h, t, x, 0, z + w / 2, wallMat);
  createBox(scene, d, h, t, x, 0, z - w / 2, wallMat);

  createBox(
    scene,
    t,
    h,
    w,
    x + (side === "LEFT" ? -d / 2 : d / 2),
    0,
    z,
    wallMat
  );
}

async function addModelsForRoom(scene, side, index) {
  const models = roomModels[side]?.[index];
  if (!models) return;

  const roomZ = getRoomZ(index);
  const roomX =
    side === "LEFT"
      ? -(hallwaySettings.hallwayWidth / 2 + hallwaySettings.roomDepth / 2)
      : hallwaySettings.hallwayWidth / 2 + hallwaySettings.roomDepth / 2;

  for (const m of models) {
    const base = await loadModel(m.url);
    const model = base.clone(true);

    model.scale.setScalar(m.scale ?? 1);
    model.position.set(roomX + (m.x ?? 0), m.y ?? 0, roomZ + (m.z ?? 0));

    model.rotation.x = m.rotX ?? 0;
    model.rotation.z = m.rotZ ?? 0;

    // Enable shadows
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    scene.add(model);

    // ---- Collision per mesh ----
    model.traverse((child) => {
      if (child.isMesh) {
        // Create a Box3 for each mesh
        const meshBox = new THREE.Box3().setFromObject(child);
        child.userData.box = meshBox;

        child.userData.interactable = m.interactable;
        child.userData.title = m.title;
        child.userData.description = m.description;

        // Add the mesh to collisionMeshes
        collisionMeshes.push(child);
      }
    });
  }
}

export async function createRoom(scene) {
  collisionMeshes.length = 0;

  buildHallway(scene);
  buildHallwayWall(scene, "LEFT", hallwaySettings.roomsLeft);
  buildHallwayWall(scene, "RIGHT", hallwaySettings.roomsRight);

  for (let i = 0; i < hallwaySettings.roomsLeft; i++) {
    await buildRoom(scene, "LEFT", i);
  }

  for (let i = 0; i < hallwaySettings.roomsRight; i++) {
    await buildRoom(scene, "RIGHT", i);
  }
}

export function createObjects() {
  return collisionMeshes;
}
