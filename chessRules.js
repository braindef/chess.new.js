var cols=8;
var rows=8;

var board = new Int8Array(cols*rows);

var from = new Int8Array(2);
var to = new Int8Array(2);
var player = new Int8Array(1);


function checking(from, to, player)
{
  //check if player wants to move his own figures
  if(player*board[from[0]*8+from[1]]<0)
    return false;

  //check if move is not to the same field
  if(from[0]==to[0]&&from[1]==to[1])
    return false;

  switch (board[from[0]*8+from[1]]) {
  
    case 1:
      return checkPawn(from, to, 1);
      
    case -1:
      return checkPawn(from, to, -1);
  
    case 7:
      return checkKnight(from, to, 1);
      
    case -7:
      return checkKnight(from, to, -1);
  
    case 5:
      return checkBishop(from, to, 1);
      
    case -5:
      return checkBishop(from, to, -1);
  
    case 10:
      return checkRook(from, to, 1);
      
    case -10:
      return checkRook(from, to, -1);

    case 30:
      return checkQueen(from, to, 1);
      
    case -30:
      return checkQueen(from, to, -1);

    case 100:
      return checkKing(from, to, 1);
      
    case -100:
      return checkKing(from, to, -1);
  }

  return false;
}

function checkPawn(from, to, player) {

  //check single move
  if(from[1]==to[1] && ((to[0]-from[0])==-player) && board[to[0]*8+to[1]]==0)
    return true;
  
  var home=0;
  
  if(player=1) home=6;
  else home=1;
  
  //check 2 field move (first move), tests: index.html#♜♞♝♛♚♝♞♜♟♟__♟_♟♟__________________♟♙________♙♟__♙♙♙♙♙♙♙♙♖♘♗♕♔♗♘♖
  if(from[0]==home && ((to[0]-from[0])==-player*2) && board[to[0]*8+to[1]]==0 && board[(to[0]+player)*8+to[1]]==0)
    return true;

  //check beating an opponents chess piece diagonal, tests: index.html#♜♞♝♛♚♝♞♜♟♟♟♟♟♟♟_____♟______♟♟_______♙______♙____♙♙♙__♙♙♙♖♘♗♕♔♗♘♖
  if( to[0]-from[0]==-player && ((from[1]-to[1]==1) || (from[1]-to[1]==-1) ) && player*board[to[0]*8+to[1]]<0)
    return true;
    
  return false;
}

function checkKnight(from, to, player) {

  //check 1 to the side and 2 up or down
  if(Math.abs(from[1]-to[1])==1 && Math.abs(from[0]-to[0])==2 && board[to[0]*8+to[1]]*player<=0)
    return true;
    
  //check 2 to the side and 1 up or down
  if(Math.abs(from[1]-to[1])==2 && Math.abs(from[0]-to[0])==1 && board[to[0]*8+to[1]]*player<=0)
    return true;
    
  return false;
}


function checkBishop(from, to, player) {

  var vertical=from[0]-to[0];
  var horizontal=from[1]-to[1];

  var stepsVertical=Math.abs(vertical);
  var stepsHorizontal=Math.abs(horizontal)

  var directionVertical=vertical/stepsVertical;
  var directionHorizontal=horizontal/stepsHorizontal;
  


  //check diagonal if move is not diagonal
  if( stepsVertical!=stepsHorizontal )
    return false;

  //check if there is a figure between the start and endpoint
  for(var i=1; i<stepsVertical; i++)
    if(board[(from[0]-i*directionVertical)*8+from[1]-i*directionHorizontal]!=0)
      return false;

  //check if its empty or opponent
  if(board[to[0]*8+to[1]]*player<=0)
    return true;

  return false;
}

function checkRook(from, to, player) {

  var vertical=from[0]-to[0];
  var horizontal=from[1]-to[1];

  var stepsVertical=Math.abs(vertical);
  var stepsHorizontal=Math.abs(horizontal)

  var directionVertical=vertical/stepsVertical;
  var directionHorizontal=horizontal/stepsHorizontal;


  //check if only vertical or only horizontal
  if ( stepsHorizontal!=0 && stepsVertical!=0 )
  {
    return false;
  }
  
  if(stepsVertical==0)
    for(var i=1; i<stepsHorizontal; i++)
      if(board[from[0]*8+from[1]-i*directionHorizontal]!=0)
        return false;

  if(stepsHorizontal==0)
    for(var i=1; i<stepsVertical; i++)
      if(board[(from[0]-i*directionVertical)*8+from[1]]!=0)
        return false;
        
  //check if its empty or opponent
  if(board[to[0]*8+to[1]]*player<=0)
    return true;        
    
  return false;
    
}

function checkQueen(from, to, player) {

  //reuse the tests from Bishop and Rook  
  return checkBishop(from, to, player) || checkRook(from, to, player);
  
  return false;

}

function checkKing(from, to, player) {

  var vertical=from[0]-to[0];
  var horizontal=from[1]-to[1];
  
  var stepsVertical=Math.abs(vertical);
  var stepsHorizontal=Math.abs(horizontal)
  
  if( ( stepsVertical==1 && stepsHorizontal==1 || 
        stepsVertical==0 && stepsHorizontal==1 ||
        stepsVertical==1 && stepsHorizontal==0    ) && board[to[0]*8+to[1]]*player<=0 )
    return true;
    
  return false;
}







