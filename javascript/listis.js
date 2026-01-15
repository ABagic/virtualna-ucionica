export const hallwaySettings = {
  hallwayLength: 50,
  hallwayWidth: 6,

  roomsLeft: 3,
  roomsRight: 3,

  roomWidth: 8, // Z
  roomDepth: 10, // X

  height: 4,

  wallThickness: 0.5,
  doorWidth: 2,

  spacing: 2,
};

export const roomModels = {
  LEFT: {
    0: [
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.5,
        x: -2,
        y: 0,
        z: -3,
        rotX: -Math.PI / 2,
        title: "Prvi model - Egipat",
        description:
          "Budući da je Egipat poznat po svojim drevnim piramidama i bogatoj povijesti, ovaj model predstavlja ulaz u svijet arheoloških čuda i misterija.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.7,
        x: 1,
        y: 0,
        z: -3,
        rotX: -Math.PI / 2,
        title: "Drugi model - Egipat",
        description:
          "Ovo je drugi model koji predstavlja napredak civilizacije.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.7,
        x: 1,
        y: 0,
        z: 3,
        rotX: -Math.PI / 2,
        rotZ: -Math.PI,
        title: "Treći model - Egipat",
        description:
          "Ovo je treći model koji predstavlja napredak civilizacije.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.5,
        x: -2,
        y: 0,
        z: 3,
        rotX: -Math.PI / 2,
        rotZ: -Math.PI,
        title: "Četvrti model - Egipat",
        description:
          "Ovo je četvrti model koji predstavlja napredak civilizacije.",
        interactable: true,
      },
    ],
    1: [
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.5,
        x: -2,
        y: 0,
        z: -3,
        rotX: -Math.PI / 2,
        title: "Prvi model - Egipat",
        description: "Prvi model u sobi lijevo 1.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.7,
        x: 1,
        y: 0,
        z: -3,
        rotX: -Math.PI / 2,
        title: "Drugi model - Egipat",
        description: "Drugi model u sobi lijevo 1.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.7,
        x: 1,
        y: 0,
        z: 3,
        rotX: -Math.PI / 2,
        rotZ: -Math.PI,
        title: "Treći model - Egipat",
        description: "Treći model u sobi lijevo 1.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.5,
        x: -2,
        y: 0,
        z: 3,
        rotX: -Math.PI / 2,
        rotZ: -Math.PI,
        title: "Četvrti model - Egipat",
        description: "Četvrti model u sobi lijevo 1.",
        interactable: true,
      },
    ],
  },

  RIGHT: {
    0: [
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.5,
        x: -2,
        y: 0,
        z: -3,
        rotX: -Math.PI / 2,
        title: "Prvi model - Egipat",
        description: "Prvi model u sobi desno 1.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.7,
        x: 1,
        y: 0,
        z: -3,
        rotX: -Math.PI / 2,
        title: "Drugi model - Egipat",
        description: "Drugi model u sobi desno 1.",
        interactable: true,
      },
      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.7,
        x: 1,
        y: 0,
        z: 3,
        rotX: -Math.PI / 2,
        rotZ: -Math.PI,
        title: "Treći model - Egipat",
        description: "Treći model u sobi desno 1.",
        interactable: true,
      },

      {
        url: "./assets/models/portals/egypt_portal.gltf",
        scale: 0.5,
        x: -2,
        y: 0,
        z: 3,
        rotX: -Math.PI / 2,
        rotZ: -Math.PI,
        title: "Četvrti model - Egipat",
        description: "Četvrti model u sobi desno 1.",
        interactable: true,
      },
    ],
  },
};
