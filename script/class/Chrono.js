class Chrono {
    constructor(position) {

        this.startTime = Date.now();
        this.runTime;
        this.max =10;
        this.secLeft = 0;
        this.endTime = false;
        this.isPaused = false
        this.startPauseTime = 0;
        this.pauseTime = 0;
        this.isStarted = false;
        this.position = position;
    	this.sprite = game.add.sprite(this.position.x - 56, this.position.y - 56, 'chronom');
    	this.sprite.alpha = 1;

        let text = {
            body: null,
            content: '',
            style: {font: "40px Arial",
            		fill: "#ffffff",
            		align: "center",
            		boundsAlignH: "top",
            		boundsAlignV: "top"},
            x: this.position.x -30,
            y: this.position.y - 26
        };

        text.body = game.add.text(
            text.x,
            text.y,
            text.content,
            text.style
        );
        text.body.fixedToCamera = true;

        this.text = text;

       }
    update() {
   
        if (!this.isPaused && this.isStarted) {

        	//Compte à rebourd
            let currentTime = Date.now();
            this.runTime = currentTime - this.startTime;
            this.secLeft =  this.max - this.runTime / 1000 ;
            this.text.body.setText(this.secLeft.toFixed(1));

            //si égale à 0
            if((this.max - this.runTime / 1000) <= 0){

            	this.endTime = true;
            }
            // if((this.max - this.runTime / 1000) <= 10){

            // }
            if(this.endTime == true){

            	this.text.body.setText('0.0');
        		this.sprite.tint = 0xF70404;
        		game.add.text(
        			this.text.x,
        			this.text.y,
        			this.text.content,
        			this.text.style
        			);
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
    start(){
        this.isStarted = true;
        this.startTime = Date.now();
        
    } 
}