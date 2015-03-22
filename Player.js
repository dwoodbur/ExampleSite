function Player(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.ySpeed = 3;
	this.xSpeed = 6;
	this.broken = false;
	this.color = "red";
	this.hit = false;
	this.hitDuration = 20;
	
	this.moveUp = function() {
		this.y = Math.max(this.y-this.ySpeed,0);
	};
	
	this.moveDown = function() {
		this.y = Math.min(this.y+this.ySpeed, 130-this.height);
	};
	
	this.moveLeft = function() {
		this.x = Math.max(this.x-this.xSpeed, 135);
	};
	
	this.moveRight = function(canWidth) {
		this.x = Math.min(this.x+this.xSpeed, canWidth-this.width);
	};
	
	
	this.draw = function(ctx) {
		if(this.hit == true) {
			ctx.fillStyle = this.color;
			this.hitDuration--;
			if(this.hitDuration == 0) {
				this.hitDuration = 20;
				this.hit = false;
			}
		}
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.fillStyle = "white";
	};
}
