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
    
    var mousePosX;
    var pauseGame = false;
    
    function publicSetupBreakOut(canvas, difficulty) {
        console.log("Breakout, here we go!");
		privateSetContext(canvas);
        privateSetupBricks();
        privateSetupPaddle();
        privateSetupBall(difficulty);
        
		window.requestAnimationFrame(privateDraw);
    }
    
	function privateDraw() {
        console.log("Drawing!");
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        
        privateCheckLose();
        privateCheckCollision();
        privateDrawBricks();
        privateDrawPaddle();
        privateDrawBall();
        
        if(pauseGame === false) {
            window.requestAnimationFrame(privateDraw);
        }
	}
    
    function privateDrawBricks() {
        var index = 0;
        for(var j = 0; j < BRICK_ROWS * BRICK_COLUMNS; j++) {
                if(bricks[index].getStatus() === true) {
                    bricks[index].draw();
                }
                index++;
            }
    }
    
    function privateDrawPaddle() {
        canvas.addEventListener('mousemove', privateUpdatePaddlePosition);
        paddle.draw();
        paddle.updateXPos(mousePosX);
    }
    
    function privateDrawBall() {
        ball.checkBorderCollisions(GAME_WIDTH, GAME_HEIGHT);
        ball.draw();
        ball.updatePos();
    }
    
    function privateCheckCollision() {
        collisionChecker.checkCollision(paddle, ball);
        for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
            if(bricks[i].getStatus() === true) {
                if(collisionChecker.checkCollision(bricks[i], ball)) {
                    bricks[i].setStatus();
                    privateCheckWin();
                }
            }
        }
    }
    
    function privateUpdatePaddlePosition() {
        mousePosX = event.clientX-40;
    }
    
    function privateSetContext(canvas) {
		privateCanvas = canvas;
		privateContext = canvas.getContext("2d");
        
        canvas.setAttribute('tabindex', '0');
        canvas.focus();
        canvas.addEventListener("keydown", privateInstantWin, false);
	}
    
    function privateSetupBricks() {
        var brickPosX = 10;
        var brickPosY = 10;
        var index = 0;
        var brickColor;
        
        for(var j = 0; j < BRICK_ROWS; j++) {
            brickColor = privateSetBrickColor(j);
            for(var i = 0; i < BRICK_COLUMNS; i++) {
                bricks[index] = new Brick(privateContext, brickPosX, brickPosY, brickColor, BRICK_WIDTH, BRICK_HEIGHT);
                brickPosX += (BRICK_WIDTH + 5);
                index++;
            }
            brickPosX = 10;
            brickPosY += (BRICK_HEIGHT + 5);
        }
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
    
    function privateSetupPaddle() {
        paddle = new Paddle(privateContext);
    }
    
    function privateSetupBall(difficulty) {
        ball = new Ball(privateContext, BALLSIZE);
        ball.setDifficulty(difficulty);
    }
    
    function privateInstantWin(keyEvent) { //FOR DEBUGGING (Press Tab for instant win)
        if(keyEvent.keyCode == 9 && pauseGame === false) {
            for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
                bricks[i].setStatus();
            }
            console.log("Cheater!");
            privateCheckWin();
        }
    }
    
    function privateCheckWin() {
        var winNumber = BRICK_COLUMNS * BRICK_ROWS;
        var winCount = 0;
        
        for(var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
            if(bricks[i].getStatus() === false) {
                winCount++;
            }
        }
        if(winNumber === winCount) {
            privateYouWon();
        }
    }
    
    function privateCheckLose() {
        if(ball.getYPos() > GAME_HEIGHT - BALLSIZE) {
            privateYouLost();
        }
    }
    
    function privateSetTextStyle() {
        privateContext.fillStyle = 'green';
        privateContext.font = "40px Roboto Condensed Light";
        privateContext.textAlign = 'center';
    }
    
    function privateYouWon() {
        privateSetTextStyle();
        privateContext.fillText("Congratulations! You Won!", GAME_WIDTH/2, GAME_HEIGHT/2);
        
        pauseGame = true;
        
        window.requestAnimationFrame(privateYouWon);
    }
    
    function privateYouLost() {
        privateSetTextStyle();
        privateContext.fillText("Game Over. Please refresh for restart", GAME_WIDTH/2, GAME_HEIGHT/2);
        
        pauseGame = true;
        
        window.requestAnimationFrame(privateYouLost);
    }

	return {
		init: publicSetupBreakOut
	};
})();

var canvas = document.getElementById("breakoutcanvas");