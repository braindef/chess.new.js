
var start=0;
var end=0;

function moveWhite() {
  console.log("Starting Move White");
  start = new Date().getTime();

  move(1);

  end = new Date().getTime();
    
  time = (end-start)/1000;
  //console.log("WHITE FINISHED MOVE in " + time + "s");
  document.getElementById("white").innerHTML="turn White "+time+"s";
}

function moveBlack() {
  console.log("Starting Move Black");
  start = new Date().getTime();

  move(-1);

  end = new Date().getTime();
    
  time = (end-start)/1000;
  //console.log("BLACK FINISHED MOVE in " + time + "s");
  document.getElementById("black").innerHTML="turn Black "+time+"s";
}



function move(player) {
  var depth = parseInt(document.getElementById("depth").value);
  var nextMove = minimax(depth, player, true);
  //nextMove = alphabeta(depth, player, true, -1000000, 1000000);
  
  if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) alert("CHECKMATE");
  
  save();
  //move logging
  document.getElementById("output").innerHTML+= getFigure(nextMove) + " " + nextMove[0] + " => " + nextMove[1] + "<br>";
  
  board[nextMove[1][0]*8+nextMove[1][1]]=board[nextMove[0][0]*8+nextMove[0][1]];
  board[nextMove[0][0]*8+nextMove[0][1]]=""
   
  drawBoard();
  document.getElementById("lostWhite").innerHTML = getLostFigures(1);
  
  document.getElementById("f"+nextMove[0][0]+nextMove[0][1]).className="selected";
  document.getElementById("f"+nextMove[1][0]+nextMove[1][1]).className="selected";
  setTimeout(function(){  resetBoard();  document.getElementById("white").className=""; }, 100);
  setTimeout(function(){  resetBoard();  document.getElementById("black").className=""; }, 100);
  if(player==1) setTimeout(function(){ document.getElementById("black").className="selected";   }, 1000);
  else setTimeout(function(){ document.getElementById("white").className="selected";   }, 1000);

  var nextMove = minimax(depth, -player, true);
  //var nextMove = alphabeta(depth, player, true, -1000000, 1000000);
    if(nextMove[0][0]+nextMove[0][1]+nextMove[1][0]+nextMove[1][1] == 0) 
    {
      alert("CHECKMATE");
    }
    else if(isInCheck(-player)) alert("CHECK");
    

}
