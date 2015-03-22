/*
 * Type 1 - vertical-sliding shooter
 * Type 2 - still shooter
 * Type 3 - kamikaze
 * 
 */

function UFO(x,y,xspeed,yspeed,type, xTarget, duration, shootingFreq, color, tailR) {
	
	// Position Variables
	this.x = x;
	this.y = y;
	
	// Target Position/Entry Markers
	this.xMark = this.x;
	this.yMark = this.y;
	this.waveRad = 30;
	
	// Movement Variables
	this.xspeed = xspeed;
	this.yspeed = yspeed;
	
	this.type = type;
	this.xTarget = xTarget;
	this.duration = duration;
	this.durationMark = this.duration;
	this.durationSpeed = 2;
	this.shootingFreq = shootingFreq;
	this.diveBomb = false;
	this.collision = false;
	
	// Animation Variables
	this.frame = 0;
	this.frameCount = 1;
	this.frameSpeed = 5;
	this.spriteSheet = new Array(4);
	this.color = color;
	this.tailColor;
	this.tailR = tailR;
	this.numColors = 9;
	
	if(this.type == 3) {
		// Assign colors and sprites
		for(var i=0; i < 4; i++)
			this.spriteSheet[i] = new Image();
		var r = Math.random();
		if(r <= 1/this.numColors && this.color == "random" || this.color == "red") {
			var tailColors = 4;
			this.color = "red";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/red-blue_ship1a.png";
				this.spriteSheet[1].src = "images/red-blue_ship1b.png";
				this.spriteSheet[2].src = "images/red-blue_ship1c.png";
				this.spriteSheet[3].src = "images/red-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/red-green_ship1a.png";
				this.spriteSheet[1].src = "images/red-green_ship1b.png";
				this.spriteSheet[2].src = "images/red-green_ship1c.png";
				this.spriteSheet[3].src = "images/red-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/red-purple_ship1a.png";
				this.spriteSheet[1].src = "images/red-purple_ship1b.png";
				this.spriteSheet[2].src = "images/red-purple_ship1c.png";
				this.spriteSheet[3].src = "images/red-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/red-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/red-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/red-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/red-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		} else if(r <= 2/this.numColors && this.color == "random" || this.color == "orange") {
			var tailColors = 5;
			this.color = "orange";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/orange-blue_ship1a.png";
				this.spriteSheet[1].src = "images/orange-blue_ship1b.png";
				this.spriteSheet[2].src = "images/orange-blue_ship1c.png";
				this.spriteSheet[3].src = "images/orange-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/orange-green_ship1a.png";
				this.spriteSheet[1].src = "images/orange-green_ship1b.png";
				this.spriteSheet[2].src = "images/orange-green_ship1c.png";
				this.spriteSheet[3].src = "images/orange-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/orange-purple_ship1a.png";
				this.spriteSheet[1].src = "images/orange-purple_ship1b.png";
				this.spriteSheet[2].src = "images/orange-purple_ship1c.png";
				this.spriteSheet[3].src = "images/orange-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/orange-red_ship1a.png";
				this.spriteSheet[1].src = "images/orange-red_ship1b.png";
				this.spriteSheet[2].src = "images/orange-red_ship1c.png";
				this.spriteSheet[3].src = "images/orange-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/orange-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/orange-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/orange-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/orange-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		} else if(r <= 3/this.numColors && this.color == "random" || this.color == "yellow") {
			var tailColors = 4;
			this.color = "yellow";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/yellow-blue_ship1a.png";
				this.spriteSheet[1].src = "images/yellow-blue_ship1b.png";
				this.spriteSheet[2].src = "images/yellow-blue_ship1c.png";
				this.spriteSheet[3].src = "images/yellow-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/yellow-green_ship1a.png";
				this.spriteSheet[1].src = "images/yellow-green_ship1b.png";
				this.spriteSheet[2].src = "images/yellow-green_ship1c.png";
				this.spriteSheet[3].src = "images/yellow-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/yellow-purple_ship1a.png";
				this.spriteSheet[1].src = "images/yellow-purple_ship1b.png";
				this.spriteSheet[2].src = "images/yellow-purple_ship1c.png";
				this.spriteSheet[3].src = "images/yellow-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/yellow-red_ship1a.png";
				this.spriteSheet[1].src = "images/yellow-red_ship1b.png";
				this.spriteSheet[2].src = "images/yellow-red_ship1c.png";
				this.spriteSheet[3].src = "images/yellow-red_ship1b.png";
				this.tailColor = "red";
			} 
		} else if(r <= 4/this.numColors && this.color == "random" || this.color == "green") {
			var tailColors = 5;
			this.color = "green";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/green-blue_ship1a.png";
				this.spriteSheet[1].src = "images/green-blue_ship1b.png";
				this.spriteSheet[2].src = "images/green-blue_ship1c.png";
				this.spriteSheet[3].src = "images/green-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/green-green_ship1a.png";
				this.spriteSheet[1].src = "images/green-green_ship1b.png";
				this.spriteSheet[2].src = "images/green-green_ship1c.png";
				this.spriteSheet[3].src = "images/green-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/green-purple_ship1a.png";
				this.spriteSheet[1].src = "images/green-purple_ship1b.png";
				this.spriteSheet[2].src = "images/green-purple_ship1c.png";
				this.spriteSheet[3].src = "images/green-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/green-red_ship1a.png";
				this.spriteSheet[1].src = "images/green-red_ship1b.png";
				this.spriteSheet[2].src = "images/green-red_ship1c.png";
				this.spriteSheet[3].src = "images/green-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/green-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/green-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/green-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/green-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		} else if(r <= 5/this.numColors && this.color == "random" || this.color == "blue") {
			var tailColors = 5;
			this.color = "blue";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/blue-blue_ship1a.png";
				this.spriteSheet[1].src = "images/blue-blue_ship1b.png";
				this.spriteSheet[2].src = "images/blue-blue_ship1c.png";
				this.spriteSheet[3].src = "images/blue-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/blue-green_ship1a.png";
				this.spriteSheet[1].src = "images/blue-green_ship1b.png";
				this.spriteSheet[2].src = "images/blue-green_ship1c.png";
				this.spriteSheet[3].src = "images/blue-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/blue-purple_ship1a.png";
				this.spriteSheet[1].src = "images/blue-purple_ship1b.png";
				this.spriteSheet[2].src = "images/blue-purple_ship1c.png";
				this.spriteSheet[3].src = "images/blue-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/blue-red_ship1a.png";
				this.spriteSheet[1].src = "images/blue-red_ship1b.png";
				this.spriteSheet[2].src = "images/blue-red_ship1c.png";
				this.spriteSheet[3].src = "images/blue-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/blue-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/blue-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/blue-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/blue-yellow_ship1b.png";
				this.tailColor = "yellow";
			}  
		} else if(r <= 6/this.numColors && this.color == "random" || this.color == "purple") {
			var tailColors = 5;
			this.color = "purple";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/purple-blue_ship1a.png";
				this.spriteSheet[1].src = "images/purple-blue_ship1b.png";
				this.spriteSheet[2].src = "images/purple-blue_ship1c.png";
				this.spriteSheet[3].src = "images/purple-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/purple-green_ship1a.png";
				this.spriteSheet[1].src = "images/purple-green_ship1b.png";
				this.spriteSheet[2].src = "images/purple-green_ship1c.png";
				this.spriteSheet[3].src = "images/purple-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/purple-purple_ship1a.png";
				this.spriteSheet[1].src = "images/purple-purple_ship1b.png";
				this.spriteSheet[2].src = "images/purple-purple_ship1c.png";
				this.spriteSheet[3].src = "images/purple-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/purple-red_ship1a.png";
				this.spriteSheet[1].src = "images/purple-red_ship1b.png";
				this.spriteSheet[2].src = "images/purple-red_ship1c.png";
				this.spriteSheet[3].src = "images/purple-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/purple-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/purple-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/purple-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/purple-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		} else if(r <= 7/this.numColors && this.color == "random" || this.color == "pink") {
			var tailColors = 5;
			this.color = "pink";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/pink-blue_ship1a.png";
				this.spriteSheet[1].src = "images/pink-blue_ship1b.png";
				this.spriteSheet[2].src = "images/pink-blue_ship1c.png";
				this.spriteSheet[3].src = "images/pink-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/pink-green_ship1a.png";
				this.spriteSheet[1].src = "images/pink-green_ship1b.png";
				this.spriteSheet[2].src = "images/pink-green_ship1c.png";
				this.spriteSheet[3].src = "images/pink-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/pink-purple_ship1a.png";
				this.spriteSheet[1].src = "images/pink-purple_ship1b.png";
				this.spriteSheet[2].src = "images/pink-purple_ship1c.png";
				this.spriteSheet[3].src = "images/pink-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/pink-red_ship1a.png";
				this.spriteSheet[1].src = "images/pink-red_ship1b.png";
				this.spriteSheet[2].src = "images/pink-red_ship1c.png";
				this.spriteSheet[3].src = "images/pink-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/pink-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/pink-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/pink-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/pink-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		} else if(r <= 8/this.numColors && this.color == "random" || this.color == "white") {
			var tailColors = 5;
			this.color = "white";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/white-blue_ship1a.png";
				this.spriteSheet[1].src = "images/white-blue_ship1b.png";
				this.spriteSheet[2].src = "images/white-blue_ship1c.png";
				this.spriteSheet[3].src = "images/white-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/white-green_ship1a.png";
				this.spriteSheet[1].src = "images/white-green_ship1b.png";
				this.spriteSheet[2].src = "images/white-green_ship1c.png";
				this.spriteSheet[3].src = "images/white-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/white-purple_ship1a.png";
				this.spriteSheet[1].src = "images/white-purple_ship1b.png";
				this.spriteSheet[2].src = "images/white-purple_ship1c.png";
				this.spriteSheet[3].src = "images/white-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/white-red_ship1a.png";
				this.spriteSheet[1].src = "images/white-red_ship1b.png";
				this.spriteSheet[2].src = "images/white-red_ship1c.png";
				this.spriteSheet[3].src = "images/white-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/white-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/white-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/white-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/white-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		} else if(r <= 9/this.numColors && this.color == "random" || this.color == "grey") {
			var tailColors = 5;
			this.color = "grey";
			if(this.tailR == -1)
				this.tailR = Math.random();
			if(this.tailR <= 1/tailColors) {
				this.spriteSheet[0].src = "images/grey-blue_ship1a.png";
				this.spriteSheet[1].src = "images/grey-blue_ship1b.png";
				this.spriteSheet[2].src = "images/grey-blue_ship1c.png";
				this.spriteSheet[3].src = "images/grey-blue_ship1b.png";
				this.tailColor = "blue";
			} else if(this.tailR <= 2/tailColors) {
				this.spriteSheet[0].src = "images/grey-green_ship1a.png";
				this.spriteSheet[1].src = "images/grey-green_ship1b.png";
				this.spriteSheet[2].src = "images/grey-green_ship1c.png";
				this.spriteSheet[3].src = "images/grey-green_ship1b.png";
				this.tailColor = "green";
			} else if(this.tailR <= 3/tailColors) {
				this.spriteSheet[0].src = "images/grey-purple_ship1a.png";
				this.spriteSheet[1].src = "images/grey-purple_ship1b.png";
				this.spriteSheet[2].src = "images/grey-purple_ship1c.png";
				this.spriteSheet[3].src = "images/grey-purple_ship1b.png";
				this.tailColor = "purple";
			} else if(this.tailR <= 4/tailColors) {
				this.spriteSheet[0].src = "images/grey-red_ship1a.png";
				this.spriteSheet[1].src = "images/grey-red_ship1b.png";
				this.spriteSheet[2].src = "images/grey-red_ship1c.png";
				this.spriteSheet[3].src = "images/grey-red_ship1b.png";
				this.tailColor = "red";
			} else if(this.tailR <= 5/tailColors) {
				this.spriteSheet[0].src = "images/grey-yellow_ship1a.png";
				this.spriteSheet[1].src = "images/grey-yellow_ship1b.png";
				this.spriteSheet[2].src = "images/grey-yellow_ship1c.png";
				this.spriteSheet[3].src = "images/grey-yellow_ship1b.png";
				this.tailColor = "yellow";
			} 
		}
		this.img = this.spriteSheet[0];
	} else {
		alert("ERROR: INVALID UFO COLOR!");
	}
	
	// Assign size
	if(this.type == 1) {
		this.width = 45;
		this.height = 20;
		this.hp = 2;
	} else if(this.type == 2) {
		this.width = 55;
		this.height = 25;
		this.hp = 2;
	} else if(this.type == 3) {
		this.width = 32;
		this.height = 20;
		this.hp = 2;
	} else {
		alert("ERROR: INVALID UFO TYPE!");
	}
	this.direction = "up";
	this.del = false;
	
	
	this.update = function() {
		
		if(this.hp == 0) {
			if(this.direction == "up")
				this.y -= 2;
			else
				this.y += 2;
			this.x += 12;
			if(this.y+this.height < 0 || this.y > 130)
				this.del = true;
		}
		
		else {
			
		// TYPE 1
		if(this.type == 1) {
			if(this.x > this.xTarget)
				this.x = Math.max(this.x-this.xspeed, this.xTarget);
			else {
				if(this.direction == "up") {
					this.y = Math.max(this.y-this.yspeed,0);
					if(this.y == 0)
						this.direction = "down";
				} else if(this.direction == "down") {
					this.y = Math.min(this.y+this.yspeed,130-this.height);
					if(this.y == 130-this.height)
						this.direction = "up";
				}
			}
		} 
		
		// TYPE 2
		else if(this.type == 2) {
			if(this.x > this.xTarget && this.duration != 0)
				this.x = Math.max(this.x-this.xspeed, this.xTarget);
			else if(this.duration > 0)
				this.duration--;
			else if(this.duration == 0) {
				this.x += this.xspeed;
				if(this.x >= this.xMark)
					this.del = true;
			}
		} 
		
		// TYPE 3
		else if(this.type == 3) {
			// Move to x point and wave y if entering
			if(this.x > this.xTarget && this.hp > 0) {
				this.x = Math.max(this.x-this.xspeed, this.xTarget);
				if(this.direction == "up") {
					this.y = Math.max(this.y-this.yspeed,0);
					if(this.y+this.waveRad <= this.yMark || this.y == 0)
						this.direction = "down";
				} else if(this.direction == "down") {
					this.y = Math.min(this.y+this.yspeed, 130-this.height);
					if(this.y-this.waveRad >= this.yMark || this.y == 130-this.height)
						this.direction = "up";
				}
			}
			// On freeze period
			else if(this.duration > 0)
				this.duration--;
			// On y scale period
			else if(this.duration <= 0) {
				if(this.direction == "up") {
					this.y = Math.max(this.y-this.yspeed,0);
					if(this.y == 0)
						this.direction = "down";
				} else if(this.direction == "down") {
					this.y = Math.min(this.y+this.yspeed,130-this.height);
					if(this.y == 130-this.height)
						this.direction = "up";
				}
				this.duration -= this.durationSpeed;
			}
			
			// Set new freeze period, slightly randomized
			if(this.duration*-1 >= this.durationMark) {
				this.duration = this.durationMark+(Math.random()*this.durationMark);
				if(Math.random() <= .35) {
					this.duration = this.durationMark;
					this.duration -= this.durationMark*Math.random();
				}
				
				if(Math.random() < .65)
					this.durationSpeed = 2;
				else if(Math.random() < .65)
					this.durationSpeed = 3;
				else
					this.durationSpeed = 1;
				
				if(this.y == 0)
					this.direction = "down";
				else if(this.y == 130-this.height)
					this.direction = "up";
				else {
					if(Math.random() >= .5)
						this.direction = "up";
					else
						this.direction = "down";
				}
			}
			// Move if in dive
			if(this.diveBomb && this.x <= this.xTarget) {
				this.x -= this.xspeed;
			}
			
		}
		
		}
	};
	
	this.draw = function(ctx, gameOver) {
		this.frameCount++;
		if(this.frameCount%this.frameSpeed == 0) {
			this.frame++;
			if(this.frame == this.spriteSheet.length)
				this.frame = 0;
			this.img = this.spriteSheet[this.frame];
		}
		ctx.drawImage(this.img, this.x, this.y);
	};
}
