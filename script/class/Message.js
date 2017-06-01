class Message {
    constructor(position) {

        this.position = position;

        this.box = game.add.physicsGroup();

        this.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",
            boundsAlignH: "middle",
            boundsAlignV: "center"
        };

        this.box.x = this.position.x;
        this.box.y = this.position.y;
        this.box.alpha = 0;

        this.speed = 1500;
    }

    update(){
        game.world.bringToTop(this.box);
    }

    alert(msg, callback = null) {

        this.box.scale.set(1);

        this.text = game.add.text(0, 0, msg, this.style);
        this.text.setShadow(0, 0, 'rgba(100,100,100,0.8)', 20);
        this.text.anchor.set(0.5);

        this.box.add(this.text);

        let twa = game.add.tween(this.box).to({alpha: 1}, this.speed, Phaser.Easing.linear, true, 500);
        let twb = game.add.tween(this.box.scale).to({x: 3, y: 3}, this.speed, Phaser.Easing.linear, true, 500);

        twb.onComplete.add(() => {
            this.text.destroy();
            this.hideMessage();
            setTimeout(() => {
                if(callback) {
                    callback();
                }
            }, 500);
        }, this);
    }

    hideMessage() {
        this.box.alpha = 0;
    }
}