class Player {
    constructor(name, angle, color) {

        this.name = name || 'none';
        this.color = color || 0x555555;

        this.score = null;
        this.number = null;
        this.findNumbers = [];

        this.angle = angle;

        this.widthAngle = 8;

        this.score = 0;
        this.scoreText;
        this.scoreStyle = { font: "60px Arial", fill: "white", align:"center",boundsAlignH: "top",boundsAlignV:"top"};

        this.numberText;
        this.numberStyle = { font: "30px Arial", fill: "white", align:"center",boundsAlignH: "top",boundsAlignV:"top"};

        this.canon = new Canon(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ), angle, this.color);
    }

    update() {

        this.canon.update();

        for (let key in players) {
            let player = players[key];

            if (player !== this) {
                game.physics.arcade.collide(player.canon.sprite, this.canon.sprite, this.collideCanon.bind(this, player));
            }
        }
    }

    collideCanon(player1, player2, cSprite1, cSprite2) {
        console.log('collide');
    }

    shoot() {
        this.canon.shoot();
    }

    getLeftAngle() {
        return this.angle < 0 ? 360 + this.angle : this.angle;
    }

    getRightAngle() {
        return this.angle > 0 ? -360 + this.angle : this.angle;
    }

    turn(direction) {
        // if (this.canMove(direction)) {
        this.canon.turn(direction)
        this.angle = this.canon.angle;
        // }
    }

    turnFinished() {
        this.canon.turnFinished();
    }

    canMove(direction) {

        let result = true;

        for (let key in players) {
            let player = players[key];

            if (player !== this) {
                // console.log(this.name, this.getLeftAngle(), this.getRightAngle());
                // console.log(player.name, player.getLeftAngle(), player.getRightAngle());

                switch (direction.toLowerCase()) {
                    case 'left':
                        result &= this.getLeftAngle() < player.getLeftAngle() - this.widthAngle || this.getLeftAngle() > player.getLeftAngle();
                        break;
                    case 'right':
                        result &= this.getRightAngle() > player.getRightAngle() + this.widthAngle || this.getRightAngle() < player.getRightAngle();
                        break;
                }
            }
        }
        return result;
    }

/*    displayScore(){ 
        this.text = game.add.text(this.position.x, this.position.y, this.score, this.style);
        this.text.anchor.set( .5, .5);
        this.text.rotation *= this.angle;
    }*/

    displayNumber(x,y){
        this.numberText = game.add.text(
            x,
            y,
            Helper.randomValue(1,100), 
            this.numberStyle
        );
        this.numberText.anchor.set( .5, .5);
        this.numberText.rotation *= this.angle;
    }

    displayScore(x,y){ 
        this.scoreText = game.add.text(
            x,
            y,
            this.score, 
            this.scoreStyle
        );
        this.scoreText.anchor.set( .5, .5);
        this.scoreText.rotation *= this.angle;
    }

}