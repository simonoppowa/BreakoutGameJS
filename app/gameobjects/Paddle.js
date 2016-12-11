/* Paddle represents the players paddle used to deflect the ball in the game */
var Paddle = function(context) {
    
    var PADDLE_WIDTH = 80;
    var PADDLE_HEIGHT = 15;
    
    var DEFAULT_COLOR = "#FFFFFF";
    
    var DEFAULT_XPOS = 260;
    var DEFAULT_YPOS = 455;
    
    
    this.context = context;
    
    this.xPos = DEFAULT_XPOS;
    this.yPos = DEFAULT_YPOS;
    
    this.color = DEFAULT_COLOR;
    
    this.paddleWidth = PADDLE_WIDTH;
    this.paddleHeight = PADDLE_HEIGHT;
}

Paddle.prototype.getXPos = function() {
    return this.xPos;
}

Paddle.prototype.getYPos = function() {
    return this.yPos;
}

Paddle.prototype.getWidth = function() {
    return this.paddleWidth;
}

Paddle.prototype.getHeight = function() {
    return this.paddleHeight;
}

Paddle.prototype.draw = function() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
}

Paddle.prototype.updateXPos = function(newPos) {
    if(newPos == undefined) return;
    this.xPos = newPos;
}