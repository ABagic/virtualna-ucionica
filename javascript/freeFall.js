export function freeFall(ballMesh, state, deltaTime = 1) {
  // Initialize physics state if not already
  if (!state.physics) {
    state.physics = {
      gravity: 9.8, // realistic gravity
      initialHeight: ballMesh.position.y,
      time: 0,
      velocity: 0,
      position: ballMesh.position.y,
      distanceFallen: 0,
      isRunning: true,
    };
  }

  // Ensure gravity is set
  if (!state.physics.gravity) {
    state.physics.gravity = 9.8;
  }

  const physics = state.physics;

  if (!physics.isRunning) return;

  // Update physics state using kinematic equations
  physics.time += deltaTime;

  // v = g * t
  physics.velocity = physics.gravity * physics.time;

  // h = h0 - 0.5 * g * t^2
  physics.position =
    physics.initialHeight - 0.5 * physics.gravity * physics.time * physics.time;

  // distance fallen
  physics.distanceFallen = physics.initialHeight - physics.position;

  // Stop at floor
  const FLOOR_Y = 0.25;
  const radius = ballMesh.userData.radius || 1;

  if (physics.position - radius <= FLOOR_Y) {
    physics.position = FLOOR_Y + radius;
    physics.velocity = 0;
    physics.isRunning = false;
    physics.distanceFallen = physics.initialHeight - physics.position;
    physics.hasHitFloor = true;
  }

  // Apply updated position to ball
  ballMesh.position.y = physics.position;

  console.log(
    "Ball position:",
    ballMesh.position.y,
    "Velocity:",
    physics.velocity,
    "time",
    physics.time
  );

  // Update collision box if it exists
  if (ballMesh.userData.box) {
    ballMesh.userData.box.setFromObject(ballMesh);
  }

  // Sync state for external use
  state.velocity = physics.velocity;
  state.position = physics.position;
  state.distanceFallen = physics.distanceFallen;
}
