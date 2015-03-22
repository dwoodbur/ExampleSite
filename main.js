var canvas;
var keys = new KeyListener();
var game = new Game();

function MainLoop() {
	game.update();
	game.draw();
	setTimeout(MainLoop, 20);
}
MainLoop();
