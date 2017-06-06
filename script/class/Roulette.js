class Roulette {

    constructor(position) {

        this.position = position;

        this.centerSprite = game.add.sprite(this.position.x, this.position.y, 'chronom');
        this.centerSprite.anchor.setTo(0.5);

        game.physics.arcade.enable(this.centerSprite);

        this.centerSprite.body.immovable = true;

        Helper.Phaser.setCircle(this.centerSprite, this.centerSprite.width * 0.5)

        this.chrono = new Chrono(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));

        this.lines = 4;
        this.amount = 16;
        this.min = -3;
        this.max = 9;
        this.stepAngle = 360 / this.amount;

        this.level = 1;

        this.items = [];

        this.message = new Message(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));

        this.message.alert('Prêts?', () => {
            //decompteSound.play();
            raceSound.play();
            this.chrono.start(3, this.start.bind(this), 0);
        });
    }

    update() {
        this.chrono.update();
        this.message.update();
    }

    start() {


        /*startSound.volume = 0.4;
         startSound.play();*/


        // this.message.alert('Level ' + this.level, () => {
        //
        //     menuSound.loopFull(0.4);
        //     this.generateItems();
        //
        //     for (let key in players) {
        //         players[key].number = 0;
        //         players[key].level = this.level;
        //         players[key].generateNumber();
        //         players[key].enable()
        //     }
        //
        //     this.chrono.start(20, this.end.bind(this), 0, {
        //         triggers: [{
        //             ms: 20000,
        //             callback: function () {
        //                 finTempsSound.volume = 0.1;
        //                 finTempsSound.play();
        //             }
        //         }]
        //     });
        // });

        this.message.alert('Partez !', () => {

            menuSound.loopFull(0.4);
            this.generateItems();

            for (let key in players) {
                players[key].number = 0;
                players[key].level = this.level;
                players[key].generateNumber();
                players[key].enable()
            }

            this.chrono.start(1, this.end.bind(this), 0, {
                triggers: [{
                    ms: 20000,
                    callback: function () {
                        finTempsSound.volume = 0.1;
                        finTempsSound.play();
                    }
                }]
            });
        });
    }

    end() {

        menuSound.stop();

        let winner = null;
        let equal = 1;
        for (let key in players) {

            players[key].paused = true;

            if (!winner) {
                winner = players[key];
            } else if (players[key].score > winner.score) {
                winner = players[key];
            } else if (players[key].score === winner.score) {
                equal++;
            }
        }

        let msg = '';
        if (Object.keys(players).length === equal) {
            msg = 'Egalité !';
            egaliteSound.play();
        } else {
            msg = winner.name + ' a gagné !';
            winnerSound.play();
        }

        this.message.alert(msg, function () {

            egaliteSound.stop();
            winnerSound.stop();

            game.state.start('end');
        }, 5000);

        //Item explosion
        for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items[i].length; j++) {
                this.items[i][j].destroy();
            }
        }
    }


    destroyItems() {

        for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items[i].length; j++) {
                this.items[i][j].destroy();
            }
        }
    }

    generateItems() {

        this.destroyItems();

        for (let key in players) {
            let player = players[key];
            let bullets = player.canon.weapon.getBullets();

            for (let i = 0; i < bullets.length; i++) {
                bullets[i].kill();
            }
        }

        this.items = [];

        let colors = [0xE0A890, 0x00BFB2, 0xC64191, 0xffa800];

        for (let i = 0; i < this.lines; i++) {

            this.items[i] = [];

            for (let j = 0; j < this.amount; j++) {

                let index = (i + 1);

                this.items[i][j] = new Item(
                    index, //line
                    Helper.randomValueIncl(this.min + this.lines - index, this.max - (i * 2)), //number
                    'case' + index, //sprite name
                    this.position, //position
                    new Vector(53 * index, 0), //pivot
                    this.stepAngle, //stepAngle
                    this.stepAngle * j, //angle
                    colors[i] //color
                );
            }
        }
    }

    highlight() {
        this.tweenTint(this.centerSprite, 0xFF0033, 0xFFFFFF, 500);
    }

    tweenTint(obj, startColor, endColor, time) {

        var colorBlend = {
            step: 0
        };

        var colorTween = game.add.tween(colorBlend).to({
            step: 100
        }, time);

        colorTween.onUpdateCallback(function () {

            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
        });

        obj.tint = startColor;

        colorTween.start();
    }
}