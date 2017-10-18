//Constructor
let preloadState=function(){
	
}

preloadState.prototype.preload=function(){
	game.load.image("background","assets/IMG.png");
	//Placeholder to have working name for buttons and the like
	game.load.image("startButton","assets/startbutton.png");
	game.load.image("continueButton","assets/continuebutton.png");
	game.load.image("menuButton","assets/menubutton.png");
	game.load.image("retryButton","assets/retrybutton.png");
	
	//game instructions
	game.load.image("instruct1","assets/UI/instructionText/UI_instruction_1.png");
	game.load.image("instruct2","assets/UI/instructionText/UI_instruction_2.png");
	game.load.image("instruct3","assets/UI/instructionText/UI_instruction_3.png");
	
	//game.load.image("goal","assets/bar.png");
	
	game.load.spritesheet("thekla", "assets/3dStuff/thekla/spritesheet_boat_all.png",1334, 750,240);
	game.load.spritesheet("theklaI", "assets/3dStuff/thekla/idle/spritesheet_boat_idol_v1.png",1334, 750,60);
	game.load.spritesheet("theklaS", "assets/3dStuff/thekla/sad/spritesheet_boat_sad_v1.png",1334, 750,60);
	game.load.spritesheet("theklaH1", "assets/3dStuff/thekla/happy1/spritesheet_boat_happy1_v1.png",1334, 750,60);
	game.load.spritesheet("water", "assets/3dStuff/background/spritesheet_water_normal_v2.png",1334, 750,60);
	game.load.spritesheet("transitionDay", "assets/3dStuff/background/spritesheet_transition_screen.png",1334, 750,60);
	game.load.spritesheet("transitionSunset", "assets/3dStuff/background/spritesheet_transition_screen_sunset.png",1334, 750,60);
	game.load.spritesheet("transitionNight", "assets/3dStuff/background/spritesheet_transition_screen_night.png",1334, 750,60);
	
	game.load.spritesheet("wind", "assets/3dStuff/background/spritesheet_wind_v1.png",1334, 750,60);
	
	game.load.audio("songOne","assets/tk30s.ogg");
	game.load.audio("waves","assets/tkOcean.ogg");

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