var cols=8;
var rows=8;

var board = new Int8Array(cols*rows);

var from = new Int8Array(2);
var to = new Int8Array(2);
var player = new Int8Array(1);


function checking(from, to, player)
{
  console.log("FROM: "+from+" TO: "+to+" Player: "+player);
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
  
  }

  return false;
}

function checkPawn(from, to, player) {
  console.log("checkPawn(): FROM: "+from+" TO: "+to+" Player: "+player);

  //check single move
  if(from[1]==to[1] && ((to[0]-from[0])==-player) && board[to[0]*8+to[1]]==0)
    return true;
    
  //check 2 field move (first move), tests: index.html#♜♞♝♛♚♝♞♜♟♟__♟_♟♟__________________♟♙________♙♟__♙♙♙♙♙♙♙♙♖♘♗♕♔♗♘♖
  if(from[1]==to[1] && ((to[0]-from[0])==-player*2) && board[to[0]*8+to[1]]==0 && board[(to[0]+player)*8+to[1]]==0)
    return true;
    
    
    
  return false;
}


