const GLOBAL = {
    WIDTH: 864,
    HEIGHT: 864,
    DIR: {
        IMAGE: './assets/img/'
    }
};
GLOBAL.HALFWIDTH = GLOBAL.WIDTH / 2;
GLOBAL.HALFHEIGHT = GLOBAL.HEIGHT / 2;

var game = new Phaser.Game(GLOBAL.WIDTH, GLOBAL.HEIGHT, Phaser.AUTO, 'game');

game.state.add('play', PlayState);

let playerNames = [];
let scoreOutPuts = [];
let statsOutputs = [];

for (let i = 1; i < 4; i++) {
    scoreOutPuts.push(
        {
            name: document.querySelector('#scores #p' + i + ' .name'),
            number: document.querySelector('#scores #p' + i + ' .number'),
            findNumber: document.querySelector('#scores #p' + i + ' .findNumber'),
            level: document.querySelector('#scores #p' + i + ' .level'),
        }
    );
    statsOutputs.push(
        {
            name: document.querySelector('#stats #p' + i + ' .name'),
            number: document.querySelector('#stats #p' + i + ' .number'),
            findNumber: document.querySelector('#stats #p' + i + ' .findNumber'),
            level: document.querySelector('#stats #p' + i + ' .level'),
        }
    );
}

//Starting menu
$(document).ready(function () {

    $('#interface #content').load('template/menu.phtml', () => {

        let inputs = $('#interface #formulaire input[name*=player]');

        //Check inputs
        inputs.each(function (index, input) {
            $(input).on("blur", () => {
                for (var j = 0; j < inputs.length; j++) {
                    if (inputs[j] !== this && inputs[j].value === '') {
                        if (this.value.length >= 1) {
                            inputs[j].disabled = false;
                            inputs[j].focus();
                            return;
                        }
                    }
                }
            });
        });

        //Get players name
        $(this).find('#play').on('click', () => {

            playerNames = [];

            inputs.each(function (index, input) {
                let name = $(input).val();

                if (name.length > 1) {
                    playerNames.push(name);
                }
            });

            if (playerNames.length > 1) {
                $('#interface').hide()
                game.state.start('play');
            }
        })
    });
});
