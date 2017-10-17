//Constructor
let preloadState=function(){
	
}

preloadState.prototype.preload=function(){
	game.load.image("background","assets/IMG.png");
	game.load.image("startButton","assets/startbutton.png");
	game.load.image("menuButton","assets/menubutton.png");
	game.load.image("retryButton","assets/retrybutton.png");
	game.load.image("continueButton","assets/continuebutton.png");
}

preloadState.prototype.create=function(){
	game.state.start("menustate");
}

preloadState.prototype.update=function(){
	
}