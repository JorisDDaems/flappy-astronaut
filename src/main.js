import { game, State, updateHiScore } from './state.js';
import { createBird, updateBird, flapBird, BIRD_CONFIG } from './bird.js';
import { createPipe, updatePipes, removeOffscreenPipes, checkPipePassed, checkCollision } from './pipe.js';
import { clearCanvas, drawBackground, drawPipes, drawAstronaut, drawOverlay } from './renderer.js';
import { playFlap, playScore, playDead } from './audio.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score-display');
const msgEl = document.getElementById('msg');

const W = canvas.width;
const H = canvas.height;

let bird = createBird();
let pipes = [];
let lastTime = null;
let lastPipeTime = 0;
const PIPE_INTERVAL = 1600;

function handleFlap() {
  if (game.state === State.IDLE) {
    game.state = State.PLAYING;
    lastPipeTime = performance.now();
    msgEl.textContent = '';
  }
  if (game.state === State.PLAYING) {
    flapBird(bird);
    playFlap();
  }
  if (game.state === State.DEAD) {
    resetGame();
  }
}

function resetGame() {
  bird = createBird();
  pipes = [];
  game.score = 0;
  game.state = State.PLAYING;
  scoreEl.textContent = '0';
  msgEl.textContent = '';
  lastPipeTime = performance.now();
}

function gameLoop(now) {
  const dt = lastTime ? Math.min((now - lastTime) / 16.67, 3) : 1;
  lastTime = now;

  clearCanvas(ctx, W, H);
  drawBackground(ctx, W, H);

  if (game.state === State.IDLE) {
    drawAstronaut(ctx, bird);
    drawOverlay(ctx, W, H, 'Flappy Astronaut', 'klik, tik of spatie om te starten');
    requestAnimationFrame(gameLoop);
    return;
  }

  if (game.state === State.PLAYING) {
    updateBird(bird, dt);

    if (now - lastPipeTime > PIPE_INTERVAL) {
      pipes.push(createPipe(H));
      lastPipeTime = now;
    }

    updatePipes(pipes, dt, game.score);

    if (checkPipePassed(pipes, bird)) {
      game.score++;
      scoreEl.textContent = game.score;
      updateHiScore();
      playScore();
    }

    pipes = removeOffscreenPipes(pipes);

    if (checkCollision(pipes, bird, H)) {
      game.state = State.DEAD;
      msgEl.textContent = `Hiscore: ${game.hiScore} — klik om opnieuw te spelen`;
      playDead();
    }
  }

  drawPipes(ctx, pipes, H);
  drawAstronaut(ctx, bird);

  if (game.state === State.DEAD) {
    drawOverlay(ctx, W, H, 'Game over!', `Score: ${game.score}  |  Hiscore: ${game.hiScore}`);
  }

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', handleFlap);
canvas.addEventListener('touchstart', e => { e.preventDefault(); handleFlap(); }, { passive: false });
document.addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); handleFlap(); } });

requestAnimationFrame(gameLoop);