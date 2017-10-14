//Constructor
let preloadState=function(){
	
}

preloadState.prototype.preload=function(){
	//Placeholder to have working name for buttons and the like
	game.load.image("background","assets/IMG.png");
	game.load.image("startButton","assets/startbutton.png");
	game.load.image("continueButton","assets/continuebutton.png");
}

preloadState.prototype.create=function(){
	game.state.start("menustate");
}

preloadState.prototype.update=function(){
	
}