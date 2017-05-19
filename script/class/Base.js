/**
 * Classe pour créer les bases des joueurs
 */
class Base {
    constructor(position, name) {

        this.name = name || "none";

        this.position = position;
        this.maxlife = 100;
        this.life = this.maxlife;

        this.sprite = game.add.sprite(this.position.x, this.position.y, 'base');

        this.sprite.alpha = 1

        game.physics.arcade.enable(this.sprite);

        this.sprite.anchor.set(0.5, 0.5);

        this.sprite.radius = this.sprite.width / 2;
        this.sprite.body.setCircle(this.sprite.radius,
            (-this.sprite.radius + (0.5 * this.sprite.width) / this.sprite.scale.x),
            (-this.sprite.radius + (0.5 * this.sprite.height) / this.sprite.scale.y)
        );

        this.sprite.body.immovable = true;

        let startAngle = Helper.degreeTwoPoints(
            this.position,
            new Vector(GLOBAL.HALFWIDTH, GLOBAL.HALFHEIGHT)
        );

        this.angle = startAngle + 90;

        this.sprite.angle = this.angle;

        this.cases = [];

        this.items = {};
        this.boardItems = [];
        this.selectedItem = ITEMS.LIFE;

        this.text;
        this.style = {font: "25px Arial", fill: "#AFB3B3", align: "center", boundsAlignH: "top", boundsAlignV: "top"};

        for (let key in ITEMS) {
            this.items[key] = new Item(ITEMS[key].name);
        }

        for (let i = 0; i < 6; i++) {
            this.cases[i] = new Case(position, (i * 30) + this.angle + 15, 115);
            this.cases[i].sprite.inputEnabled = true;
            this.cases[i].sprite.input.pixelPerfectOver = true;
            this.cases[i].sprite.input.useHandCursor = true;
            this.cases[i].sprite.events.onInputDown.add(() => {

                if (!this.cases[i].enable) return;

                this.cases[i].setDisable();

                let item = new Item(this.selectedItem, i);

                item.show(this.cases[i].sprite.worldPosition, this.cases[i].angle);

                this.boardItems.push(item);
            }, this);
        }
    }

    buildHud() {

        this.hud = new Hud(this.name, this.position, this.angle);

        //Button click
        for (let key in this.hud.buttons) {
            let button = this.hud.buttons[key];

            button.sprite.inputEnabled = true;
            button.sprite.input.pixelPerfectOver = true;
            button.sprite.input.useHandCursor = true;
            button.sprite.events.onInputDown.add(() => {
                console.log(this.name, '[click]', button.name);

                this.selectedItem = ITEMS[button.type];
            }, this);
        }
    }

    setWeapon() {
        this.canon = new Canon(this.position);
    }


    hit() {
        console.log('Base hited !');
    }

    getDamage(damage) {
        this.life -= damage;
        this.hud.setLife(this.life);
    }

    removeItem(item) {

        for (let i = 0; i < this.boardItems.length; i++) {

            if (this.boardItems[i] === item) {
                this.cases[item.caseIndex].setEnable();
                item.destroy();
                this.boardItems.splice(i, 1);
                break;
            }
        }
    }

    setAngle(angle) {
        if (angle < this.maxAngle || angle > this.minAngle) {
            return;
        }
        this.angle = angle;
        this.sprite.angle = this.angle;
    }

    addLife(bonus) {
        this.maxlife += bonus;
    }

    afficherVie() {
        this.text = game.add.text(this.position.x, this.position.y, this.life + " %", this.style);
        this.text.anchor.set(.5, .5);
        this.text.rotation *= this.angle;
    }

}