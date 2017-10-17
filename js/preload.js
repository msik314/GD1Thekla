//Constructor
let preloadState=function(){
	
}

preloadState.prototype.preload=function(){
	//Placeholder to have working name for buttons and the like
	game.load.image("startButton","assets/IMG.png");
	game.load.image("continueButton","assets/IMG.png");
	game.load.image("goal","assets/bar.png");
	game.load.spritesheet("bar","assets/directions.png", 256,256);
	game.load.spritesheet("instructor","assets/instructions.png",256,256);
	game.load.audio("songOne","assets/tk30s.ogg");
	
	//import arrows
	game.load.spritesheet("upArrow", "assets/uparrow.png", 20,30);
	game.load.spritesheet("downArrow", "assets/downarrow.png", 20,30);
	game.load.spritesheet("leftArrow", "assets/leftarrow.png", 30,20);
	game.load.spritesheet("rightArrow", "assets/rightarrow.png", 30,20);
	
	//import audio
	game.load.audio("leftAud","assets/tkLeft.ogg");
	game.load.audio("rightAud","assets/tkRight.ogg");
	game.load.audio("upAud","assets/tkUp.ogg");
	game.load.audio("downAud","assets/tkDown.ogg");
	
}

preloadState.prototype.create=function(){
	game.state.start("menustate");
}

preloadState.prototype.update=function(){
	
}