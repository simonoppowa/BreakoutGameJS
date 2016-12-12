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
        privateContext.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
        
        privateCheckCollision();
        privateDrawBricks();
        privateDrawPaddle();
        privateDrawBall();
        window.requestAnimationFrame(privateDraw);
	}
    
    function privateDrawBricks() {
        var index = 0;
        for(var j = 0; j < BRICK_ROWS; j++) {
            for(var i = 0; i < BRICK_COLUMNS; i++) {
                if(bricks[index].getStatus() == 1) {
                    bricks[index].draw();
                }
                index++;
            }
        }
    }
    
    function privateDrawPaddle() {
        canvas.addEventListener('mousemove', updatePaddlePosition);
        paddle.draw();
        paddle.updateXPos(mouseX);
    }
    
    function privateDrawBall() {
        ball.checkBorderCollisions(GAME_WIDTH, GAME_HEIGHT);
        ball.draw();
        ball.updatePos();
    }
    
    function privateCheckCollision() {
        collisionChecker.checkCollision(paddle, ball);
        for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
            if(bricks[i].getStatus() == 1) {
                if(collisionChecker.checkCollision(bricks[i], ball)) {
                    bricks[i].setStatus();
                    privateCheckWin();
                }
            }
        }
    }
    
    function updatePaddlePosition() {
        mouseX = event.clientX-40;
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
    
    function privateInstantWin(keyEvent) { //FOR DEBUGGING (Press Tab for Instant win)
        if(keyEvent.keyCode == 9) {
            for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
                bricks[i].setStatus();
            }
            privateCheckWin();
            console.log("Cheater!");
        }
        
    }
    
    function privateCheckWin() {
        var win = BRICK_COLUMNS * BRICK_ROWS;
        var winCount = 0;
        
        for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
            if(bricks[i].getStatus() == 0) {
                winCount++;
            }
        }
        if(win == winCount) privateYouWon();
    }
    
    function privateYouWon() {
        privateContext.fillStyle = 'green';
        privateContext.font = "40px serif";
        privateContext.textAlign = 'center';
        privateContext.fillText("Congratulation! You Won!", GAME_WIDTH/2, GAME_HEIGHT/2);
        ball.ballXSpeed = 0;
        ball.ballYSpeed = 0;
        window.requestAnimationFrame(privateYouWon);
    }

	function publicInit(canvas, difficulty) {
        console.log("Breakout, here we go!");
		privateSetContext(canvas);
        privateSetupBricks();
        paddle = new Paddle(canvas.getContext("2d"));
        ball = new Ball(canvas.getContext("2d"), BALLSIZE);
        
        canvas.setAttribute('tabindex', '0');
        canvas.focus();
        canvas.addEventListener("keydown", privateInstantWin, false);
        
        
		window.requestAnimationFrame(privateDraw);
	}

	return {
		init: publicInit
	};
})();

var canvas = document.getElementById("breakoutcanvas");
breakOutGame.init(canvas);