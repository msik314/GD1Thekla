//Constructor
let endState=function(){
	
}

endState.prototype.preload=function(){
	game.camera.flash(0x000000,1000);
}

endState.prototype.create=function(){
	this.scoreText = game.add.text(16, 16, 'END', { fontSize: '32px', fill: '#ffffff' });
}

endState.prototype.update=function(){
	
}