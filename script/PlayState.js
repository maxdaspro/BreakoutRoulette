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

    players['maxime'] = new Player('maxime', 45, 0xC64191);
    players['olivier'] = new Player('olivier', 90, 0xD00BFB2);
    players['gaspard'] = new Player('gaspard', -50, 0xE0A890);
}

PlayState.update = function () {

    for(let key in players){
        let player = players[key];

        player.update();
    }

    if (cursors.left.isDown && !cursors.right.isDown) {
        players['maxime'].turn('left');
    }
    else if(!cursors.right.isDown){
        players['maxime'].turnFinished();
    }

    if (cursors.right.isDown && !cursors.left.isDown) {
        players['maxime'].turn('right');
    }
    else if(!cursors.left.isDown){
        players['maxime'].turnFinished();
    }

    if (spacebar.justDown) {
        players['maxime'].shoot();
    }
}

PlayState.render = function () {

    // game.debug.body(bases['base2'].canon.sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

