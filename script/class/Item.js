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

        this.sprite = game.add.sprite(this.position.x, this.position.y, type);

        this.sprite.tint = color;

        let colorText = '#FFF';

        // let colors = [
        //             0x484C38, 0x525642, 0x5D614D,
        //             0x508484, 0x5A8E8E, 0x649898,
        //             0x2E3532, 0x383F3C, 0x424946,
        //             0x4C1F1D,
        //             0x7D2530, 0x731B26, 0x69111C
        //             ];
        //
        // switch (this.number) {
        //     case -3:
        //         this.sprite.tint = colors[0];
        //         break;
        //     case -2:
        //         this.sprite.tint = colors[1];
        //         break;
        //     case -1:
        //         this.sprite.tint = colors[2];
        //         break;
        //     case 0:
        //         this.sprite.tint = colors[3];
        //         break;
        //     case 1:
        //         this.sprite.tint = colors[4];
        //         break;
        //     case 2:
        //         this.sprite.tint = colors[5];
        //         break;
        //     case 3:
        //         this.sprite.tint = colors[6];
        //         break;
        //     case 4:
        //         this.sprite.tint = colors[7];
        //         break;
        //     case 5:
        //         this.sprite.tint = colors[8];
        //         break;
        //     case 6:
        //         this.sprite.tint = colors[9];
        //         break;
        //     case 7:
        //         this.sprite.tint = colors[10];
        //         break;
        //     case 8:
        //         this.sprite.tint = colors[11];
        //         break;
        //     case 9:
        //         this.sprite.tint = colors[12];
        //         break;
        // }

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

        this.text.angle = 90;
        this.text.anchor.setTo(0.5);

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

    destroy() {
        this.sprite.destroy();
        this.text.destroy();
        this.hitbox.destroy();
    }
}