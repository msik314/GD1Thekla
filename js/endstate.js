//Constructor
let endState=function(){
	
}

endState.prototype.preload=function(){
	
}

endState.prototype.create=function(){
	game.camera.flash(0x000000,1000);
	this.won = game.add.sprite(0,0,'winScreen');

	//swiping functionality
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;

	music = game.add.audio('waves');
	music.loopFull();
}

endState.prototype.update=function(){
	if(game.input.activePointer.isDown){
		if(this.swiping === false){
			this.swiping = true;
			this.startX = game.input.mousePointer.x;
			this.startY = game.input.mousePointer.y;
		}
		//startButton.alpha = 1;
		//this.transition();
	}
	else{
		//startButton.alpha = .5;
		if(this.swiping === true){
			this.swiping = false;
			this.finishX = game.input.mousePointer.x;
			this.finishY = game.input.mousePointer.y;
			this.swiped();
			
		}
	}
}

endState.prototype.swiped = function(){

	
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
	
	
		if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
			if(this.finishX > this.startX){
				//right
			}
			else{
				//left
			}
			
		}
		else{
			if(this.finishY > this.startY){
				//down
			}
			else{
				this.transition();
				//up
			}
		}
	}
}

endState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	music.fadeOut(1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("menustate");
    }, this);
}