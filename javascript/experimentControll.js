export class freeFallControls {
  constructor(ballMesh, ballState) {
    this.ballMesh = ballMesh;
    this.ballState = ballState;

    this.isRunning = false;

    // UI elements
    this.startButton = document.getElementById("startBtn");
    this.pauseButton = document.getElementById("stopResumeBtn");
    this.resetButton = document.getElementById("resetBtn");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.startButton.addEventListener("click", () => this.start());
    this.pauseButton.addEventListener("click", () => this.togglePause());
    this.resetButton.addEventListener("click", () => this.reset());
  }

  start() {
    this.isRunning = true;

    if (this.ballState.physics && this.ballState.physics.hasHitFloor) {
      this.ballState.physics.time = 0;
      this.ballState.physics.velocity = 0;
      this.ballState.physics.position = this.ballMesh.position.y;
      this.ballState.physics.distanceFallen = 0;
      this.ballState.physics.hasHitFloor = false;
      this.ballState.physics.isRunning = true;
    }

    this.pauseButton.textContent = "Pause";
  }

  togglePause() {
    this.isRunning = !this.isRunning;
    this.pauseButton.textContent = this.isRunning ? "Pause" : "Resume";
  }

  reset() {
    this.isRunning = false;

    if (this.ballState.physics) {
      this.ballState.physics.time = 0;
      this.ballState.physics.velocity = 0;
      this.ballState.physics.position = this.ballState.physics.initialHeight;
      this.ballState.physics.distanceFallen = 0;
      this.ballState.physics.hasHitFloor = false;
    }

    this.ballMesh.position.y = this.ballState.physics.initialHeight;
    this.pauseButton.textContent = "Pause";
  }

  /**
   * Returns whether the simulation is currently running
   */
  isRunningState() {
    return this.isRunning;
  }
}
