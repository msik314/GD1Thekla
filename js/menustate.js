//Constructor
let menuState=function(){
	
}

menuState.prototype.preload=function(){
	
}

menuState.prototype.create=function(){
	background=game.add.sprite(0,0,"background");
	startButton=game.add.button(447,275,'startButton',function(){this.transition(this)},this);
}

menuState.prototype.update=function(){
	
}

menuState.prototype.transition = function(){
	game.state.start("levelonestate");
}