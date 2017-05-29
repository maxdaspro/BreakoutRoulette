class Message {
    constructor(position) {

        this.position = position;       
        this.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center",
            boundsAlignH: "middle",
            boundsAlignV: "center"
        };   
        
    }

    viewMessage(message, bloc) {
        this.text = game.add.text(0, 0, '', this.style);
        this.text.setText(message);
        this.text.x = this.position.x - this.text.width / 2;
        this.text.y = this.position.y - (this.text.height / 2) + 3;
        this.bloc = bloc;
        //this.bloc.innerHTML = this.text._text;
        this.bloc.classList.remove("hidden");
    }

    removeMessage(bloc) {
        this.text.setText(" ");
        this.bloc = bloc;
        this.bloc.classList.add("hidden");
    }

}