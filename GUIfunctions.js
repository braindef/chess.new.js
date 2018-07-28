
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

var firstSelected = "";
var secondSelected  = "";

//register mouselistener to fields on board
function registerMouselistener() {
  for (var i = 0; i<8; i++) {
    for (var j = 0; j<8; j++) {
      document.getElementById(fields[i][j]).onclick = function( event ) {
        getBoardFromHTML();
        if (firstSelected=="") {
          if (document.getElementById(event.target.id).innerHTML=="") return;  //TODO: take data from array
          document.getElementById(event.target.id).className="selected";
          firstSelected=getFieldCoord(event.target.id);
        }
        else {
          secondSelected=getFieldCoord(event.target.id);
          if(checking(firstSelected, secondSelected, 1)==false)
          {
            document.getElementById(fields[firstSelected[0]][firstSelected[1]]).className="";
            firstSelected="";
            return false;
          }
          //TODO: Reimplement history undo function: boardHistory.push(copyArray(myboard));
          //historyPointer+=1; separate function saveToHistory()

          document.getElementById(fields[firstSelected[0]][firstSelected[1]]).className="";
          document.getElementById("output").innerHTML += " FIGUR" +  //TODO: figur noch anzeigen
                                                         " " +firstSelected +" => " + getFieldCoord(event.target.id)+"<br>";
                                                        
          board[secondSelected[0]*8+secondSelected[1]]=board[firstSelected[0]*8+firstSelected[1]];
          board[firstSelected[0]*8+firstSelected[1]]=0;
          
          firstSelected="";
          secondSelected="";
          drawBoard();
          
          document.getElementById("lostBlack").innerHTML = getLostFigures(-1);
          //TODO: setTimeout(function(){ moveBlack(); }, 1000);
          //TODO: setTimeout(function(){ document.getElementById("calc").className="selected";   }, 100);
        }
      }
    }
  }
}

function getFieldCoord(fieldName)
{
  for(var i=0; i<8; i++)
    for(var j=0; j<8; j++)
      if(fields[i][j] == fieldName)
       return [i, j];
}

function getLostFigures(player) {
  if(player==1) figures = ["♕", "♔", "♗", "♗", "♘","♘", "♖", "♖", "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"];
  if(player==-1) figures = ["♛", "♚", "♝", "♝", "♞", "♞", "♜", "♜", "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"];

  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      for(var k = 0; k<16; k++)
        if(getFigureFromNumber(i, j)==figures[k]) { figures[k]=""; break;}
  return figures.join("");
}

function resetBoard() {
  for(var i = 0; i<8; i++)
    for(var j = 0; j<8; j++)
      document.getElementById("f"+i+j).className="";
}
