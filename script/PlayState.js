var PlayState = {};

let map;
let layers = {};
let Groups = {};
let bases = {};
let centres = {};
let cursors;
let spacebar;
let canon1;
let canon2;
let text;

PlayState.preload = function () {
    game.load.tilemap("map2", GLOBAL.DIR.IMAGE + "map2.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("tileset", GLOBAL.DIR.IMAGE + "tileset.png");
    game.load.image("background", GLOBAL.DIR.IMAGE + "bg2.png");
    game.load.image("base", GLOBAL.DIR.IMAGE + "base.png");
    game.load.image("canon", GLOBAL.DIR.IMAGE + "canon.png");
    game.load.image("bullet", GLOBAL.DIR.IMAGE + "bullet.png");
    game.load.image("centre", GLOBAL.DIR.IMAGE + "centre.png");
    game.load.image("case", GLOBAL.DIR.IMAGE + "case.png");
    game.load.image("tower", GLOBAL.DIR.IMAGE + "tower.png");
    game.load.image("btn-tower", GLOBAL.DIR.IMAGE + "btn-tower.png");
    game.load.image("wall", GLOBAL.DIR.IMAGE + "wall.png");
    game.load.image("btn-wall", GLOBAL.DIR.IMAGE + "btn-wall.png");
    game.load.image("rock", GLOBAL.DIR.IMAGE + "rock.png");
    game.load.image("btn-rock", GLOBAL.DIR.IMAGE + "btn-rock.png");
    game.load.image("life", GLOBAL.DIR.IMAGE + "life.png");
    game.load.image("btn-life", GLOBAL.DIR.IMAGE + "btn-life.png");
    game.load.image("reflect", GLOBAL.DIR.IMAGE + "reflect.png");
    game.load.image("btn-reflect", GLOBAL.DIR.IMAGE + "btn-reflect.png");
    game.load.image("explosion", GLOBAL.DIR.IMAGE + "explosion.png");
}

PlayState.create = function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.bounds.setTo(32, 32, GLOBAL.WIDTH - 64, GLOBAL.HEIGHT - 64);

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.add.sprite(-192, -64, 'background');

    map = game.add.tilemap('map2');
    map.addTilesetImage('tileset');

    map.setCollisionBetween(1, 2000, true, layers.contour);

    Groups.bases = Helper.Phaser.addGroups(['base1', 'base2'], 'objectLayer', map);
    Groups.centres = Helper.Phaser.addGroups(['centre'], 'objectLayer', map);



    let players = ["Jean-Claude", "Bernard", "Maxime", "Olivier"];
    let cpt = 0;


    //Build bases
    for (let key in Groups.bases) {
        bases[key] = new Base(
            new Vector(
                Groups.bases[key].centerX,
                Groups.bases[key].centerY
            )
            , players[cpt++]);
    }

    //Build centers
    for (let key in Groups.centres) {
        centres[key] = new Centre(
            new Vector(
                GLOBAL.HALFWIDTH,
                GLOBAL.HALFHEIGHT
            )
        );
    }

    layers = {
        contour: map.createLayer('contour')
    };

    map.setCollisionBetween(1, 2000, true, layers.contour);


    //Init bases weapons
    for (let key in bases) {
        let base = bases[key];
        base.setWeapon();
        base.buildHud();
    }

}

PlayState.update = function () {

    centres['centre'].update();
    bases['base2'].canon.update();

    if (cursors.left.isDown) {
        bases['base2'].canon.turn("left");
    }
    if (cursors.right.isDown) {
        bases['base2'].canon.turn("right");
    }

    if (spacebar.justDown) {
        bases['base2'].canon.shoot();
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

