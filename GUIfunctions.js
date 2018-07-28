
//fields in html code
fields = [["f00", "f01", "f02", "f03", "f04", "f05", "f06","f07"],
          ["f10", "f11", "f12", "f13", "f14", "f15", "f16","f17"],
          ["f20", "f21", "f22", "f23", "f24", "f25", "f26","f27"],
          ["f30", "f31", "f32", "f33", "f34", "f35", "f36","f37"],
          ["f40", "f41", "f42", "f43", "f44", "f45", "f46","f47"],
          ["f50", "f51", "f52", "f53", "f54", "f55", "f56","f57"],
          ["f60", "f61", "f62", "f63", "f64", "f65", "f66","f67"],
          ["f70", "f71", "f72", "f73", "f74", "f75", "f76","f77"]];

boardHistory = [];

//set the colors from the chessboard the lazy way
function colorizeHtml() {
  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      if((i+j)%2==0) document.getElementById(fields[i][j]).style.backgroundColor = "blanchedalmond";
      else document.getElementById(fields[i][j]).style.backgroundColor = "peru";
    }
  }
}

function drawBoardToConsole()
{
  var line="";
  for(var i = 0; i<8; i++)
  {
    for(var j = 0; j<8; j++)
    {
      if(board[i][j]=="")
        line+= " _ ";
      else
        line+= " "+board[i][j]+" ";
    }
    console.log(line);
    line="";
  }
}

function drawBoard()
{
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      document.getElementById(fields[i][j]).innerHTML=getFigureFromNumber(i, j);
}

function getBoardFromHTML() {
  for(var i=0; i<8; i++)
    for(var j=0; j<8; j++)
    {
      console.log(getFigureNumber(i, j));
      board[i*8+j]=getFigureNumber(i, j);
    }
}

function getFigureNumber(i, j) {
  figure = document.getElementById(fields[i][j]).innerHTML;
  
  switch (figure) {

    case "": return 0;
  
    case "♙": return 1;
    case "♗": return 5;
    case "♘": return 7;
    case "♖": return 10;
    case "♕": return 30;
    case "♔": return 100;
      
    case "♟": return -1;
    case "♝": return -5;
    case "♞": return -7;
    case "♜": return -10;
    case "♛": return -30;
    case "♚": return -100;
  }
  return 0;
}

function getFigureFromNumber(i, j) {

  switch(board[i*8+j]) {

    case    0: return "";
  
    case    1: return "♙";
    case    5: return "♗";
    case    7: return "♘";
    case   10: return "♖";
    case   30: return "♕";
    case  100: return "♔";
      
    case   -1: return "♟";
    case   -5: return "♝";
    case   -7: return "♞";
    case  -10: return "♜";
    case  -30: return "♛";
    case -100: return "♚";
    
    return "";
  }
}
