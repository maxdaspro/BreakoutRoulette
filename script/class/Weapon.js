class Weapon {
    constructor(sprite, color, player) {

        this.player = player;

        this.weapon = game.add.weapon(10, 'bullet');

        game.physics.arcade.enable(this.weapon);

        this.weapon.trackSprite(sprite, 32, 0, true);

        this.weapon.bullets.setAll("collideWorldBounds", true);

        this.weapon.bulletSpeed = 500;
        this.weapon.fireRate = 150;

        this.weapon.bullets.forEach(bullet => {
            bullet.width = 12;
            bullet.height = 12;
            bullet.tint = color;

            Helper.Phaser.setCircle(bullet, 4);
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

            game.physics.arcade.collide(bullets[i], roulette.centerSprite, this.hitCenter.bind(this, roulette));

            for (let j = 0; j < roulette.items.length; j++) {

                let line = roulette.items[j];

                for (let k = 0; k < line.length; k++) {

                    let item = line[k];

                    game.physics.arcade.collide(bullets[i], item.hitbox, this.hitItem.bind(this, item));
                }
            }
        }
    }

    hitItem(item, bulletSprite, circleSprite) {
        // console.log(item.number);
        bulletSprite.kill();
        item.destroy();
        // console.log('number :', item.number);
        this.player.setScore(item.number)   
    }
    hitCenter(roulette, bulletSprite) {
        console.log('hit center');
        bulletSprite.kill();
        roulette.end()
    }
} 