const GLOBAL = {
    WIDTH: 864,
    HEIGHT: 864,
    DIR: {
        IMAGE: './assets/img/'
    }
};
GLOBAL.HALFWIDTH = GLOBAL.WIDTH / 2;
GLOBAL.HALFHEIGHT = GLOBAL.HEIGHT / 2;

var game = new Phaser.Game(GLOBAL.WIDTH, GLOBAL.HEIGHT, Phaser.AUTO, 'game');

// game.launched = false;
game.state.add('start', StartState);
game.state.add('play', PlayState);
game.state.add('end', EndState);

let playerNames = {};
let scoreOutPuts = [];
let statsOutputs = [];

for (let i = 1; i <= 4; i++) {
    scoreOutPuts.push(
        {
            name: document.querySelector('#scores #scores-p' + i + ' .name'),
            number: document.querySelector('#scores #scores-p' + i + ' .number'),
            findNumber: document.querySelector('#scores #scores-p' + i + ' .findNumber'),
            level: document.querySelector('#scores #scores-p' + i + ' .level'),
        }
    );
    statsOutputs.push(
        {
            name: document.querySelector('#stats #stats-p' + i + ' .name'),
            level: document.querySelector('#stats #stats-p' + i + ' .level'),
            score: document.querySelector('#stats #stats-p' + i + ' .score'),
            stats: document.querySelector('#stats #stats-p' + i + ' .stats'),
        }
    );
}

game.state.start('start');
