/* The ball in the game */
var Ball = function(context, ballsize) {
    
    var DEFAULT_COLOR = "#FFFFFF";
    var DEFAULT_XPOS = 300;
    var DEFAULT_YPOS = 300;
    
    this.context = context;
    
    this.ballsize = ballsize;
    
    this.xPos = DEFAULT_XPOS;
    this.yPos = DEFAULT_YPOS;
    
    this.ballXSpeed;
    this.ballYSpeed;
    this.color = DEFAULT_COLOR;
    
};

Ball.prototype.getXPos = function() {
    return this.xPos;
};

Ball.prototype.getYPos = function() {
    return this.yPos;
};

Ball.prototype.getBallsize = function() {
    return this.ballsize;
};

Ball.prototype.setDifficulty = function(mode) {
    switch(mode) {
        case "1":
            this.ballXSpeed = 1; this.ballYSpeed = 1; break;
        case "2":
            this.ballXSpeed = 2; this.ballYSpeed = 2; break;
        case "3":
            this.ballXSpeed = 3; this.ballYSpeed = 3; break;
        default:
            this.ballXSpeed = 2; this.ballYSpeed = 2; break;
    }
};

Ball.prototype.draw = function() {
    this.context.beginPath();
    this.context.arc(this.xPos, this.yPos, this.ballsize, 0, 2 * Math.PI, true);
    this.context.fillStyle = this.color;
    this.context.fill();
};

Ball.prototype.updatePos = function() {
    this.yPos += this.ballYSpeed;
    this.xPos += this.ballXSpeed;
};

Ball.prototype.checkBorderCollisions = function(canvasWidth, canvasHeight) {
    var topBorder = this.yPos - this.ballsize;
    var bottomBorder = this.yPos + this.ballsize;
    var rightBorder = this.xPos + this.ballsize;
    var leftBorder = this.xPos - this.ballsize;
    
    if(rightBorder > canvasWidth || leftBorder < 0) {
        var bounceborder = new Audio("/sounds/bounceborder.wav");
        sound.playSound(1);
        this.bounceVertically();
    }
    
    if (topBorder < 0) {
        sound.playSound(1);
        this.bounceHorizontally();
    }
};

Ball.prototype.bounceHorizontally = function() {
    this.ballYSpeed *= -1;
};

Ball.prototype.bounceVertically = function() {
    this.ballXSpeed *= -1;
};