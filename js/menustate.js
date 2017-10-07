//Constructor
let menuState=function(){
	
}

menuState.prototype.preload=function(){
	
}

menuState.prototype.create=function(){
	//Just the middle of the screen for now, until theres an actual graphic
	startButton=game.add.sprite(375,667,"startButton");
	startButton.inputEnabled=true;
	startButton.events.onInputDown.add(transition, this);
}

menuState.prototype.update=function(){
	
}

menuState.prototype.transition=function(){
	game.state.start("levelonestate");
}