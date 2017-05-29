class Message {
    constructor(position) {

/*        this.startTime = Date.now();
        this.runTime;
        this.max = 10;
        this.secLeft = 0;
        this.endTime = false;
        this.isPaused = false
        this.startPauseTime = 0;
        this.pauseTime = 0;
        this.isStarted = false;*/
        this.position = position;
        /*        this.precision = 1;*/
        let rectangle = new Phaser.Rectangle(125,335,600,200);
            //  Create a BitmapData just to plot the points to
        this.bmd = game.add.bitmapData(game.width, game.height);

        this.bmd.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height, '#2d2d2d');

    //  Draw the 9 points that getPoint can return

        let p = new Phaser.Point();

        rectangle.getPoint(Phaser.TOP_LEFT, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.TOP_CENTER, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.TOP_RIGHT, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.MIDDLE_LEFT, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.MIDDLE_CENTER, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.MIDDLE_RIGHT, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.BOTTOM_LEFT, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.BOTTOM_CENTER, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        rectangle.getPoint(Phaser.BOTTOM_RIGHT, p);
        this.bmd.rect(p.x, p.y, 2, 2, '#ff00ff');

        this.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",
            boundsAlignH: "middle",
            boundsAlignV: "center"
        };
        
        
    }

    viewMessage(message) {
        this.bmd.addToWorld();
        this.text = game.add.text(0, 0, '', this.style);
        this.text.setText(message);
        this.text.x = this.position.x - this.text.width / 2;
        this.text.y = this.position.y - (this.text.height / 2) + 3;
    }

    removeMessage() {
        this.text.setText(" ");
    }

}