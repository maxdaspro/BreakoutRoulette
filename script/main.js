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

game.launched = false;
game.state.add('play', PlayState);

let playerNames = {};
let scoreOutPuts = [];
let statsOutputs = [];

for (let i = 1; i <= 4; i++) {
    scoreOutPuts.push(
        {
            name: document.querySelector('#scores #scores-p' + i + ' .name'),
            number: document.querySelector('#scores #scores-p' + i + ' .number'),
            findNumber: document.querySelector('#scores #scores-p' + i + ' .findNumber'),
            level: document.querySelector('#scores #scores-p' + i + ' .level'),
        }
    );
    statsOutputs.push(
        {
            name: document.querySelector('#stats #stats-p' + i + ' .name'),
            level: document.querySelector('#stats #stats-p' + i + ' .level'),
            score: document.querySelector('#stats #stats-p' + i + ' .score'),
            stats: document.querySelector('#stats #stats-p' + i + ' .stats'),
        }
    );
}

//Starting menu
$(document).ready(function () {

    let inputEditors = [];
    let globalReady = false;
    $('#interface #content').load('template/restart.phtml', () => {

    });
/*    $('#interface #content').load('template/menu.phtml', () => {

        let inputsHtml = $('#interface #formulaire input[name*=player]');

        inputsHtml.each(function (index, input) {
            $(input).on("blur", () => {
                for (var j = 0; j < inputsHtml.length; j++) {
                    if (inputsHtml[j] !== this && inputsHtml[j].value === '') {
                        if (this.value.length >= 1) {
                            inputsHtml[j].disabled = false;
                            inputsHtml[j].focus();
                            return;
                        }
                    }
                }
            });
        });

        
        game.input.gamepad.start();

            
        game.input.gamepad._gamepads.forEach((gamepad, index) =>{

            gamepad.onConnectCallback = function(){

                let champ = inputsHtml[index];
                champ.disabled = false;
                
                let manette = champ.parentNode.querySelector('.manette');
                manette.classList.remove("disconnected");

                let playButton = document.getElementById("play");

                let inputEditor = new InputEditor(champ);

                inputEditors.push(inputEditor);

                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP).onDown.add(function(){
                    if(game.launched) return;
                    inputEditor.previousChar();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN).onDown.add(function(){
                    if(game.launched) return;
                    inputEditor.nextChar();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_0).onDown.add(function(){
                    if(game.launched) return;                    
                    inputEditor.addChar();
                }); 
                gamepad.getButton(Phaser.Gamepad.BUTTON_2).onDown.add(function(){
                    if(game.launched) return;
                    inputEditor.removeChar();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER).onDown.add(function(){
                    if(game.launched) return;
                    inputEditor.moveLeft();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER).onDown.add(function(){
                    if(game.launched) return;
                    inputEditor.moveRight();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_8).onDown.add(function(){
                    if(game.launched) return;
                    inputEditor.cancel();
                    startCheck();

                });
                 gamepad.getButton(Phaser.Gamepad.BUTTON_9).onDown.add(function(){
                    if(game.launched) return;

                    inputEditor.valid();

                    if(globalReady){
                        launchGame();
                    }
                    startCheck();
                });

                function startCheck(){
                    let ready = true;

                    for (var i = 0; i < inputEditors.length; i++) {
                        ready &= inputEditors[i].ready;
                    }
                    if(ready){
                        playButton.value = "Press start";
                        playButton.classList.add('ready');
                    }
                    else{
                        playButton.value = "Waiting..";
                        playButton.classList.remove('ready');
                    }
                    globalReady = ready;
                }
            }
        });

        function launchGame(){
            game.input.gamepad._gamepads.forEach((gamepad, index) =>{
                gamepad.reset();
            });
            document.getElementById("interface").classList.add('hidden');

            playerNames = [];

            for(let i=0; i< inputsHtml.length; i++){
                let input = inputsHtml[i];

                let name = input.value;

                if (name.length >= 1) {
                    playerNames.push(name);
                }
            }

            game.state.start('play');
        }

        //Get players name
        $(this).find('#play').on('click', () => {

            playerNames = {};

            inputsHtml.each(function (index, input) {
                let name = $(input).val();

                if (name.length >= 1) {
                    playerNames[Math.random()] = name;
                }
            });

            if (playerNames.length > 1) {
               launchGame();
            }
        })
    });*/
});
