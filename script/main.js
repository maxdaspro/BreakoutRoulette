// window.addEventListener("gamepadconnected", function(e) {
//   console.log("Contrôleur n°%d connecté : %s. %d boutons, %d axes.",
//   e.gamepad.index, e.gamepad.id,
//   e.gamepad.buttons.length, e.gamepad.axes.length);
// });

// window.addEventListener("gamepaddisconnected", function(e) {
//   console.log("Contrôleur n°%d déconnecté : %s",
//   e.gamepad.index, e.gamepad.id);
// });

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
        let chars = [' '];
        for (var i = 65; i <= 90; i++) {
            chars.push(String.fromCharCode(i));
        }
        chars.push('-');
        game.input.gamepad.start();

            
        game.input.gamepad._gamepads.forEach((gamepad, index) =>{

            // var check1 = document.querySelector('.checked-1-2');
            // var check2 = document.querySelector('.checked-3-4');
            // check1.setAttribute("class", "hidden");
            // check2.setAttribute("class", "hidden");

            gamepad.onConnectCallback = function(){


                let manette = document.querySelector('.manette');
                manette.classList.remove("disconnected");
                let champ = inputsHtml[index];
                champ.disabled = false;
                let cursor = champ.nextElementSibling.nextElementSibling;
                cursor.style.display = "block";
                let stringIndex = 0;
                let charIndex = 0;
                let maxSize = 9;
                let minSize = 1;
                let cursorStep = 14.2;

                function updateInput(champ, char){

                    let value = champ.value;
                    let str = value.substring(0, stringIndex) + char;
                    champ.value = str.trim();
                    
                }
                function increaseCursor(){                
                    if(stringIndex < maxSize){
                        cursor.style.left = (cursor.offsetLeft + cursorStep) + 'px';
                    }             
                }
                 function decreaseCursor(){
                    if(stringIndex >= 0){
                        cursor.style.left = 30 +  ((stringIndex) * cursorStep) + 'px';
                    }   
                }
                function removeInput(champ){

                    let value = champ.value;

                    champ.value = value.substring(0, stringIndex) + value.substring(stringIndex+1);
                    stringIndex = stringIndex > 0 ? stringIndex - 1 : 0;
                }

                gamepad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER).onDown.add(function(){
                    stringIndex = stringIndex > 0 ? stringIndex - 1 : 0;
                    decreaseCursor();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER).onDown.add(function(){

                    if(champ.value.length-1 < stringIndex){
                        return;
                    }
                    stringIndex = stringIndex < maxSize ? stringIndex + 1 : maxSize-1;
                    increaseCursor();
                });

                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP).onDown.add(function(){
                    if(champ.readOnly){
                        return;
                    } 
                   if(charIndex == 0){
                        charIndex = chars.length - 1;
                   }else{
                        charIndex --;
                   }
                   updateInput(champ, chars[charIndex]);
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN).onDown.add(function(){
                   if(champ.readOnly){
                        return;
                    } 
                   if(charIndex == chars.length - 1){
                        charIndex = 0;
                   }else{
                        charIndex ++;
                   }
                   updateInput(champ, chars[charIndex]);
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_0).onDown.add(function(){
                    
                    if(stringIndex < maxSize - 1){
                        if(chars[charIndex] !== ' '){
                            charIndex = 0;
                            stringIndex++;
                            updateInput(champ, chars[charIndex]);
                            increaseCursor();
                        }
                    }

                }); 
                // gamepad.getButton(Phaser.Gamepad.BUTTON_1).onDown.add(function(){
                //     console.log('pressed (B)');

                // });
                gamepad.getButton(Phaser.Gamepad.BUTTON_2).onDown.add(function(){
                    removeInput(champ);
                    decreaseCursor();
                });
                // gamepad.getButton(Phaser.Gamepad.BUTTON_3).onDown.add(function(){
                //     console.log('pressed (Y)');
                    

                // });
                 gamepad.getButton(Phaser.Gamepad.BUTTON_9).onDown.add(function(){
                    if(champ.value.length > minSize){
                        champ.readOnly = true;  
                        champ.classList.add("activited");
                        cursor.style.display = "none";
                        champ.nextElementSibling.classList.remove("hidden");
                        champ.style.color= '#5D5D5D';
                    }

                });
                  gamepad.getButton(Phaser.Gamepad.BUTTON_8).onDown.add(function(){
                    champ.readOnly = false;  
                    champ.nextElementSibling.classList.add("hidden");
                    champ.style.color= 'black';
                    cursor.style.display = "block";

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
