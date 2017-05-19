const GLOBAL = {
    WIDTH: 1536,
    HEIGHT: 864,
    DIR: {
        IMAGE: './assets/img/'
    }
};
GLOBAL.HALFWIDTH = GLOBAL.WIDTH / 2;
GLOBAL.HALFHEIGHT = GLOBAL.HEIGHT / 2;

const ITEMS = {
    TOWER: {name: 'tower', btn: 'btn-tower', life: -1, IMMORTAL: true},
    WALL: {name: 'wall', btn: 'btn-wall', life: 30},
    ROCK: {name: 'rock', btn: 'btn-rock', life: 50},
    LIFE: {name: 'life', btn: 'btn-life', life: 1},
    REFLECT: {name: 'reflect', btn: 'btn-reflect', life: 30},
};

var game = new Phaser.Game(GLOBAL.WIDTH, GLOBAL.HEIGHT, Phaser.AUTO, 'game');

game.state.add('play', PlayState);
game.state.start('play');

