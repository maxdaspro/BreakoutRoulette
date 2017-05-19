/**
 * Classe pour créer les différents items de type mur
 */
class Item {
    constructor(item, caseIndex) {

        this.caseIndex = caseIndex;
        this.life = item.life;
        this.type = item.name;
        this.amount = 3;
        this.immortal = item.IMMORTAL || false;

    }

    show(position, angle, offset, speed = 1) {
/*        this.sprite = game.add.sprite(position.x, position.y, this.type);
        this.sprite.anchor.set(.5, .5);
        this.sprite.angle = angle - 90;
        this.sprite.width = 32;
        this.sprite.height = 32;
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;

        this.sprite.pivot.x = offset;
        this.sprite.pivot.y = 0;
        this.speed = speed;*/



        this.position = position;
        this.sprite = game.add.sprite(position.x, position.y, this.type);

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

        this.speed = speed;
    }

    getDamage(damage) {
        return this.life -= damage;
    }

    destroy() {
        this.sprite.destroy();
    }

    addLife(bonus) {
        this.life += bonus;
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