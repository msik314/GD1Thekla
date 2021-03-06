//Constructor
let levelthreeState=function(){
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

levelthreeState.prototype.preload = function(){
	//game.load.audio("songOne","assets/tk30s.ogg");
	game.camera.flash(0x000000,1000);
	game.load.text('lvl3ts','assets/lvl3timestamp.txt');
	
	
	//game.load.spritesheet("water", "assets/3dStuff/background/spritesheet_water_normal_v2.png",1334, 750,60);
	//game.load.spritesheet("wind", "assets/3dStuff/background/spritesheet_wind_v1.png",1334, 750,60);
	//game.load.audio("songOne","assets/tk30s.ogg");
	
	
	game.load.audio("correct","assets/tkBellHigh.ogg");
	game.load.audio("barMade","assets/tkBellLow.ogg");
	
	//create background
	this.water = game.add.sprite(0,0,'water3');
	this.water.animations.add('normal');
	//this.water.animations.play('normal',50,true);
	
	//create thekla
	this.theklaI = game.add.sprite(0,50,'theklaI3');
	this.theklaI.animations.add('idle');
	
	this.theklaS = game.add.sprite(0,50,'theklaS3');
	this.theklaS.animations.add('sad');
	this.theklaS.alpha = 1;
	
	this.theklaH1 = game.add.sprite(0,50,'theklaH13');
	this.theklaH1.animations.add('happy1');
	this.theklaH1.alpha = 1;
	this.theklaH1.y -= 40;

	//this.theklaH2 = game.add.sprite(0,50,'theklaH2');
	//this.theklaH2.animations.add('happy2');
	//this.theklaH2.alpha = 1;
	//this.thekla.animations.play('idle',50,true);
	
	//create wind
	this.wind = game.add.sprite(0,0,'wind');
	//this.wind.size.x = 1;
	this.wind.animations.add('normal');
	//this.wind.animations.play('normal',50,true);
}

levelthreeState.prototype.create = function(){
	//reset variables on reload
	this.numBars = 0;
	this.barsHit = 0;
	this.score = 0;
	this.swiping = false;
	this.startX = 0;
	this.startY = 0;
	this.finishX = 0;
	this.finishY = 0;
	this.lvl= 3 ;
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
	
	this.animationIndex = 1;
	this.animationSpeed = 100;
	
	//some constants for quick global tweaks
	this.arrowSpeed = -800;
	this.bufferLength = 3.2;
	this.spawnBuffer = .8;
	this.barSpawnY = -200;
	this.barSpeed = (game.world.height - 220 - this.barSpawnY)/this.spawnBuffer;
	this.instrVol = 10;
	
	
	
	
	
	//Load instructions
	lvl3ts=game.cache.getText('lvl3ts');
	timestamps=lvl3ts.split('\n');
	this.instrTimes=timestamps[0].split(' ').map(Number);
	this.instrTimes.push(Infinity);
	this.instrType=timestamps[1].split(' ').map(Number);
	this.instrDirection=timestamps[2].split(' ').map(Number);
	
	
	this.scoreText = game.add.text(16, -100, 'Score: 0', { fontSize: '32px', fill: '#000000' });
	this.directionText = game.add.text(16, -100, 'Score: 0', { fontSize: '32px', fill: '#000000' });
	music = game.add.audio('songThree');
	music._volume = 1.5;
	leftSFX = game.add.audio('leftAud');
	leftSFX._volume = this.instrVol;
	rightSFX = game.add.audio('rightAud');
	rightSFX._volume = this.instrVol;
	upSFX = game.add.audio('upAud');
	upSFX._volume = this.instrVol;
	downSFX = game.add.audio('downAud');
	downSFX._volume = this.instrVol;
	
	barMadeSFX = game.add.audio('barMade');
	barMadeSFX._volume = this.instrVol;
	
	barCorrectSFX = game.add.audio('correct');
	barCorrectSFX._volume = this.instrVol;
	
	//music.onDecoded.add(start, this);
	//music.play();
	
	//create instructor;
	this.instructor = game.add.sprite(0,0,"instructor");
	//this.instructor.animations.add('instructing', [0,1],2.1,true);
	this.instructor.alpha = 0;
	//this.instructor.animations.play('instructing');
	
	//create arrow group
	this.arrows = game.add.group();
	this.arrows.enableBody = true;
	//this.arrows.body.onCollide.add(this.arrowStop, this);
	
	//create bar group
	this.bars = game.add.group();
	this.bars.enableBody = true;
	
	goal = game.add.sprite(0,game.world.height - 200,"goal");
	goalBackground = game.add.sprite(0, 0, "goalBackground");
	goalAnimated = game.add.sprite(0, 0, "goalAnimated");
	goalAnimated.y += 240;
	goalAnimated.animations.add('goalAnimated');
	
	
	
	
	
	//game.time.events.repeat(Phaser.Timer.Second * 10, 4, instruct, this);
	//game.time.events.loop(Phaser.Timer.SECOND,this.instruct());
	//this.startTime = game.time.totalElapsedSeconds() + this.bufferLength;
	
	//contButton=game.add.button(447,275,'continueButton',function(){this.transition(this)},this);
}

levelthreeState.prototype.update = function(){
	
	this.directionText.text = 'Direction: ' + this.currentDirections[this.currentDirectionsIndex];
	
	//check to see if we should play the music yet
	if(!this.musicPlaying){
		if(music.isPlaying){
			this.startTime = game.time.totalElapsedSeconds();
			this.musicPlaying = true;
			this.wind.animations.play('normal',this.animationSpeed ,true);
			this.theklaI.animations.play('idle',this.animationSpeed ,true);
			this.theklaS.animations.play('sad',this.animationSpeed ,true);
			this.theklaH1.animations.play('happy1',this.animationSpeed ,true);
			//this.theklaH2.animations.play('happy2',50,true);
			this.water.animations.play('normal', this.animationSpeed, true);
			goalAnimated.play("goalAnimated", 50, true);

		}else{
			music.play();
		}
	}else{
		if(!music.isPlaying && game.time.totalElapsedSeconds() - this.startTime > 5){
			this.transition();
		}
	}
	
	if(this.animationIndex === 0){
		this.theklaS.alpha = 1;
		this.theklaI.alpha = 0;
		this.theklaH1.alpha = 0;
		//this.theklaH2.alpha = 0;
	}else if(this.animationIndex === 1){
		this.theklaS.alpha = 0;
		this.theklaI.alpha = 1;
		this.theklaH1.alpha = 0;
		//this.theklaH2.alpha = 0;
	}else{
		this.theklaS.alpha = 0;
		this.theklaI.alpha = 0;
		if(this.animationIndex % 2 === 0){
			this.theklaH1.alpha = 1;
			//this.theklaH2.alpha = 0;
		}else{
			this.theklaH1.alpha = 1;
			//this.theklaH2.alpha = 1;
		}
		
	}
	
	
	//collide arrows with each other for stacking
	game.physics.arcade.collide(this.arrows, this.arrows);
	game.physics.arcade.overlap(this.arrows, this.arrows, this.arrowStop, null, this);
	
	
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
		if(temp.y >= game.world.height - 250){
			this.wrongRead();
			this.removeBar();
		}
	}
	
	
}

levelthreeState.prototype.arrowStop = function(sprite1,sprite2){
	sprite1.body.velocity.x = 0;
	sprite2.body.velocity.x = 0;
}


//first instruction in a set
levelthreeState.prototype.firstInstruct = function(){
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

levelthreeState.prototype.instruct = function(){
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

levelthreeState.prototype.sendBar = function(){
	//instructor.
	this.numBars++;
	this.removeArrows();
	this.score = this.instrTimes[this.instrIndex];
	this.scoreText.text = 'Score: ' + this.score;
	this.instructor.alpha = 0;
	let bar = this.bars.create(0,this.barSpawnY, "bar");
	
	bar.body.velocity.y = this.barSpeed;
	this.checkNext();
}

//check if next item is a playerswipe, if so, decrease the timer for it so it has time to spawn
levelthreeState.prototype.checkNext = function(){
	
	if(this.instrType[this.instrIndex + 1] === 1){
		this.instrTimes[this.instrIndex + 1] -= this.spawnBuffer;
	}
	
}


//levelthreeState.prototype.start = function(){
	//music.fadeIn(3000);
//}


//levelthreeState.prototype.transition = function(){
	//game.state.start("transitionstate",false,false,passed,1);
//}


//levelthreeState.prototype.testSwipe = function() {
	
		
	
    //this.score += 10;
    //this.scoreText.text = 'Score: ' + this.score;

//}
levelthreeState.prototype.generateArrow = function(){
    let initXPos = 40 + ((this.currentDirections.length - 1) * 120); //inital x position of arrows
    if (this.currentDirections[this.currentDirections.length - 1] === 0) {
        let arrow = this.arrows.create(initXPos, 0, "upArrow");
        arrow.y -= 17;
        arrow.scale.setTo(0, 0);
        let t = this.add.tween(arrow.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Back.Out, true, 0); // working
        t.frameBased = false;
        upSFX.play();
    } else if (this.currentDirections[this.currentDirections.length - 1] === 1) {
        let arrow = this.arrows.create(initXPos, 0, "rightArrow");
        arrow.y -= 17;
        arrow.scale.setTo(0, 0);
        let t = this.add.tween(arrow.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Back.Out, true, 0); // working
        t.frameBased = false;
        rightSFX.play();
    } else if (this.currentDirections[this.currentDirections.length - 1] === 2) {
        let arrow = this.arrows.create(initXPos, 0, "downArrow");
        arrow.y -= 17;
        arrow.scale.setTo(0, 0);
        let t = this.add.tween(arrow.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Back.Out, true, 0); // working
        t.frameBased = false;
        downSFX.play();
    } else {
        let arrow = this.arrows.create(initXPos, 0, "leftArrow");
        arrow.y -= 17;
        arrow.scale.setTo(0, 0);
        let t = this.add.tween(arrow.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Back.Out, true, 0); // working
        t.frameBased = false;
        leftSFX.play();
    }

	
}


levelthreeState.prototype.removeArrows = function(){
	let temp = this.arrows.getFirstAlive();
	while(temp){
		temp.kill();
		temp = this.arrows.getFirstAlive();
	}
}

levelthreeState.prototype.removeBar = function(){
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

levelthreeState.prototype.swiped = function(){
	
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
						if(temp.y < game.world.height){
							this.scoreText.text = 'Score: correct';
							this.correctRead();
							rightSFX.play();

						}else{
							this.wrongRead();
						}
						
					}
					else{
						this.wrongRead();
					}
				}
				else{
					if(this.currentDirections[this.currentDirectionsIndex] === 3){
						if(temp.y < game.world.height){
							this.scoreText.text = 'Score: correct';
							this.correctRead();
							leftSFX.play();
						}else{
							this.wrongRead();
						}
					}
					else{
						this.wrongRead();
					}
					//this.scoreText.text = 'Score: left';
				}
				
			}
			else{
				if(this.finishY > this.startY){
					if(this.currentDirections[this.currentDirectionsIndex] === 2){
						if(temp.y < game.world.height){
							this.scoreText.text = 'Score: correct';
							this.correctRead();
							downSFX.play();
						}else{
							this.wrongRead();
						}
					}
					else{
						this.wrongRead();
					}
					//this.scoreText.text = 'Score: down';
				}
				else{
					if(this.currentDirections[this.currentDirectionsIndex] === 0){
						if(temp.y < game.world.height){
							this.scoreText.text = 'Score: correct';
							this.correctRead();
							upSFX.play();
						}else{
							this.wrongRead();
						}
					}
					else{
						this.wrongRead();
					}
					//this.scoreText.text = 'Score: up';
				}
			}
			this.removeBar();
			
			
		}
		
	}
	
}

levelthreeState.prototype.correctRead = function(){
	if(this.animationIndex === 0){
		this.animationIndex = 1;
	}else{
		this.animationIndex++;
	}
	this.barsHit++;
	barCorrectSFX.play();
}

levelthreeState.prototype.wrongRead = function(){
	if(this.animationIndex === 1 || this.animationIndex === 0){
		this.animationIndex = 0;
	}else{
		this.animationIndex = 1;
	}
	barMadeSFX.play();
}


levelthreeState.prototype.transition = function(){
	game.camera.fade(0x000000,1000);
	this.camera.onFadeComplete.add(function() {
        game.state.start("testts",true,false,this.passed,this.lvl,this.numBars,this.barsHit);
    }, this);
}
