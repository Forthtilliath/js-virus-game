export default class Game {
    constructor(daysLeft = 60, gameOverNumber = 50, gameSpeed = 6000) {
        this.daysLeft = daysLeft;
        this.gameOverNumber = gameOverNumber;
        this.gameSpeed = gameSpeed;

        this.score = 0;
        this.daysRemaining = this.daysLeft;
        this.getFaster = this.gameSpeed;
        this.loopPlay = false;

        score.textContent = this.score;
        days.textContent = this.daysRemaining;
    }

    start = () => {
        // Réinitialise les valeurs à chaque début de partie
        this.score = 0;
        this.daysRemaining = this.daysLeft;
        this.getFaster = this.gameSpeed;

        canvas.innerHTML = '';
        score.textContent = this.score;
        days.textContent = this.daysRemaining;
        start.textContent = 'Redémarrer le jeu';

        if (!this.loopPlay) this.game();
        this.loopPlay = true;
    };

    virusPop = () => {
        let virus = new Image();
        virus.src = './media/basic-pics/pngwave.png';

        virus.classList.add('virus');
        virus.style.top = Math.random() * 500 + 'px';
        virus.style.left = Math.random() * 500 + 'px';

        let x, y;
        x = y = Math.random() * 45 + 30;
        virus.style.setProperty('--x', x + 'px');
        virus.style.setProperty('--y', y + 'px');

        let plusMinus = Math.random() < 0.5 ? -1 : 1;
        let trX = Math.random() * 500 * plusMinus;
        let trY = Math.random() * 500 * plusMinus;
        virus.style.setProperty('--trX', trX + '%');
        virus.style.setProperty('--trY', trY + '%');

        canvas.appendChild(virus);
    };

    game = () => {
        let randomTime = Math.round(Math.random() * this.getFaster);
        if (this.getFaster > 700) this.getFaster *= 0.9;
        setTimeout(() => {
            if (this.daysRemaining === 0) {
                this.gameIsWon();
            } else if (canvas.childElementCount < this.gameOverNumber) {
                this.virusPop();
                this.game();
            } else {
                this.gameIsOver();
            }
        }, randomTime);
    };

    gameIsWon = () => {
        let accuracy = Math.round((this.score / this.daysLeft) * 100);
        let text = `Bravo ! Tu as atomisé cette merde !\nPrécision : ${accuracy}%`;
        this.showEndScreen('youWin', text);
    };

    gameIsOver = () => {
        let text = `Game Over !\nScore : ${this.score}`;
        this.showEndScreen('gameOver', text);
    };

    showEndScreen = (className, text) => {
        let divGameEnd = document.createElement('div');
        divGameEnd.classList.add(className);
        divGameEnd.textContent = text;

        endScreen.appendChild(divGameEnd);

        Object.assign(endScreen.style, {
            visibility: 'visible',
            opacity: 1,
        });
        this.loopPlay = false;
    };

    hideEndScreen = () => {
        endScreen.innerHTML = '';
        Object.assign(endScreen.style, {
            visibility: 'hidden',
            opacity: 0,
        });
    };

    updateDaysRemaining = () => {
        if (this.daysRemaining > 0) {
            this.daysRemaining--;
            days.textContent = this.daysRemaining;
        }
    };

    destroyedVirus = () => {
        this.score++;
        score.textContent = this.score;
    };
}
