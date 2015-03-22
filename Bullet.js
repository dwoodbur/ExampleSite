function Bullet(x,y) {
	this.x = x;
	this.y = y;
	this.width = 5;
	this.height = 3;
	this.speed = 10;
	
	this.update = function() {
		this.x += this.speed;
	};
	
	this.draw = function(ctx) {
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};
}
