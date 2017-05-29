class Roulette {

    constructor(position) {

        this.position = position;

        this.centerSprite = game.add.sprite(this.position.x, this.position.y, 'chronom');
        this.centerSprite.anchor.setTo(0.5);

        game.physics.arcade.enable(this.centerSprite);

        this.centerSprite.body.immovable = true;

        Helper.Phaser.setCircle(this.centerSprite, this.centerSprite.width * 0.5)

        this.chrono = new Chrono(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));
        
        this.message = new Message(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));
        this.blocMessage = document.querySelector("#blocMessage");

        this.lines = 4;
        this.amount = 16;
        this.min = 1;
        this.max = 9;
        this.stepAngle = 360 / this.amount;

        this.items = [];
        this.paused = false;
        
    }

    update() {
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
        this.message.removeMessage(this.blocMessage);

    }

    newRound() {

        this.generateItems()

        this.paused = false;

        for (let key in players) {
            players[key].number = 0;
            players[key].level++;
            players[key].generateNumber();
            players[key].paused = false;
        }
        this.chrono.start(15, this.end.bind(this), 0);
        this.message.viewMessage("un beau texte", this.blocMessage);
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