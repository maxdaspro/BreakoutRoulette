class Item {
    constructor(line, number, type, position, pivot, stepAngle, angle) {

        // console.log(number, type, position, pivot, stepAngle, angle);

        this.line = line;
        this.number = number;
        this.type = type;
        this.position = position;
        this.pivot = pivot;
        this.angle = angle;
        this.stepAngle = stepAngle;

        this.sprite = game.add.sprite(this.position.x, this.position.y, type);

        game.physics.arcade.enable(this.sprite);

        this.sprite.body.immovable = true;

        this.sprite.anchor.setTo(1);
        this.sprite.pivot.x = this.pivot.x;
        this.sprite.pivot.y = this.pivot.y;
        this.sprite.angle = angle;

        // cases[j].sprite.alpha = 0;

        this.text = game.add.text(0, 0, this.number, {
            font: "24px Arial",
            fill: "#fff",
            align: "center",
            boundsAlignH: "bottom",
            boundsAlignV: "top"
        });

        this.text.angle = 90;
        this.text.anchor.setTo(0.5);

        this.container = game.add.group();
        this.container.add(this.text);

        this.container.x = this.position.x;
        this.container.y = this.position.y;
        this.container.pivot.x = this.pivot.x + this.sprite.width / 2;
        this.container.pivot.y = this.pivot.y;
        this.container.angle = this.angle + this.stepAngle / 2.2;

        this.hitbox = game.add.group();
        this.hitbox.enableBody = true;
        this.hitbox.physicsBodyType = Phaser.Physics.ARCADE;

        for (let i = 0, j = 1; i < 2; i++, j += 2) {

            let hitSprite = game.add.sprite(0, 0);

            hitSprite.addChild(Helper.Phaser.drawPoint(new Vector(0, 0), 0x69C641, (this.sprite.width * 0.07) * this.line));

            hitSprite.x = this.position.x;
            hitSprite.y = this.position.y;
            hitSprite.anchor.setTo(0.5);
            hitSprite.pivot.x = this.pivot.x + this.sprite.width / 2;
            hitSprite.pivot.y = this.pivot.y;
            hitSprite.angle = this.angle + this.stepAngle * (0.235 * j);

            hitSprite.alpha = 0;

            // Helper.Phaser.setCircle(hitSprite, hitSprite.width * 0.5);

            this.hitbox.add(hitSprite);
        }
    }

    destroy() {
        this.sprite.destroy();
        this.text.destroy();
        this.hitbox.destroy();
    }
}