//Constructor
let infoState=function(){
	
}

infoState.prototype.preload=function(){
	
}

infoState.prototype.create=function(){
	game.camera.flash(0x000000,1000);
	this.IDIndex = 0;
	this.IDX = [0,0,0];
	this.IDY = [0,0,0];
	
	//swiping functionality
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	
	music = game.add.audio('waves');
	music.loopFull();
	
	//this.instr1 = game.add.sprite(game.world.width,0,'instruct1');
	
	this.water = game.add.sprite(0,0,'transitionDay');
	this.water.animations.add('normal');
	this.water.animations.play('normal',50,true);
	//this.scoreText = game.add.text(100, 100, 'SWIPE WITH THE ARROWS', { fontSize: '32px', fill: '#ffffff' });
	//startButton=game.add.button(447,375,'continueButton',function(){this.transition(this)},this);
	
	this.instr1 = game.add.sprite(0,0,'instruct1');
	game.physics.arcade.enable(this.instr1);
	this.instr2 = game.add.sprite(0,game.world.height,'instruct2');
	//this.instr1.enableBody = true;
	game.physics.arcade.enable(this.instr2);
	this.instr3 = game.add.sprite(0,game.world.height,'instruct3');
	//this.instr1.enableBody = true;
	game.physics.arcade.enable(this.instr3);
	
}

infoState.prototype.update=function(){
	
	if(game.input.activePointer.isDown){
		if(this.swiping === false){
			this.swiping = true;
			this.startX = game.input.mousePointer.x;
			this.startY = game.input.mousePointer.y;
		}
		//startButton.alpha = 1;
		//this.transition();
	}
	else{
		//startButton.alpha = .5;
		if(this.swiping === true){
			this.swiping = false;
			this.finishX = game.input.mousePointer.x;
			this.finishY = game.input.mousePointer.y;
			
			this.swiped();
			
		}
	}
	if(this.instr1.body.y > -game.world.height){
		this.instr2.body.velocity.y = this.IDY[0];
	}else{
		this.instr2.body.velocity.y = this.IDY[1];
	}
	
	if(this.instr2.body.y > -game.world.height){
		this.instr3.body.velocity.y = this.IDY[1];
	}else{
		this.instr3.body.velocity.y = this.IDY[2];
	}
	
	//this.instr1.body.velocity.x = this.IDX[0];
	this.instr1.body.velocity.y = this.IDY[0];
	//this.instr2.body.velocity.x = this.IDX[1];
	
	//this.instr3.body.velocity.x = this.IDX[2];
	//this.instr3.body.velocity.y = this.IDY[2];
	
	//arrow.body.velocity.x = this.arrowSpeed;
	
	
}

infoState.prototype.swiped = function(){

	
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
		
		
		
	
		if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
			if(this.finishX > this.startX){
				//this.IDX[this.IDIndex] = 800;
				//right
			}
			else{
				//left
				//this.IDX[this.IDIndex] = -800;
			}
			
		}
		else{
			if(this.finishY > this.startY){
				//this.IDY[this.IDIndex] = 800;
				//this.IDIndex++;
				//if(this.IDIndex > 2){
				//	this.transition();
				//}
				//this.scoreText.text = 'Score: down';
			}
			else{
				//up
				//this.IDY[this.IDIndex] = -800;
				this.IDY[this.IDIndex] = -800;
				this.IDIndex++;
				if(this.IDIndex > 2){
					this.transition();
				}
			}
		}
		
	}
}


infoState.prototype.transition=function(){
	game.camera.fade(0x000000,1000);
	music.fadeOut(1000);
	this.camera.onFadeComplete.add(function() {
        this.game.state.start("levelonestate");
    }, this);
}

















