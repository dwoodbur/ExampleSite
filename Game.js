function Game() {
	
	/* GAME VARIABLES */
	
	// Basic Game Variables
	canvas = document.getElementById('game');
	this.context = canvas.getContext('2d');
	this.context.fillStyle = 'white';
	this.context.font = "10px Arial";
	this.width = canvas.width;
	this.height = canvas.height;
	this.keys = new KeyListener(); // input
	this.wave = 1; // level/wave num.
	
	// Screen Flash Variables
	this.flash = false;
	this.flashFrames = 0;
	this.flashLength = 30;
	
	// UFO dive variables
	this.nextDiveDuration = 50;
	this.nextDive = this.nextDiveDuration;
	this.doubleDive = false;
	this.doubleDiveOdds = 1;
	
	// Timing/Squence Variables
	this.introFrame = 440; // intro duration
	this.introX = this.width; // intro text position
	this.waveFrame = 0; // wave duration
	this.waveX = this.width; // position of wave text
	this.wavePause; // how long wave text freezes in middle
	
	// Ending Sequence Variables
	this.over = false; // game over
	this.pauseStars = false;
	this.explosionSeq = false;
	this.finalScoreFrame = -1;
	this.finalScorePause;
	this.finalScoreX;
	
	// Game Objects
	this.player = new Player(this.width/2-300,this.height/2-4,15,8);
	this.logoPieces = [];
	this.bullets = [];
	this.UFOs = [];
	this.divingUFOs = [];
	this.enemies = [];
	this.torpedoes = [];
	this.stars = [];
	this.projectiles = [];
	this.world = new World(-140,0);
	
	// Player Variables
	this.coolDown = 0; // time before next shot allowed
	this.score = 0;
	
	/* LOADING METHODS */
	
	// loadLogo()
	// Loads the logo pieces
	this.loadLogo = function() {
		
		this.logoPieces = [];
		
		// Creates array for the logo images
		var logo = new Array(3);	
		for(var i=0; i < 3; i++)
			logo[i] = new Image();
		
		// Gets logo images
		logo[0].src = "images/LogoA.png";
		logo[1].src = "images/LogoB.png";
		logo[2].src = "images/LogoC.png";
		
		// Loads logo pieces
		this.logoPieces.push(new LogoPiece(0, 0, 43, logo[0]));
		this.logoPieces.push(new LogoPiece(43, 0, 43, logo[1]));
		this.logoPieces.push(new LogoPiece(86, 0, 44, logo[2]));
		
	};
	this.getRandomColor = function() {
		var numColors = 9;
		var r = Math.random();
			
		if(r <= 1/numColors)
			return "red";
		else if(r <= 2/numColors)
			return "orange";
		else if(r <= 3/numColors)
			return "yellow";
		else if(r <= 4/numColors)
			return "green";
		else if(r <= 5/numColors)
			return "blue";
		else if(r <= 6/numColors)
			return "purple";
		else if(r <= 7/numColors)
			return "pink";
		else if(r <= 8/numColors)
			return "white";
		else if(r <= 9/numColors)
			return "grey";
			
	};
	// loadWave()
	// Loads the next enemy wave.
	this.loadWave = function() {
		
		// WAVE 1
		// Single start, unravels along same path back-to-back, random colors
		if(this.wave == 1) {
			for(var i=0; i < 8; i++) {
				this.UFOs.push(new UFO(1400, 50, 5, 2, 3, this.width-100-(i*40), 80, .002, "random", -1));
			}
		} 
		
		// WAVE 2
		// Single start, unravels along same path back to back, same random color, same tail
		if(this.wave == 2) {
			var randColor = this.getRandomColor();
			var randTail = Math.random();
			for(var i=0; i < 8; i++) {
				this.UFOs.push(new UFO(1400, 50, 5, 2, 3, this.width-100-(i*40), 80, .002, randColor, randTail));
			}
		}
		
		// WAVE 3
		// Double start, unravels skipping spots for other side, random color
		else if(this.wave == 3) {
			for(var i=0; i < 6; i++) {
				this.UFOs.push(new UFO(1400, 20, 5, 2, 3, this.width-100-(i*80), 80, .002, "random", -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400, 90, 5, 2, 3, this.width-140-(i*80), 80, .002, "random", -1));
			}
		} 
		
		// WAVE 4
		// Double start, unravels skipping spots for other side, two random colors
		else if(this.wave == 4) {
			var color1, color2;
			color1 = this.getRandomColor();
			do {
				color2 = this.getRandomColor();
			} while(color2 == color1);
			
			for(var i=0; i < 6; i++) {
				this.UFOs.push(new UFO(1400, 20, 5, 2, 3, this.width-100-(i*80), 80, .002, color1, -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400, 90, 5, 2, 3, this.width-140-(i*80), 80, .002, color2, -1));
			}
		}
		
		// WAVE 5
		// Double alternated start
		else if(this.wave == 5) {
			var color1, color2;
			color1 = this.getRandomColor();
			do {
				color2 = this.getRandomColor();
			} while(color2 == color1);
			
			for(var i=0; i < 6; i++) {
				this.UFOs.push(new UFO(1400, 20, 5, 2, 3, this.width-100-(i*80), 80, .002, color1, -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400+(6*40), 90, 5, 2, 3, this.width-140-(i*80), 80, .002, color2, -1));
			}
		}
		
		// WAVE 6
		else if(this.wave == 6) {
			for(var i=0; i < 6; i++) {
				this.UFOs.push(new UFO(1400, 20, 5, 2, 3, this.width-100-(i*120), 80, .002, "random", -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400, 55, 5, 2, 3, this.width-140-(i*120), 80, .002, "random", -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400, 90, 5, 2, 3, this.width-180-(i*120), 80, .002, "random", -1));
			}
		}
		
		// WAVE 7
		else if(this.wave == 7) {
			for(var i=0; i < 6; i++) {
				this.UFOs.push(new UFO(1400, 20, 5, 2, 3, this.width-100-(i*120), 80, .002, "random", -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400+(6*40), 55, 5, 2, 3, this.width-140-(i*120), 80, .002, "random", -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400+(12*40), 90, 5, 2, 3, this.width-180-(i*120), 80, .002, "random", -1));
			}
		}
		
		// WAVE 8
		// Double start, unravels skipping spots for other side, one random color
		else if(this.wave == 8) {
			var color = this.getRandomColor();
			for(var i=0; i < 6; i++) {
				this.UFOs.push(new UFO(1400, 20, 5, 2, 3, this.width-100-(i*80), 80, .008, color, -1));
			}
			for(var i=0; i < 6; i++) { 
				this.UFOs.push(new UFO(1400, 90, 5, 2, 3, this.width-140-(i*80), 80, .008, color, -1));
			}
		} 
		
		else if(this.wave == 9)
			this.wave = 1;
		
		// WAVE 5
		// Randomly colored missiles
		else if(this.wave == 5) {
			for(var i=0; i < 5; i++)
				this.torpedoes.push(new Torpedo(1900,13+(i*26),"random"));
		}
		
		
		/*this.UFOs.push(new UFO(1500, 30, 5, 2, 3, 750, 80));
		this.UFOs.push(new UFO(1600, 60, 5, 2, 3, 850, 80));
		this.UFOs.push(new UFO(1700, 45, 5, 2, 3, 950, 80));
		this.UFOs.push(new UFO(1800, 75, 5, 2, 3, 1050, 80));
		this.UFOs.push(new UFO(1400, 110, 5, 2, 3, 1250, 80));*/
		//this.UFOs.push(new UFO(1425, 30, 5, 2, 2, 1225, 150));
		//this.UFOs.push(new UFO(1450, 60, 5, 2, 3, 450, 80));
		/*
		this.torpedoes.push(new Torpedo(1900,12));
		this.torpedoes.push(new Torpedo(1400,36));
		this.torpedoes.push(new Torpedo(1500,60));
		this.torpedoes.push(new Torpedo(1600,84));
		this.torpedoes.push(new Torpedo(1700,100));
		this.torpedoes.push(new Torpedo(1800,110));
		*/
		this.wave++;
	};
	
	// loadDots()
	// Loads the background stars.
	this.loadDots = function() {
		
		this.stars = [];
		
		var x, y; // star position
		var speed = 1; // min speed of star
		var min = 230; // min num of stars
		var max = 280; // max num stars
		var num = Math.random()*(max-min) + min; // num of stars
		
		// Generates stars with speed and random position
		for(var i=0; i < num; i++) {
			x = Math.random()*(this.width-130) + 130;
			y = Math.random()*(this.height);
			
			if(i%30==0)
				speed++;
			if(i%50==0)
				speed++;
				
			this.stars.push(new Star(x,y,speed));
		}
	};
	
	/* MAIN GAME METHODS */
	
	// update()
	// Main update function for the Game. 
	this.update = function() {
		
		if(!this.over && !this.player.hit) {
			// Handle player movement with arrow keys
			if(this.keys.isPressed(38))
				this.player.moveUp();
			if(this.keys.isPressed(40))
				this.player.moveDown();
			if(this.keys.isPressed(37))
				this.player.moveLeft();
			if(this.keys.isPressed(39))
				this.player.moveRight(this.width);
				
			// Handle player firing with space key
			if(this.keys.isPressed(32))
				if(this.coolDown == 0) {
					this.bullets.push(new Bullet(this.player.x+this.player.width, this.player.y+(this.player.height/2)));
					this.coolDown = 10;
				}
		}
		
		// Cooldown for firing
		if(this.coolDown > 0)
			this.coolDown--;
		
		// Update bullet positions
		for(var i=0; i < this.bullets.length; i++) {
			var bullet = this.bullets[i];
			bullet.update();
			if(bullet.x > this.width) {
				this.bullets.splice(i,1);
				i--;
			}
		}
		
		// Update UFOs
		for(var i=0; i < this.UFOs.length; i++) {
			var deleted = false;
			var ufo = this.UFOs[i];
			if(!this.over)
				ufo.update();
			// Delete if ufo sends delete signal or if past left boundary
			if(ufo.del || ufo.x+ufo.width < 0) {
				if(ufo.diveBomb)
					if(!this.doubleDive)
						this.nextDive = this.nextDiveDuration;
					else
						this.doubleDive = false;
				this.UFOs.splice(i,1);
				deleted = true;
			}
			else {
				// Check for bullet collision
				for(var j=0; j < this.bullets.length; j++) {
					var bullet = this.bullets[j];
					if(bullet.y <= ufo.y+ufo.height && bullet.y > ufo.y ||
							bullet.y+bullet.height >= ufo.y && bullet.y+bullet.height < ufo.y+ufo.height) {
						if(bullet.x+bullet.width >= ufo.x && bullet.x+bullet.width < ufo.x+ufo.width && ufo.hp > 0) {
							ufo.hp--;
							this.bullets.splice(j,1);
							j = this.bullets.length;
							if(ufo.hp == 0) {
								if(ufo.diveBomb) {
									if(!this.doubleDive)
										this.nextDive = this.nextDiveDuration;
									else
										this.doubleDive = false;
								}
								this.score += 500;
							}
							deleted = true;
						}
					}
				}
			}
			// Check for player collision
			if(!deleted && !this.over) {
				var player = this.player;
				if(ufo.y <= player.y+player.height && ufo.y > player.y ||
						ufo.y+ufo.height >= player.y && ufo.y+ufo.height < player.y+player.height) {
					if(player.x+player.width >= ufo.x && player.x+player.width < ufo.x+ufo.width ||
							player.x <= ufo.x+ufo.width && player.x > ufo.x ||
							player.x+(player.width/2) > ufo.x && player.x+(player.width/2) < ufo.x+ufo.width) {
						this.player.hit = true;
					}
				}
			}
			// Check for logo collision
			if(!deleted) {
				for(var j=0; j < this.logoPieces.length; j++) {
					var logo = this.logoPieces[j];
					if(ufo.y <= logo.y+logo.height && ufo.y > logo.y ||
							ufo.y+ufo.height >= logo.y && ufo.y+ufo.height < logo.y+logo.height) {
						if(ufo.x <= logo.x+logo.width && ufo.x > logo.x) {
							this.logoPieces.splice(j,1);
							j = this.logoPieces.length;
							if(ufo.diveBomb) {
								if(!this.doubleDive)
									this.nextDive = this.nextDiveDuration;
								else
									this.doubleDive = false;
							}
							this.UFOs.splice(i,1);
							i--;
							deketed = true;
						}
					}
				}
			}
			// Shoot projectiles
			if(!deleted && !this.over) {
				if(Math.random() < ufo.shootingFreq && ufo.x == ufo.xTarget) {
					this.projectiles.push(new Projectile(ufo.x, ufo.y+(ufo.height/2), 5, 0, ufo.color));
				}
			}
		}
		
		// Update torpedoes
		for(var i=0; i < this.torpedoes.length; i++) {
			var torpedo = this.torpedoes[i];
			torpedo.update();
			if(torpedo.x+torpedo.width < 0) {
				this.torpedoes.splice(i,1);
			} else {	
				var deleted = false;
				// Check for collision with logo
				for(var j=0; j < this.logoPieces.length; j++) {
					var logo = this.logoPieces[j];
					if(torpedo.x <= logo.x+logo.width) {//alert(j);
						if(torpedo.y <= logo.y+logo.height && torpedo.y > logo.y ||
							torpedo.y+torpedo.height >= logo.y && torpedo.y+torpedo.height < logo.y+logo.height) {
							this.logoPieces.splice(j,1);
							j = this.logoPieces.length;
							this.torpedoes.splice(i,1);
							i--;
							deleted = true;
						}
					}
				}
				if(deleted == false) {
					// Check for collision with bullet
					for(var j=0; j < this.bullets.length; j++) {
						var bullet = this.bullets[j];
						if(bullet.y <= torpedo.y+torpedo.height && bullet.y > torpedo.y ||
								bullet.y+bullet.height > torpedo.y && bullet.y+bullet.height < torpedo.y+torpedo.height) {
							if(bullet.x+bullet.width >= torpedo.x && bullet.x <= torpedo.x+torpedo.width) {
								this.torpedoes.splice(i,1);
								i--;
								this.bullets.splice(j,1);
								j = this.bullets.length;
								deleted = true;
							}
						}
					}
				}
			}
		}
		
		// Update projectiles
		for(var i=0; i < this.projectiles.length; i++) {
			var proj = this.projectiles[i];
			proj.update();
			if(proj.x < 130) {
				this.projectiles.splice(i,1);
				i--;
			}
		}
		
		// Update stars
		if(!this.pauseStars)
			for(var i=0; i < this.stars.length; i++) {
				var star = this.stars[i];
				star.update();
				if(star.x < 0) {
					star.x = this.width;
				}
			}
		
		// Send UFO dive
		if(this.nextDive == 0 && !this.over) {
			var n, m;
			n = Math.floor(Math.random()*this.UFOs.length);
			if(n < this.UFOs.length) {
				this.UFOs[n].diveBomb = true;
				this.nextDive = -1;
			}
			if(Math.random() < this.doubleDiveOdds && this.UFOs.length > 1) {
				do {
					m = Math.floor(Math.random()*this.UFOs.length);
				} while(m == n)
				if(m < this.UFOs.length) {
					this.UFOs[m].diveBomb = true;
					this.nextDive = -1;
				}
			}
		} else if(this.nextDive > 0){
			this.nextDive--;
		}
		
		
		// Start wave transition sequence before loading new enemies
		if(this.UFOs.length == 0 && this.introFrame == 0 && this.over == false && this.waveFrame == 0) {
			this.waveFrame = 170;
		}
		
		// Check game over
		for(var i=0; i < this.UFOs.length; i++) {
			var ufo = this.UFOs[i];
			if(ufo.x <= 0) {
				this.over = true;
				ufo.collision = true;
			}
		}
		
		if(this.over && this.finalScoreFrame == -1) {
			this.pauseStars = true;
			this.bullets = [];
			this.projectiles = [];
			this.logoPieces = [];
			
				if((this.world.x < 0 && !this.explosionSeq) ) {
					for(var i=0; i < this.UFOs.length; i++) {
						var ufo = this.UFOs[i];
						ufo.x += 5;
						if(ufo.x >= this.width) {
							this.UFOs.splice(i,1);
							i--;
						}
					}
					if(this.nextDive == -1 && this.UFOs.length > 1) {
						var n;
						if(this.UFOs[0].collision)
							n = 1;
						else
							n = 0;
						var ufo = this.UFOs[n];
						
						if(ufo.y+(ufo.height/2) <= this.height/2) 
							ufo.y -= 3;
						 else
							ufo.y += 3;
				
						if(ufo.y+ufo.height <= 0 || ufo.y >= 130)
							this.UFOs.splice(n,1);
					}
				}
				else if(this.finalScoreFrame == -1 && this.explosionSeq == false){
					var ufo = this.UFOs[0];
					// Crash ufo into world once on screen
					if(ufo.x > 130 && this.world.x >= 0) {
						ufo.x -= 5;
						if(ufo.y+(ufo.height/2)+3 < this.height/2)
							ufo.y += 2;
						else if(ufo.y+(ufo.height/2)+3 > this.height/2)
							ufo.y -= 2;
							
						if(ufo.x <= 130) {
							this.explosionSeq = true;
							this.flash = true;
							this.flashFrames = 0;
						}
					} 
				}
				
				if(this.world.x < 0 && !this.explosionSeq) {
					this.world.x++;
					
				}
			//}
		}
			
	};
	
	// draw()
	// Main draw function for the Game.
	this.draw = function() {
		
		// Clear canvas
		this.context.clearRect(0, 0, this.width, this.height);
		
		// Flash due to logo hit
		if(this.flash) {
			this.context.fillStyle = "white";
			this.context.fillRect(0, 0, this.width, this.height);
			this.context.fillStyle = "black";
			// Draw stars
			for(var i=0; i < this.stars.length; i++)
				this.stars[i].draw(this.context);	
			
			
			this.context.fillStyle = "white";
			this.flashFrames++;
			if(this.flashFrames >= this.flashLength) {
				this.flash = false;
				this.flashFrames = 0;
			}
		}
		// No flash
		else {
			// Draw stars
			for(var i=0; i < this.stars.length; i++)
				this.stars[i].draw(this.context);
			// Draw player
			if(!this.over)
				this.player.draw(this.context);
			// Draw bullets
			for(var i=0; i < this.bullets.length; i++)
				this.bullets[i].draw(this.context);
		}
		
		// Draw UFOs
		for(var i=0; i < this.UFOs.length; i++)
			this.UFOs[i].draw(this.context, this.over);
			
		// Draw torpedoes
		for(var i=0; i < this.torpedoes.length; i++) {
			var torpedo = this.torpedoes[i];
			torpedo.draw(this.context, this.over);
			if(torpedo.x < 1800) {
				this.context.fillStyle = torpedo.color;
				this.context.fillRect(130, torpedo.y+(torpedo.height/2), torpedo.x-130, 1);
				this.context.fillStyle = "white";
			}
		}
		
		// Draw enemies
		for(var i=0; i < this.enemies.length; i++)
			this.enemies[i].draw(this.context);
			
		// Draw projectiles
		for(var i=0; i < this.projectiles.length; i++)
			this.projectiles[i].draw(this.context);
		
		// Draw world in ending sequence
		this.world.draw(this.context);
		
		// Draw explosion sequence
		if(this.explosionSeq) {
			this.world.x--;
			
			if(this.world.y==0)
				this.world.y-=3;
			else if(this.world.y==-3)
				this.world.y+=3;
				
			if(this.UFOs.length > 0)
				this.UFOs[0].x-=2;
			
			if(this.world.x < -160 && this.finalScoreFrame == -1) {
				this.finalScoreFrame = 290;
				this.pauseStars = false;
			}
		}
		
		// Intro Sequence
		if(this.introFrame > 0) {
			this.context.font = "50px Arial";
			this.context.fillText("welcome to dylanwoodbury.com", this.introX, 70);
			this.introX -= 8;
			this.introFrame--;
			
			if(this.introX <= -700 && this.introFrame >= 40) {
				this.context.font = "15px Courier";
				this.context.fillText("Arrows: Move", this.width/2, 60);
				this.context.fillText("Space: Shoot", this.width/2, 75);
			}
			
			if(this.introFrame == 0)
				this.waveFrame = 170;
			this.context.font = "10px Arial";
		}
		
		
		
		// Wave Text Sequence
		if(this.waveFrame == 170) {
			this.waveX = this.width;
			this.wavePause = 40;
			for(var i=0; i < this.stars.length; i++) {
				this.stars[i].speed *= 2;
			}
		}
		if(this.waveFrame > 0) {
			this.context.font = "50px Arial";
			this.context.fillText("WAVE " + this.wave, this.waveX, 70);
			this.waveX -= 16;
			this.waveFrame--;
			
			if(this.waveX <= this.width/2-155 && this.wavePause > 0) {
				this.waveX += 16;
				this.wavePause--;
			}
			
			if(this.waveFrame == 0) {
				for(var i=0; i < this.stars.length; i++) {
					this.stars[i].speed = this.stars[i].speed / 2;
				}
				this.loadWave();
			}
				
			this.context.font = "10px Arial";
		}
		
		// Final Score Sequence
		if(this.finalScoreFrame == 290) {
			this.finalScoreX = this.width;
			this.finalScorePause = 80;
			this.pauseStars = false;
			for(var i=0; i < this.stars.length; i++) {
				this.stars[i].speed *= 2;
			}
		}
		if(this.finalScoreFrame > 0) {
			this.context.font = "50px Arial";
			this.context.fillText("FINAL SCORE: " + this.score, this.finalScoreX, 70);
			this.finalScoreX -= 16;
			this.finalScoreFrame--;
			
			// Handle text pause in center of screen
			if(this.finalScoreX <= this.width/2-220 && this.finalScorePause > 0) {
				this.finalScoreX += 16;
				this.finalScorePause--;
			}
			
			if(this.finalScoreFrame == 80) {
				for(var i=0; i < this.stars.length; i++) {
					this.stars[i].speed = this.stars[i].speed / 2;
				}
			}
			// Restart game
			if(this.finalScoreFrame == 0) {
				this.world = new World(-140,0);
				this.explosionSeq = false;
				this.loadLogo();
				this.wave = 1;
				this.waveFrame = 170;
				this.score = 0;
				this.over = false;
				this.UFOs = [];
				this.nextDive = 0;
				this.finalScoreFrame = -1;
				this.player.x = this.width/2-300;
				this.player.y = this.height/2-4;
			}
				
			this.context.font = "10px Arial";
		}
		
		
		// Draw logo pieces
		for(var i=0; i < this.logoPieces.length; i++)
			this.logoPieces[i].draw(this.context);
			
		// Draw score
		this.context.fillText("Score: " + this.score,this.width-100,10);
			
		/* TESTING ON-SCREEN STATISTICS */
		/*
		this.context.fillText("X: " + this.player.x + " Y: " + this.player.y,135,10);
		this.context.fillText("Bullets: " + this.bullets.length + " Enemies: " + this.enemies.length + 
				" Logos: " + this.logoPieces.length + " Stars: " + this.stars.length + " UFOs: " + this.UFOs.length + 
				" Torpedoes: " + this.torpedoes.length + " Wave: " + this.wave + "  " + this.finalScoreFrame,135,120);
		*/
		
		
	};
	
	/* INITIALIZE GAME */
	
	//this.loadLogo();
	this.loadDots();
}