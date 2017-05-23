class Canon {
    constructor(position, angle, stepAngle, color) {

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

        // this.velocity = 0;
        // this.acceleration = 0;
        // this.friction = 1;
        // this.speed = 0.2;
        // this.maxSpeed = 3;
        // this.drag = 0.85;

        this.weapon = new Weapon(this.sprite, color);
    }

    update() {

        this.weapon.update();

        // if (Math.abs(this.velocity) < this.maxSpeed) {
        //     this.velocity += this.acceleration;
        // }
        //
        // this.velocity *= this.friction;
        //
        // this.setAngle(this.angle + this.velocity);
    }

    turn(direction) {
        switch (direction.toLowerCase()) {
            case 'left':
                this.setAngle(this.angle + this.stepAngle);
                // this.acceleration = this.speed;
                // this.friction = 1;
                break;
            case 'right':
                this.setAngle(this.angle - this.stepAngle);
                // this.acceleration = -this.speed;
                // this.friction = 1;
                break;
        }
    }

    turnFinished() {
        this.acceleration = 0;
        this.friction = this.drag;
    }

    setAngle(angle) {
        this.angle = angle % 360;
        this.sprite.angle = this.angle + 0.0000001;
    }

    shoot() {
        this.weapon.fire();
    }
}