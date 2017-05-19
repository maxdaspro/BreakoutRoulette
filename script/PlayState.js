var PlayState = {};

let map;
let layers = {};
let Groups = {};
let centres = {};
let cursors;
let spacebar;
let roulette;
let players = {};

PlayState.preload = function () {
    // game.load.tilemap("map2", GLOBAL.DIR.IMAGE + "map2.json", null, Phaser.Tilemap.TILED_JSON);
    // game.load.image("tileset", GLOBAL.DIR.IMAGE + "tileset.png");
    game.load.image("background", GLOBAL.DIR.IMAGE + "background.png");
    game.load.image("r1", GLOBAL.DIR.IMAGE + "r1.png");
    game.load.image("r2", GLOBAL.DIR.IMAGE + "r2.png");
    game.load.image("r3", GLOBAL.DIR.IMAGE + "r3.png");
    game.load.image("canon", GLOBAL.DIR.IMAGE + "canon.png");
    game.load.image("bullet", GLOBAL.DIR.IMAGE + "bullet.png");
}

PlayState.create = function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.bounds.setTo(32, 32, GLOBAL.WIDTH - 64, GLOBAL.HEIGHT - 64);

    cursors = this.input.keyboard.createCursorKeys();

    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.add.sprite(0, 0, 'background');

    // map = game.add.tilemap('map2');
    // map.addTilesetImage('tileset');

    // map.setCollisionBetween(1, 2000, true, layers.contour);

    // Groups.bases = Helper.Phaser.addGroups(['base1', 'base2'], 'objectLayer', map);
    // Groups.centres = Helper.Phaser.addGroups(['centre'], 'objectLayer', map);
    // layers = {
    //     contour: map.createLayer('contour')
    // };

    roulette = new Roulette(new Vector(
        GLOBAL.HALFWIDTH,
        GLOBAL.HALFHEIGHT
    ))

    players['maxime'] = new Player('maxime', 0);
    players['olivier'] = new Player('maxime', 180);
}

PlayState.update = function () {

    if (cursors.left.isDown && players['maxime'].canMove('right', players)) {
        players['maxime'].canon.turn('right')
    }
    if (cursors.right.isDown && players['maxime'].canMove('left', players)) {
        players['maxime'].canon.turn('left')
    }

    if (spacebar.justDown) {
        players['maxime'].canon.shoot();
    }
}

PlayState.render = function () {

    // let towers = centres['centre'].towers;

    // for (let key in towers) {
    //     let sprite = towers[key].sprite;
    //     game.debug.body(sprite);
    // }

    // for (let key in bases) {
    //     let base = bases[key];
    //     let bullets = base.canon.weapon.getBullets();
    //
    //     for (let key in bullets) {
    //         game.debug.body(bullets[key]);
    //     }
    // }

    // for (let key in bases) {
    //     let base = bases[key];
    //     game.debug.body(base.sprite);
    // }

    // game.debug.body(bases['base2'].canon.sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

