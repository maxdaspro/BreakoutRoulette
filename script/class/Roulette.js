class Roulette{

    constructor(position){

        this.position = position;

        this.center = Helper.Phaser.drawPoint(position, 0xA6AAB0, 160);
        this.center.alpha = 0;
        this.chrono = new Chrono(new Vector(
	        		GLOBAL.HALFWIDTH,
	        		GLOBAL.HALFHEIGHT
    				))

        // Helper.Phaser.drawPoint(position, 0xFF0000, 1);
         this.clickBefore = {
            body: null,
            content: 'cliquez pour lancer le jeu',
            style: {font: "50px Arial",
            		fill: "#1C2ADD",
            		align: "center",
            		boundsAlignH: "top",
            		boundsAlignV: "top"},
            x: this.position.x - 265,
            y: this.position.y - 350
        };

        this.clickBefore = game.add.text(
            this.clickBefore.x,
            this.clickBefore.y,
            this.clickBefore.content,
            this.clickBefore.style
        );

        game.input.onDown.addOnce(this.removeText, this);
    }
    removeText(){
        this.clickBefore.destroy();
        this.chrono.start();
    }   
    
    update(){

    	this.chrono.update();
    }
    
}