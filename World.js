function World(x,y) {
	this.x = x;
	this.y = y;
	this.width = 130;
	this.height = 130;
	this.img = new Image();
	this.img.src = "images/world1.png";
	
	this.draw = function(ctx) {
		ctx.drawImage(this.img, this.x, this.y);
	};
}
