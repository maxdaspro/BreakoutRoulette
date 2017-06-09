class Roulette {

    constructor(position) {

        // Bonus numbers
        this.magicNumbers = {
            freeze: {
                number: -4,
                content: 'F',
                callback: this.bonusFreeze
            },
            selfFreeze: {
                number: -5,
                content: 'X',
                callback: this.bonusSelfFreeze
            },
            score: {
                number: -6,
                content: 'S',
                callback: this.bonusScore
            },
            rotate: {
                number: -7,
                content: 'R',
                callback: this.bonusRotate
            },
        };

        this.position = position;

        this.centerSprite = game.add.sprite(this.position.x, this.position.y, 'chronom');
        this.centerSprite.anchor.setTo(0.5);

        game.physics.arcade.enable(this.centerSprite);

        this.centerSprite.body.immovable = true;

        Helper.Phaser.setCircle(this.centerSprite, this.centerSprite.width * 0.5)

        this.chrono = new Chrono(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));

        this.amount = 16;
        this.min = -3;
        this.max = 9;
        this.stepAngle = 360 / this.amount;

        this.level = 1;

        this.items = [];

        this.message = new Message(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));

        this.message.alert('Ready ?', () => {
            //decompteSound.play();
            raceSound.play();
            this.chrono.start(1, this.start.bind(this), 0);
        });
    }

    update() {
        this.chrono.update();
        this.message.update();
        PlayState.sortScore();
    }

    start() {

        this.message.alert('Play !', () => {

            menuSound.loopFull(0.4);
            this.generateItems();

            for (let key in players) {
                players[key].number = 0;
                players[key].level = this.level;
                players[key].generateNumber();
                players[key].enable()
            }

            this.chrono.start(180, this.end.bind(this), 0, {
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
            }
            else if (players[key].level > winner.level) {
                winner = players[key];
                equal = 1;
            }
            else if (players[key].level === winner.level) {
                if (players[key].score > winner.score) {
                    winner = players[key];
                    equal = 1;
                }
                else if (players[key].score === winner.score) {
                    equal++;
                }
            }
        }

        let msg = '';
        if (equal >= 2) {
            msg = 'Draw !';
            egaliteSound.play();
        } else {
            msg = winner.name + ' wins !';
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

        // let colors = [0xE0A890, 0x00BFB2, 0xC64191, 0xffa800];

        let colors = [
            0xFF0000,
            0x363F46,
            0x3D4DB6,
            0x009587,
            0x795446,
            0xFF9700,
            0xFF5504,
            0x8B8B8B,
            0x44AF69,
            0xe16552,
            0xc94a53,
            0xbe5168,
            0xa34974,
            0xEB1460
        ];

        function getMagicNumbers(amount = 0) {
            let mns = [];
            let cpt = 0;
            while (mns.length < amount && cpt < 20) {
                let n = Helper.randomValueIncl(-7, -4);
                if (!Helper.inArray(n, mns)) {
                    mns.push(n);
                }
                cpt++;
            }
            return mns;
        }


        this.lines = Helper.randomValueIncl(1, 4);

        let magicNumbers = getMagicNumbers(this.lines);

        let numbers = [];

        for (let i = 0; i < this.lines; i++) {
            let index = (i + 1);
            numbers[i] = [];
            for (let j = 0; j < this.amount; j++) {
                numbers[i].push(Helper.randomValueIncl(this.min + this.lines - index, this.max - (i * 2)));
            }
            numbers[i][Helper.randomValueIncl(0, 15)] = magicNumbers[i];
        }

        for (let i = 0; i < this.lines; i++) {

            this.items[i] = [];

            for (let j = 0; j < this.amount; j++) {

                let index = (i + 1);

                let number = numbers[i][j]

                this.items[i][j] = new Item(
                    index, //line
                    number, //number
                    'case' + index, //sprite name
                    this.position, //position
                    new Vector(53 * index, 0), //pivot
                    this.stepAngle, //stepAngle
                    this.stepAngle * j, //angle
                    colors[number + Math.abs(this.min - 4)] //color
                    // colors[i] //color
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

    bonusFreeze(player) {
        console.log('bonus freeze');
        //console.log(this.player)
    }

    bonusSelfFreeze(player) {
        console.log('bonus freeze');
        //console.log(this.player)
    }

    bonusRotate() {
        console.log('bonus rotate');
        //console.log(this.player)
    }

    bonusScore(player) {
        console.log('bonus score');
        //console.log(this.player)
    }
}