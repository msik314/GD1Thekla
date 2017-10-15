//Constructor
let menuState=function(){
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
}

menuState.prototype.preload=function(){
	
}

menuState.prototype.create=function(){
	//Just the middle of the screen for now, until theres an actual graphic
	startButton=game.add.sprite(0,0,"startButton");
	
	//startButton.inputEnabled=true;
	//startButton.events.onInputDown.add(this.transition);
	//let 
	
	this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
}

menuState.prototype.update=function(){
	if(game.input.activePointer.isDown){
		if(this.swiping === false){
			this.swiping = true;
			this.startX = game.input.mousePointer.x;
			this.startY = game.input.mousePointer.y;
		}
		startButton.alpha = 1;
		//this.transition();
	}
	else{
		startButton.alpha = .5;
		if(this.swiping === true){
			this.swiping = false;
			this.finishX = game.input.mousePointer.x;
			this.finishY = game.input.mousePointer.y;
			this.swiped();
			
		}
	}
}

menuState.prototype.transition = function(){
	
	this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
	//game.state.start("levelonestate");
}

menuState.prototype.swiped = function(){
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
		if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
			if(this.finishX > this.startX){
				this.scoreText.text = 'Score: right';
			}
			else{
				this.scoreText.text = 'Score: left';
			}
			
		}
		else{
			if(this.finishY > this.startY){
				this.scoreText.text = 'Score: down';
				game.state.start("levelonestate");
			}
			else{
				this.scoreText.text = 'Score: up';
			}
		}
	}
	
}




















