class Player {
    constructor(name, angle, stepAngle, color, position, scoreOutput, statsOutput) {

        this.name = name || 'none';
        this.color = color || 0x555555;

        this.scoreOutput = scoreOutput;
        this.statsOutput = statsOutput;

        this.scoreOutput.name = this.name;
        this.statsOutput.name.innerText = this.name;

        this.score = 0;
        this.level = 1;
        this.number = 0;
        this.findNumber = 0;
        this.position = position;

        this.angle = angle;
        this.stepAngle = stepAngle;

        this.canon = new Canon(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ), this.angle, this.stepAngle, this.color, this);

        this.timer = 0;
        this.speed = 100;
        this.canMove = false;
        this.shortMove = false;

        this.paused = false;
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
        if(this.paused) return;
        this.canon.shoot();
    }

    getLeftAngle() {
        return this.angle < 0 ? 360 + this.angle : this.angle;
    }

    getRightAngle() {
        return this.angle > 0 ? -360 + this.angle : this.angle;
    }

    turn(direction, longPress) {
        if(this.paused) return;

        if(longPress && this.canMove){
            console.log('long')
            this.canon.turn(direction)
            this.angle = this.canon.angle;
            return;
        }
        if(!this.shortMove){
            console.log('short')
            this.shortMove = true;
            this.canon.turn(direction)
            this.angle = this.canon.angle;
        }
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
    generateNumber() {
        this.findNumber = Helper.randomValue(20, 50)
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
        this.statsOutput.level.innerText = this.level;
        this.statsOutput.score.innerText = this.score;
        this.statsOutput.stats.innerText = '...';
    }

    /**
     * augmente le niveau, efface le score, affiche un nouveau numéro
     * @param {[type]} number [description]
     */
    checkScore(number) {

        this.number += number;

        if (this.number === this.findNumber) {
            this.score++;
            this.paused = true;
        }
    }
}