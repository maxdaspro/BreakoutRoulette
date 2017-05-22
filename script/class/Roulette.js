class Roulette {

    constructor(position) {

        this.position = position;

        /*MAXIME*/
        this.center = Helper.Phaser.drawPoint(position, 0xA6AAB0, 160);
        this.center.alpha = 0;
        this.chrono = new Chrono(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ))

        // Helper.Phaser.drawPoint(position, 0xFF0000, 1);
        this.clickBefore = {
            body: null,
            content: 'cliquez pour lancer le jeu',
            style: {
                font: "50px Arial",
                fill: "#1C2ADD",
                align: "center",
                boundsAlignH: "top",
                boundsAlignV: "top"
            },
            x: this.position.x - 265,
            y: this.position.y - 350
        };

        this.clickBefore = game.add.text(
            this.clickBefore.x,
            this.clickBefore.y,
            this.clickBefore.content,
            this.clickBefore.style
        );

        game.input.onDown.addOnce(this.removeText, this);

        /*************/

        this.lines = 4;
        this.amount = 16;
        this.min = 1;
        this.max = 9;
        this.stepAngle = 360 / this.amount;

        this.items = [];

        this.generateItems()
    }

    generateItems() {

        for (let i = 0; i < this.lines; i++) {

            this.items[i] = [];

            for (let j = 0; j < this.amount; j++) {

                let index = (i + 1);

                this.items[i][j] = new Item(
                    index,                                          //line
                    Helper.randomValueIncl(this.min, this.max), //number
                    'case' + index,                             //sprite name
                    this.position,                              //position
                    new Vector(53 * index, 0),                  //pivot
                    this.stepAngle,                             //stepAngle
                    this.stepAngle * j,                         //angle
                );
            }
        }

        // for (let i = 0; i < this.amount; i++) {
        //
        //     this.items[i] = [];
        //
        //     for (let j = 0; j < this.lines; j++) {
        //
        //         let index = (j + 1);
        //
        //         this.items[i][j] = new Item(
        //             Helper.randomValueIncl(this.min, this.max),
        //             'case' + index,
        //             this.position,
        //             new Vector(53 * index, 0),
        //             this.stepAngle,
        //             this.stepAngle * i,
        //         );
        //     }
        // }

        // for (let i = 1; i <= this.amount; i++) {
        //
        //     for (let j = 0; j <= this.lines; j++) {
        //
        //         this.items[i * j] = new Item(
        //             Helper.randomValueIncl(this.min, this.max),
        //             'case' + j,
        //             this.position,
        //             new Vector(53 * j, 0),
        //             this.stepAngle,
        //             this.stepAngle * i,
        //         );
        //     }
        // }
    }

    showCases() {

        for (let i = 0; i < this.items.length; i++) {
            let cases = this.items[i];


            for (let j = 0; j < cases.length; j++) {

                let item = cases[j];

                let string = 'case' + (i + 1);

                item.sprite = game.add.sprite(this.position.x, this.position.y, string);

                game.physics.arcade.enable(item.sprite);

                item.sprite.body.immovable = true;

                item.sprite.anchor.setTo(1);
                item.sprite.pivot.x = 53 * (i + 1);
                item.sprite.pivot.y = 0;
                item.sprite.angle = item.angle;
                // cases[j].sprite.alpha = 0;

                // cases[j].sprite.body.setSize(20, 20)

                item.sprite.angle = cases[j].angle;

                item.text = game.add.text(0, 0, item.number, {
                    font: "24px Arial",
                    fill: "#fff",
                    align: "center",
                    boundsAlignH: "bottom",
                    boundsAlignV: "top"
                });

                item.text.angle = 90;
                item.text.anchor.setTo(0.5);

                item.container = game.add.group();
                item.container.add(item.text);

                item.container.x = this.position.x;
                item.container.y = this.position.y;
                item.container.pivot.x = 53 * (i + 1) + 44;
                item.container.pivot.y = 0;
                item.container.angle = item.angle + (this.angleCase / 2);


                item.hitCircles = [];

                for (let k = 0, z = 1; k < 2; k++, z += 2) {
                    let graph = game.add.graphics(0, 0);
                    graph.beginFill(0xFF3300);
                    graph.lineStyle(0);
                    graph.beginFill(0xFFFF0B, 0.5);
                    graph.drawCircle(0, 0, item.sprite.height * 0.5);
                    graph.endFill();

                    let sprite = game.add.sprite(0, 0);

                    sprite.addChild(graph);
                    game.physics.arcade.enable(sprite);
                    sprite.x = this.position.x;
                    sprite.y = this.position.y;
                    sprite.anchor.setTo(0.5);
                    sprite.pivot.x = 53 * (i + 1) + 44;
                    sprite.pivot.y = 0;
                    sprite.angle = item.angle + this.angleCase * (0.25 * z);

                    sprite.alpha = 0;

                    sprite.radius = sprite.width * 0.6;
                    sprite.body.setCircle(sprite.radius,
                        (-sprite.radius + (0.5 * sprite.width) / sprite.scale.x),
                        (-sprite.radius + (0.5 * sprite.height) / sprite.scale.y)
                    );

                    item.hitCircles[k] = sprite;
                }

                item.destroy = function () {
                    for (let i = 0; i < item.hitCircles.length; i++) {
                        let circle = item.hitCircles[i];
                        circle.destroy()
                    }
                    item.text.destroy();
                    this.sprite.destroy();
                }
            }
        }
    }

    removeText() {
        this.clickBefore.destroy();
        this.chrono.start();
    }

    update() {
        this.chrono.update();
    }

}