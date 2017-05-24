class Roulette {

    constructor(position) {

        this.position = position;

        this.centerSprite = game.add.sprite(this.position.x, this.position.y, 'chronom');
        this.centerSprite.anchor.setTo(0.5);

        game.physics.arcade.enable(this.centerSprite);

        this.centerSprite.body.immovable = true;

        Helper.Phaser.setCircle(this.centerSprite, this.centerSprite.width * 0.5)

        /*MAXIME*/
        this.chrono = new Chrono(new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT));

        this.lines = 4;
        this.amount = 16;
        this.min = 1;
        this.max = 9;
        this.stepAngle = 360 / this.amount;

        this.items = [];

        this.generateItems()
        this.chrono.start(2, this.start.bind(this), 0);
    }

    start(){
        this.chrono.start(11, this.end.bind(this));
    }
    
    end(){

        // this.centerSprite.tint = 0xF70404;
        // this.chrono.stop();
        this.start()
        PlayState.end();
    }

    update() {
        this.chrono.update();
    }

    showInfo() {
        // Helper.Phaser.drawPoint(position, 0xFF0000, 1);
        // this.clickBefore = {
        //     body: null,
        //     content: 'cliquez pour lancer le jeu',
        //     style: {
        //         font: "50px Arial",
        //         fill: "#1C2ADD",
        //         align: "center",
        //         boundsAlignH: "top",
        //         boundsAlignV: "top"
        //     },
        //     x: this.position.x - 265,
        //     y: this.position.y - 350
        // };

        // this.clickBefore = game.add.text(
        //     this.clickBefore.x,
        //     this.clickBefore.y,
        //     this.clickBefore.content,
        //     this.clickBefore.style
        // );
        //
        // game.input.onDown.addOnce(this.removeText, this);

        /*************/
    }

    removeInfo() {

    }

    generateItems() {

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