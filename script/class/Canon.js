/**
 * Classe pour créer les canons des différentes bases
 */
class Canon {
    constructor(position, angle) {

        this.position = position;

        this.sprite = game.add.sprite(this.position.x, this.position.y, 'canon');

        game.physics.arcade.enable(this.sprite);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.width = 48;
        this.sprite.height = 48;

        this.sprite.body.immovable = true;

        this.angle = angle + 0.0000001;
        // this.minAngle = this.angle + 80;
        // this.maxAngle = this.angle - 80;
        this.speed = 1;

        this.sprite.pivot.x = 364;
        this.sprite.pivot.y = 0;
        this.sprite.angle = this.angle;

        this.weapon = new Weapon(this.sprite);
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
        // if (angle < this.maxAngle || angle > this.minAngle) {
        //      return;
        // }
        this.angle = angle;
        this.sprite.angle = this.angle;
    }

    shoot() {
        this.weapon.fire();
    }


    update() {
        this.weapon.update();
    }
}