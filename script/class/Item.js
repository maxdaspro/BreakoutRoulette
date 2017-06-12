class Item {
    constructor(line, number, type, position, pivot, stepAngle, angle, color) {

        // console.log(number, type, position, pivot, stepAngle, angle);

        this.line = line;
        this.number = number;
        this.type = type;
        this.position = position;
        this.pivot = pivot;
        this.stepAngle = stepAngle;
        this.angle = angle + (this.stepAngle * 0.5);

        this.bonus = null;

        this.sprite = game.add.sprite(this.position.x, this.position.y, type);

        this.sprite.tint = color;

        let colorText = '#FFF';

        game.physics.arcade.enable(this.sprite);

        this.sprite.body.immovable = true;

        this.sprite.anchor.setTo(1);
        this.sprite.pivot.x = this.pivot.x;
        this.sprite.pivot.y = this.pivot.y;
        this.sprite.angle = this.angle;

        // cases[j].sprite.alpha = 0;

        this.text = game.add.text(0, 0, this.number, {
            font: "24px Arial",
            fill: colorText,
            align: "center",
            boundsAlignH: "bottom",
            boundsAlignV: "top"
        });

        this.text.stroke = '#000000';
        this.text.strokeThickness = 1;

        this.text.angle = 90;
        this.text.anchor.setTo(0.5);


        for (let key in roulette.magicNumbers) {
            if (this.number === roulette.magicNumbers[key].number) {
                this.text.setText(roulette.magicNumbers[key].content);
                this.bonus = roulette.magicNumbers[key].callback;
            }
        }


        this.container = game.add.group();
        this.container.add(this.text);

        this.container.x = this.position.x;
        this.container.y = this.position.y;
        this.container.pivot.x = this.pivot.x + this.sprite.width * 0.6;
        this.container.pivot.y = this.pivot.y;
        this.container.angle = this.angle + this.stepAngle / 2.2;

        this.hitbox = game.add.group();
        this.hitbox.enableBody = true;
        this.hitbox.physicsBodyType = Phaser.Physics.ARCADE;

        for (let i = 0, j = 1; i < 2; i++, j += 2) {

            let hitSprite = game.add.sprite(0, 0);

            hitSprite.addChild(Helper.Phaser.drawPoint(new Vector(0, 0), 0xFF0000, (this.sprite.width * 0.1) * this.line));

            hitSprite.x = this.position.x;
            hitSprite.y = this.position.y;
            hitSprite.anchor.setTo(0.5);
            hitSprite.pivot.x = this.pivot.x + this.sprite.width / 2;
            hitSprite.pivot.y = this.pivot.y;
            hitSprite.angle = this.angle + this.stepAngle * (0.2 * j) + 2;

            hitSprite.alpha = 0;

            // Helper.Phaser.setCircle(hitSprite, hitSprite.width * 0.5);

            this.hitbox.add(hitSprite);
        }
    }

    hit(player) {
        if (this.bonus !== null) {
            //console.log(typeof this.bonus);
            this.bonus(player);
        }
    }

    destroy() {
        this.sprite.destroy();
        this.text.destroy();
        this.hitbox.destroy();
    }
}