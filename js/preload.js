//Constructor
let preloadState=function(){
	
}

preloadState.prototype.preload=function(){
	//Placeholder to have working name for buttons and the like
	game.load.image("startButton","assets/IMG.png");
	game.load.image("continueButton","assets/IMG.png");
	game.load.spritesheet("arrows","assets/directions.png", 256,256);
	game.load.spritesheet("instructor","assets/instructions.png",256,256);
	game.load.audio("songOne","assets/tk30s.ogg");
}

preloadState.prototype.create=function(){
	game.state.start("menustate");
}

preloadState.prototype.update=function(){
	
}