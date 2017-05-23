class Player {
    constructor(name, angle, stepAngle, color, position) {

        this.name = name || 'none';
        this.color = color || 0x555555;

        this.score = 0;
        this.number = null;
        this.position = position;

        this.findNumbers = [];

        this.angle = angle;
        this.stepAngle = stepAngle;

        this.widthAngle = 8;

        this.level;
        this.score = 0;
        this.scoreText;
        this.scoreStyle = { font: "70px Arial", fill: "white", align:"center",boundsAlignH: "top",boundsAlignV:"top"};

        this.numberText;
        this.numberStyle = { font: "30px Arial", fill: "white", align:"center",boundsAlignH: "top",boundsAlignV:"top"};

        this.canon = new Canon(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ), this.angle, this.stepAngle, this.color, this);

        this.displayScore();
        this.displayNumber();
    }

    update() {

        this.canon.update();
        this.displayScore();

        // for (let key in players) {
        //     let player = players[key];
        //
        //     if (player !== this) {
        //         game.physics.arcade.collide(player.canon.sprite, this.canon.sprite, this.collideCanon.bind(this, player));
        //     }
        // }
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

    /**
     * Génère un nombre suivant le niveau
     * @return {[type]} [description]
     */
    getNumber(){
        switch (this.level) {
            case 1:
                return Helper.randomValue(10,25)
                break;
            case 2:
                return Helper.randomValue(20,45)
                break;
            case 3:
                return Helper.randomValue(30,60)
                break;
            case 4:
                return Helper.randomValue(40,80)
                break;
            case 5:
                return Helper.randomValue(50,100)
                break;
            default:
                return Helper.randomValue(1,15)
                break;
        }
    }

    /**
     * affiche le nombre à atteindre
     * @param  {[type]} x position en x du nombre
     * @param  {[type]} y position en y du nombre
     * @return {[type]}   [description]
     */
    displayNumber(){
        this.numberText = game.add.text(
            this.position.x,
            this.position.y + 45,
            this.getNumber(), 
            this.numberStyle
        );
        this.numberText.anchor.set( .5, .5);
    }

    /**
     * calcul du score
     * @param  {[type]} score [description]
     * @return {[type]}       [description]
     */
    setScore(score){
        this.score += score;
        return this.score;
    }

    /**
     * affiche le score du joueur
     * @param  {[type]} x position en x du score
     * @param  {[type]} y position en y du score
     * @return {[type]}   [description]
     */
    displayScore(){ 
        this.scoreText = game.add.text(
            this.position.x,
            this.position.y,
            this.score, 
            this.scoreStyle
        );
        this.scoreText.anchor.set( .5, .5);
    }

    removeScore(){
        this.scoreText.destroy();
    }
}