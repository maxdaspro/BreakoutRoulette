class Roulette{

    constructor(position){

        this.position = position;

        this.center = Helper.Phaser.drawPoint(position, 0xA6AAB0, 160);
        this.center.alpha = 0;

        // Helper.Phaser.drawPoint(position, 0xFF0000, 1);
    }
}