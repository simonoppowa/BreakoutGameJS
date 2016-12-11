/* The ball in the game */
var Ball = function(context, ballsize) {
    
    var DEFAULT_COLOR = "#FFFFFF";
    var DEFAULT_XPOS = 300;
    var DEFAULT_YPOS = 300;
    
    this.context = context;
    
    this.ballsize = ballsize;
    
    this.ballX = DEFAULT_XPOS;
    this.ballY = DEFAULT_YPOS;
    
    this.ballXSpeed = this.createRandomSpeed();
    this.ballYSpeed = this.ballXSpeed;
    this.color = DEFAULT_COLOR;
    
}

Ball.prototype.draw = function() {
    this.context.beginPath();
    this.context.arc(this.ballX, this.ballY, this.ballsize, 0, 2*Math.PI, true);
    this.context.fillStyle = this.color;
    this.context.fill();
}

Ball.prototype.updatePos = function() {
    this.ballY += this.ballYSpeed;
    this.ballX += this.ballXSpeed;
}

Ball.prototype.checkCollisions = function (canvasWidth, canvasHeight) { 
    var topBorder = this.ballY - this.ballsize;
    var bottomBorder = this.ballY + this.ballsize;
    var rightBorder = this.ballX + this.ballsize;
    var leftBorder = this.ballX - this.ballsize;
    
    if(rightBorder > canvasWidth || leftBorder < 0) {
        this.bounceVertically();
    }
    
    if (topBorder < 0 || bottomBorder > canvasHeight) {
        this.bounceHorizontally();
    }
}

Ball.prototype.createRandomSpeed = function() {
    return Math.floor((Math.random() * 3) + 1);
}

Ball.prototype.bounceHorizontally = function() {
    this.ballYSpeed *= -1;
}

Ball.prototype.bounceVertically = function() {
    this.ballXSpeed *= -1;
}