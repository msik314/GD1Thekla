//Constructor
let menuState=function(){
	
}

menuState.prototype.preload=function(){
	game.camera.flash(0x000000,1000);
}

menuState.prototype.create=function(){
	this.water = game.add.sprite(0,0,'transitionDay');
	this.water.animations.add('normal');
	this.water.animations.play('normal',50,true);
	
	startButton=game.add.button(447,275,'startButton',function(){this.transition(this)},this);
}

menuState.prototype.update=function(){
	
}

menuState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("infostate");
    }, this);
}