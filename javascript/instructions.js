export function showInstructions(lockElement) {
  const instructions = document.createElement("div");
  instructions.id = "instructions";

  const page = window.location.pathname.split("/").pop();

  if (page.includes("egypt")) {
    instructions.innerHTML = `
    <h1>Dobrodošli u svijet starog egipta</h1>
    <p><strong>Kliknite da bi počeli istraživati</strong></p>
    <p>Kretanje: WASD ili strelice</p>
    <p>Pomicanje kamere: miš</p>
  `;
  } else {
    instructions.innerHTML = `
    <h1>Učenje na zabavan način</h1>
    <p><strong>Kliknite za ulazak u muzej</strong></p>
    <p>Kretanje: WASD ili strelice</p>
    <p>Pomicanje kamere: miš</p>
    <p>Uđite u portal kako bi vidjeli taj svijet</p>
  `;
  }
  document.body.appendChild(instructions);

  instructions.addEventListener("click", () => {
    instructions.style.display = "none";
    if (lockElement && lockElement.requestPointerLock) {
      lockElement.requestPointerLock();
    }
  });

  document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement === lockElement) {
      instructions.style.display = "none";
    } else {
      instructions.style.display = "flex";
    }
  });

  if (lockElement) {
    lockElement.addEventListener("mousedown", () => {
      if (
        document.pointerLockElement !== lockElement &&
        lockElement.requestPointerLock
      ) {
        lockElement.requestPointerLock();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !document.pointerLockElement) {
      instructions.style.display = "flex";
    }
  });
}
