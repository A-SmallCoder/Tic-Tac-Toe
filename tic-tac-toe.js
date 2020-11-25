//sets board at the start of the game
function setboard(){
    let div = document.getElementById("board");
    let eachSquare = div.getElementsByTagName("div");
    
    for (i=0; i < eachSquare.length; i++){
        eachSquare[i].className="square";
        eachSquare[i].addEventListener("click",play)
        eachSquare[i].setAttribute("id",i)       
    }
}

//initialize variable which holds the previous move (first move is X)
let lastMove = "O";

//sets a square's value to either "X" or "O"
function play(e){    
    let clicked = e.target.id;
    let square = document.getElementById(clicked);

    if (square.innerHTML == ""){
        if (lastMove == "O"){
            lastMove = "X";
        }else {
            lastMove ="O"
        }
        square.innerHTML=lastMove;
        square.classList.add(lastMove);
        gameTracker[clicked] = lastMove;

        console.log(gameTracker);

        checkWinner();
    }
}

//array that keeps track of state of the game
var gameTracker = ["","","","","","","","",""];


//checks if there is a winner after each move
function checkWinner(){

    var row1 = [gameTracker[0],gameTracker[1],gameTracker[2]];
    var row2 = [gameTracker[3],gameTracker[4],gameTracker[5]];
    var row3 = [gameTracker[6],gameTracker[7],gameTracker[8]];
    var col1 = [gameTracker[0],gameTracker[3],gameTracker[6]];
    var col2 = [gameTracker[1],gameTracker[4],gameTracker[7]];
    var col3 = [gameTracker[2],gameTracker[5],gameTracker[8]];
    var diag1= [gameTracker[0],gameTracker[4],gameTracker[8]];
    var diag2= [gameTracker[2],gameTracker[4],gameTracker[6]];
    var lines = [row1,row2,row3,col1,col2,col3,diag1,diag2];

    for (var i=0;i<lines.length;i++){
        if((lines[i][0])+(lines[i][1])+(lines[i][2]) == "XXX"){
            document.getElementById("status").innerHTML="Congratulations! X is the winner! You have the first play in the next game.";
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").classList.remove("draw");
            document.getElementById("blocker").style.display = "block";
            lastMove = "O";
        }else if((lines[i][0])+(lines[i][1])+(lines[i][2]) == "OOO"){
            document.getElementById("status").innerHTML="Congratulations! O is the winner! You have the first play in the next game.";
            document.getElementById("status").classList.add("you-won");
            document.getElementById("status").classList.remove("draw");
            document.getElementById("blocker").style.display = "block";
            lastMove = "X";
        }else{
            checkDraw();
        }
    }
}

function checkDraw(){
    if (!gameTracker.includes("") && !document.getElementById("status").classList.contains("you-won")){
        //console.log(document.getElementById("status").classList); 
        if(lastMove == "X"){
            document.getElementById("status").innerHTML="Draw! There is no winner. X has the first move in the next game.";
            lastMove = "O";
        }else{
            document.getElementById("status").innerHTML="Draw! There is no winner. O has the first move in the next game.";
            lastMove = "X";
        }        
        document.getElementById("status").classList.add("draw");
    }
}

//restarts the game
function restart(){
    var squares = document.getElementsByClassName("square");
    for(i=0;i<squares.length;i++){
        //console.log(i,squares[i].classList);
        if(squares[i].classList.contains("X")){
            squares[i].classList.remove("X")
        }else{
            squares[i].classList.remove("O")
        }
        squares[i].innerHTML = ""
        gameTracker[i] = "";        
    }
    document.getElementById("status").innerHTML="Move your mouse over a square and click to play an X or an O.";
    document.getElementById("status").classList.remove("you-won");
    document.getElementById("status").classList.remove("draw");
    document.getElementById("blocker").style.display = "none";
}

window.onload = () => {
    setboard();
}