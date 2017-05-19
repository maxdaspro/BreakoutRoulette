class Button{

    constructor(position, item, angle, width = 32, height = 32){

        this.position = position;

        this.type = item.name.toUpperCase();
        this.name = item.name;

        this.sprite = game.add.sprite(this.position.x, this.position.y, item.btn);

        game.physics.arcade.enable(this.sprite);

        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.width = width;
        this.sprite.height = height;
    }
}