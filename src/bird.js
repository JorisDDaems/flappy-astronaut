export const BIRD_CONFIG = {
  startX: 80,
  startY: 250,
  width: 28,
  height: 32,
  gravity: 0.45,
  flapForce: -7.5,
};

export function createBird() {
  return {
    x: BIRD_CONFIG.startX,
    y: BIRD_CONFIG.startY,
    vy: 0,
    frame: 0,
    frameTimer: 0,
  };
}

export function updateBird(bird, dt) {
  bird.vy += BIRD_CONFIG.gravity * dt;
  bird.y += bird.vy * dt;

  bird.frameTimer += dt;
  if (bird.frameTimer > 6) {
    bird.frame++;
    bird.frameTimer = 0;
  }
}

export function flapBird(bird) {
  bird.vy = BIRD_CONFIG.flapForce;
}