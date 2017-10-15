//Constructor
let leveloneState=function(){
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	this.instrCount = [3,4,3,5];
	this.instrTimes = [1,2,3,Math.Infinity];
	this.instrType = [0,0,1,1];
	this.currentlyInstructing = false;
	this.instrIndex = 0;
	this.currentTime = 0;
	this.startTime = 0;
}

leveloneState.prototype.preload = function(){
	//game.load.audio("songOne","assets/tk30s.ogg");
}

leveloneState.prototype.create = function(){
	this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
	music = game.add.audio('songOne');
	//music.onDecoded.add(start, this);
	music.play();
	
	//create instructor;
	this.instructor = game.add.sprite(game.world.width - 280,24,"instructor");
	this.instructor.animations.add('instructing', [0,1],2.1,true);
	this.instructor.alpha = 0;
	this.instructor.animations.play('instructing');
	
	//create arrow group
	this.arrows = game.add.group();
	
	
	
	//game.time.events.repeat(Phaser.Timer.Second * 10, 4, instruct, this);
	//game.time.events.loop(Phaser.Timer.SECOND,this.instruct());
	this.startTime = game.time.totalElapsedSeconds();
	
	
}

leveloneState.prototype.update = function(){
	
	
	//SWIPE FUNCTIONALITY
	if(game.input.activePointer.isDown){
		if(this.swiping === false){
			this.swiping = true;
			this.startX = game.input.mousePointer.x;
			this.startY = game.input.mousePointer.y;
		}
		startButton.alpha = 1;
		//this.transition();
	}
	else{
		startButton.alpha = .5;
		if(this.swiping === true){
			this.swiping = false;
			this.finishX = game.input.mousePointer.x;
			this.finishY = game.input.mousePointer.y;
			this.swiped();
			
		}
	}
	
	//INSTRUCTION FUNCTIONALITY
	if(game.time.totalElapsedSeconds() - this.startTime > this.instrTimes[this.instrIndex]){
		
		
		if(!this.currentlyInstructing && this.instrType[this.instrIndex] === 0){
			this.firstInstruct();
			this.currentlyInstructing = true;
		}else if(this.currentlyInstructing && this.instrType[this.instrIndex] === 0){
			this.instruct();
			
		}
		if(this.instrType[this.instrIndex] == 1){
			this.sendBar();
		}
		this.instrIndex++;
		
		
	}
	
	
}

//first instruction in a set
leveloneState.prototype.firstInstruct = function(){
	this.score++;
	this.scoreText.text = 'Score: ' + this.score;
	this.instructor.alpha = 1;
}

leveloneState.prototype.instruct = function(){
	//instructor.
	this.score++;
	this.scoreText.text = 'Score: ' + this.score;
	this.instructor.alpha = 1;
}

leveloneState.prototype.sendBar = function(){
	//instructor.
	this.score++;
	this.scoreText.text = 'Score: ' + this.score;
	this.instructor.alpha = 0;
}


//leveloneState.prototype.start = function(){
	//music.fadeIn(3000);
//}


//leveloneState.prototype.transition = function(){
	//game.state.start("transitionstate",false,false,passed,1);
//}


//leveloneState.prototype.testSwipe = function() {
	
		
	
    //this.score += 10;
    //this.scoreText.text = 'Score: ' + this.score;

//}


leveloneState.prototype.swiped = function(){
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
		if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
			if(this.finishX > this.startX){
				this.scoreText.text = 'Score: right';
			}
			else{
				this.scoreText.text = 'Score: left';
			}
			
		}
		else{
			if(this.finishY > this.startY){
				this.scoreText.text = 'Score: down';
			}
			else{
				this.scoreText.text = 'Score: up';
			}
		}
	}
	
}

