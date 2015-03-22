function Projectile(x,y,xspeed,vy,color) {
	this.x = x;
	this.y = y;
	this.xspeed = xspeed;
	this.vy = vy;
	this.color = "red";
	this.radius = 2;
	
	
	this.update = function() {
		this.x -= this.xspeed;
		this.y += this.vy;
	};
	
	
	this.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.fill();
		ctx.fillStyle = "white";
	};
	
}
