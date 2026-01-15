import * as THREE from "three";

// Inicijalizacija scene
export function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

// Inicijalizacija kamere
export function createCamera(x, y, z, x1, y1, z1) {
  if (x1 === undefined) x1 = 0;
  if (y1 === undefined) y1 = 2;
  if (z1 === undefined) z1 = 360;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(x, y, z);
  camera.lookAt(x1, y1, z1);

  return camera;
}

// Inicijalizacija renderer-a
export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  return renderer;
}

// Dodavanje osvjetljenja u scenu
export function addLighting(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(0, 3, 0);
  scene.add(pointLight);
}

// Rukovanje promjenom veličine prozora
export function handleResize(camera, renderer) {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
