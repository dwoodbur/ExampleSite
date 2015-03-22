function Enemy(x,y,vx,vy,color,stage) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.stage = stage;
	this.radius = this.stage*7;
	this.vx = vx;
	this.vy = vy;
	
	this.update = function() {
		this.x -= this.vx;
		if(this.vy > 0)
			this.y = Math.min(this.y+this.vy, 130-this.radius);
		else
			this.y = Math.max(this.y+this.vy, 0);
	};
	
	this.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.fillStyle = "white";
	};
}
