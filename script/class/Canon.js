class Canon {
    constructor(position, angle, stepAngle, color, player) {

        this.player = player;
        this.position = position;

        this.sprite = game.add.sprite(0, 0, 'canon');

        game.physics.arcade.enable(this.sprite);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.width = 48;
        this.sprite.height = 48;
        this.sprite.tint = color;

        // this.sprite.body.immovable = true;

        this.angle = angle;
        this.stepAngle = stepAngle;

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.sprite.pivot.x = 375;
        this.sprite.pivot.y = 0;
        this.sprite.angle = this.angle;

        this.sprite.body.bounce.setTo(1, 1);

        this.weapon = new Weapon(this.sprite, color, this.player);
    }

    update() {

        this.weapon.update();
    }

    turn(direction) {
        switch (direction.toLowerCase()) {
            case 'left':
                this.setAngle(this.angle + this.stepAngle);
                break;
            case 'right':
                this.setAngle(this.angle - this.stepAngle);
                break;
        }
    }

    setAngle(angle) {
        this.angle = angle % 360;
        this.sprite.angle = this.angle + 0.0000001;
    }

    shoot() {
        this.weapon.fire();
    }
}