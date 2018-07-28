var cols=8;
var rows=8;

var board = new Int8Array(cols*rows);

var from = new Int8Array(2);
var to = new Int8Array(2);
var player = new Int8Array(1);

from[0]=4;
from[1]=4;
to[0]=5;
to[1]=5;
player[0]=1;

board[4*8+4]=4;

function checking(from, to, player)
{
  //check if player wants to move his own figures
  if(player[0]*board[from[0]*8+from[1]]<0)
    return false;

  //check if move is not to the same field
  if(from[0]==to[0]&&from[1]==to[1])
    return false;

  switch (board[from[0]][from[1]]) {
  
    case 1:
      return checkPawn(from, to, 1);
      
    case -1:
      return checkPawn(from, to, -1);
  
  }

  return false;
}

function checkPawn(from, to, player) {
  //check single move
  if(from[1]==to[1] && ((to[0]-from[0])==player) && board[to[0]][to[1]]==0)
    return true;
    
  return false;
}


