class Roulette{

    constructor(position){

        this.position = position;

        this.center = Helper.Phaser.drawPoint(position, 0xA6AAB0, 150);
        Helper.Phaser.drawPoint(position, 0xFF0000, 2);
    }
}