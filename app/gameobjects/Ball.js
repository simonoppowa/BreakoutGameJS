/* The ball in the game */
var Ball = function(context, ballsize) {
    
    var DEFAULT_COLOR = "#FFFFFF";
    var DEFAULT_XPOS = 300;
    var DEFAULT_YPOS = 300;
    
    this.context = context;
    
    this.ballsize = ballsize;
    
    this.ballX = DEFAULT_XPOS;
    this.ballY = DEFAULT_YPOS;
    
    this.ballspeed = 1;
    this.color = DEFAULT_COLOR;
}

Ball.prototype.draw = function() {
    this.context.beginPath();
    this.context.arc(this.ballX, this.ballY, this.ballsize, 0, 2*Math.PI, true);
    this.context.fillStyle = this.color;
    this.context.fill();
}

Ball.prototype.bounceHorizontally = function() {
}

Ball.prototype.bounceVertically = function() {
}