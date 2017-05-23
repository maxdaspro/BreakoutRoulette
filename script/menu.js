function choixPlayer() {
    var form = document.getElementById("formulaire");
    var inputs = form.querySelectorAll("input[name*=player]");

    console.log(inputs)

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("blur", function(){
			for (var j = 0; j < inputs.length; j++){
				if(inputs[j] !== this){
					if(inputs[j].disabled){
						inputs[j].disabled = false;
						inputs[j].focus();
						return;
					}
				}
			}
		});
	}
}
choixPlayer();