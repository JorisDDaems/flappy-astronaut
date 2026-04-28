export const PIPE_CONFIG = {
  baseSpeed: 2.4,
  maxSpeed: 5.5,
  gap: 140,
  interval: 1600,
  width: 52,
  capHeight: 18,
  capWidth: 58,
  minGapY: 60,
};

export function getPipeSpeed(score) {
  const speed = PIPE_CONFIG.baseSpeed + score * 0.08;
  return Math.min(speed, PIPE_CONFIG.maxSpeed);
}

export function createPipe(canvasHeight) {
  const maxGapY = canvasHeight - PIPE_CONFIG.gap - 60;
  const gapY = PIPE_CONFIG.minGapY + Math.random() * (maxGapY - PIPE_CONFIG.minGapY);
  return {
    x: 410,
    gapY,
    passed: false,
  };
}

export function updatePipes(pipes, dt, score) {
  const speed = getPipeSpeed(score);
  for (const pipe of pipes) {
    pipe.x -= speed * dt;
  }
}

export function removeOffscreenPipes(pipes) {
  return pipes.filter(p => p.x > -70);
}

export function checkPipePassed(pipes, bird) {
  let scored = false;
  for (const pipe of pipes) {
    if (!pipe.passed && pipe.x + PIPE_CONFIG.width < bird.x) {
      pipe.passed = true;
      scored = true;
    }
  }
  return scored;
}

export function checkCollision(pipes, bird, canvasHeight) {
  const bx = bird.x + 5;
  const by = bird.y + 4;
  const bw = BIRD_CONFIG_W - 10;
  const bh = BIRD_CONFIG_H - 6;

  if (by < 0 || by + bh > canvasHeight - 24) return true;

  for (const pipe of pipes) {
    const cx = pipe.x - 3;
    if (bx + bw > cx && bx < cx + PIPE_CONFIG.capWidth) {
      if (by < pipe.gapY || by + bh > pipe.gapY + PIPE_CONFIG.gap) return true;
    }
  }
  return false;
}

const BIRD_CONFIG_W = 28;
const BIRD_CONFIG_H = 32;