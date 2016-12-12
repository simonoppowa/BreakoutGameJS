/* A Brick in the game */
var Brick = function(context, xPos, yPos, color, width, height) {
    this.context = context;
    
    this.height = height;
    this.width = width;
    
    this.xPos = xPos;
    this.yPos = yPos;
    
    this.color = color;
    this.status = 1;
};

Brick.prototype.getXPos = function () {
    return this.xPos;
}

Brick.prototype.getYPos = function () {
    return this.yPos;
}

Brick.prototype.getWidth = function() {
    return this.width;
}

Brick.prototype.getHeight = function() {
    return this.height;
}

Brick.prototype.getStatus = function() {
    return this.status;
}

Brick.prototype.setStatus  = function() {
    this.status = 0;
}

Brick.prototype.draw = function() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
};
