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
        this.min = 1;
        this.max = 9;
        this.stepAngle = 360 / this.amount;

        this.items = [];
        this.paused = false;

        this.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",
            boundsAlignH: "middle",
            boundsAlignV: "center"
        };


        this.msgBox = game.add.physicsGroup();

        let graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x000);

        this.text = game.add.text(0, 0, 'Prêts?', this.style);
        this.text.setShadow(0, 0, 'rgba(100,100,100,0.8)', 20);
        this.text.anchor.set(0.5);

        // graphics.drawRect(-this.text.width / 2, -this.text.height / 2, this.text.width, this.text.height);
        // graphics.alpha = 0.4;


        this.msgBox.add(graphics);
        this.msgBox.add(this.text);

        console.log(graphics);

        this.msgBox.x = GLOBAL.HALFWIDTH;
        this.msgBox.y = GLOBAL.HALFHEIGHT;
        this.msgBox.alpha = 0;

        let twa = game.add.tween(this.msgBox).to({alpha: 1}, 500, Phaser.Easing.linear, true, 500);
        let twb = game.add.tween(this.msgBox.scale).to({x: 3, y: 3}, 500, Phaser.Easing.Back.Out, true, 500);
    }

    update() {
        game.world.bringToTop(this.msgBox);

        this.chrono.update();

        let playersOut = 0;
        for (let key in players) {
            let player = players[key];

            if (player.paused) {
                playersOut++;
            }
        }
        if (!this.paused && playersOut === Object.keys(players).length) {
            this.paused = true;
            this.chrono.start(2, this.start.bind(this), 0);
        }
    }

    start() {
        this.newRound();
    }

    end() {
        this.destroyItems();
        this.chrono.start(5, this.start.bind(this), 0);
        for (let key in players) {
            players[key].show();
            players[key].resetStartPosition();

        }
    }

    newRound() {

        this.generateItems()

        for (let key in players) {
            players[key].number = 0;
            players[key].level++;
            players[key].generateNumber();
            players[key].enable()
        }
        this.chrono.start(15, this.end.bind(this), 0);
    }

    destroyItems() {

        for (let i = 0; i < this.items.length; i++) {
            for (let j = 0; j < this.items[i].length; j++) {
                this.items[i][j].destroy();
            }
        }
    }

    generateItems() {

        this.items = [];

        for (let i = 0; i < this.lines; i++) {

            this.items[i] = [];

            for (let j = 0; j < this.amount; j++) {

                let index = (i + 1);

                this.items[i][j] = new Item(
                    index,                                      //line
                    Helper.randomValueIncl(this.min, this.max), //number
                    'case' + index,                             //sprite name
                    this.position,                              //position
                    new Vector(53 * index, 0),                  //pivot
                    this.stepAngle,                             //stepAngle
                    this.stepAngle * j,                         //angle
                );
            }
        }
    }
}