class Pacman {
  //---------------------------------------------------------------------------
  // Construct a Pac-Man at x,y
  //---------------------------------------------------------------------------
  constructor(x, y, direction = Direction.right) {
    this.radius = 20;
    this.diameter = this.radius * 2;
    this.direction = direction;
    this.counter = 0;
    this.mouth = Mouth.open;

    this.corral(x, y);
    this.animate();
  }

  //---------------------------------------------------------------------------
  // Animate the Pac. Just open and close his mouth every so many milliseconds
  // forever. Pac-Man never really stops chewing, does he?
  //---------------------------------------------------------------------------
  animate() {
    var scope = this;

    setInterval(function() {
      scope.counter++;

      if (scope.counter % 4 === 0)
        scope.mouth = Mouth.open;
      else if (scope.counter % 4 === 1 || scope.counter % 4 === 3)
        scope.mouth = Mouth.half;
      else if (scope.counter % 4 === 2)
        scope.mouth = Mouth.closed;
      
      scope.corral();
    }, animationInterval);
  }

  //---------------------------------------------------------------------------
  // Calculate Pac-Man's "extents" - the coordinates of his extreme up, down,
  // left, and right.
  //---------------------------------------------------------------------------
  extents(x, y) {
    this.xRightExtent = x + this.radius;
    this.xLeftExtent = x - this.radius;

    this.yBottomExtent = y + this.radius;
    this.yTopExtent = y - this.radius;
  }

  //---------------------------------------------------------------------------
  // Ensure that Pac-Man hasn't left the game board. x and y are *suggested*
  // coordinates, which will be normalized if they're out of bounds. corral()
  // calls draw() - it's best not to call draw() directly, because there go
  // your boundaries.
  //---------------------------------------------------------------------------
  corral(x = this.x, y = this.y) {
    this.erase();
    this.extents(x,y);

    // Constrain X
    if (this.xLeftExtent < Boundary.left)
      x += (Boundary.left - this.xLeftExtent)
    if (this.xRightExtent > Boundary.right)
      x += (Boundary.right - this.xRightExtent)
    
    // Constrain Y
    if (this.yTopExtent < Boundary.upper)
      y += (Boundary.upper - this.yTopExtent);
    if (this.yBottomExtent > Boundary.lower)
      y += (Boundary.lower - this.yBottomExtent)

    this.x = x;
    this.y = y;

    this.extents(x,y);
    this.draw();
  }

  //---------------------------------------------------------------------------------------
  // Erases Pac-Man. Don't call this function directly - let corral() do that before it
  // normalizes Pac-Man's coordinates.
  //---------------------------------------------------------------------------------------
  erase() {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(this.xLeftExtent, this.yTopExtent);
    ctx.lineTo(this.xRightExtent, this.yTopExtent);
    ctx.lineTo(this.xRightExtent, this.yBottomExtent);
    ctx.lineTo(this.xLeftExtent, this.yBottomExtent);
    ctx.fill();
  }

  //---------------------------------------------------------------------------------------
  // Draws Pac-Man. Don't call this function directly - let corral() do that after it norm-
  // alizes Pac-Man's coordinates.
  //---------------------------------------------------------------------------------------
  draw() {    
    // Set Pac-Man's trademark color
    ctx.fillStyle = '#FFFD38';
    
    // Translate the origin from (0,0) to Pac-Man's location so we can rotate him correctly
    ctx.translate(this.x, this.y);
    
    // Rotations are clockwise. 0°/360° is the default.
    if (this.direction === Direction.down)
      ctx.rotate(1.571); // π/2 (90°)
    else if (this.direction === Direction.left)
      ctx.rotate(3.142); // π (180°)
    else if (this.direction === Direction.up)
      ctx.rotate(4.712); // 3π/2 (270°)
  
    let startAngle = 0.785; // π/4 (45°)
    let stopAngle = -0.785;

    if (this.mouth === Mouth.half) {
      startAngle /= 2;
      stopAngle = -startAngle;
    }
    else if (this.mouth === Mouth.closed) {
      startAngle = 0;
      stopAngle = 6.284; // 2π (360°)
    }

    // Draw Pac-Man. Because we translated to his location, his center is now at (0,0)
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, startAngle, stopAngle, false)
    ctx.lineTo(0,0);
    ctx.fill();
  
    // Clear the transformation matrix, putting the origin back where it should be
    ctx.setTransform(1, 0, 0, 1, 0, 0);  
  }
  
  //---------------------------------------------------------------------------------------
  // Moves Pac-Man up, down, left, or right. This is subject to the boundary checking tha
  // corral() does, so calling this function actually *suggests* a move.
  //---------------------------------------------------------------------------------------
  move(direction) {
    let x = this.x;
    let y = this.y;

    if (direction === Direction.up) {
      this.direction = Direction.up;
      y -= speed;
    }
    else if (direction === Direction.down) {
      this.direction = Direction.down;
      y += speed;
    }
    else if (direction === Direction.left) {
      this.direction = Direction.left;
      x -= speed;
    }
    else if (direction === Direction.right) {
      this.direction = Direction.right;
      x += speed;     
    }
    
    this.corral(x, y);
  }
}