var EndState = {};

EndState.preload = function () {

}

EndState.create = function () {
    console.log('EndState');
    menuStartSound.loopFull(0.4);
    $('#interface #content').load('template/end.phtml', () => {

        document.getElementById("interface").classList.remove('hidden');

        clearGamepadsEvents();

        game.input.gamepad._gamepads.forEach((gamepad, index) => {

            if (gamepad.connected) {

                let restart = document.getElementById("restart");
                let modify = document.getElementById("modify");

                let buttons = [restart, modify];
                let activeButton = 0;

                highlightButton();

                function highlightButton() {
                    for (let i = 0; i < buttons.length; i++) {
                        if (buttons[i] !== undefined) {
                            buttons[i].classList.remove('ready');
                        }
                    }
                    if (buttons[activeButton] !== undefined) {
                        buttons[activeButton].classList.add('ready');
                    }
                }

                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP).onDown.add(function () {
                    if (activeButton === 0) {
                        activeButton = buttons.length - 1;
                    } else {
                        activeButton--;
                    }
                    highlightButton();
                });
                gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN).onDown.add(function () {
                    if (activeButton === buttons.length - 1) {
                        activeButton = 0;
                    } else {
                        activeButton++;
                    }
                    highlightButton();
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_0).onDown.add(function () {
                    switch (buttons[activeButton].getAttribute('id')) {
                        case 'restart' :
                            goTo('play');
                            break;
                        case 'modify' :
                            goTo('start');
                            break;
                    }
                });
                gamepad.getButton(Phaser.Gamepad.BUTTON_9).onDown.add(function () {
                    switch (buttons[activeButton].getAttribute('id')) {
                        case 'restart' :
                            goTo('play');
                            break;
                        case 'modify' :
                            goTo('start');
                            break;
                    }
                });

            }
        });

        function goTo(state = 'play') {
            switch (state) {
                case 'play' :
                    document.getElementById("interface").classList.add('hidden');
                    menuStartSound.stop();
                    break;
                case 'start' :
                    document.getElementById("interface").classList.remove('hidden');
                    menuStartSound.stop();
                    break;
            }
            game.state.start(state);

        }
    });
}

EndState.update = function () {


}