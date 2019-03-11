var pacman = new Pacman(50,50);

//---------------------------------------------------------------------------------------
// Handle arrow key presses
//---------------------------------------------------------------------------------------
canvas.addEventListener('keydown', handleKey);
function handleKey (event) {
  if (event.keyCode === Arrow.up) {
    pacman.move(Direction.up);
  }
  else if (event.keyCode === Arrow.down) {
    pacman.move(Direction.down);
  }
  else if (event.keyCode === Arrow.right) {
    pacman.move(Direction.right);
  }
  else if (event.keyCode === Arrow.left) {
    pacman.move(Direction.left);
  }
};

