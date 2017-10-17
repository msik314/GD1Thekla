//Constructor
let preloadState=function(){
	
}

preloadState.prototype.preload=function(){
	//Placeholder to have working name for buttons and the like
	game.load.image("startButton","assets/IMG.png");
	game.load.image("continueButton","assets/IMG.png");
	//game.load.image("goal","assets/bar.png");
	
	
	game.load.spritesheet("thekla", "assets/3dStuff/thekla/spritesheet_boat_idol_v1.png",1334, 750,60);
	game.load.spritesheet("water", "assets/3dStuff/background/spritesheet_water_normal_v2.png",1334, 750,60);
	game.load.spritesheet("wind", "assets/3dStuff/background/spritesheet_wind_v1.png",1334, 750,60);
	game.load.audio("songOne","assets/tk30s.ogg");
	
	//bar imports
	game.load.image("goal", "assets/UI/UI_stationary_bar.png");
	game.load.image("instructor","assets/UI/UI_radio_box.png");
	game.load.image("bar","assets/UI/UI_bar.png");
	
	
	//import arrows
	game.load.image("upArrow", "assets/UI/UI_arrow_up.png");
	game.load.image("downArrow", "assets/UI/UI_arrow_down.png");
	game.load.image("leftArrow", "assets/UI/UI_arrow_left.png");
	game.load.image("rightArrow", "assets/UI/UI_arrow_right.png");
	
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