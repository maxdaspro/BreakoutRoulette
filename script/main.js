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

    $('#interface #content').load('template/menu.phtml', () => {

        let inputsHtml = $('#interface #formulaire input[name*=player]');
        //Check inputsHtml

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
        let chars = [''];
        for (var i = 65; i <= 90; i++) {
            chars.push(String.fromCharCode(i));
        }
        chars.push('_');
        console.log(chars);
        game.input.gamepad.start();

        game.input.gamepad._gamepads.forEach((gamepad, index) =>{

            console.log(gamepad);

            gamepad.onConnectCallback = function(){
                console.log('connected');
                let champ = inputsHtml[index];
                champ.disabled = false;
                let stringIndex = 0;
                let charIndex = 0;
                let indexMax = 3;

                function updateInput(champ, char){

                    let value = champ.value;

                    let str = value.substring(0, stringIndex) + char;
                    
                    // if(value.length - 1 > stringIndex){
                    //     str += value.substring(stringIndex + 1);
                    // }

                    champ.value = str;
                    
                }
                function removeInput(champ){

                    console.log(stringIndex)

                    let value = champ.value;

                    stringIndex = stringIndex > 0 ? stringIndex-1 : 0;
                    champ.value = value.substring(0, stringIndex) + value.substring(stringIndex+1);

                }
                
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT).onDown.add(function(){
                    
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT).onDown.add(function(){
         
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP).onDown.add(function(){
                   if(charIndex == 0){
                        charIndex = chars.length - 1;
                   }else{
                        charIndex --;
                   }
                   updateInput(champ, chars[charIndex]);
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN).onDown.add(function(){
                   
                   if(charIndex == chars.length - 1){
                        charIndex = 0;
                   }else{
                        charIndex ++;
                   }
                   updateInput(champ, chars[charIndex]);
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_0).onDown.add(function(){
                    
                    charIndex = 0;
                    stringIndex++;
                    updateInput(champ, chars[charIndex]);
                    console.log(stringIndex)

                }); 
                gamepad.getButton(Phaser.Gamepad.BUTTON_1).onDown.add(function(){
                    console.log('pressed (B)');

                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_2).onDown.add(function(){
                    console.log('pressed (X)');
                    removeInput(champ);
                    

                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_3).onDown.add(function(){
                    console.log('pressed (Y)');
                    

                });
                 gamepad.getButton(Phaser.Gamepad.BUTTON_9).onDown.add(function(){
                    console.log('pressed (START)');
                    champ.readOnly = true;                  
                });
            }
        });


        //Get players name
        $(this).find('#play').on('click', () => {

            playerNames = [];

            inputsHtml.each(function (index, input) {
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
