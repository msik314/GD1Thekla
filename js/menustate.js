//Constructor
let menuState=function(){
	
}

menuState.prototype.preload=function(){
	game.camera.flash(0x000000,1000);
}

menuState.prototype.create=function(){
	background=game.add.sprite(0,0,"background");
	startButton=game.add.button(447,275,'startButton',function(){this.transition(this)},this);
}

menuState.prototype.update=function(){
	
}

menuState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("levelonestate");
    }, this);
}