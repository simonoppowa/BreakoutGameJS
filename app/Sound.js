var sound = (function () {
	
	function privatePlaySound(type) {
        var sound;
		switch(type) {
            case 1:
                sound = new Audio("sounds/bounceborder.wav"); break;
            case 2:
                sound = new Audio("sounds/bouncebottom.wav"); break;
            case 3:
                sound = new Audio("sounds/bouncebrick.wav"); break;
            default:
                return;
        }
        sound.play();
	}

	return {
		playSound: privatePlaySound
	};
})();