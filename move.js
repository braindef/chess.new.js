
function moveWhite() {
  move(1);
}

function moveBlack() {
  move(-1);
}



function move(player) {
  var depth = parseInt(document.getElementById("depth").value);
  var nextMove = minimax(depth, player, true);
  //nextMove = alphabeta(depth, player, true, -1000000, 1000000);
  
  if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) alert("CHECKMATE");
  
  boardHistory.push(board.slice());
  historyPointer+=1;
  //move logging
  document.getElementById("output").innerHTML+= /*getFigure(nextMove) //TODO */ + " " + nextMove[0] + " => " + nextMove[1] + "<br>";
  
  board[nextMove[1][0]*8+nextMove[1][1]]=board[nextMove[0][0]*8+nextMove[0][1]];
  board[nextMove[0][0]*8+nextMove[0][1]]=""
   
  drawBoard();
  document.getElementById("lostWhite").innerHTML = getLostFigures(1);
  
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  setTimeout(function(){  resetBoard();  document.getElementById("calc").className=""; }, 2000);
  var nextMove = minimax(depth, -player, true);
  //var nextMove = alphabeta(depth, player, true, -1000000, 1000000);
    if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) 
    {
      alert("CHECKMATE");
    }
    else if(isInCheck(-player)) alert("CHECK");
}
