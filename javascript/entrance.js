import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { setupModel } from "./setupModel.js";

async function loadPortals() {
  const loader = new GLTFLoader();

  const [egyptPortal, experimentsPortal] = await Promise.all([
    loader.loadAsync("/assets/models/egyptPortal.glb"),
    loader.loadAsync("/assets/models/egyptPortal.glb"),
  ]);
  const egypt = setupModel(egyptPortal);
  egypt.position.z = -10;
  egypt.rotation.x = -Math.PI / 2;

  const experiments = setupModel(experimentsPortal);
  experiments.position.z = 10;
  experiments.rotation = (-Math.PI / 2, 0, -Math.PI);

  return {
    egypt,
    experiments,
  };
}

export { loadPortals };
