//white = maximizing  // black = minimizing
function evaluateBoard() {
  var points=0;
  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
    {
      points+=board[i*8+j]
    }
  return points;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//get list of possible moves
function possibleMoves(player)
{
  var moves=[];

  for(var i = 0; i < 8; i++)
    for(var j = 0; j < 8; j++)
      for(var k = 0; k < 8; k ++)
        for(var l = 0; l < 8; l++)
        {
          if( checking( [i,j], [k, l], player ) )
          {
            moves.push([[i, j], [k, l]]);
          }
        }

  return moves;
}

//TODO: braucht viel ressourcen wenn das bei jedem Zug aufgerufen wird => wird nur in der obersten instanz aufgerufen
function isInCheck(player) {
  moves = possibleMoves(player);
  
  for(var i=0; i<moves.length; i++)
    if(board[moves[i][0]*8+moves[i][1]]==100*player)
      return true;
      
  return false;

}


//minmax algorithm that does the game
function minimax(depth, player, init)
{
  var bestMove = [[0,0],[0,0]];

  if(depth < 1) return evaluateBoard();

  var moves = shuffle(possibleMoves(player));

  var bestValue=-1000000*player;
  for(var i = 0; i < moves.length; i++)
  {
    FROM = 0; TO = 1; X = 0; Y = 1;



    //Make the move
    var rollback = board[moves[i][TO][X]*8+moves[i][TO][Y]];
    board[moves[i][TO][X]*8+moves[i][TO][Y]] = board[moves[i][FROM][X]*8+moves[i][FROM][Y]];
    board[moves[i][FROM][X]*8+moves[i][FROM][Y]] = "";

    if(init)
    {
      if(isInCheck(player))
      {
        //Revert the move
        board[moves[i][FROM][X]*8+moves[i][FROM][Y]] = myboard[moves[i][TO][X]*8+moves[i][TO][Y]];
        board[moves[i][TO][X]*8+moves[i][TO][Y]] = rollback;
        continue;    
      }
    }

    var value = minimax(depth-1, -1*player, false);


    if(player==1)        
    if(value>bestValue)
    {
      bestValue = value;
      bestMove = moves[i];
    }
        
    if(player==-1)
    if(value<bestValue)
    {
      bestValue = value;
      bestMove = moves[i];
    }

    //Revert the move
    board[moves[i][FROM][X]*8+moves[i][FROM][Y]] = board[moves[i][TO][X]*8+moves[i][TO][Y]];
    board[moves[i][TO][X]*8+moves[i][TO][Y]] = rollback;
  }

  //we return the points except the first move we return the move to play    
  if (init) return bestMove;
  else return bestValue;

}



