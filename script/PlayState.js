var PlayState = {};

let map;
let layers = {};
let Groups = {};
let centres = {};
let cursors;
let spacebar;
let roulette;
let players = {};
let inputs = {};
let startSound;
let tirSound;
let menuSound;
let winnerSound;
let decompteSound;
let errorSound;
let okSound;
let reloadSound;
let egaliteSound;
let finTempsSound;
let breakingSound;
let trolleySound;
let trolleySound2;
let raceSound;

PlayState.preload = function () {
    // game.load.tilemap("map2", GLOBAL.DIR.IMAGE + "map2.json", null, Phaser.Tilemap.TILED_JSON);
    // game.load.image("tileset", GLOBAL.DIR.IMAGE + "tileset.png");
    game.load.image("map", GLOBAL.DIR.IMAGE + "map.png");
    game.load.image("canon", GLOBAL.DIR.IMAGE + "canon.png");
    game.load.image("bullet", GLOBAL.DIR.IMAGE + "bullet.png");
    game.load.image("case1", GLOBAL.DIR.IMAGE + "case1.png");
    game.load.image("case2", GLOBAL.DIR.IMAGE + "case2.png");
    game.load.image("case3", GLOBAL.DIR.IMAGE + "case3.png");
    game.load.image("case4", GLOBAL.DIR.IMAGE + "case4.png");
    game.load.image("chronom", GLOBAL.DIR.IMAGE + "chrono.png");
    game.load.image("explosion", GLOBAL.DIR.IMAGE + "explosion.png");
    game.load.audio('start', 'assets/audio/Air-Horn-SoundBible.com-964603082.mp3');
    game.load.audio('tir', 'assets/audio/jeckkech__projectile_01.mp3');
    game.load.audio('menu', 'assets/audio/8-Bit-Mayhem.mp3');
    game.load.audio('winner', 'assets/audio/Trancyvania_01.mp3');
    game.load.audio('decompte', 'assets/audio/countdown.mp3');
    game.load.audio('finTemps', 'assets/audio/russintheus__countdown-boom_01.mp3');
    game.load.audio('error', 'assets/audio/samsterbirdies__8-bit-error_01.mp3');
    game.load.audio('ok', 'assets/audio/rhodesmas__coins-purchase-4_01.mp3');
    game.load.audio('reload', 'assets/audio/killkhan__reload-1_01.mp3');
    game.load.audio('egalite', 'assets/audio/noirenex__wrong-selection_01.mp3');
    game.load.audio('breaking', 'assets/audio/brick-hitting-wall_01.mp3');
    game.load.audio('trolley', 'assets/audio/janevdmerwe1995__trolley-over-floor_01.mp3');
    game.load.audio('trolley2', 'assets/audio/janevdmerwe1995__trolley-over-floor_02.mp3');
    game.load.audio('breaking', 'assets/audio/homejrande__earth-demolition-hammer_01.mp3');
    game.load.audio('breaking2', 'assets/audio/brick-hitting-wall_01.mp3');
    game.load.audio('race', 'assets/audio/race-countdown.mp3');
}

PlayState.create = function () {

    game.input.gamepad.start();

    clearGamepadsEvents();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.bounds.setTo(32, 32, GLOBAL.WIDTH - 64, GLOBAL.HEIGHT - 64);

    cursors = this.input.keyboard.createCursorKeys();

    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.add.sprite(0, 0, 'map');

    roulette = new Roulette(new Vector(
        GLOBAL.HALFWIDTH,
        GLOBAL.HALFHEIGHT
    ));

    let stepAngle = 22.5;
    let step = stepAngle * 0.5;
    let angles = [45, 135, -45, -135]
    let colors = [0xffa800, 0xC64191, 0x00BFB2, 0xE0A890];
    let scorePositions = [new Vector(80, 80), new Vector(780, 80), new Vector(80, 770), new Vector(780, 770)];

    // game.input.gamepad.start();

    // playerNames.forEach((name, index) => {
    let index = 0;
    for (let id in playerNames) {
        let name = playerNames[id];

        players[id] = new Player(name, angles[index], stepAngle, colors[index], scorePositions[index], scoreOutPuts[index], statsOutputs[index]);

        inputs[id] = game.input.gamepad._gamepads[index];

        index++;
    }
    ;

    startSound = game.add.audio('start');
    tirSound = game.add.audio('tir');
    menuSound = game.add.audio('menu');
    winnerSound = game.add.audio('winner');
    decompteSound = game.add.audio('decompte');
    errorSound = game.add.audio('error');
    okSound = game.add.audio('ok');
    reloadSound = game.add.audio('reload');
    egaliteSound = game.add.audio('egalite');
    finTempsSound = game.add.audio('finTemps');
    breakingSound = game.add.audio('breaking');
    trolleySound = game.add.audio('trolley');
    trolleySound2 = game.add.audio('trolley2');
    raceSound = game.add.audio('race');

    game.sound.setDecodedCallback([
        startSound,
        tirSound,
        menuSound,
        winnerSound,
        decompteSound,
        finTempsSound,
        errorSound,
        okSound,
        reloadSound,
        egaliteSound,
        breakingSound,
        trolleySound,
        trolleySound2,
        raceSound
    ], PlayState.update, this);
}

PlayState.update = function () {

    roulette.update();

    for (let key in players) {
        let player = players[key];

        player.update();
    }

    for (let key in inputs) {

        let pad = inputs[key];

        if (pad.connected) {

            //GAUCHE
            if (pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT, 250) || (pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 && pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > -0.99)) {
                players[key].turn('left', false);
            } else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.99) {
                players[key].turn('left', true);
            } else if (pad.justReleased(Phaser.Gamepad.XBOX360_DPAD_LEFT, 40)) {
                players[key].shortMove = false;
            }

            //DROIT
            if (pad.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 250) || (pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 && pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.99)) {
                players[key].turn('right', false);
            } else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.99) {
                players[key].turn('right', true);
            } else if (pad.justReleased(Phaser.Gamepad.XBOX360_DPAD_RIGHT, 40)) {
                players[key].shortMove = false;
            }
            //TIRE
            if (pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)) {
                players[key].shoot();
            }
        }
    }
}

PlayState.render = function () {

    // for (let j = 0; j < roulette.items.length; j++) {
    //
    //     let lines = roulette.items[j];
    //
    //     for (let k = 0; k < lines.length; k++) {
    //         let item = lines[k];
    //         game.debug.body(item.hitbox.children);
    //     }
    //
    // }
    // for (let key in players) {
    //     let player = players[key];
    //     let bullets = player.canon.weapon.getBullets();
    //
    //     for (let i = 0; i < bullets.length; i++) {
    //         game.debug.body(bullets[i])
    //     }
    // }

    // game.debug.body(roulette.centerSprite)


    // game.debug.body(bases['base2'].canon.sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

PlayState.end = function () {

}

