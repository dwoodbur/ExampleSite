function Torpedo(x,y,color) {
	this.x = x;
	this.y = y;
	this.speed = 10;
	this.width = 30;
	this.height = 9;
	this.frame = 0;
	this.frameCount = 1;
	this.frameSpeed = 5;
	this.spriteSheet = new Array(4);
	this.color = color;
	
	for(var i=0; i < 4; i++)
			this.spriteSheet[i] = new Image();
	var r = Math.random();
	if(r <= .25 && this.color == "random" || this.color == "red") {
		this.spriteSheet[0].src = "images/red_torpedo1.png";
		this.spriteSheet[1].src = "images/red_torpedo2.png";
		this.spriteSheet[2].src = "images/red_torpedo3.png";
		this.spriteSheet[3].src = "images/red_torpedo2.png";
		this.color = "red";
	} else if(r <= .5 && this.color == "random" || this.color == "green") {
		this.spriteSheet[0].src = "images/green_torpedo1.png";
		this.spriteSheet[1].src = "images/green_torpedo2.png";
		this.spriteSheet[2].src = "images/green_torpedo3.png";
		this.spriteSheet[3].src = "images/green_torpedo2.png";
		this.color = "green";
	} else if(r <= .75 && this.color == "random" || this.color == "blue") {
		this.spriteSheet[0].src = "images/blue_torpedo1.png";
		this.spriteSheet[1].src = "images/blue_torpedo2.png";
		this.spriteSheet[2].src = "images/blue_torpedo3.png";
		this.spriteSheet[3].src = "images/blue_torpedo2.png";
		this.color = "blue";
	} else if(this.color == "random" || this.color == "yellow"){
		this.spriteSheet[0].src = "images/yellow_torpedo1.png";
		this.spriteSheet[1].src = "images/yellow_torpedo2.png";
		this.spriteSheet[2].src = "images/yellow_torpedo3.png";
		this.spriteSheet[3].src = "images/yellow_torpedo2.png";
		this.color = "yellow";
	}
	this.img = this.spriteSheet[0];
	
	this.update = function() {
		this.x -= this.speed;
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
