import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { portal } from "/assets/models/portals/egypt_portal.gltf";

// Dimenzije sobe
export const ROOM_SIZE = {
  width: 20,
  height: 8,
  depth: 20,
};

// Kreiranje sobe s podom, stropom i zidovima
export function createRoom(scene) {
  const walls = [];

  const floorGeometry = new THREE.PlaneGeometry(
    ROOM_SIZE.width,
    ROOM_SIZE.depth
  );
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  walls.push({ mesh: floor });

  const ceilingGeometry = new THREE.PlaneGeometry(
    ROOM_SIZE.width,
    ROOM_SIZE.depth
  );
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5dc,
    side: THREE.DoubleSide,
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_SIZE.height;
  scene.add(ceiling);
  walls.push({ mesh: ceiling });

  const wallGeometry1 = new THREE.PlaneGeometry(
    ROOM_SIZE.width,
    ROOM_SIZE.height
  );
  const wallMaterial1 = new THREE.MeshStandardMaterial({
    color: 0xdda15e,
    side: THREE.DoubleSide,
  });
  const northWall = new THREE.Mesh(wallGeometry1, wallMaterial1);
  northWall.position.z = -ROOM_SIZE.depth / 2;
  northWall.position.y = ROOM_SIZE.height / 2;
  scene.add(northWall);
  walls.push({
    mesh: northWall,
    position: "z",
    value: -ROOM_SIZE.depth / 2,
  });

  const wallMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xbc6c25,
    side: THREE.DoubleSide,
  });
  const southWall = new THREE.Mesh(wallGeometry1.clone(), wallMaterial2);
  southWall.position.z = ROOM_SIZE.depth / 2;
  southWall.position.y = ROOM_SIZE.height / 2;
  southWall.rotation.y = Math.PI;
  scene.add(southWall);
  walls.push({
    mesh: southWall,
    position: "z",
    value: ROOM_SIZE.depth / 2,
  });

  const wallGeometry2 = new THREE.PlaneGeometry(
    ROOM_SIZE.depth,
    ROOM_SIZE.height
  );
  const wallMaterial3 = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    side: THREE.DoubleSide,
  });
  const westWall = new THREE.Mesh(wallGeometry2, wallMaterial3);
  westWall.position.x = -ROOM_SIZE.width / 2;
  westWall.position.y = ROOM_SIZE.height / 2;
  westWall.rotation.y = Math.PI / 2;
  scene.add(westWall);
  walls.push({
    mesh: westWall,
    position: "x",
    value: -ROOM_SIZE.width / 2,
  });

  const wallMaterial4 = new THREE.MeshStandardMaterial({
    color: 0xa0522d,
    side: THREE.DoubleSide,
  });
  const eastWall = new THREE.Mesh(wallGeometry2.clone(), wallMaterial4);
  eastWall.position.x = ROOM_SIZE.width / 2;
  eastWall.position.y = ROOM_SIZE.height / 2;
  eastWall.rotation.y = -Math.PI / 2;
  scene.add(eastWall);
  walls.push({
    mesh: eastWall,
    position: "x",
    value: ROOM_SIZE.width / 2,
  });

  return walls;
}

// Kreiranje interaktivnih objekata unutar sobe
export function createObjects(scene) {
  const objects = [];

  const gltfLoader = new GLTFLoader();

  gltfLoader.load("./assets/models/portals/egypt_portal.gltf", (gltf) => {
    const portal_egypt = new THREE.Mesh(
      gltf.scene.children[0].geometry,
      gltf.scene.children[0].material
    );
    portal_egypt.position.z = -10;
    portal_egypt.rotation.x = -Math.PI / 2;
    portal_egypt.castShadow = true;

    scene.add(portal_egypt);

    objects.push({
      mesh: portal_egypt,
      url: "./egypt.html",
      boundingBox: new THREE.Box3().setFromObject(portal_egypt),
    });
  });

  gltfLoader.load("./assets/egypt_portal.gltf", (gltf) => {
    const experiments_portal = new THREE.Mesh(
      gltf.scene.children[0].geometry,
      gltf.scene.children[0].material
    );
    experiments_portal.position.z = 10;
    experiments_portal.rotation.x = -Math.PI / 2;
    experiments_portal.rotation.z = -Math.PI;
    experiments_portal.castShadow = true;

    scene.add(experiments_portal);

    objects.push({
      mesh: experiments_portal,
      url: "./experiments.html",
      boundingBox: new THREE.Box3().setFromObject(experiments_portal),
    });
  });

  return objects;
}
