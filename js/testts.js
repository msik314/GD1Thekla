//Constructor
let transitionState=function(){
	
}

transitionState.prototype={
	init:function(passed,lvl){}
}

transitionState.prototype.preload=function(){
	
}

transitionState.prototype.create=function(){
	//Just the middle of the screen for now, until theres an actual graphic
	startButton=game.add.sprite(375,667,"continueButton");
	startButton.inputEnabled=true;
	startButton.events.onInputDown.add(transition, this);
}

transitionState.prototype.update=function(){
	
}

transitionState.prototype.transition=function(){
	if(passed){
		switch(lvl){
			case 1:
				game.state.start("leveltwostate");
				break;
			case 2:
				game.state.start("levelthreestate");
				break;
			case 3:
				game.state.start("endstate");
		}
	}else{
		switch(lvl){
			case 1:
				game.state.start("levelonestate");
				break;
			case 2:
				game.state.start("leveltwostate");
				break;
			case 3:
				game.state.start("levelthreestate");
		}
	}
}