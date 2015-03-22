function Explosion(x,y) {
	this.x = x;
	this.y = y;
	this.frame = 0;
	this.img = new Image();
	
	this.update = function() {
		this.frame++;
	};
	
	this.draw = function() {
		
	};
}
