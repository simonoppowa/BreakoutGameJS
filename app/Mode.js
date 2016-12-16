var mode = (function () {
	
    function privateSetMode() {
        var button = document.getElementById("modebutton");
        button.addEventListener("click", privateStartGame);
        
        document.getElementById("breakoutcanvas").style.visibility = "hidden";
    }
    
    function privateStartGame() {
        var mode = document.getElementById("mode");
        
        var dropdown = mode.getElementsByClassName("modedropdown")[0];
        var dropdownValue = dropdown.options[dropdown.selectedIndex].value;
        console.log("Mode: " + dropdownValue);
        
        mode.remove();
        document.getElementById("breakoutcanvas").style.visibility = "visible";
        breakOutGame.init(canvas, dropdownValue);
    }
   

	return {
		setMode: privateSetMode
	};
})();
mode.setMode();