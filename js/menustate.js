//Constructor
let menuState=function(){
	
}

menuState.prototype.preload=function(){
	game.load.xml('helpme','assets/note.xml');
	game.camera.flash(0x000000,1000);
}

menuState.prototype.create=function(){
	please=game.cache.getXML('helpme');
	
	background=game.add.sprite(0,0,"background");
	startButton=game.add.button(447,275,'startButton',function(){this.transition(this)},this);
	this.scoreText = game.add.text(16, 16, please.querySelector('[id="heading"]').textContent, { fontSize: '32px', fill: '#ffffff' });
}

menuState.prototype.update=function(){
	
}

menuState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("levelonestate");
    }, this);
}