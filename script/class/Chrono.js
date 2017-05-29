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
        this.precision = 0;

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
            let endValue = 0;
            this.text.setText('');
            if(this.callback)
                this.callback();
            this.callback = null;
            return;
        }

        if (!this.isPaused && this.isStarted) {

            let currentTime = Date.now();
            this.runTime = currentTime - this.startTime;
            this.secLeft = (this.max - this.runTime / 1000).toFixed(this.precision);

            if (this.secLeft  <= 0) {
                this.endTime = true;
                return;
            }

            this.text.setText(this.secLeft);
            this.text.x = this.position.x - this.text.width / 2;
            this.text.y = this.position.y - (this.text.height / 2) + 3;
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
        let value = this.max.toFixed(precision);
        this.text.setText(value);
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