class Player {
    constructor(name, angle, stepAngle, color, position, scoreOutput, statsOutput) {

        this.name = name || 'none';
        this.color = color || 0x555555;

        this.scoreOutput = scoreOutput;
        this.statsOutput = statsOutput;

        this.scoreOutput.name.innerText = this.name;
        this.statsOutput.name.innerText = this.name;

        this.score = 0;
        this.scoreBase = 200;
        this.hits = 0;
        this.stats = 0;
        this.statsProgress = [];
        this.level = 1;
        this.number = 0;
        this.findNumber = 0;
        this.position = position;

        this.min = 9;
        this.max = 27;

        this.startAngle = angle;
        this.angle = angle;
        this.stepAngle = stepAngle;

        this.canon = new Canon(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ), this.angle, this.stepAngle, this.color, this);

        this.timer = 0;
        this.speed = 100;
        this.locked = false;
        this.shortMove = false;

        this.paused = true;

        this.xGroup = game.add.group();
        this.wrongWay = game.add.sprite(0, 0, "wrongway");
        this.wrongWay.angle = 90;
        this.wrongWay.anchor.setTo(0.5);
        // x.angle = this.angle + (this.stepAngle * 0.5);
        this.xGroup.add(this.wrongWay);
        this.xGroup.x = GLOBAL.HALFWIDTH;
        this.xGroup.y = GLOBAL.HALFHEIGHT;
        this.xGroup.pivot.x = 375;
        this.xGroup.pivot.y = 0;
        this.xGroup.angle = this.angle + this.stepAngle * 0.5;
        this.xGroup.alpha = 0;
    }

    update() {

        this.canon.text.setText(this.findNumber - this.number);

        this.timer += game.time.physicsElapsed * 1000;

        if (this.timer >= this.speed) {
            this.timer = 0;
            this.locked = true;
        } else {
            this.locked = false;
        }

        this.canon.update();
        this.displayScore();
        this.displayStats();
    }

    shoot() {
        if (this.paused) return;
        this.canon.shoot();
    }

    getLeftAngle() {
        return this.angle < 0 ? 360 + this.angle : this.angle;
    }

    getRightAngle() {
        return this.angle > 0 ? -360 + this.angle : this.angle;
    }

    turn(direction, longPress) {
        if (this.paused || !this.canMove(direction)) return;

        if (longPress && this.locked) {
            this.canon.turn(direction)
            this.angle = this.canon.angle;
            return;
        }
        if (!this.shortMove) {
            this.shortMove = true;
            this.canon.turn(direction)
            this.angle = this.canon.angle;
        }
        this.xGroup.angle = this.angle + this.stepAngle * 0.5;
    }

    // processScore() {
    //
    //     let target = null;
    //
    //     for (let i = roulette.lines - 1; i >= 0; i--) {
    //         let lines = roulette.items[i];
    //
    //         for (let j = 0; j < lines.length; j++) {
    //             let item = lines[j];
    //
    //             if (this.getLeftAngle() - this.stepAngle * 0.5 === item.angle && item.sprite.alive) {
    //                 item.text.setText(item.number);
    //                 if(target === null) {
    //                     target = item;
    //                 }
    //             }
    //         }
    //     }
    //
    //     if(target !== null){
    //
    //         if(target.number >= -3) {
    //             // console.log(target.number);
    //
    //             target.text.setText(this.findNumber - target.number);
    //         }
    //     }
    // }

    canMove(direction) {
        let result = true;

        for (let key in players) {
            let player = players[key];

            // if (player !== this && !player.paused) {
            if (player !== this) {

                let angle;

                switch (direction.toLowerCase()) {
                    case 'left':

                        angle = this.getLeftAngle() + this.stepAngle;
                        angle %= 360;

                        result &= (angle !== player.getLeftAngle());
                        break;
                    case 'right':

                        angle = this.getRightAngle() - this.stepAngle;
                        angle %= 360;

                        result &= (angle !== player.getRightAngle());
                        break;
                }
            }
        }
        return result;
    }

    resetStartPosition() {
        this.canon.setAngle(this.startAngle)
        this.angle = this.startAngle;
    }

    /**
     * Génère un nombre aléatoirement selon le niveau
     * @return {[type]} [description]
     */
    generateNumber() {
        this.number = 0
        this.findNumber = Helper.randomValue(this.min, this.max)
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
        this.statsOutput.stats.innerText = this.stats + '%';
    }

    /**
     * augmente le niveau, efface le score, affiche un nouveau numéro
     * @param {[type]} number [description]
     */
    checkScore(number) {



        /**
         * SAUVE TOUTES LES STATS ET FAIRE AVG POUR AFFICHAGE
         */

        if (number === -4 || number === -5 || number === -7 || typeof number === NaN) {
            return;
        }

        this.hits++;
        this.number += number;

        if (number == -6) {
            this.number = this.findNumber;
        }
        if (this.number < 0) {
            this.number = 0;
        }
        if (this.number > this.findNumber) {
            errorSound.play();
            this.canon.sprite.tint = 0xE9190F;
            setTimeout(this.enable.bind(this), 800);
            PlayState.shake.shake(5, this.canon.container);
        }

        if (this.number >= this.findNumber) {

            if (this.number === this.findNumber) {
                this.level++;
                this.score += Math.ceil(this.scoreBase / this.hits);
                this.hits = 0;
                okSound.play();
                this.canon.sprite.tint = 0x6BD425;
                setTimeout(this.enable.bind(this), 800);
                PlayState.shake.shake(5, this.canon.container);
            }

            if (this.score > 0) {

                this.statsProgress.push(Math.ceil((1 - (this.level / this.score)) * 100));

                let total = 0;
                for (let i = 0; i < this.statsProgress.length; i++) {
                    total += this.statsProgress[i];
                }

                this.stats = Math.round(total / this.statsProgress.length);
            }

            this.number = 0;
            this.generateNumber();
        }

    }

    show() {
        this.canon.sprite.alpha = 1;
    }

    hide() {
        this.canon.sprite.alpha = 0;
    }

    enable() {
        this.paused = false;
        this.show();
        this.canon.sprite.tint = this.canon.color;
    }

    disable() {
        this.paused = true;
        this.canon.locked();
    }

    freeze() {
        this.canon.sprite.tint = 0x92CCF4;
        this.paused = true;
        setTimeout(this.enable.bind(this), 3000);
    }

    showWrongWay() {
        this.xGroup.angle = this.angle + this.stepAngle * 0.5;
        this.xGroup.alpha = 0.9;
    }

    hideWrongWay() {
        this.xGroup.alpha = 0;
    }
}