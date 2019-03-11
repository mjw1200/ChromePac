class Pacman {
  //---------------------------------------------------------------------------
  // Construct a Pac-Man at x,y
  //---------------------------------------------------------------------------
  constructor(x, y, direction = Direction.right) {
    var scope = this;

    this.radius = 20;
    this.diameter = this.radius * 2;
    this.direction = direction;
    this.counter = 0;
    this.mouth = Mouth.open;

    this.corral(x, y);

    setInterval(function() {
      scope.counter++;

      if (scope.counter % 4 === 0)
        scope.mouth = Mouth.open;
      else if (scope.counter % 4 === 1 || scope.counter % 4 === 3)
        scope.mouth = Mouth.half;
      else if (scope.counter % 4 === 2)
        scope.mouth = Mouth.closed;
      
      scope.draw();
    }, 150);
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
  // Ensure that Pac-Man hasn't left the game board
  //---------------------------------------------------------------------------
  corral(x, y) {
    this.extents(x,y);

    // Constrain X
    if (this.xLeftExtent < leftBoundary)
      x += (leftBoundary - this.xLeftExtent)
    if (this.xRightExtent > rightBoundary)
      x += (rightBoundary - this.xRightExtent)
    
    // Constrain Y
    if (this.yTopExtent < upperBoundary)
      y += (upperBoundary - this.yTopExtent);
    if (this.yBottomExtent > lowerBoundary)
      y += (lowerBoundary - this.yBottomExtent)

    this.x = x;
    this.y = y;

    this.extents(x,y);
  }

  //---------------------------------------------------------------------------------------
  // erase
  // Erases Pac-Man
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
  // erase
  // Draws Pac-Man
  //---------------------------------------------------------------------------------------
  draw() {    
    this.erase();
        
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
}