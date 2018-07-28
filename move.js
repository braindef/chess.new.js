
function moveWhite() {
  console.log("Starting Move White");
  var start = new Date().getTime();

  move(1);

  var end = new Date().getTime();
    
  time = (end-start)/1000;
  console.log("WHITE FINISHED MOVE in " + time + "s");
}

function moveBlack() {
  console.log("Starting Move Black");
  var start = new Date().getTime();

  move(-1);

  var end = new Date().getTime();
    
  time = (end-start)/1000;
  console.log("BLACK FINISHED MOVE in " + time + "s");
}



function move(player) {
  var depth = parseInt(document.getElementById("depth").value);
  var nextMove = minimax(depth, player, true);
  //nextMove = alphabeta(depth, player, true, -1000000, 1000000);
  
  if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) alert("CHECKMATE");
  
  save();
  //move logging
  document.getElementById("output").innerHTML+= /*getFigure(nextMove) //TODO */ + " " + nextMove[0] + " => " + nextMove[1] + "<br>";
  
  board[nextMove[1][0]*8+nextMove[1][1]]=board[nextMove[0][0]*8+nextMove[0][1]];
  board[nextMove[0][0]*8+nextMove[0][1]]=""
   
  drawBoard();
  document.getElementById("lostWhite").innerHTML = getLostFigures(1);
  
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  setTimeout(function(){  resetBoard();  document.getElementById("calc").className=""; }, 5000);
  var nextMove = minimax(depth, -player, true);
  //var nextMove = alphabeta(depth, player, true, -1000000, 1000000);
    if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) 
    {
      alert("CHECKMATE");
    }
    else if(isInCheck(-player)) alert("CHECK");
    

}
