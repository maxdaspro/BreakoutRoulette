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
    game.load.image("map", GLOBAL.DIR.IMAGE + "map.png");
    game.load.image("canon", GLOBAL.DIR.IMAGE + "canon.png");
    game.load.image("bullet", GLOBAL.DIR.IMAGE + "bullet.png");
    game.load.image("case1", GLOBAL.DIR.IMAGE + "case1.png");
    game.load.image("case2", GLOBAL.DIR.IMAGE + "case2.png");
    game.load.image("case3", GLOBAL.DIR.IMAGE + "case3.png");
    game.load.image("case4", GLOBAL.DIR.IMAGE + "case4.png");
    game.load.image("chronom", GLOBAL.DIR.IMAGE + "chrono.png");
}

PlayState.create = function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.bounds.setTo(32, 32, GLOBAL.WIDTH - 64, GLOBAL.HEIGHT - 64);

    cursors = this.input.keyboard.createCursorKeys();

    spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.add.sprite(0, 0, 'map');

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

    players['bernard'] = new Player('bernard', 45, 0xffa800);
    players['maxime'] = new Player('maxime', 135, 0xC64191);
    players['olivier'] = new Player('olivier', -45, 0x00BFB2);
    players['gaspard'] = new Player('gaspard', -135, 0xE0A890);

/*    for (var i = 0; i < players.length; i++) {
        players[i].displayScore()
    }*/
    players['bernard'].displayNumber(80,125);
    players['maxime'].displayNumber(780,125);
    players['olivier'].displayNumber(80,815);
    players['gaspard'].displayNumber(780,815);

    players['bernard'].displayScore(80,80);
    players['maxime'].displayScore(780,80);
    players['olivier'].displayScore(80,770)
    players['gaspard'].displayScore(780,770);

    console.log(players['olivier'].score)

    console.log(players['olivier'].getScore(2));
}

PlayState.update = function () {

    roulette.update();

    for (let key in players) {
        let player = players[key];

        player.update();
    }

    if (cursors.left.isDown && !cursors.right.isDown) {
        players['olivier'].turn('left');
    }
    else if (!cursors.right.isDown) {
        players['olivier'].turnFinished();
    }

    if (cursors.right.isDown && !cursors.left.isDown) {
        players['olivier'].turn('right');
    }
    else if (!cursors.left.isDown) {
        players['olivier'].turnFinished();
    }

    if (spacebar.justDown) {
        players['olivier'].shoot();
    }

    /********************* Scores **********************************/
    console.log(players['olivier'].canon.weapon.valueItem)
   
    //let test = players['olivier'].getScore(players['olivier'].canon.weapon.valueItem);


    
}

PlayState.render = function () {

    // for (let j = 0; j < roulette.items.length; j++) {
    //
    //     let cases = roulette.items[j];
    //
    //     for (let k = 0; k < cases.length; k++) {
    //         let hitCircles = cases[k].hitCircles;
    //
    //         for (let l = 0; l < hitCircles.length; l++) {
    //
    //             for (let m = 0; m < hitCircles[l].length; m++) {
    //
    //                 let hitCircle = hitCircles[l][m];
    //
    //                 game.debug.body(hitCircle);
    //             }
    //         }
    //     }
    //
    // }
    // for(let key in players){
    //     let player = players[key];
    //     let bullets = player.canon.weapon.getBullets();
    //
    //     for(let i=0; i < bullets.length; i++){
    //         game.debug.body(bullets[i])
    //     }
    // }

    // game.debug.body(bases['base2'].canon.sprite);
    // game.debug.cameraInfo(game.camera, 32, 32);
    //game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
}

