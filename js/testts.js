//Constructor
let testtsState=function(){
	this.pass=false;
	this.level=0;
	this.bars=0;
	this.hit=0;
}

testtsState.prototype.init=function(passed,lvl,numBars,barsHit){
	this.pass=passed;
	this.level=lvl;
	this.bars=numBars;
	this.hit=barsHit;
}

testtsState.prototype.preload=function(){
	game.camera.flash(0x000000,1000);
}

testtsState.prototype.create=function(){
	this.scoreText = game.add.text(100, 100, 'Score: '+this.hit+" out of "+this.bars, { fontSize: '32px', fill: '#ffffff' });
	//Just the middle of the screen for now, until theres an actual graphic
	menuButton=game.add.button(227,275,'menuButton',function(){this.goMenu(this)},this);
	if(this.pass){
		contButton=game.add.button(834,275,'continueButton',function(){this.transition(this)},this);
	}else{
		retryButton=game.add.button(834,275,'retryButton',function(){this.transition(this)},this);
	}
}

testtsState.prototype.update=function(){
	
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