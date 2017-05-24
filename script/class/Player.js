class Player {
    constructor(name, angle, stepAngle, color, position, scoreOutput, statsOutput) {

        this.name = name || 'none';
        this.color = color || 0x555555;

        this.scoreOutput = scoreOutput;
        this.statsOutput = statsOutput;

        scoreOutput.name = this.name;

        this.score = 0;
        this.level = 1;
        this.number = 0;
        this.findNumber = 0;
        this.position = position;

        this.findNumbers = [];

        this.angle = angle;
        this.stepAngle = stepAngle;

        this.canon = new Canon(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ), this.angle, this.stepAngle, this.color, this);

        this.timer = 0;
        this.speed = 100;
        this.canMove = false;
        this.canShortMove = false;
    }

    update() {

        this.timer += game.time.physicsElapsed * 1000;

        if (this.timer >= this.speed) {
            this.timer = 0;
            this.canMove = true;
        }else{
            this.canMove = false;
        }

        this.canon.update();
        this.displayScore();
        this.displayStats();
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

    turn(direction, longPress) {
        if(longPress && !this.canMove){
            return;
        }
        this.canon.turn(direction)
        this.angle = this.canon.angle;
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
     * Génère un nombre aléatoirement selon le niveau
     * @return {[type]} [description]
     */
    getNumber() {
        switch (this.level) {
            case 1:
                this.findNumber = Helper.randomValue(100, 120)
                break;
            case 2:
                this.findNumber = Helper.randomValue(120, 140)
                break;
            case 3:
                this.findNumber = Helper.randomValue(140, 160)
                break;
            case 4:
                this.findNumber = Helper.randomValue(160, 180)
                break;
            case 5:
                this.findNumber = Helper.randomValue(180, 200)
                break;
            default:
                this.findNumber = Helper.randomValue(200, 300)
                break;
        }
    }

    /**
     * affiche le score
     * @return {[type]} [description]
     */
    displayScore() {

        this.scoreOutput.number.innerText = this.number;
        this.scoreOutput.findNumber.innerText = this.findNumber;
        this.scoreOutput.level.innerText = this.level;
    }

    /**
     * affiche le nombre à atteindre
     * @return {[type]} [description]
     */
    displayStats() {

    }

    /**
     * augmente le niveau, efface le score, affiche un nouveau numéro
     * @param {[type]} number [description]
     */
    checkScore(number) {

        this.number += number;

        if (this.number === this.findNumber) {
            this.level++;
            this.score++;
            this.getNumber();
        }
    }
}