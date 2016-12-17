var collisionChecker = (function () {
	
    //add parameters and more private function if required
	function privateCheckCollision(object, ball) {
		if(object.getXPos() < ball.getXPos() + ball.getBallsize() &&
           object.getXPos() + object.getWidth() > ball.getXPos() &&
           object.getYPos() < ball.getYPos() + ball.getBallsize() &&
           object.getYPos() + object.getHeight() > ball.getYPos()) {
            
            console.log("Collision!");
            ball.bounceHorizontally();
            sound.playSound(3);
            return true;
        }   
        return false;
	}

	return {
        //add more public functions if required
		checkCollision: privateCheckCollision
	};
})();