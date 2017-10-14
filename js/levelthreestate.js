//Constructor
let levelthreeState=function(){
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	this.lvl = 3;
	this.passed = true;
}

levelthreeState.prototype.preload=function(){
	
}

levelthreeState.prototype.create=function(){
	background=game.add.sprite(0,0,"background");
	this.scoreText = game.add.text(16, 16, 'LEVEL THREE', { fontSize: '32px', fill: '#ffffff' });
	contButton=game.add.button(447,275,'continueButton',function(){this.transition(this)},this);
}

levelthreeState.prototype.update=function(){
	if(game.input.activePointer.isDown){
		if(this.swiping === false){
			this.swiping = true;
			this.startX = game.input.mousePointer.x;
			this.startY = game.input.mousePointer.y;
		}
		background.alpha = 1;
	}
	else{
		background.alpha = .5;
		if(this.swiping === true){
			this.swiping = false;
			this.finishX = game.input.mousePointer.x;
			this.finishY = game.input.mousePointer.y;
			this.testSwipe();
			
		}
	}
}

levelthreeState.prototype.transition = function(){
	//this.score += 10;
    //this.scoreText.text = 'Score: ' + this.score;
	game.state.start("testts",true,false,this.passed,this.lvl);
}


levelthreeState.prototype.testSwipe = function() {
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
		if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
			if(this.finishX > this.startX){
				//this.scoreText.text = 'Score: right';
			}
			else{
				//this.scoreText.text = 'Score: left';
			}
			
		}
		else{
			if(this.finishY > this.startY){
				//this.scoreText.text = 'Score: down';
			}
			else{
				//this.scoreText.text = 'Score: up';
			}
		}
	}	
}