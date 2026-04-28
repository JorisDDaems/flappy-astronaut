export const State = {
  IDLE: 'idle',
  PLAYING: 'playing',
  DEAD: 'dead',
};

function loadHiScore() {
  return parseInt(localStorage.getItem('flappy_hiscore') || '0', 10);
}

function saveHiScore(score) {
  localStorage.setItem('flappy_hiscore', score);
}

export const game = {
  state: State.IDLE,
  score: 0,
  hiScore: loadHiScore(),
};

export function updateHiScore() {
  if (game.score > game.hiScore) {
    game.hiScore = game.score;
    saveHiScore(game.hiScore);
  }
}