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
    
    var mouseX;

	function privateDraw() {
        console.log("Drawing!");
        privateDrawBricks();
        privateDrawPaddle();
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
    
    function privateDrawPaddle() {
        canvas.addEventListener('mousemove', updatePaddlePosition);
        
        paddle.draw();
        paddle.updateXPos(mouseX);
    }
    
    function updatePaddlePosition() {
        mouseX = event.clientX-40;
        privateContext.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
    }
    
    function privateSetupBricks() {
        var brickPosX = 10;
        var brickPosY = 10;
        var index = 0;
        var brickColor;
        
        for(var j = 0; j < BRICK_ROWS; j++) {
            brickColor = privateSetBrickColor(j);
            for(var i = 0; i < BRICK_COLUMNS; i++) {
                bricks[index] = new Brick(canvas.getContext("2d"), brickPosX, brickPosY, brickColor, BRICK_WIDTH, BRICK_HEIGHT);
                brickPosX += (BRICK_WIDTH + 5);
                index++;
            }
            brickPosX = 10;
            brickPosY += (BRICK_HEIGHT + 5);
        }
    }

	function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
	}
    
    function privateSetBrickColor(row) {
        switch(row) {
            case 2:
                return "#E2F469";
            case 3:
                return "#DB6F31";
            case 4:
                return "#4EAC6C";
            default:
                return "#C31D21";
        }
    }

	function publicInit(canvas, difficulty) {
        console.log("Breakout, here we go!");
		privateSetContext(canvas);
        privateSetupBricks();
        paddle = new Paddle(canvas.getContext("2d"));
		window.requestAnimationFrame(privateDraw);
	}

	return {
		init: publicInit
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);