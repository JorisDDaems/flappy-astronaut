import { PIPE_CONFIG } from './pipe.js';

const STARS = [
  [30,20,1],[80,60,1.5],[150,30,1],[220,80,1],[300,15,1.5],
  [370,50,1],[50,120,1],[180,100,1],[340,90,1.2],[400,40,1],
  [60,160,1],[260,130,1.5],[120,180,1],[380,170,1],
];

export function clearCanvas(ctx, W, H) {
  ctx.clearRect(0, 0, W, H);
}

export function drawBackground(ctx, W, H) {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#0b1a3b');
  sky.addColorStop(1, '#1a3a6e');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  STARS.forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
  });

  ctx.fillStyle = '#2d6e3c';
  ctx.fillRect(0, H - 24, W, 24);
  ctx.fillStyle = '#3d8f4e';
  ctx.fillRect(0, H - 24, W, 6);
}

export function drawPipes(ctx, pipes, H) {
  for (const pipe of pipes) {
    _drawSinglePipe(ctx, pipe, H);
  }
}

function _drawSinglePipe(ctx, pipe, H) {
  const { width, capHeight, capWidth } = PIPE_CONFIG;
  const { x, gapY } = pipe;

  ctx.fillStyle = '#4a9e5c';
  ctx.fillRect(x, 0, width, gapY - capHeight);
  ctx.fillStyle = '#2d6e3c';
  ctx.fillRect(x, 0, 6, gapY - capHeight);

  ctx.fillStyle = '#3d8f4e';
  ctx.beginPath();
  ctx.roundRect(x - 3, gapY - capHeight, capWidth, capHeight, [0, 0, 8, 8]);
  ctx.fill();
  ctx.fillStyle = '#2d6e3c';
  ctx.fillRect(x - 3, gapY - capHeight, 6, capHeight);

  const botY = gapY + PIPE_CONFIG.gap;
  ctx.fillStyle = '#4a9e5c';
  ctx.fillRect(x, botY + capHeight, width, H - botY - capHeight);
  ctx.fillStyle = '#2d6e3c';
  ctx.fillRect(x, botY + capHeight, 6, H - botY - capHeight);

  ctx.fillStyle = '#3d8f4e';
  ctx.beginPath();
  ctx.roundRect(x - 3, botY, capWidth, capHeight, [8, 8, 0, 0]);
  ctx.fill();
  ctx.fillStyle = '#2d6e3c';
  ctx.fillRect(x - 3, botY, 6, capHeight);
}

export function drawAstronaut(ctx, bird) {
  const tilt = Math.min(Math.max(bird.vy * 2.5, -30), 30);
  ctx.save();
  ctx.translate(bird.x + 14, bird.y + 16);
  ctx.rotate((tilt * Math.PI) / 180);

  ctx.fillStyle = '#dce8f5';
  ctx.strokeStyle = '#8aadc7';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(-10, -6, 20, 20, 5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f0f6ff';
  ctx.beginPath();
  ctx.arc(0, -8, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#4a90d9';
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.ellipse(0, -8, 7, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.beginPath();
  ctx.ellipse(-2, -11, 3, 2, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f5a623';
  ctx.fillRect(-4, 1, 8, 5);
  ctx.fillStyle = '#fff';
  ctx.fillRect(-3, 2, 2, 3);
  ctx.fillRect(1, 2, 2, 3);

  ctx.fillStyle = '#dce8f5';
  ctx.strokeStyle = '#8aadc7';
  ctx.beginPath();
  ctx.roundRect(-15, -2, 6, 12, 3);
  ctx.fill();
  ctx.stroke();

  const thrustOffset = bird.frame % 2 === 0 ? 0 : 1;
  ctx.beginPath();
  ctx.roundRect(9, -2 + thrustOffset, 6, 12, 3);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(-8, 13, 7, 10, 3);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.roundRect(1, 13, 7, 10, 3);
  ctx.fill();
  ctx.stroke();

  if (bird.vy < -2) {
    const grad = ctx.createLinearGradient(0, 22, 0, 36);
    grad.addColorStop(0, '#f5a623');
    grad.addColorStop(1, 'rgba(255,80,0,0)');
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(-4, 22);
    ctx.lineTo(4, 22);
    ctx.lineTo(1, 36);
    ctx.lineTo(-1, 36);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

export function drawOverlay(ctx, W, H, title, sub) {
  ctx.fillStyle = 'rgba(10,20,50,0.65)';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#ffffff';
  ctx.font = '500 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, W / 2, H / 2 - 14);

  if (sub) {
    ctx.font = '400 14px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.fillText(sub, W / 2, H / 2 + 16);
  }

  ctx.textAlign = 'left';
}