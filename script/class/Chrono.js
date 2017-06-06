class Chrono {
    constructor(position) {

        this.startTime = Date.now();
        this.runTime;
        this.max = 10;
        this.msLeft = 0;
        this.endTime = false;
        this.isPaused = false
        this.startPauseTime = 0;
        this.pauseTime = 0;
        this.isStarted = false;
        this.position = position;
        this.precision = 0;

        this.triggers = [];

        this.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",
            boundsAlignH: "middle",
            boundsAlignV: "center"
        };

        this.text = game.add.text(0, 0, '', this.style);
    }

    update() {

        if (this.endTime) {
            this.endTime = false;
            this.text.setText('');
            if (this.callback) {
                this.callback();
            }
            this.callback = null;
            return;
        }

        if (!this.isPaused && this.isStarted) {

            let currentTime = Date.now();
            this.runTime = currentTime - this.startTime;
            this.msLeft = this.max - this.runTime;

            if (this.msLeft * 0.001 > 0) {
                /*triggers*/
                for (let i = 0; i < this.triggers.length; i++) {
                    let trigger = this.triggers[i];

                    if (trigger.ms && this.msLeft <= trigger.ms) {
                        trigger.callback();

                        this.triggers.splice(i--, 1);
                    }
                }

                let val = (this.msLeft * 0.001).toFixed(this.precision);
                 this.text.setText(val > 0 ? val : '');
                this.text.x = this.position.x - this.text.width / 2;
                this.text.y = this.position.y - (this.text.height / 2) + 3;
            }
            else {
                this.endTime = true;
                return;
            }


        }
    }

    pause() {
        this.isPaused = true;
        this.startPauseTime = Date.now();
    }

    resume() {
        this.isPaused = false;
        let currentTime = Date.now();
        this.pauseTime = (currentTime - this.startPauseTime);
        this.startTime += this.pauseTime;
    }

    start(sec, callback = null, precision = 1, params = {}) {
        this.max = sec * 1000;
        let value = this.max.toFixed(precision);
        this.text.setText(value);
        this.precision = precision;
        this.endTime = false;
        this.callback = callback;
        this.isStarted = true;
        this.startTime = Date.now();

        for (let key in params) {

            switch (key) {
                case 'triggers':
                    this.triggers = params[key];
                    break;
                default:
                    break;
            }
        }
    }

    stop() {
        this.pause();
    }
}