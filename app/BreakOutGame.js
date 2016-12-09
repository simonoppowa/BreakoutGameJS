/*
 * This is the main script for the breakout application.
 *
 * Mouse interaction is captured here and the animation loop runs here, so that
 * the game can be drawn. This is also a good place to calculate random speeds for the
 * ball.
 *
 */
var breakOutGame = (function () {

	// private vars and constants
    var privateContext;
	var privateCanvas;
    
	var GAME_WIDTH = 600;
	var GAME_HEIGHT = 500;
	var BRICK_ROWS = 5;
	var BRICK_COLUMNS = 13;
	var BALLSIZE = 10;
	var BRICK_WIDTH = 40;
	var BRICK_HEIGHT = 10;
    
	var bricks = [];
	var paddle;
	var ball;

	function privateDraw() {
        console.log("Drawing!");
        privateDrawBricks();
        window.requestAnimationFrame(privateDraw);
	}
    
    function privateDrawBricks() {
        var index = 0;
        for(var j = 0; j < BRICK_ROWS; j++) {
            for(var i = 0; i < BRICK_COLUMNS; i++) {
                bricks[index].draw();
                index++;
            }
        }
    }
    
    function privateSetupBricks() {
        var brickPosX = 10;
        var brickPosY = 10;
        var index = 0;
        for(var j = 0; j < BRICK_ROWS; j++) {
            for(var i = 0; i < BRICK_COLUMNS; i++) {
                bricks[index] = new Brick(canvas.getContext("2d"), brickPosX, brickPosY, "red", BRICK_WIDTH, BRICK_HEIGHT)
                brickPosX += 45;
                index++;
            }
            brickPosX = 10;
            brickPosY += 15;
        }
    }

	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}

	function publicInit(canvas, difficulty) {
        console.log("Breakout, here we go!");
		privateSetContext(canvas);
        privateSetupBricks();
		window.requestAnimationFrame(privateDraw);
	}

	return {
		init: publicInit
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);