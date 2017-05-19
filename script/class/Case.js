class Case {
    constructor(position, angle, offset, speed = 1) {

        this.position = position;

        this.sprite = game.add.sprite(this.position.x, this.position.y, 'case');

        game.physics.arcade.enable(this.sprite);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.width = 32;
        this.sprite.height = 32;

        this.angle = angle + 0.0000001;

        this.sprite.pivot.x = offset;
        this.sprite.pivot.y = 0;
        this.sprite.angle = this.angle;

        this.speed = speed;

        this.enable = true;
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
    setEnable(){
        this.enable = true;
    }
    setDisable(){
        this.enable = false;
    }
}