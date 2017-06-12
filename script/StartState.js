var StartState = {};


StartState.preload = function () {
    game.load.audio('menuStart', 'assets/audio/cheap-flash-game.mp3');
}

StartState.create = function () {

    console.log('StartState');

    menuStartSound = game.add.audio('menuStart');

    game.sound.setDecodedCallback([
        menuStartSound
    ], StartState.update, this);

    clearGamepadsEvents();

    //Starting menu
    $(document).ready(function () {

        $('#toucheAide').load('template/aideToucheStart.phtml');

        let inputEditors = [];
        let globalReady = false;
        menuStartSound.loopFull(0.4);
        $('#interface #content').load('template/menu.phtml', () => {

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

            game.input.gamepad._gamepads.forEach((gamepad, index) => {

                if (gamepad.connected) {
                    bindMenuControls(gamepad, index);
                } else {
                    gamepad.onConnectCallback = function () {
                        bindMenuControls(gamepad, index);
                    }
                }
            });

            function bindMenuControls(gamepad, index) {

                let champ = inputsHtml[index];

                champ.disabled = false;

                let manette = champ.parentNode.querySelector('.manette');
                manette.classList.remove("disconnected");

                let playButton = document.getElementById("play");

                let inputEditor = new InputEditor(champ);

                inputEditors.push(inputEditor);

                if (playerNames[index] !== undefined) {

                    inputEditor.fill(playerNames[index]);
                }

                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP).onDown.add(function () {
                    inputEditor.previousChar();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN).onDown.add(function () {
                    inputEditor.nextChar();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_0).onDown.add(function () {
                    inputEditor.addChar();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_2).onDown.add(function () {
                    inputEditor.removeChar();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER).onDown.add(function () {
                    inputEditor.moveLeft();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER).onDown.add(function () {
                    inputEditor.moveRight();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_8).onDown.add(function () {
                    inputEditor.cancel();
                    startCheck();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_9).onDown.add(function () {

                    inputEditor.valid();

                    if (globalReady) {
                        launchGame();
                    }
                    startCheck();
                });

                function startCheck() {
                    let ready = true;

                    for (var i = 0; i < inputEditors.length; i++) {
                        ready &= inputEditors[i].ready;
                    }
                    if (ready) {
                        playButton.value = "Press start";
                        playButton.classList.add('ready');
                    }
                    else {
                        playButton.value = "Waiting..";
                        playButton.classList.remove('ready');
                    }
                    globalReady = ready;
                }
            }

            function launchGame() {

                document.getElementById("interface").classList.add('hidden');

                playerNames = [];

                for (let i = 0; i < inputsHtml.length; i++) {
                    let input = inputsHtml[i];

                    let name = input.value;

                    if (name.length >= 1) {
                        playerNames.push(name);
                    }
                }

                $('#stats').load('template/stats.phtml', () => {

                    $('#toucheAide').load('template/aideTouchePlay.phtml', () => {
                        game.state.start('play');
                        menuStartSound.stop();
                    });
                });

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
        });
    });

}

StartState.update = function () {


}

