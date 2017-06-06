var EndState = {};

EndState.preload = function () {

}

EndState.create = function () {
	console.log('EndState');

	$('#interface #content').load('template/end.phtml', () => {
		game.input.gamepad.start();

		game.input.gamepad._gamepads.forEach((gamepad, index) => {
			gamepad.onConnectCallback = function () {


				let playButton;
				gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP).onDown.add(function () {
					if (playButton = document.getElementById("change")) {playButton.classList.remove('ready');}
						
					playButton = document.getElementById("restart");
					console.log('up');
					playButton.classList.add('ready');
				});
				gamepad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN).onDown.add(function () {
					if (playButton = document.getElementById("restart")) {playButton.classList.remove('ready');}
					playButton = document.getElementById("change");
					console.log('down');
					playButton.classList.add('ready');
				});
				gamepad.getButton(Phaser.Gamepad.BUTTON_9).onDown.add(function () {
					launchGame();
				});

			}
		});

		function launchGame() {
			document.getElementById("interface").classList.add('hidden');
			game.state.start('play');
		}
	});
}

EndState.update = function () {


}