function Star(x,y,speed) {
	this.x = x;
	this.y = y;
	this.width = 1;
	this.height = 1;
	this.speed = speed;
	this.twinkle = 0;
	this.twinkleConst = .003;
	
	this.update = function() {
		this.x -= this.speed;
		if(this.twinkle > 0)
			this.twinkle--;
		if(this.speed <= 4 && this.twinkle == 0 && Math.random() < this.twinkleConst) {
			this.twinkle = 20;
		}
	};
	
	this.draw = function(ctx) {
		if(this.twinkle == 0)
			ctx.fillRect(this.x, this.y, this.width, this.height);
	};
}
