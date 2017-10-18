//Constructor
let menuState=function(){
	
}

menuState.prototype.preload=function(){
	game.load.image("title","assets/UI/UI_title_text.png");
}

menuState.prototype.create=function(){
	game.camera.flash(0x000000,1000);	
	//swiping functionality
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	
	
	this.water = game.add.sprite(0,0,'transitionDay');
	this.water.animations.add('normal');
	this.water.animations.play('normal',50,true);

	this.title = game.add.sprite(0,0,'title');
	
	music = game.add.audio('waves');
	music.loopFull();
	
	//startButton=game.add.button(447,275,'startButton',function(){this.transition(this)},this);
}

menuState.prototype.update=function(){
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

menuState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	music.fadeOut(1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("infostate");
    }, this);
}


menuState.prototype.swiped = function(){

	
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