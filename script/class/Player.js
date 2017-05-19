class Player {
    constructor(name, angle) {

        this.name = name || 'none';
        this.color = 'none';

        this.score = null;
        this.number = null;
        this.findNumbers = [];

        this.angle = angle;

        this.canon = new Canon(new Vector(
            GLOBAL.HALFWIDTH,
            GLOBAL.HALFHEIGHT
        ), angle);
    }
    shoot(){
        this.canon.shoot();
    }

    getAbsAngle(){
        return Math.abs(this.canon.angle % 360)
    }

    canMove(direction, players){

        let myAngle = this.getAbsAngle();

        for(let key in players){
            let player = players[key];
            if(this !== player){
                console.log(myAngle);

                switch (direction.toLowerCase()) {
                    case 'left':
                        return myAngle > player.getAbsAngle() - 10;
                        break;
                    case 'right':
                        return myAngle < player.getAbsAngle() - 10;
                        break;
                }


            }
        }

        return true;
    }
}