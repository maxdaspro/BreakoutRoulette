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