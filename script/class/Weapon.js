class Weapon {
    constructor(sprite, color) {

        this.weapon = game.add.weapon(10, 'bullet');

        game.physics.arcade.enable(this.weapon);

        this.weapon.trackSprite(sprite, 32, 0, true);

        this.weapon.bullets.setAll("collideWorldBounds", true);

        this.weapon.bulletSpeed = 850;
        this.weapon.fireRate = 150;

        this.weapon.bullets.forEach(bullet => {
            bullet.width = 14;
            bullet.height = 14;
            bullet.tint = color;
        }, this);

        // this.emitter = game.add.emitter(50, 50, 100);
        //
        // this.emitter.makeParticles('explosion');
    }


    fire() {
        this.weapon.fire();
    }

    // particleBurst(position) {
    //     this.emitter.x = position.x;
    //     this.emitter.y = position.y;
    //
    //     this.emitter.start(true, 100, null, 20);
    //
    //     //  And 2 seconds later we'll destroy the emitter
    //     // game.time.events.add(200, this.destroyEmitter, this);
    //
    // }

    // destroyEmitter() {
    //     this.emitter.destroy();
    // }

    getBullets() {
        return this.weapon.bullets.children;
    }

    update() {

        let bullets = this.getBullets();

        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];

            game.physics.arcade.collide(bullet, layers.contour, this.hitBounds.bind(this));

        }
    }

    hitBounds(bullet) {
        bullet.rebond++;
        if (bullet.rebond > bullet.maxRebond) {
            this.particleBurst(bullet.position);
            bullet.kill();
            bullet.rebond = 0;
        }
    }
} 