class Hud {
    constructor(name, position, angle) {

        this.name = name;

        this.position = position;
        this.angle = angle;
        this.size = 256;

        this.buttons = {};
        this.buttonGroups = game.add.group();

        this.size = 24;
        this.step = -50;

        //Life
        this.lifeText = game.add.text(position.x, position.y, '100%', {
            font: "20px Arial",
            fill: "#5D4037",
            align: "center",
            boundsAlignH: "top",
            boundsAlignV: "top"
        });
        this.lifeText.pivot.x = this.lifeText.width / 2;
        this.lifeText.pivot.y = 30;
        this.lifeText.angle = this.angle;

        //Name
        this.nameText = game.add.text(position.x, position.y, this.name, {
            font: "20px Arial",
            fill: "#fff",
            align: "center",
            boundsAlignH: "top",
            boundsAlignV: "top"
        });
        this.nameText.pivot.x = this.nameText.width / 2;
        this.nameText.pivot.y = -3;
        this.nameText.angle = this.angle;

        //Wall
        let wall = new Button(new Vector(
            this.position.x,
            this.position.y
        ), ITEMS.WALL, this.angle, this.size, this.size);

        wall.sprite.pivot.x = 200;
        wall.sprite.pivot.y = -this.size - 5;
        wall.sprite.angle = this.angle;

        //Rock
        let rock = new Button(new Vector(
            this.position.x,
            this.position.y
        ), ITEMS.ROCK, this.angle, this.size, this.size);
        rock.sprite.pivot.x = 145;
        rock.sprite.pivot.y = -this.size - 5;
        rock.sprite.angle = this.angle;

        //Life
        let life = new Button(new Vector(
            this.position.x,
            this.position.y
        ), ITEMS.LIFE, this.angle, this.size, this.size);
        life.sprite.pivot.x = -145;
        life.sprite.pivot.y = -this.size - 5;
        life.sprite.angle = this.angle;

        //Reflect
        let reflect = new Button(new Vector(
            this.position.x,
            this.position.y
        ), ITEMS.REFLECT, this.angle, this.size, this.size);
        reflect.sprite.pivot.x = -200;
        reflect.sprite.pivot.y = -this.size - 5;
        reflect.sprite.angle = this.angle;

        //Save buttons
        this.buttons = {wall: wall, rock: rock, life: life, reflect: reflect}
    }

    setLife(value){
        this.lifeText.setText(' ' + value + '%');
    }
}