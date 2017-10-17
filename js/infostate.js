//Constructor
let infoState=function(){
	
}

infoState.prototype.preload=function(){
	game.camera.flash(0x000000,1000);
}

infoState.prototype.create=function(){
	this.water = game.add.sprite(0,0,'transitionDay');
	this.water.animations.add('normal');
	this.water.animations.play('normal',50,true);
	this.scoreText = game.add.text(100, 100, 'SWIPE WITH THE ARROWS', { fontSize: '32px', fill: '#ffffff' });
	startButton=game.add.button(447,375,'continueButton',function(){this.transition(this)},this);
}

infoState.prototype.update=function(){
	
}

infoState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("levelonestate");
    }, this);
}