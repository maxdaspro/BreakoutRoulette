class Tower {
    constructor(position, angle, offset, speed = 1) {

        this.position = position;

        this.sprite = game.add.sprite(this.position.x, this.position.y, 'tower');

        game.physics.arcade.enable(this.sprite);

        this.sprite.radius = this.sprite.width /2 - 4;

        this.sprite.body.setCircle(this.sprite.radius,
            (-this.sprite.radius + (0.5 * this.sprite.width) / this.sprite.scale.x),
            (-this.sprite.radius + (0.5 * this.sprite.height) / this.sprite.scale.y)
        );

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.width = 32;
        this.sprite.height = 32;

        this.angle = angle + 0.0000001;

        this.sprite.pivot.x = offset;
        this.sprite.pivot.y = 0;
        this.sprite.angle = this.angle;

        this.sprite.body.immovable = true;

        this.sprite.body.bounce.set(1);

        this.speed = speed;
    }

    turn(direction) {

        switch (direction.toLowerCase()) {
            case 'left':
                this.setAngle(this.angle - this.speed);
                break;
            case 'right':
                this.setAngle(this.angle + this.speed);
                break;
        }
        this.sprite.angle = this.angle;
    }

    setAngle(angle) {
        if (angle < this.maxAngle || angle > this.minAngle) {
            return;
        }
        this.angle = angle;
        this.sprite.angle = this.angle;
    }
}