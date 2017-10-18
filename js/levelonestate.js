//Constructor
let leveloneState=function(){
	/*
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	this.lvl= 1 ;
	this.passed= true ;
	this.instrTimes = [1,2,6,7,10,10.5,11,13,13.5,14,Infinity];
	this.instrType = [0,0,1,1,0,0,0,1,1,1];
	this.instrDirection = [-1,1,0,1,2,3,1,0,0,0];
	this.currentDirections = [];
	this.currentDirectionsIndex = 0;
	this.currentlyInstructing = false;
	this.instrIndex = 0;
	this.currentTime = 0;
	this.startTime = Infinity;
	
	this.musicPlaying = false;
	
	//some constants for quick global tweaks
	this.arrowSpeed = -800;
	this.bufferLength = 3.2;
	this.barSpeed = 937.5;
	*/
}

leveloneState.prototype.preload = function(){
	//game.load.audio("songOne","assets/tk30s.ogg");
	game.camera.flash(0x000000,1000);
	game.load.text('lvl1ts','assets/lvl1timestamp.txt');
	
	game.load.spritesheet("thekla", "assets/3dStuff/thekla/spritesheet_boat_idol_v1.png",1334, 750,60);
	game.load.spritesheet("water", "assets/3dStuff/background/spritesheet_water_normal_v2.png",1334, 750,60);
	game.load.spritesheet("wind", "assets/3dStuff/background/spritesheet_wind_v1.png",1334, 750,60);
	game.load.audio("songOne","assets/tk30s.ogg");
	
	//create background
	this.water = game.add.sprite(0,0,'water');
	this.water.animations.add('normal');
	//this.water.animations.play('normal',50,true);
	
	//create thekla
	this.thekla = game.add.sprite(0,50,'thekla');
	this.thekla.animations.add('idle');
	//this.thekla.animations.play('idle',50,true);
	
	//create wind
	this.wind = game.add.sprite(0,0,'wind');
	this.wind.size = -1;
	this.wind.animations.add('normal');
	//this.wind.animations.play('normal',50,true);
}

leveloneState.prototype.create = function(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//reset variables on reload
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	this.lvl= 1 ;
	this.passed= true ;
	this.instrTimes = [1,2,6,7,10,10.5,11,13,13.5,14,Infinity];
	this.instrType = [0,0,1,1,0,0,0,1,1,1];
	this.instrDirection = [-1,1,0,1,2,3,1,0,0,0];
	this.currentDirections = [];
	this.currentDirectionsIndex = 0;
	this.currentlyInstructing = false;
	this.instrIndex = 0;
	this.currentTime = 0;
	this.startTime = Infinity;
	
	this.musicPlaying = false;
	
	//some constants for quick global tweaks
	this.arrowSpeed = -500;
	this.bufferLength = 3.2;
	this.spawnBuffer = .8;
	this.barSpawnY = -200;
	this.barSpeed = (game.world.height - 200 - this.barSpawnY)/this.spawnBuffer;
	
	
	
	
	
	//Load instructions
	lvl1ts=game.cache.getText('lvl1ts');
	timestamps=lvl1ts.split('\n');
	this.instrTimes=timestamps[0].split(' ').map(Number);
	this.instrTimes.push(Infinity);
	this.instrType=timestamps[1].split(' ').map(Number);
	this.instrDirection=timestamps[2].split(' ').map(Number);
	
	
	this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000000' });
	this.directionText = game.add.text(16, 50, 'Score: 0', { fontSize: '32px', fill: '#000000' });
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
	//music.play();
	
	//create instructor;
	this.instructor = game.add.sprite(0,0,"instructor");
	this.instructor.animations.add('instructing', [0,1],2.1,true);
	this.instructor.alpha = 0;
	this.instructor.animations.play('instructing');
	
	//create arrow group
	this.arrows = game.add.group();
	this.arrows.enableBody = true;
	
	//create bar group
	this.bars = game.add.group();
	this.bars.enableBody = true;
	
	goal = game.add.sprite(0,game.world.height - 200,"goal");
	
	
	
	
	
	
	//game.time.events.repeat(Phaser.Timer.Second * 10, 4, instruct, this);
	//game.time.events.loop(Phaser.Timer.SECOND,this.instruct());
	//this.startTime = game.time.totalElapsedSeconds() + this.bufferLength;
	
	//contButton=game.add.button(447,275,'continueButton',function(){this.transition(this)},this);
}

leveloneState.prototype.update = function(){
	
	this.directionText.text = 'Direction: ' + this.currentDirections[this.currentDirectionsIndex];
	
	//check to see if we should play the music yet
	if(!this.musicPlaying){
		if(music.isPlaying){
			this.startTime = game.time.totalElapsedSeconds();
			this.musicPlaying = true;
			this.wind.animations.play('normal',50,true);
			this.thekla.animations.play('idle',50,true);
			this.water.animations.play('normal',50,true);
		}else{
			music.play();
		}
		
		
		
	}
	
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
	//this.scoreText.text = 'Score: ' + this.score;
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
	let bar = this.bars.create(0,this.barSpawnY, "bar");
	bar.body.velocity.y = this.barSpeed;
	this.checkNext();
}

//check if next item is a playerswipe, if so, decrease the timer for it so it has time to spawn
leveloneState.prototype.checkNext = function(){
	
	if(this.instrType[this.instrIndex + 1] === 1){
		this.instrTimes[this.instrIndex + 1] -= this.spawnBuffer;
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
		let arrow = this.arrows.create(game.world.width - 280, -24, "upArrow");
		arrow.body.velocity.x = this.arrowSpeed;
		game.physics.enable(arrow,Phaser.Physics.ARCADE);
		arrow.body.collideWorldBounds = true;
		upSFX.play();
	} else if(this.currentDirections[this.currentDirections.length - 1] === 1){
		let arrow = this.arrows.create(game.world.width - 280, -24, "rightArrow");
		arrow.body.velocity.x = this.arrowSpeed;
		game.physics.enable(arrow,Phaser.Physics.ARCADE);
		arrow.body.collideWorldBounds = true;
		rightSFX.play();
	}else if(this.currentDirections[this.currentDirections.length - 1] === 2){
		let arrow = this.arrows.create(game.world.width - 280, -24, "downArrow");
		arrow.body.velocity.x = this.arrowSpeed;
		game.physics.enable(arrow,Phaser.Physics.ARCADE);
		arrow.body.collideWorldBounds = true;
		downSFX.play();
	}else{
		let arrow = this.arrows.create(game.world.width - 280, -24, "leftArrow");
		arrow.body.velocity.x = this.arrowSpeed;
		game.physics.enable(arrow,Phaser.Physics.ARCADE);
		arrow.body.collideWorldBounds = true;
		leftSFX.play();
	}
	for(var i=0;i<arrows.children.length-1;++i){
		game.physics.arcade.collide(arrows[i],arrows[i+1],null,null,this);
	}
	game.physics.arcade.collide(arrows[arrows.children.length-1],arrows[0],null,null,this);
	
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
	if(this.currentDirections.length > this.currentDirectionsIndex + 1){
		this.currentDirectionsIndex++;
	}else{
		this.currentDirectionsIndex = 0;
	}
}

leveloneState.prototype.swiped = function(){
	
	//test reload
	//music.stop();
	//game.state.start("levelonestate");
	
	if(Math.abs(this.startX - this.finishX) > 15 || Math.abs(this.startY - this.finishY) > 15){
		
		let temp = this.bars.getFirstAlive();
		
		if(temp){
				
			
			
			if(Math.abs(this.startX - this.finishX) > Math.abs(this.startY - this.finishY)){
				if(this.finishX > this.startX){
					this.scoreText.text = 'Score: right';
					if(this.currentDirections[this.currentDirectionsIndex] === 1){
						if(temp.y < game.world.height && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
							this.removeBar();
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
						
					}
					else{
						this.scoreText.text = 'Score: wrong'+ this.currentDirections[this.currentDirectionsIndex];
					}
				}
				else{
					if(this.currentDirections[this.currentDirectionsIndex] === 3){
						if(temp.y < game.world.height && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
							this.removeBar();
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
					}
					else{
						this.scoreText.text = 'Score: wrong'+ this.currentDirections[this.currentDirectionsIndex];
					}
					//this.scoreText.text = 'Score: left';
				}
				
			}
			else{
				if(this.finishY > this.startY){
					if(this.currentDirections[this.currentDirectionsIndex] === 2){
						if(temp.y < game.world.height && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
							this.removeBar();
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
					}
					else{
						this.scoreText.text = 'Score: wrong'+ this.currentDirections[this.currentDirectionsIndex];
					}
					//this.scoreText.text = 'Score: down';
				}
				else{
					if(this.currentDirections[this.currentDirectionsIndex] === 0){
						if(temp.y < game.world.height && temp.y > game.world.height - 400){
							this.scoreText.text = 'Score: correct';
							this.removeBar();
						}else{
							this.scoreText.text = 'Score: TooSoon';
						}
					}
					else{
						this.scoreText.text = 'Score: wrong' + this.currentDirections[this.currentDirectionsIndex];
					}
					//this.scoreText.text = 'Score: up';
				}
			}
			
			
		}
		
	}
	
}

leveloneState.prototype.transition = function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        game.state.start("testts",true,false,this.passed,this.lvl);
    }, this);
}