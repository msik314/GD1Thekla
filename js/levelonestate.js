//Constructor
let leveloneState=function(){
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	this.instrTimes = [1,2,6,7,10,10.5,11,13,13.5,14,Infinity];
	this.instrType = [0,0,1,1,0,0,0,1,1,1];
	this.instrDirection = [-1,1,0,1,2,3,1,0,0,0];
	this.currentDirections = [];
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
	leftSFX = game.add.audio('leftAud');
	leftSFX._volume = 5;
	rightSFX = game.add.audio('rightAud');
	rightSFX._volume = 5;
	upSFX = game.add.audio('upAud');
	upSFX._volume = 5;
	downSFX = game.add.audio('downAud');
	downSFX._volume = 5;
	//music.onDecoded.add(start, this);
	music.play();
	
	//create instructor;
	this.instructor = game.add.sprite(game.world.width - 280,24,"instructor");
	this.instructor.animations.add('instructing', [0,1],2.1,true);
	this.instructor.alpha = 0;
	this.instructor.animations.play('instructing');
	
	//create arrow group
	this.arrows = game.add.group();
	this.arrows.enableBody = true;
	
	//create bar group
	this.bars = game.add.group();
	this.bars.enableBody = true;
	
	goal = game.add.sprite(0,0,"goal");
	
	
	
	
	
	
	//game.time.events.repeat(Phaser.Timer.Second * 10, 4, instruct, this);
	//game.time.events.loop(Phaser.Timer.SECOND,this.instruct());
	this.startTime = game.time.totalElapsedSeconds();
	
	
}

leveloneState.prototype.update = function(){
	//collide arrows with each other for stacking
	game.physics.arcade.collide(this.arrows, this.arrows);
	
	
	//SWIPE FUNCTIONALITY -- ONLY CHECK IF LOOKING FOR INPUT
	if(!this.currentlyInstructing){
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
			this.currentlyInstructing = false;
			this.sendBar();
		}
		this.instrIndex++;
		
		
	}
	
	//check to see if you missed an instruction
	let temp = this.bars.getFirstAlive();
	if(temp){
		if(temp.y >= game.world.height - 200){
			this.removeBar();
		}
	}
	
	
}

//first instruction in a set
leveloneState.prototype.firstInstruct = function(){
	this.score++;
	this.scoreText.text = 'Score: FIRST';
	this.instructor.alpha = 1;
	
	this.currentDirections = [];
	if(this.instrDirection[this.instrIndex] === -1){
		this.currentDirections.push(Math.floor(Math.random() * 4));
		
	}else{
		this.currentDirections.push(this.instrDirection[this.instrIndex]);
	}
	this.generateArrow();
	this.checkNext();
}

leveloneState.prototype.instruct = function(){
	//instructor.
	this.score++;
	this.scoreText.text = 'Score: ' + this.score;
	this.instructor.alpha = 1;
	
	
	if(this.instrDirection[this.instrIndex] === -1){
		this.currentDirections.push(Math.floor(Math.random() * 4));
		
	}else{
		this.currentDirections.push(this.instrDirection[this.instrIndex]);
	}
	
	this.generateArrow();
	this.checkNext();
}

leveloneState.prototype.sendBar = function(){
	//instructor.
	this.removeArrows();
	this.score = this.instrTimes[this.instrIndex];
	this.scoreText.text = 'Score: ' + this.score;
	this.instructor.alpha = 0;
	let bar = this.bars.create(game.world.width/2,0, "bar");
	bar.body.velocity.y = 400;
	this.checkNext();
}

//check if next item is a playerswipe, if so, decrease the timer for it so it has time to spawn
leveloneState.prototype.checkNext = function(){
	
	if(this.instrType[this.instrIndex + 1] === 1){
		this.instrTimes[this.instrIndex + 1] -= 1;
	}
	
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
leveloneState.prototype.generateArrow = function(){
	
	if(this.currentDirections[this.currentDirections.length - 1] === 0){
		let arrow = this.arrows.create(game.world.width - 280, 24, "upArrow");
		arrow.body.velocity.x = -100;
		arrow.body.collideWorldBounds = true;
		upSFX.play();
	} else if(this.currentDirections[this.currentDirections.length - 1] === 1){
		let arrow = this.arrows.create(game.world.width - 280, 24, "rightArrow");
		arrow.body.collideWorldBounds = true;
		arrow.body.velocity.x = -100;
		rightSFX.play();
	}else if(this.currentDirections[this.currentDirections.length - 1] === 2){
		let arrow = this.arrows.create(game.world.width - 280, 24, "downArrow");
		arrow.body.collideWorldBounds = true;
		arrow.body.velocity.x = -100;
		downSFX.play();
	}else{
		let arrow = this.arrows.create(game.world.width - 280, 24, "leftArrow");
		arrow.body.collideWorldBounds = true;
		arrow.body.velocity.x = -100;
		leftSFX.play();
	}
	
}


leveloneState.prototype.removeArrows = function(){
	let temp = this.arrows.getFirstAlive();
	while(temp){
		temp.kill();
		temp = this.arrows.getFirstAlive();
	}
}

leveloneState.prototype.removeBar = function(){
	let temp = this.bars.getFirstAlive();
		
	if(temp){
		temp.kill();
	}
	if(this.currentDirections.length > 0){
		this.currentDirections.shift();
	}
}

leveloneState.prototype.swiped = function(){
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
		
		let temp = this.bars.getFirstAlive();
		
		if(temp){
				
			
			
			if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
				if(this.finishX > this.startX){
					this.scoreText.text = 'Score: right';
					if(this.currentDirections[0] === 1){
						if(temp.y < game.world.height - 200 && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
						
					}
					else{
						this.scoreText.text = 'Score: wrong'+ this.currentDirections[0];
					}
				}
				else{
					if(this.currentDirections[0] === 3){
						if(temp.y < game.world.height - 200 && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
					}
					else{
						this.scoreText.text = 'Score: wrong'+ this.currentDirections[0];
					}
					//this.scoreText.text = 'Score: left';
				}
				
			}
			else{
				if(this.finishY > this.startY){
					if(this.currentDirections[0] === 2){
						if(temp.y < game.world.height - 200 && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
					}
					else{
						this.scoreText.text = 'Score: wrong'+ this.currentDirections[0];
					}
					//this.scoreText.text = 'Score: down';
				}
				else{
					if(this.currentDirections[0] === 0){
						if(temp.y < game.world.height - 200 && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
					}
					else{
						this.scoreText.text = 'Score: wrong' + this.currentDirections[0];
					}
					//this.scoreText.text = 'Score: up';
				}
			}
			
			this.removeBar();
		}
		
	}
	
}

