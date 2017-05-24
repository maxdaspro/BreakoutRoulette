class Chrono {
    constructor(position) {

        this.startTime = Date.now();
        this.runTime;
        this.max = 10;
        this.secLeft = 0;
        this.endTime = false;
        this.isPaused = false
        this.startPauseTime = 0;
        this.pauseTime = 0;
        this.isStarted = false;
        this.position = position;
        this.precision = 1;

        this.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        this.content = '';
        this.text = game.add.text(0, 0, this.content, this.style);
    }

    update() {

        if (this.endTime) {
            let endValue = 0;
            this.text.setText(endValue.toFixed(this.precision));
            this.callback();
            return;
        }

        if (!this.isPaused && this.isStarted) {

            let currentTime = Date.now();
            this.runTime = currentTime - this.startTime;
            this.secLeft = (this.max - this.runTime / 1000).toFixed(this.precision);
            this.text.setText(this.secLeft < 10 ? ' ' + this.secLeft : this.secLeft);

            if ((this.max - this.runTime / 1000) <= 0) {
                this.endTime = true;
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

    start(sec, callback = null, precision = 1) {
        this.max = sec;
        this.text.setText(this.max.toFixed(precision));
        this.text.x = this.position.x - (this.text.width / 2);
        this.text.y = this.position.y - (this.text.height / 2) + 3;
        this.precision = precision;
        this.endTime = false;
        this.callback = callback;
        this.isStarted = true;
        this.startTime = Date.now();
    }
    stop() {
        this.pause();
    }
}