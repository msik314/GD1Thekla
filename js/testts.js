//Constructor
let testtsState=function(){
	this.pass=false;
	this.level=0;
	this.bars=0;
	this.hit=0;
}

testtsState.prototype.init=function(passed,lvl,numBars,barsHit){
	this.pass=passed;
	//this.level=lvl;
	//this.bars=numBars;
	//this.hit=barsHit;
	this.level=2;
	this.bars=1;
	this.hit=1;
}

testtsState.prototype.preload=function(){
	game.camera.flash(0x000000,1000);
}

testtsState.prototype.create=function(){
	//swiping functionality
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;

	switch(this.level){
		case 1:
			this.water = game.add.sprite(0,0,'transitionDay');
			this.water.animations.add('normal');
			this.water.animations.play('normal',50,true);
			break;
		case 2:
			this.water = game.add.sprite(0,0,'transitionSunset');
			this.water.animations.add('normal');
			this.water.animations.play('normal',50,true);
			break;
		case 3:
			this.water = game.add.sprite(0,0,'transitionNight');
			this.water.animations.add('normal');
			this.water.animations.play('normal',50,true);
	}

	music = game.add.audio('waves');
	music.loopFull();

	this.scoreText = game.add.text(100, 100, 'Score: '+this.hit+" out of "+this.bars+
		"\nSwipe left to replay, right to continue, or up to return to the menu",
		 { fontSize: '32px', fill: '#ffffff' });


	//Just the middle of the screen for now, until theres an actual graphic
	/*menuButton=game.add.button(227,275,'menuButton',function(){this.goMenu(this)},this);
	if(this.pass){
		contButton=game.add.button(834,275,'continueButton',function(){this.transition(this)},this);
	}else{
		retryButton=game.add.button(834,275,'retryButton',function(){this.transition(this)},this);
	}*/
}

testtsState.prototype.update=function(){
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

testtsState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        if(this.pass){
		switch(this.level){
			case 1:
				this.game.state.start("leveltwostate");
				break;
			case 2:
				this.game.state.start("levelthreestate");
				break;
			case 3:
				this.game.state.start("endstate");
				break;
		}
	}else{
		switch(this.level){
			case 1:
				this.game.state.start("levelonestate");
				break;
			case 2:
				this.game.state.start("leveltwostate");
				break;
			case 3:
				this.game.state.start("levelthreestate");
				break;
		}
	}
    }, this);
}

testtsState.prototype.goMenu=function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("menustate");
    }, this);
}

testtsState.prototype.swiped = function(){

	
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
	
	
		if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
			if(this.finishX > this.startX){
				this.transition();
				//right
			}
			else{
				this.pass=false;
				this.transition();
				//left
			}
			
		}
		else{
			if(this.finishY > this.startY){
				//down
			}
			else{
				this.goMenu();
				//up
			}
		}
	}
}