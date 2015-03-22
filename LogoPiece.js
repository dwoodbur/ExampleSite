function LogoPiece(x,y,width,img) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = 130;
	this.img = img;
	
	this.draw = function(ctx) {
		ctx.drawImage(this.img, this.x, this.y);
	};
}