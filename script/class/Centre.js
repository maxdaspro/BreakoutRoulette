class Centre {
    constructor(position) {

        this.position = position;

        this.sprite = game.add.sprite(this.position.x, this.position.y, 'centre');

        game.physics.arcade.enable(this.sprite);

        this.sprite.alpha = 1


        this.sprite.anchor.set(0.5, 0.5);

        this.angle = 0;

        this.speed = .4;

        this.towers = [];
        this.cases = [];
        this.centerBoardItems = [];
        this.selectedItem = ITEMS.LIFE;


        for (let i = 0; i < 4; i++) {
            this.towers[i] = new Tower(position, i * 90, -130, this.speed);
        }

        for (let i = 0; i < 4; i++) {
            this.cases[i] = new Case(position, (i * 90) + 45, -130, this.speed);
        }

        //Button click
        for (let i = 0; i < this.cases.length; i++) {
            let c = this.cases[i];

            c.sprite.inputEnabled = true;
            c.sprite.input.pixelPerfectOver = true;
            c.sprite.input.useHandCursor = true;

            c.sprite.events.onInputDown.add(() => {
                console.log('click case', i);
                let item = new Item(this.selectedItem, i);
                //item.show(position, i * 90, -130, this.speed);
                item.show(position, this.cases[i].angle, -125, this.speed);
                this.centerBoardItems.push(item);
                console.log(item);
            }, this);
        }

    }

    update() {
        this.turn('left')

        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i].turn('left')
        }
        for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].turn('left')
        }
        for (let i = 0; i < this.centerBoardItems.length; i++) {
            this.centerBoardItems[i].turn('left')
        }

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
