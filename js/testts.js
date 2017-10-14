//Constructor
let testtsState=function(){
	this.pass=false;
	this.level=0;
}

testtsState.prototype.init=function(passed,lvl){
	this.pass=passed;
	this.level=lvl;
}

testtsState.prototype.preload=function(){
	
}

testtsState.prototype.create=function(){
	this.scoreText = game.add.text(16, 16, 'transition: '+this.pass+this.level, { fontSize: '32px', fill: '#ffffff' });
	//Just the middle of the screen for now, until theres an actual graphic
	contButton=game.add.button(447,275,'continueButton',function(){this.transition(this)},this);
}

testtsState.prototype.update=function(){
	
}

testtsState.prototype.transition=function(){
	if(this.pass){
		switch(this.level){
			case 1:
				game.state.start("leveltwostate");
				break;
			case 2:
				game.state.start("levelthreestate");
				break;
			case 3:
				game.state.start("endstate");
				break;
		}
	}else{
		switch(this.level){
			case 1:
				game.state.start("levelonestate");
				break;
			case 2:
				game.state.start("leveltwostate");
				break;
			case 3:
				game.state.start("levelthreestate");
				break;
		}
	}
}