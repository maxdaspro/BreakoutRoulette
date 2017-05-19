class Weapon {
    constructor(sprite) {

        this.weapon = game.add.weapon(10, 'bullet');

        game.physics.arcade.enable(this.weapon);

        this.weapon.trackSprite(sprite, 20, 0, true);

        this.weapon.bullets.setAll("collideWorldBounds", true);

        this.damage = 2;

        this.weapon.bulletSpeed = 350;

        this.weapon.bullets.forEach(bullet => {
            bullet.width = 14;
            bullet.height = 14;
            bullet.body.collideWorldBounds = true;
            bullet.body.bounce.set(1);
            bullet.maxRebond = 1;
            bullet.rebond = 0;
            bullet.damage = this.getDamage();
            bullet.radius = bullet.width / 2;
            bullet.body.setCircle(bullet.radius,
                (-bullet.radius + (0.5 * bullet.width) / bullet.scale.x),
                (-bullet.radius + (0.5 * bullet.height) / bullet.scale.y)
            );
        }, this);

        this.emitter = game.add.emitter(50, 50, 100);

        this.emitter.makeParticles('explosion');
    }

    getDamage() {
        return this.damage;
    }

    fire() {
        this.weapon.fire();
    }

    particleBurst(position) {
        this.emitter.x = position.x;
        this.emitter.y = position.y;

        this.emitter.start(true, 100, null, 20);

        //  And 2 seconds later we'll destroy the emitter
        // game.time.events.add(200, this.destroyEmitter, this);

    }

    destroyEmitter() {
        this.emitter.destroy();
    }

    /**
     * Retourne les balles tirées par l'arme
     * @return {[type]} [description]
     */
    getBullets() {
        return this.weapon.bullets.children;
    }

    update() {

        let bullets = this.getBullets();

        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];

            game.physics.arcade.collide(bullet, bullets);
            game.physics.arcade.collide(bullet, layers.contour, this.hitBounds.bind(this));

            let towers = centres['centre'].towers;

            for (var j = 0; j < towers.length; j++) {
                game.physics.arcade.collide(bullet, towers[j].sprite, this.hitCenterTower.bind(this));
            }

            for (let key in bases) {

                let base = bases[key];

                game.physics.arcade.collide(bullet, base.sprite, this.hitBase.bind(this, base));
                game.physics.arcade.collide(bullet, base.canon.sprite, this.hitBaseCanon.bind(this, base));

                for (let j = 0; j < base.boardItems.length; j++) {
                    let item = base.boardItems[j];
                    game.physics.arcade.collide(bullet, item.sprite, this.hitBaseItem.bind(this, base, item));
                }
            }
        }
    }

    hitBounds(bullet) {
        bullet.rebond++;
        if (bullet.rebond > bullet.maxRebond) {
            bullet.kill();
            bullet.rebond = 0;
        }
    }

    hitCenterTower(bullet) {
        console.log(bullet);
        this.particleBurst(bullet.position);
        bullet.kill();
    }

    hitBase(base, bullet, baseSprite) {
        base.getDamage(bullet.damage);
    }

    hitBaseCanon(base, bullet, canonSprite) {
        //base.canon.getDamage();
    }

    hitBaseItem(base, item, bullet, itemSprite) {

        let life = item.getDamage(bullet.damage);

        bullet.kill();

        if (!item.immortal && life <= 0) {
            console.log('die');
            base.removeItem(item);
        }
    }
} 