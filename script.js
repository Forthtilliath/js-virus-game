import Game from './Game.js';

const $ = (selector) => document.querySelector(selector);
const start = $('#start');
const canvas = $('#canvas');
const score = $('#score');
const days = $('#days');
const endScreen = $('#endScreen');

let game = new Game();

start.addEventListener('click', game.start);

canvas.addEventListener('click', (e) => {
    game.updateDaysRemaining();

    let targetElement = e.target;
    if (targetElement.classList.contains('virus')) {
        targetElement.remove();
        game.destroyedVirus();
    }
});

endScreen.addEventListener('click', () => {
    setTimeout(() => {
        game.hideEndScreen();
        game.start();
    }, 3500);
});
