function LineBlock () {
	color = 'Gold';
	gridCell = blockStartPos;
	raw = 0; 
	col = blockStartPos;
	// var b = [[1,{х:1. у:2}], [2, {х:3. у:4}]];
	currentRotateState = 0;
	points = new Array	(
						 new Point (0, blockStartPos),
						 new Point (1, blockStartPos),
						 new Point (2, blockStartPos),
						 new Point (3, blockStartPos)
						);
	RStates = new Array(
						new Array							//up - down
							(
							 new Point (0, 1),
							 new Point (1, 0),
							 new Point (2, -1),
							 new Point (3, -2)
							),
						new Array							//right - left
							(
							 new Point (0, -1),
							 new Point (-1, 0),
							 new Point (-2, 1),
							 new Point (-3, 2)
							)
						);
	this.draw();
}

LineBlock.prototype = {
	draw: function () {
		for(var i = 0; i < 4; i++)
		{

		ctx.fillStyle = color;
		ctx.fillRect(	borderX + points[i].col * blockSizeX, 
						borderY + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}
	},
	clear: function () {
		for(var i = 0; i < 4; i++)
		{
		ctx.clearRect(	borderX + points[i].col * blockSizeX, 
						borderY + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );

		ctx.fillStyle = backgroundColor;

		ctx.fillRect(	borderX + points[i].col * blockSizeX, 
						borderY + points[i].raw * blockSizeY, 
						blockSizeX, blockSizeY );
		}
	},
	rotate: function(){
		currentRotateState++;
		if(2 == currentRotateState) currentRotateState = 0;
		
		this.clear();
		debugger;
		var newAngle = new Array();
		for(var i = 0; i < 4; i++)
		{
			newAngle.push( new Point(points[i].raw + RStates[currentRotateState][i].raw, points[i].col + RStates[currentRotateState][i].col));
		}
		var c = 4;
		for(var i = 0; i < 4; i++)
		// if ( true == grid[ newAngle[i].raw ][ newAngle[i].col].isEmpty ) c++;
		
		if( 4 == c )
		{
			for(var i = 0; i < 4; i++)
			{
				points[i].raw = newAngle[i].raw;
				points[i].col = newAngle[i].col;
			}	
		}	
		this.draw();
	},
	moveDown: function (){
		this.move(DOWN);
	},
	moveLeft: function (){
		this.move(LEFT);
	},
	moveRight: function (){
		this.move(RIGHT);
	},
	move: function (dir){

	var canMove = false;

	this.clear();
	
	var newPos = new Array();
	if ( DOWN  == dir) 
		for(var i = 0; i < 4; i++)
			newPos.push(new Point(points[i].raw + 1, points[i].col));

	if ( LEFT  == dir) 
		for(var i = 0; i < 4; i++)
			newPos.push( new Point(points[i].raw, points[i].col - 1));			// make test versions of new block position

	if ( RIGHT == dir) 
		for(var i = 0; i < 4; i++)
			newPos.push( new Point(points[i].raw, points[i].col + 1));

	var c = 0;
	for(var i = 0; i < 4; i++)
		if ( true == grid[ newPos[i].raw ][ newPos[i].col ].isEmpty ) c++;		//check new pos points of block

	if ( 4 == c ) canMove = true;

	if( canMove )
	{
		for(var i = 0; i < 4; i++)
		{
			points[i].raw = newPos[i].raw;
			points[i].col = newPos[i].col;
		}
	} else if( DOWN == dir)
		{
			for(var i = 0; i < 4; i++)
				newPos[i].raw--;  		

			for(var i = 0; i < 4; i++)
			{
				grid[ newPos[i].raw ][ newPos[i].col ].isEmpty = false;	
				grid[ newPos[i].raw ][ newPos[i].col ].color = color;	
			}

			clearFullLines();

				delete currentBlock;
			currentBlock = createNewBlock();		
			drawGrid();		
		}
		this.draw();
	}
};