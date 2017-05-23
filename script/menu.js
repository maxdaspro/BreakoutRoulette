$(document).ready(function () {

    $('#interface #content').load('template/menu.phtml', () => {
        choixPlayer();
    });

    $('#interface').on('click', '#play', () => {

        playerNames = [];

        let inputs = $('#interface #formulaire input[name*=player]');

        inputs.each(function (index, input) {
            let name = $(input).val();
            
            if(name.length > 1){
                playerNames.push(name);
            }
        });

        if(playerNames.length > 1){
            $('#interface').attr('class', 'hidden')
            game.state.start('play');
        }
    })
});

function choixPlayer() {
    var form = document.getElementById("formulaire");
    var inputs = document.querySelectorAll("#formulaire input[name*=player]");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("blur", function (i) {
            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j] !== this && inputs[j].disabled) {
                    if (this.value.length >= 1) {
                        inputs[j].disabled = false;
                        inputs[j].focus();
                        return;
                    } else {
                        this.focus();
                    }
                }
            }
        });
    }
}
